import { EditDialog } from "@react-admin/ra-form-layout";
import { NumberInput, required, TextInput } from "react-admin";
import { useNavigate, useParams } from "react-router";
import { LockOnMount } from "./LockOnMount";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { FormWithLockSupport } from "./FormWithLockSupport";

export const ColumnEdit = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();

  return (
    <EditDialog
      resource="columns"
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      maxWidth="md"
    >
      <LockOnMount />
      <RecordLiveUpdate />
      <FormWithLockSupport>
        <TextInput source="name" validate={required()} />
        <NumberInput source="maxEstimates" />
      </FormWithLockSupport>
    </EditDialog>
  );
};
