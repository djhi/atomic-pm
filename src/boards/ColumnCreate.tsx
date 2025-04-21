import { Stack } from "@mui/material";
import { CreateDialog } from "@react-admin/ra-form-layout";
import {
  NumberInput,
  required,
  SimpleForm,
  TextInput,
  useDefaultTitle,
  useGetOne,
  useTranslate,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import { FormToolbar } from "../ra/FormToolbar";

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
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="name" validate={required()} autoFocus />
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
  const translate = useTranslate();
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  const title = translate("pm.newColumn");
  return (
    <>
      <span>{title} - {board?.name}</span>
      <title>{`${title} - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};
