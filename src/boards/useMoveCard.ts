import { useDataProvider, useEvent, useGetIdentity } from "react-admin";
import { useQueryClient } from "@tanstack/react-query";
import { useAddRevision } from "@react-admin/ra-history";

export const useMoveCard = () => {
  const dataProvider = useDataProvider();
  const { identity } = useGetIdentity();
  const queryClient = useQueryClient();
  const [addRevision] = useAddRevision();

  return useEvent(
    async ({
      cardId,
      columnId,
      position,
    }: {
      cardId: number;
      columnId: number;
      position: number;
    }) => {
      const sourceCard = queryClient.getQueryData<any>([
        "cards",
        "getOne",
        { id: String(cardId) },
      ]);
      const sourceColumn = queryClient.getQueryData<any>([
        "columns",
        "getOne",
        { id: String(sourceCard.column_id) },
      ]);
      const destinationColumn = queryClient.getQueryData<any>([
        "columns",
        "getOne",
        { id: String(columnId) },
      ]);

      // persist the changes
      await dataProvider.moveCard({
        data: {
          card_id: cardId,
          column_id: columnId,
          position,
          previousData: sourceCard,
        },
      });

      addRevision("cards", {
        recordId: cardId,
        data: { ...sourceCard, card_id: cardId, column_id: columnId, position },
        date: new Date().toISOString(),
        message:
          columnId !== destinationColumn.id
            ? `Moved card from column ${sourceColumn.name} to column ${destinationColumn.name} at position ${position + 1}`
            : `Moved card to position ${position + 1} in column ${destinationColumn.name}`,
        description: columnId !== destinationColumn.id
            ? `Moved card from column ${sourceColumn.name} to column ${destinationColumn.name} at position ${position + 1}`
            : `Moved card to position ${position + 1} in column ${destinationColumn.name}`,
        authorId: identity?.id,
      });

      queryClient.invalidateQueries({
        queryKey: ["cards", "getManyReference"],
      });
    },
  );
};
