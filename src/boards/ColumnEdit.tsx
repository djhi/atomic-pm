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
import { useQueryClient } from "@tanstack/react-query";
import { LockOnMount } from "./LockOnMount";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { FormWithLockSupport } from "./FormWithLockSupport";

export const ColumnEdit = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const params = useParams<"boardId">();
  const queryClient = useQueryClient();

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
          queryClient.setQueryData<any>(
            [
              "boards",
              "getOne",
              {
                id: String(data.board_id),
                meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
              },
            ],
            (record: any) => {
              return {
                ...record,
                columns: record.columns.map((column: any) =>
                  column.id === data.id ? { ...column, ...data } : column,
                ),
              };
            },
          );
        },
      }}
    >
      <LockOnMount />
      <RecordLiveUpdate />
      <FormWithLockSupport>
        <TextInput source="name" validate={required()} />
        <Stack direction="row" spacing={1}>
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
