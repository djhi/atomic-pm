import { useSubscribeToRecordList } from "@react-admin/ra-realtime";
import { useQueryClient } from "@tanstack/react-query";
import { RaRecord } from "react-admin";

export const useBoardLiveUpdates = (board: RaRecord | undefined) => {
  const queryClient = useQueryClient();
  useSubscribeToRecordList((event) => {
    // @ts-expect-error ra-realtime types cannot be provided
    if (event.payload?.new?.board_id !== board?.id) return;

    queryClient.invalidateQueries({
      queryKey: ["boards", "getOne"],
    });
  }, "columns");
  useSubscribeToRecordList((event) => {
    if (!board) return;
    const columnIds = board.columns.map((column: any) => column.id);
    // @ts-expect-error ra-realtime types cannot be provided
    if (!columnIds.includes(event.payload?.new?.column_id)) return;

    queryClient.invalidateQueries({
      queryKey: ["boards", "getOne"],
    });
  }, "cards");
};
