import { CreateInDialogButton } from "@react-admin/ra-form-layout";
import { required, SimpleForm, TextInput, useGetIdentity } from "react-admin";
import { useNavigate } from "react-router";

export const BoardCreate = () => {
  const { identity } = useGetIdentity();
  const navigate = useNavigate();

  return (
    <CreateInDialogButton
      label="New board"
      resource="boards"
      maxWidth="md"
      fullWidth
      record={{ user_id: identity?.id, created_at: new Date().toISOString() }}
      mutationOptions={{ onSuccess: (data) => navigate(`/boards/${data.id}`) }}
    >
      <SimpleForm>
        <TextInput source="name" validate={required()} fullWidth />
        <TextInput source="description" multiline minRows={4} fullWidth />
      </SimpleForm>
    </CreateInDialogButton>
  );
};
