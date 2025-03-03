import { useEffect, useState } from "react";
import { RaRecord, useRecordContext } from "react-admin";
import cloneDeep from "lodash/cloneDeep";
import { useBoardDragAndDrop } from "./useBoardDragAndDrop";
import { useBoardLiveUpdates } from "./useBoardLiveUpdates";

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

  const [board, setBoard] = useState(cloneDeep(record));
  useEffect(() => {
    setBoard(cloneDeep(record));
  }, [record]);

  useBoardLiveUpdates(board);
  const functions = useBoardDragAndDrop({ board, setBoard });

  return [board, functions];
};
