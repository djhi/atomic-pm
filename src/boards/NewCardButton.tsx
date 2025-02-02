import { CreateInDialogButton } from "@react-admin/ra-form-layout";
import { RichTextInput } from "ra-input-rich-text";
import {
  required,
  SimpleForm,
  TextInput,
  useGetManyReference,
  useRecordContext,
} from "react-admin";

export const NewCardButton = () => {
  const column = useRecordContext();
  const { total } = useGetManyReference("cards", {
    target: "column_id",
    id: column?.id,
    pagination: { page: 1, perPage: 1 },
    sort: { field: "position", order: "ASC" },
    filter: {},
    meta: undefined,
  }, {
    enabled: !!column?.id,
  });
  return (
    <CreateInDialogButton
      resource="cards"
      label="New card"
      record={{
        column_id: column?.id,
        position: total,
        created_at: new Date().toISOString(),
      }}
      maxWidth="md"
      fullWidth
    >
      <SimpleForm>
        <TextInput source="title" validate={required()} />
        <RichTextInput source="description" />
      </SimpleForm>
    </CreateInDialogButton>
  );
};
