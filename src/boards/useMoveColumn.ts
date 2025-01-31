import { useDataProvider, useEvent } from "react-admin";
import { useQueryClient } from "@tanstack/react-query";

export const useMoveColumn = () => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();

  return useEvent(
    async ({ columnId, position }: { columnId: number; position: number }) => {
      const sourceColumn = queryClient.getQueryData<any>([
        "columns",
        "getOne",
        { id: String(columnId), meta: undefined },
      ]);

      // Optimistically update the UI
      // Issue: https://github.com/hello-pangea/dnd/issues/424
      queryClient.setQueryData(
        [
          "columns",
          "getManyReference",
          {
            target: "board_id",
            id: sourceColumn.board_id,
            pagination: { page: 1, perPage: 10000 },
            sort: { field: "position", order: "ASC" },
            filter: {},
          },
        ],
        (oldData: any) => {
          if (
            oldData == null ||
            oldData.data.find((column: any) => column.id === columnId) == null
          ) {
            return oldData;
          }

          const firstPhase: any[] = [];
          for (const column of oldData.data) {
            if (column.position > sourceColumn.position) {
              firstPhase.push({
                ...column,
                position: column.position - 1,
              });
              continue;
            }
            firstPhase.push(column);
          }
          const secondPhase: any[] = [];
          for (const column of firstPhase) {
            if (column.position >= position) {
              secondPhase.push({
                ...column,
                position: column.position + 1,
              });
              continue;
            }
            secondPhase.push(column);
          }

          const column = secondPhase.find((column) => column.id === columnId);
          if (column != null) {
            column.position = position;
          }

          const finalData = secondPhase.sort((a, b) => a.position - b.position);

          return {
            ...oldData,
            data: finalData,
          };
        },
      );
      // persist the changes
      await dataProvider.moveColumn({
        data: {
          column_id: columnId,
          position,
          previousData: sourceColumn,
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["columns", "getManyReference"],
      });
    },
  );
};
