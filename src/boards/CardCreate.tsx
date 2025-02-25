import { CreateDialog } from "@react-admin/ra-form-layout";
import { RichTextInput } from "ra-input-rich-text";
import { required, SimpleForm, TextInput } from "react-admin";
import { useNavigate, useParams } from "react-router";

export const CardCreate = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();

  return (
    <CreateDialog
      resource="cards"
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      maxWidth="md"
    >
      <SimpleForm>
        <TextInput source="title" validate={required()} />
        <RichTextInput source="description" />
      </SimpleForm>
    </CreateDialog>
  );
};
