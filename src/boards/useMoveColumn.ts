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
