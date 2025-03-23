import { CreateInDialogButton } from "@react-admin/ra-form-layout";
import {
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
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
          <Toolbar
            sx={{
              "&.RaToolbar-desktopToolbar": { px: 2 },
              bgcolor: "transparent",
              justifyContent: "end",
            }}
          >
            <SaveButton variant="outlined" color="inherit" alwaysEnable />
          </Toolbar>
        }
      >
        <TextInput
          source="name"
          validate={required()}
          autoFocus
        />
        <TextInput source="description" multiline minRows={4} />
      </SimpleForm>
    </CreateInDialogButton>
  );
};
