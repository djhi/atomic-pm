import { EditInDialogButton } from "@react-admin/ra-form-layout";
import { required, SimpleForm, TextInput } from "react-admin";

export const BoardEdit = () => (
  <EditInDialogButton resource="boards" maxWidth="md" fullWidth>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="description" multiline minRows={4} />
    </SimpleForm>
  </EditInDialogButton>
);
