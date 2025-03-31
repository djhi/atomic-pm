import { Grid2 } from "@mui/material";
import {
  InfiniteList,
  RecordContextProvider,
  TopToolbar,
  useListContext,
} from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { BoardCreate } from "./BoardCreate";
import { BoardListItem } from "./BoardListItem";
import { useLastVisitDates } from "./useLastVisitDates";
import { BoardEmpty } from "./BoardEmpty";
import { BoardListTitle } from "./BoardListTitle";

export const BoardList = () => (
  <>
    <InfiniteList
      resource="boards"
      component="div"
      actions={
        <TopToolbar>
          <BoardCreate />
        </TopToolbar>
      }
      empty={<BoardEmpty />}
      title={<BoardListTitle />}
    >
      <BoardListView />
      <ListLiveUpdate />
    </InfiniteList>
  </>
);

const BoardListView = () => {
  const { data, error, isPending } = useListContext();
  const [visitDates] = useLastVisitDates();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort boards by last visit date most recent first
  // Sort the others by creation date
  const sortedData = data.sort((a, b) => {
    if (visitDates[b.id] && visitDates[a.id]) {
      return (
        new Date(visitDates[b.id]).getTime() -
        new Date(visitDates[a.id]).getTime()
      );
    }
    if (visitDates[b.id]) {
      return 1;
    }
    if (visitDates[a.id]) {
      return -1;
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <Grid2 container spacing={2}>
      {sortedData.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
            <BoardListItem />
          </Grid2>
        </RecordContextProvider>
      ))}
    </Grid2>
  );
};
