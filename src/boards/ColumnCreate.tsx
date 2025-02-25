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
        <NumberInput source="maxEstimates" />
      </SimpleForm>
    </CreateDialog>
  );
};
