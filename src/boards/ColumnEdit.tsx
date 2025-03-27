import { EditDialog } from "@react-admin/ra-form-layout";
import {
  NumberInput,
  required,
  TextInput,
  useDefaultTitle,
  useGetOne,
  useNotify,
  useRecordContext,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";
import { LockOnMount } from "../ra/LockOnMount";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { FormWithLockSupport } from "../ra/FormWithLockSupport";
import { useUpdateBoard } from "../useUpdateBoard";

export const ColumnEdit = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const params = useParams<"boardId">();
  const { updateColumn } = useUpdateBoard();

  return (
    <EditDialog
      resource="columns"
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      maxWidth="md"
      title={<ColumnTitle />}
      mutationOptions={{
        onSuccess: (data: any) => {
          notify("ra.notification.updated", {
            type: "info",
            messageArgs: { smart_count: 1 },
            undoable: true,
          });
          updateColumn({
            board_id: data.board_id,
            record: data,
            update: (record) => ({
              ...record,
              ...data,
            }),
          });
        },
      }}
    >
      <LockOnMount />
      <RecordLiveUpdate />
      <FormWithLockSupport>
        <TextInput source="name" validate={required()} />
        <Stack direction="row" gap={1} width="100%">
          <NumberInput source="maxCards" />
          <NumberInput source="maxEstimates" />
        </Stack>
      </FormWithLockSupport>
    </EditDialog>
  );
};

const ColumnTitle = () => {
  const record = useRecordContext();
  const params = useParams<"boardId">();
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  if (!record) return null;
  return (
    <>
      <span>{record?.name}</span>
      <title>{`${record?.name} - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};
