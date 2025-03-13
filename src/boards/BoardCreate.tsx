import { CreateInDialogButton } from "@react-admin/ra-form-layout";
import {
  DeleteButton,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  ToolbarClasses,
  useGetIdentity,
} from "react-admin";
import { useNavigate } from "react-router";

export const BoardCreate = () => {
  const { identity } = useGetIdentity();
  const navigate = useNavigate();

  return (
    <CreateInDialogButton
      label="pm.newBoard"
      resource="boards"
      maxWidth="md"
      fullWidth
      record={{ user_id: identity?.id, created_at: new Date().toISOString() }}
      mutationOptions={{ onSuccess: (data) => navigate(`/boards/${data.id}`) }}
    >
      <SimpleForm
        toolbar={
          <Toolbar>
            <div className={ToolbarClasses.defaultToolbar}>
              <SaveButton alwaysEnable />
              <DeleteButton color="inherit" />
            </div>
          </Toolbar>
        }
      >
        <TextInput source="name" validate={required()} />
        <TextInput source="description" multiline minRows={4} />
      </SimpleForm>
    </CreateInDialogButton>
  );
};
