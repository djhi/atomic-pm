import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Identifier, RaRecord, useDataProvider, useEvent } from "react-admin";
import cloneDeep from "lodash/cloneDeep";
import { useBoardContext } from "./BoardContext";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  const dataProvider = useDataProvider();
  const [, setBoard] = useBoardContext();

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
  const moveColumn = useEvent(
    ({
      board_id,
      columnId,
      position,
    }: {
      board_id: Identifier;
      columnId: Identifier;
      position: number;
    }) => {
      const previousBoard = queryClient.getQueryData<RaRecord>([
        "boards",
        "getOne",
        {
          id: String(board_id),
          meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
        },
      ]);

      if (!previousBoard) return;

      const previousData = previousBoard.columns.find(
        (column: any) => column.id === columnId,
      );

      if (!previousData) return;
      const oldPosition = previousData.position;

      // Early return if position didn't change
      if (oldPosition === position) return;
      const updateBoard = (board: any) => {
        const newBoard = cloneDeep(board);

        // Update positions in a single pass
        newBoard.columns = newBoard.columns.map((column: any) => {
          // The column we're moving
          if (column.id === columnId) {
            return { ...column, position };
          }

          // Moving a column forward (increasing position)
          if (
            oldPosition < position &&
            column.position > oldPosition &&
            column.position <= position
          ) {
            return { ...column, position: column.position - 1 };
          }

          // Moving a column backward (decreasing position)
          if (
            oldPosition > position &&
            column.position >= position &&
            column.position < oldPosition
          ) {
            return { ...column, position: column.position + 1 };
          }

          return column;
        });

        // Sort columns by position
        newBoard.columns.sort((a: any, b: any) => a.position - b.position);

        return newBoard;
      };

      setBoard(updateBoard);
      queryClient.setQueryData(
        [
          "boards",
          "getOne",
          {
            id: String(board_id),
            meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
          },
        ],
        updateBoard,
      );

      // Persist the changes without waiting for the server response
      dataProvider.moveColumn({
        data: {
          column_id: columnId,
          position,
        },
        previousData,
      });
    },
  );
  const moveCard = useEvent(
    ({
      board_id,
      cardId,
      sourceColumnId,
      destinationColumnId,
      position,
    }: {
      board_id: Identifier;
      cardId: Identifier;
      sourceColumnId: Identifier;
      destinationColumnId: Identifier;
      position: number;
    }) => {
      const previousBoard = queryClient.getQueryData<RaRecord>([
        "boards",
        "getOne",
        {
          id: String(board_id),
          meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
        },
      ]);

      if (!previousBoard) return;

      // Get previous data for API call before making state changes
      const sourceColumn = previousBoard.columns.find(
        (column: any) => column.id === sourceColumnId,
      );
      if (sourceColumn == null) return;

      const previousData = sourceColumn.cards.find(
        (card: any) => card.id === cardId,
      );
      if (!previousData) return;

      const updateBoard = (board: any) => {
        if (!board?.columns) return board;
        const newBoard = cloneDeep(board);

        const sourceColumn = newBoard.columns.find(
          (column: any) => column.id === sourceColumnId,
        );
        if (!sourceColumn) return board;

        const destinationColumn = newBoard.columns.find(
          (column: any) => column.id === destinationColumnId,
        );
        if (!destinationColumn) return board;

        const movedCard = sourceColumn.cards.find(
          (card: any) => card.id === cardId,
        );
        if (!movedCard) return board;

        const oldPosition = movedCard.position;

        // Handle same-column move
        if (sourceColumnId === destinationColumnId) {
          // Update positions in a single pass
          sourceColumn.cards = sourceColumn.cards.map((card: any) => {
            // Card we're moving
            if (card.id === cardId) {
              return { ...card, position };
            }

            // Moving card forward (increasing position)
            if (
              oldPosition < position &&
              card.position > oldPosition &&
              card.position <= position
            ) {
              return { ...card, position: card.position - 1 };
            }

            // Moving card backward (decreasing position)
            if (
              oldPosition > position &&
              card.position >= position &&
              card.position < oldPosition
            ) {
              return { ...card, position: card.position + 1 };
            }

            return card;
          });
        }
        // Handle cross-column move
        else {
          // Adjust positions in source column
          sourceColumn.cards = sourceColumn.cards
            .filter((card: any) => card.id !== cardId)
            .map((card: any) => {
              if (card.position > oldPosition) {
                return { ...card, position: card.position - 1 };
              }
              return card;
            });

          // Adjust positions in destination column and add moved card
          destinationColumn.cards = [
            ...destinationColumn.cards.map((card: any) => {
              if (card.position >= position) {
                return { ...card, position: card.position + 1 };
              }
              return card;
            }),
            { ...movedCard, column_id: destinationColumnId, position },
          ];
        }

        // Sort columns by position
        sourceColumn.cards.sort((a: any, b: any) => a.position - b.position);
        destinationColumn.cards.sort(
          (a: any, b: any) => a.position - b.position,
        );

        return newBoard;
      };
      setBoard(updateBoard);
      queryClient.setQueryData(
        [
          "boards",
          "getOne",
          {
            id: String(board_id),
            meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
          },
        ],
        updateBoard,
      );

      // Persist the changes
      dataProvider.moveCard({
        data: {
          card_id: cardId,
          column_id: destinationColumnId,
          position,
        },
        previousData,
      });
    },
  );

  return useMemo(
    () => ({
      moveCard,
      moveColumn,
      updateBoard,
      updateCard,
      updateColumn,
    }),
    [moveCard, moveColumn, updateBoard, updateCard, updateColumn],
  );
};
