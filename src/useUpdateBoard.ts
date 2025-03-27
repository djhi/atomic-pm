import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Identifier, RaRecord, useEvent } from "react-admin";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  const updateCard = useEvent(
    ({
      board_id,
      record,
      update,
    }: {
      board_id?: Identifier;
      record: RaRecord;
      update: (record: RaRecord) => RaRecord;
    }) => {
      queryClient.setQueryData(
        [
          "boards",
          "getOne",
          {
            id: String(board_id),
            meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
          },
        ],
        (board: any) => ({
          ...board,
          columns: board.columns.map((column: any) =>
            column.id === record.column_id
              ? {
                  ...column,
                  cards: column.cards.map((card: any) =>
                    card.id === record.id ? update(card) : card,
                  ),
                }
              : column,
          ),
        }),
      );
    },
  );
  const updateColumn = useEvent(
    ({
      board_id,
      record,
      update,
    }: {
      board_id: Identifier;
      record: RaRecord;
      update: (record: RaRecord) => RaRecord;
    }) => {
      queryClient.setQueryData(
        [
          "boards",
          "getOne",
          {
            id: String(board_id),
            meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
          },
        ],
        (board: any) => ({
          ...board,
          columns: board.columns.map((column: any) =>
            column.id === record.id ? update(column) : column,
          ),
        }),
      );
    },
  );
  const updateBoard = useEvent(
    ({
      board_id,
      update,
    }: {
      board_id: Identifier;
      update: (record: RaRecord) => RaRecord;
    }) => {
      queryClient.setQueryData(
        [
          "boards",
          "getOne",
          {
            id: String(board_id),
            meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
          },
        ],
        update,
      );
    },
  );

  return useMemo(
    () => ({
      updateBoard,
      updateCard,
      updateColumn,
    }),
    [updateBoard, updateCard, updateColumn],
  );
};
