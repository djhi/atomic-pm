import { Stack } from "@mui/material";
import { CreateDialog } from "@react-admin/ra-form-layout";
import {
  NumberInput,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useDefaultTitle,
  useGetOne,
} from "react-admin";
import { useNavigate, useParams } from "react-router";

export const ColumnCreate = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();

  return (
    <CreateDialog
      resource="columns"
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      maxWidth="md"
      title={<ColumnTitle />}
    >
      <SimpleForm
        toolbar={
          <Toolbar disableGutters sx={{ px: 2, bgcolor: "transparent" }}>
            <SaveButton alwaysEnable />
          </Toolbar>
        }
      >
        <TextInput source="name" validate={required()} />
        <Stack direction="row" gap={1} width="100%">
          <NumberInput source="maxCards" />
          <NumberInput source="maxEstimates" />
        </Stack>
      </SimpleForm>
    </CreateDialog>
  );
};

const ColumnTitle = () => {
  const params = useParams<"boardId">();
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  return (
    <>
      <span>New column - {board?.name}</span>
      <title>{`New column - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};
