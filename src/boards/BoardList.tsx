import { Card, CardActions, CardContent, Grid2 } from "@mui/material";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  Empty,
  FunctionField,
  List,
  RecordContextProvider,
  ReferenceField,
  ShowButton,
  TextField,
  TopToolbar,
  useListContext,
} from "react-admin";
import { BoardCreate } from "./BoardCreate";
import { BoardEdit } from "./BoardEdit";

export const BoardList = () => (
  <>
    <List component="div" actions={<BoardListActions />} empty={<Empty hasCreate />}>
      <BoardListView />
    </List>
    <BoardCreate />
    <BoardEdit />
  </>
);

const BoardListActions = () => (
  <TopToolbar>
    <CreateButton label="New board" />
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
        <ReferenceField source="user_id" reference="users">
          <FunctionField render={(user) => `Created by ${user.fullName}`} />
        </ReferenceField>
      </CardContent>
      <CardActions>
        <ShowButton />
        <EditButton color="inherit" />
        <DeleteButton color="inherit" />
      </CardActions>
    </Card>
  );
};
