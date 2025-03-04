import { EditDialog } from "@react-admin/ra-form-layout";
import { RichTextInput } from "ra-input-rich-text";
import {
  DateField,
  ReferenceField,
  ReferenceManyField,
  required,
  SimpleList,
  TextField,
  TextInput,
  useDefaultTitle,
  useGetOne,
  useNotify,
  useRecordContext,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import { CreateRevisionOnSave } from "@react-admin/ra-history";
import { Box, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useQueryClient } from "@tanstack/react-query";
import { LockOnMount } from "./LockOnMount";
import { FormWithLockSupport } from "./FormWithLockSupport";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { EstimateInput } from "./EstimateInput";
import { NewMessage } from "./NewMessage";
import { ListLiveUpdate } from "@react-admin/ra-realtime";

export const CardEdit = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();
  const queryClient = useQueryClient();
  const notify = useNotify();

  return (
    <EditDialog
      resource="cards"
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      maxWidth="md"
      title={<CardTitle />}
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
                id: String(params.boardId),
                meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
              },
            ],
            (record: any) => {
              return {
                ...record,
                columns: record.columns.map((column: any) =>
                  column.id === data.column_id
                    ? {
                        ...column,
                        cards: column.cards.map((card: any) =>
                          card.id === data.id ? { ...card, ...data } : card,
                        ),
                      }
                    : column,
                ),
              };
            },
          );
        },
      }}
    >
      <LockOnMount />
      <RecordLiveUpdate />
      <CreateRevisionOnSave skipUserDetails>
        <FormWithLockSupport>
          <TextInput source="title" validate={required()} />
          <EstimateInput source="estimate" validate={required()} />
          <RichTextInput
            source="description"
            fullWidth
            sx={{
              [`& .RaRichTextInput-editorContent`]: {
                "& .ProseMirror": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? grey[800] : grey[300],
                  minHeight: "20vh",

                  "&:focus": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? grey[800] : grey[300],
                  },
                },
              },
            }}
          />
        </FormWithLockSupport>
      </CreateRevisionOnSave>
      <Box sx={{ p: 2 }}>
        <NewMessage />
        <ReferenceManyField
          reference="card_events"
          target="card_id"
          perPage={1000}
        >
          <SimpleList
            disablePadding
            sx={{ "& li": { px: 0 } }}
            primaryText={(record) => (
              <Stack direction="column" spacing={1} mb={1}>
                <ReferenceField
                  source="user_id"
                  reference="profiles"
                  link={false}
                >
                  <TextField
                    source="email"
                    variant="body1"
                    sx={{ fontWeight: "bold" }}
                  />
                </ReferenceField>
                <TextField
                  source="message"
                  variant="body1"
                  sx={
                    record?.type === "revision"
                      ? {}
                      : {
                          p: 2,
                          bgcolor: (theme) => theme.palette.action.hover,
                          borderRadius: (theme) => theme.shape.borderRadius,
                        }
                  }
                />
              </Stack>
            )}
            secondaryText={(record) => (
              <DateField
                record={record}
                source="date"
                showTime
                options={{ dateStyle: "short", timeStyle: "short" }}
              />
            )}
          />
          <ListLiveUpdate />
        </ReferenceManyField>
      </Box>
    </EditDialog>
  );
};

const CardTitle = () => {
  const record = useRecordContext();
  const params = useParams<"boardId">();
  const { data: column } = useGetOne(
    "columns",
    { id: record?.column_id },
    { enabled: record?.column_id != null },
  );
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  if (!record) return null;
  return (
    <>
      <span>
        {record?.title} - {column?.name}
      </span>
      <title>{`${record?.title} - ${column?.name} - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};
