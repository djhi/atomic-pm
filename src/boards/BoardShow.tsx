import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid2,
  Stack,
  type StackProps,
} from "@mui/material";
import {
  CreateInDialogButton,
  EditInDialogButton,
} from "@react-admin/ra-form-layout";
import { RichTextInput } from "ra-input-rich-text";
import {
  DeleteButton,
  Empty,
  FunctionField,
  RecordContextProvider,
  ReferenceField,
  ReferenceManyField,
  required,
  SaveButton,
  Show,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  TopToolbar,
  useGetIdentity,
  useGetManyReference,
  useListContext,
  useRecordContext,
} from "react-admin";

export const BoardShow = () => (
  <Show component="div" actions={<BoardShowActions />}>
    <ReferenceManyField
      reference="columns"
      target="board_id"
      perPage={10000}
      sort={{ field: "position", order: "ASC" }}
    >
      <ColumnListView />
    </ReferenceManyField>
  </Show>
);

const BoardShowActions = () => {
  const board = useRecordContext();
  const { total } = useGetManyReference("columns", {
    target: "board_id",
    id: board?.id,
    pagination: { page: 1, perPage: 10000 },
  });
  const { identity } = useGetIdentity();

  return (
    <TopToolbar>
      <CreateInDialogButton
        resource="columns"
        label="New column"
        maxWidth="md"
        fullWidth
        record={{
          board_id: board?.id,
          created_by: identity?.id,
          created_at: new Date().toISOString(),
          position: total,
        }}
      >
        <SimpleForm>
          <TextInput source="name" validate={required()} />
        </SimpleForm>
      </CreateInDialogButton>
    </TopToolbar>
  );
};

const ColumnListView = () => {
  const { data, error, isPending } = useListContext();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data.length === 0) return <Empty />;

  return (
    <Grid2 container spacing={4}>
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Grid2 size={3}>
            <Stack direction="row" justifyContent="space-between">
              <ColumnListItem sx={{ flexGrow: 1 }} />
              <Divider orientation="vertical" sx={{ px: 2 }} flexItem />
            </Stack>
          </Grid2>
        </RecordContextProvider>
      ))}
    </Grid2>
  );
};

const ColumnListItem = (props: StackProps) => {
  return (
    <Stack {...props}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField source="name" gutterBottom variant="h5" component="h2" />
        <EditInDialogButton resource="columns" maxWidth="md" fullWidth>
          <SimpleForm toolbar={<Toolbar>
            <SaveButton />
            <DeleteButton redirect={false} />
          </Toolbar>}>
            <TextInput source="name" validate={required()} />
          </SimpleForm>
        </EditInDialogButton>
      </Stack>
      <ReferenceManyField
        reference="cards"
        target="column_id"
        sort={{ field: "position", order: "ASC" }}
        perPage={10000}
      >
        <CardListView />
      </ReferenceManyField>
    </Stack>
  );
};

const CardListView = () => {
  const column = useRecordContext();
  const { identity } = useGetIdentity();
  const { data, error, isPending } = useListContext();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid2 container spacing={2}>
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Grid2 size={12}>
            <CardListItem />
          </Grid2>
        </RecordContextProvider>
      ))}
      <CreateInDialogButton
        resource="cards"
        label="New card"
        record={{
          column_id: column?.id,
          position: data.length,
          created_by: identity?.id,
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
    </Grid2>
  );
};

const CardListItem = () => {
  return (
    <Card>
      <CardContent>
        <TextField source="title" gutterBottom variant="h5" component="h2" />
        <ReferenceField source="created_by" reference="users">
          <FunctionField render={(user) => `Created by ${user.fullName}`} />
        </ReferenceField>
      </CardContent>
      <CardActions>
        <EditInDialogButton resource="cards" maxWidth="md" fullWidth>
          <SimpleForm>
            <TextInput source="title" validate={required()} />
            <RichTextInput source="description" />
          </SimpleForm>
        </EditInDialogButton>
        <DeleteButton color="inherit" redirect={false} />
      </CardActions>
    </Card>
  );
};
