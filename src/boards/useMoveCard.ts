import { useDataProvider, useEvent } from "react-admin";
import { useQueryClient } from "@tanstack/react-query";

export const useMoveCard = () => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();

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
      const sourceCard = queryClient.getQueryData([
        "cards",
        "getOne",
        { id: cardId },
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

      queryClient.invalidateQueries({
        queryKey: ["cards", "getManyReference"],
      });
    },
  );
};
