import { useQuery } from "@tanstack/react-query";
import { useDataProvider } from "react-admin";
import { useMatch } from "react-router";

export const useCardFromBoardAndNumber = () => {
  const match = useMatch("/boards/:boardId/cards/:id");
  const dataProvider = useDataProvider();

  return useQuery({
    queryKey: [
      "cards",
      "getCardFromBoardAndNumber",
      match?.params.boardId,
      match?.params.id,
    ],
    queryFn: async ({ client }) => {
      const { data } = await dataProvider.getCardFromBoardAndNumber({
        data: {
          number: match?.params.id,
          board_id: match?.params.boardId,
        },
      });

      const updatedAt = Date.now() + 5 * 1000;
      client.setQueryData(["cards", "getOne", { id: String(data.id) }], data, {
        updatedAt,
      });

      return data;
    },
    enabled: !!match,
  });
};
