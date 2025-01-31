import { CreateDialog } from "@react-admin/ra-form-layout";
import { required, SimpleForm, TextInput, useGetIdentity } from "react-admin";

export const BoardCreate = () => {
  const { identity } = useGetIdentity();

  return (
    <CreateDialog
      resource="boards"
      maxWidth="md"
      fullWidth
      record={{ user_id: identity?.id, created_at: new Date().toISOString() }}
    >
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <TextInput source="description" multiline minRows={4} />
      </SimpleForm>
    </CreateDialog>
  );
};
