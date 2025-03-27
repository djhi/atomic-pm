import { useQuery } from "@tanstack/react-query";
import { useDataProvider } from "react-admin";
import { useParams } from "react-router";

export const useCardFromBoardAndNumber = () => {
  const params = useParams<"boardId" | "id">();
  const dataProvider = useDataProvider();

  return useQuery({
    queryKey: ["cards", "getCardFromBoardAndNumber", params.boardId, params.id],
    queryFn: async ({ client }) => {
      const { data } = await dataProvider.getCardFromBoardAndNumber({
        data: {
          number: params.id,
          board_id: params.boardId,
        },
      });

      const updatedAt = Date.now() + 5 * 1000;
      client.setQueryData(["cards", "getOne", { id: String(data.id) }], data, {
        updatedAt,
      });

      return data;
    },
  });
};
