import { EditDialog } from "@react-admin/ra-form-layout";
import { RichTextInput } from "ra-input-rich-text";
import {
  RecordRepresentation,
  ReferenceField,
  required,
  TextField,
  TextInput,
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

export const CardEdit = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();

  return (
    <EditDialog
      resource="cards"
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      maxWidth="md"
      title={<RecordRepresentation />}
    >
      <LockOnMount />
      <RecordLiveUpdate />
      <CreateRevisionOnSave skipUserDetails>
        <FormWithLockSupport>
          <TextInput source="title" validate={required()} />
          <EstimateInput source="estimate" validate={required()} />
          <RichTextInput source="description" />
        </FormWithLockSupport>
      </CreateRevisionOnSave>
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
