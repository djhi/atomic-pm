import { EditDialog } from "@react-admin/ra-form-layout";
import { RichTextInput } from "ra-input-rich-text";
import {
  ReferenceField,
  required,
  TextField,
  TextInput,
  useDefaultTitle,
  useGetOne,
  useRecordContext,
  WithRecord,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import {
  CreateRevisionOnSave,
  RevisionListWithDetailsInDialog,
} from "@react-admin/ra-history";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useQueryClient } from "@tanstack/react-query";
import { LockOnMount } from "./LockOnMount";
import { FormWithLockSupport } from "./FormWithLockSupport";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { EstimateInput } from "./EstimateInput";
import { CommentList } from "./CommentList";

export const CardEdit = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();
  const queryClient = useQueryClient();

  return (
    <EditDialog
      resource="cards"
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      maxWidth="md"
      title={<CardTitle />}
      mutationOptions={{
        onSuccess: (data: any) => {
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
      <WithRecord render={(record) => <CommentList cardId={record?.id} />} />
      <Box sx={{ p: 2 }}>
        <RevisionListWithDetailsInDialog
          renderName={(id) => (
            <ReferenceField reference="profiles" source="id" record={{ id }}>
              <TextField source="email" />
            </ReferenceField>
          )}
        />
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
