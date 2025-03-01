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
import { LockOnMount } from "./LockOnMount";
import { FormWithLockSupport } from "./FormWithLockSupport";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { EstimateInput } from "./EstimateInput";
import { CommentList } from "./CommentList";

export const CardEdit = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();

  return (
    <EditDialog
      resource="cards"
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      maxWidth="md"
      title={<CardTitle />}
    >
      <LockOnMount />
      <RecordLiveUpdate />
      <CreateRevisionOnSave skipUserDetails>
        <FormWithLockSupport>
          <TextInput source="title" validate={required()} fullWidth />
          <EstimateInput source="estimate" validate={required()} />
          <RichTextInput source="description" fullWidth />
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
