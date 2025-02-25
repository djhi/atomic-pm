import { EditDialog } from "@react-admin/ra-form-layout";
import { RichTextInput } from "ra-input-rich-text";
import { required, TextInput } from "react-admin";
import { useNavigate, useParams } from "react-router";
import { LockOnMount } from "./LockOnMount";
import { FormWithLockSupport } from "./FormWithLockSupport";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { EstimateInput } from "./EstimateInput";

export const CardEdit = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();

  return (
    <EditDialog
      resource="cards"
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      maxWidth="md"
    >
      <LockOnMount />
      <RecordLiveUpdate />
      <FormWithLockSupport>
        <TextInput source="title" validate={required()} />
        <EstimateInput source="estimate" validate={required()} />
        <RichTextInput source="description" />
      </FormWithLockSupport>
    </EditDialog>
  );
};
