import { EditInDialogButton } from "@react-admin/ra-form-layout";
import {
  RecordRepresentation,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const BoardEdit = () => (
  <EditInDialogButton
    resource="boards"
    maxWidth="md"
    fullWidth
    title={<RecordRepresentation />}
  >
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="description" multiline minRows={4} fullWidth />
    </SimpleForm>
  </EditInDialogButton>
);
