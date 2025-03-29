import { useQueryClient } from "@tanstack/react-query";
import {
  RaRecord,
  UpdateMutationFunction,
  UpdateParams,
  useEvent,
  useRegisterMutationMiddleware,
} from "react-admin";
import { useParams } from "react-router";

export const useMoveToEndOfColumnMiddleware = () => {
  const routeParams = useParams<"boardId">();
  const queryClient = useQueryClient();
  const middleware = useEvent(
    async (
      resource: string,
      params: Partial<UpdateParams<any>>,
      next: UpdateMutationFunction,
    ) => {
      const board = queryClient.getQueryData<RaRecord>([
        "boards",
        "getOne",
        {
          id: String(routeParams.boardId),
          meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
        },
      ]);
      const column = board?.columns.find(
        (column: any) => column.id === params.data?.column_id,
      );

      if (next) {
        const result = await next(resource, {
          ...params,
          data: { ...params.data, position: column.cards.length },
        });
        return result;
      }
    },
  );
  // @ts-ignore
  useRegisterMutationMiddleware(middleware);
};

export const UseMoveToEndOfColumnMiddleware = () => {
  useMoveToEndOfColumnMiddleware();
  return null;
};
