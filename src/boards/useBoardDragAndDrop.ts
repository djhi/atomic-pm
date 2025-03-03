import { Identifier, RaRecord, useDataProvider, useEvent } from "react-admin";
import cloneDeep from "lodash/cloneDeep";
import { useMemo } from "react";

export const useBoardDragAndDrop = ({
  board,
  setBoard,
}: {
  board: RaRecord | undefined;
  setBoard: React.Dispatch<
    React.SetStateAction<RaRecord<Identifier> | undefined>
  >;
}): {
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
} => {
  const dataProvider = useDataProvider();

  const moveColumn = useEvent(
    ({ columnId, position }: { columnId: number; position: number }) => {
      if (board == null) return;

      const previousData = board.columns.find(
        (column: any) => column.id === columnId,
      );

      if (!previousData) return;
      const oldPosition = previousData.position;

      // Early return if position didn't change
      if (oldPosition === position) return;

      setBoard((prevBoard) => {
        if (!prevBoard?.columns) return prevBoard;

        const newBoard = cloneDeep(prevBoard);

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
      });

      // Persist the changes
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
      cardId,
      sourceColumnId,
      destinationColumnId,
      position,
    }: {
      cardId: number;
      sourceColumnId: number;
      destinationColumnId: number;
      position: number;
    }) => {
      if (board == null) return;

      // Get previous data for API call before making state changes
      const sourceColumn = board.columns.find(
        (column: any) => column.id === sourceColumnId,
      );
      if (sourceColumn == null) return;

      const previousData = sourceColumn.cards.find(
        (card: any) => card.id === cardId,
      );
      if (!previousData) return;

      setBoard((prevBoard) => {
        if (!prevBoard?.columns) return prevBoard;
        const newBoard = cloneDeep(prevBoard);

        const sourceColumn = newBoard.columns.find(
          (column: any) => column.id === sourceColumnId,
        );
        if (!sourceColumn) return prevBoard;

        const destinationColumn = newBoard.columns.find(
          (column: any) => column.id === destinationColumnId,
        );
        if (!destinationColumn) return prevBoard;

        const movedCard = sourceColumn.cards.find(
          (card: any) => card.id === cardId,
        );
        if (!movedCard) return prevBoard;

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
      });

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

  return useMemo(() => ({ moveCard, moveColumn }), []);
};
