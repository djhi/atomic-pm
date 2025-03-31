import { required, SimpleForm, TextInput } from "react-admin";
import { FormToolbar } from "../../ra/FormToolbar";

export const BoardForm = () => (
  <SimpleForm
    toolbar={
      <FormToolbar />
    }
  >
    <TextInput source="name" validate={required()} />
    <TextInput source="description" multiline minRows={4} />
  </SimpleForm>
);