import { Card, CardActions, CardContent, Grid2 } from "@mui/material";
import {
  DeleteButton,
  EditButton,
  Empty,
  FunctionField,
  List,
  RecordContextProvider,
  ReferenceField,
  TextField,
  TopToolbar,
  useDefaultTitle,
  useListContext,
} from "react-admin";
import { BoardEdit } from "./BoardEdit";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { BoardCreate } from "./BoardCreate";

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
  return (
    <>
      <span>Boards</span>
      <title>{`Boards - ${appTitle}`}</title>
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
  return (
    <Card>
      <CardContent>
        <TextField source="name" gutterBottom variant="h5" component="h2" />
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
      <CardActions>
        <EditButton label="ra.action.show" />
        <BoardEdit />
        <DeleteButton />
      </CardActions>
    </Card>
  );
};
