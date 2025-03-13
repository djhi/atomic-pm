import { Card, CardContent, Grid2, Stack } from "@mui/material";
import {
  DeleteButton,
  Empty,
  FunctionField,
  Link,
  List,
  RecordContextProvider,
  RecordRepresentation,
  ReferenceField,
  required,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  ToolbarClasses,
  TopToolbar,
  useDefaultTitle,
  useListContext,
  useRecordContext,
} from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { BoardCreate } from "./BoardCreate";
import { MenuButton } from "../ra/MenuButton/MenuButton";

export const BoardList = () => (
  <>
    <List
      resource="boards"
      component="div"
      actions={<BoardListActions />}
      empty={<Empty hasCreate />}
      title={<BoardListTitle />}
    >
      <BoardListView />
      <ListLiveUpdate />
    </List>
  </>
);

const BoardListTitle = () => {
  const appTitle = useDefaultTitle();
  const { defaultTitle } = useListContext();
  return (
    <>
      <span>{defaultTitle}</span>
      <title>{`${defaultTitle} - ${appTitle}`}</title>
    </>
  );
};

const BoardListActions = () => (
  <TopToolbar>
    <BoardCreate />
  </TopToolbar>
);

const BoardListView = () => {
  const { data, error, isPending } = useListContext();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid2 container spacing={2}>
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
            <BoardListItem />
          </Grid2>
        </RecordContextProvider>
      ))}
    </Grid2>
  );
};

const BoardListItem = () => {
  const board = useRecordContext();
  if (!board) return null;
  return (
    <Link to={`/boards/${board.id}`} sx={{ textDecoration: "none" }}>
      <Card
        sx={{ "&:hover": { bgcolor: (theme) => theme.palette.action.hover } }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField source="name" gutterBottom variant="h5" component="h2" />
            <BoardMenu />
          </Stack>
          <TextField
            source="description"
            component="div"
            variant="body2"
            sx={{ color: "text.secondary" }}
          />
          <ReferenceField source="user_id" reference="profiles">
            <FunctionField render={(user) => `Created by ${user.email}`} />
          </ReferenceField>
        </CardContent>
      </Card>
    </Link>
  );
};

const BoardMenu = () => {
  const board = useRecordContext();
  if (!board) return null;

  return (
    <MenuButton ButtonProps={{ label: "pm.actionList" }}>
      <MenuButton.RecordLinkItem label="ra.action.show" link="show" />
      <MenuButton.EditInDialog title={<RecordRepresentation />}>
        <SimpleForm
          toolbar={
            <Toolbar>
              <div className={ToolbarClasses.defaultToolbar}>
                <SaveButton alwaysEnable />
                <DeleteButton color="inherit" />
              </div>
            </Toolbar>
          }
        >
          <TextInput source="name" validate={required()} />
          <TextInput source="description" multiline minRows={4} />
        </SimpleForm>
      </MenuButton.EditInDialog>
      <MenuButton.DeleteItem mutationMode="pessimistic" />
    </MenuButton>
  );
};
