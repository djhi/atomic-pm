import { Stack } from "@mui/material";
import { CreateDialog } from "@react-admin/ra-form-layout";
import { NumberInput, required, SimpleForm, TextInput } from "react-admin";
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
    >
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <Stack direction="row" spacing={1}>
          <NumberInput source="maxCards" />
          <NumberInput source="maxEstimates" />
        </Stack>
      </SimpleForm>
    </CreateDialog>
  );
};
