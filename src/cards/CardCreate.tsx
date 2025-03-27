import {
  AutocompleteArrayInput,
  AutocompleteInput,
  Create,
  CreateClasses,
  Labeled,
  ReferenceArrayInput,
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
import { MarkdownInput } from "@react-admin/ra-markdown";
import { Box, Stack } from "@mui/material";
import { BoardLink } from "../boards/BoardLink";
import { EstimateInput } from "./EstimateInput";

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
    >
      <CardTitle />
      <Stack direction="column" gap={4} flexGrow={1}>
        <BoardLink />
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
              <ReferenceInput
                source="column_id"
                reference="columns"
                filter={{ board_id: params.boardId }}
              >
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
              <ReferenceArrayInput
                source="assigned_user_ids"
                reference="board_members_with_profiles"
                filter={{ board_id: params.boardId }}
              >
                <AutocompleteArrayInput
                  optionText="email"
                  TextFieldProps={{
                    label: null,
                  }}
                />
              </ReferenceArrayInput>
            </Labeled>
            <Labeled source="estimate" component="label" sx={{ flexGrow: 1 }}>
              <EstimateInput source="estimate" hideLabel />
            </Labeled>
          </Stack>
          <MarkdownInput source="description" fullWidth />
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
    <title>{`New card - ${column?.name} - ${board?.name} - ${appTitle}`}</title>
  );
};
