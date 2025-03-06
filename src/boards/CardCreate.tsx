import { RichTextInput } from "ra-input-rich-text";
import {
  AutocompleteInput,
  Create,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
  useDefaultTitle,
  useGetOne,
  useRecordFromLocation,
} from "react-admin";
import { useParams } from "react-router";
import { EstimateInput } from "./EstimateInput";
import { grey } from "@mui/material/colors";
import { Box, Stack } from "@mui/material";
import { CardBoardTitle } from "./CardBoardTitle";

export const CardCreate = () => {
  const params = useParams<"boardId">();

  return (
    <Create
      resource="cards"
      component="div"
      redirect={`/boards/${params.boardId}`}
      title={<CardTitle />}
    >
      <Stack direction="column" gap={4}>
        <CardBoardTitle />
        <SimpleForm component={Box}>
          <ReferenceInput
            source="column_id"
            reference="columns"
            perPage={1000}
          />
          <ReferenceInput source="assigned_user_id" reference="profiles">
            <AutocompleteInput optionText="email" />
          </ReferenceInput>
          <TextInput source="title" validate={required()} />
          <EstimateInput source="estimate" />
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
      </Stack>
    </Create>
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
