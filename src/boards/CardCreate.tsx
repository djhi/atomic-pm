import { CreateDialog } from "@react-admin/ra-form-layout";
import { RichTextInput } from "ra-input-rich-text";
import {
  required,
  SimpleForm,
  TextInput,
  useDefaultTitle,
  useGetOne,
  useRecordFromLocation,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import { EstimateInput } from "./EstimateInput";
import { grey } from "@mui/material/colors";

export const CardCreate = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();

  return (
    <CreateDialog
      resource="cards"
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      maxWidth="md"
      title={<CardTitle />}
    >
      <SimpleForm>
        <TextInput source="title" validate={required()} />
        <EstimateInput source="estimate" validate={required()} />
        <RichTextInput
          source="description"
          fullWidth
          sx={{
            [`& .RaRichTextInput-editorContent`]: {
              "& .ProseMirror": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? grey[800] : grey[300],
                minHeight: "20vh",

                "&:focus": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? grey[800] : grey[300],
                },
              },
            },
          }}
        />
      </SimpleForm>
    </CreateDialog>
  );
};

const CardTitle = () => {
  const record = useRecordFromLocation();
  const params = useParams<"boardId">();
  const { data: column } = useGetOne(
    "columns",
    { id: record?.column_id },
    { enabled: record?.column_id != null },
  );
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  return (
    <>
      <span>New card - {column?.name}</span>
      <title>{`New card - ${column?.name} - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};
