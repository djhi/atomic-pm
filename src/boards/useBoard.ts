import { useEffect, useState } from "react";
import { RaRecord, useRecordContext } from "react-admin";
import cloneDeep from "lodash/cloneDeep";
import { useBoardDragAndDrop } from "./useBoardDragAndDrop";
import { useBoardLiveUpdates } from "./useBoardLiveUpdates";
import { useQueryClient } from "@tanstack/react-query";

export const useBoard = (): [
  RaRecord | undefined,
  {
    moveCard: ({
      cardId,
      sourceColumnId,
      destinationColumnId,
      position,
    }: {
      cardId: number;
      sourceColumnId: number;
      destinationColumnId: number;
      position: number;
    }) => void;
    moveColumn: ({
      columnId,
      position,
    }: {
      columnId: number;
      position: number;
    }) => void;
  },
] => {
  const record = useRecordContext();
  const queryClient = useQueryClient();

  const [board, setBoard] = useState(cloneDeep(record));
  useEffect(() => {
    if (record) {
      const updatedAt = Date.now() + 5 * 1000;

      const cards = record.columns.flatMap((column: RaRecord) => column.cards);
      const columns = record.columns.flatMap(
        ({ cards, ...column }: RaRecord) => column,
      );
      for (const card of cards) {
        queryClient.setQueryData(
          ["cards", "getOne", { id: String(card.id) }],
          card,
          { updatedAt },
        );
        queryClient.setQueryData(
          ["cards", "getCardFromBoardAndNumber", String(record.id), String(card.number)],
          card,
          { updatedAt },
        );
      }
      for (const column of columns) {
        queryClient.setQueryData(
          ["columns", "getOne", { id: String(column.id) }],
          column,
          { updatedAt },
        );
      }
    }

    setBoard(cloneDeep(record));
  }, [record]);

  useBoardLiveUpdates(board);
  const functions = useBoardDragAndDrop({ board, setBoard });

  return [board, functions];
};
