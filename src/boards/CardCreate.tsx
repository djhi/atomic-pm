import { RichTextInput } from "ra-input-rich-text";
import {
  AutocompleteInput,
  Create,
  CreateClasses,
  Labeled,
  ReferenceInput,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
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
      component={Box}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        [`& .${CreateClasses.main}`]: {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        },
        [`& .${CreateClasses.card}`]: {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
        },
        "& form": {
          p: 0,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
        },
      }}
      redirect={`/boards/${params.boardId}`}
      title={<CardTitle />}
    >
      <Stack direction="column" gap={4} flexGrow={1}>
        <CardBoardTitle />
        <SimpleForm
          component={Box}
          toolbar={
            <Toolbar disableGutters sx={{ bgcolor: "transparent" }}>
              <SaveButton alwaysEnable />
            </Toolbar>
          }
        >
          <TextInput source="title" validate={required()} />
          <Stack
            direction="row"
            gap={2}
            sx={{ mt: 2 }}
            justifyContent="space-between"
            width="100%"
          >
            <Labeled source="column_id" component="label" sx={{ flexGrow: 1 }}>
              <ReferenceInput source="column_id" reference="columns">
                <AutocompleteInput
                  optionText="name"
                  TextFieldProps={{
                    label: null,
                  }}
                />
              </ReferenceInput>
            </Labeled>
            <Labeled
              source="assigned_user_id"
              component="label"
              sx={{ flexGrow: 1 }}
            >
              <ReferenceInput source="assigned_user_id" reference="profiles">
                <AutocompleteInput
                  optionText="email"
                  TextFieldProps={{
                    label: null,
                  }}
                />
              </ReferenceInput>
            </Labeled>
            <Labeled source="estimate" component="label" sx={{ flexGrow: 1 }}>
              <EstimateInput source="estimate" hideLabel />
            </Labeled>
          </Stack>
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
