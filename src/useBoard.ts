import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type RaRecord, useRecordContext } from "react-admin";
import cloneDeep from "lodash/cloneDeep";
import { useQueryClient } from "@tanstack/react-query";
import { useBoardLiveUpdates } from "./useBoardLiveUpdates";
import { useCardFilter } from "./useCardFilter";

export const useBoard = (): [
  RaRecord | undefined,
  Dispatch<SetStateAction<RaRecord | undefined>>,
] => {
  const record = useRecordContext();
  const queryClient = useQueryClient();
  const [cardFilter] = useCardFilter();

  const boardState = useState(cloneDeep(record));
  const [board, setBoard] = boardState;
  useEffect(() => {
    if (!record) return;
    const filterRegexp = cardFilter
      ? new RegExp(
          `${cardFilter
            .split(" ")
            .map((word) => `(?=.*${word})`)
            .join("")}.*`,
          "ig",
        )
      : null;
    const updatedAt = Date.now() + 5 * 1000;
    const board = {
      ...record,
      columns: record.columns.map((column: RaRecord) => ({
        ...column,
        cards: filterRegexp
          ? column.cards.filter((card: RaRecord) =>
              card.title.match(filterRegexp),
            )
          : column.cards,
      })),
    };

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
        [
          "cards",
          "getCardFromBoardAndNumber",
          String(record.id),
          String(card.number),
        ],
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

    setBoard(board);
  }, [cardFilter,record]);

  useBoardLiveUpdates(board);

  return boardState;
};
