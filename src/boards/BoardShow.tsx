import {
  CreateButton,
  Form,
  RecordContextProvider,
  SearchInput,
  ShowBase,
  ShowClasses,
  TopToolbar,
  useDefaultTitle,
  useEvent,
  useRecordContext,
} from "react-admin";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { Route, Routes, useParams } from "react-router";
import { Box, BoxProps, Stack, Typography } from "@mui/material";
import { BoardMembersEdit } from "./BoardMembersEdit";
import { ColumnList } from "./ColumnList";
import { ColumnCreate } from "./ColumnCreate";
import { ColumnEdit } from "./ColumnEdit";
import { DocumentsButton } from "./DocumentsButton";
import { DocumentList } from "./DocumentList";
import { useBoard } from "../useBoard";
import { CardEdit } from "../cards/CardEdit";
import { DocumentCreate } from "../documents/DocumentCreate";
import { DocumentEdit } from "../documents/DocumentEdit";
import { useUpdateBoard } from "../useUpdateBoard";
import { BoardContext, useBoardContext } from "../BoardContext";
import { useCardFilter } from "../useCardFilter";

export const BoardShow = () => {
  const params = useParams<"boardId">();

  return (
    <ShowBase
      id={params.boardId}
      resource="boards"
      queryOptions={{
        meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
      }}
    >
      <BoardShowLayout />
    </ShowBase>
  );
};

const BoardShowLayout = () => {
  const boardState = useBoard();
  return (
    <BoardLayoutRoot>
      <BoardContext.Provider value={boardState}>
        <BoardShowActions />
        <BoardShowDragAndDropLayout />
        <Routes>
          <Route
            path="columns/*"
            element={
              <>
                <ColumnCreate />
                <ColumnEdit />
              </>
            }
          />
        </Routes>
        <Routes>
          <Route path="cards/*" element={<CardEdit />} />
        </Routes>
        <Routes>
          <Route
            path="documents/*"
            element={
              <>
                <DocumentCreate />
                <DocumentEdit />
              </>
            }
          />
        </Routes>
        <DocumentList />
      </BoardContext.Provider>
    </BoardLayoutRoot>
  );
};

const BoardShowDragAndDropLayout = () => {
  const [board] = useBoardContext();
  const { moveCard, moveColumn } = useUpdateBoard();

  const onDragEnd: OnDragEndResponder = useEvent(async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "card") {
      // draggableId for cards is `card-${columnId}-${cardId}`. Extract both values:
      const [, columnIdString, cardIdString] = draggableId.split("-");

      const cardId = parseInt(cardIdString);
      const sourceColumnId = parseInt(columnIdString);
      const destinationColumnId = parseInt(destination.droppableId);
      await moveCard({
        board_id: board!.id,
        cardId,
        sourceColumnId,
        destinationColumnId,
        position: destination.index,
      });
    }
    if (type === "column") {
      await moveColumn({
        board_id: board!.id,
        columnId: parseInt(draggableId.replace("column-", "")),
        position: destination.index,
      });
    }
  });

  return (
    <RecordContextProvider value={board}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="column" direction="horizontal">
          {(droppableProvided, snapshot) => (
            <Stack ref={droppableProvided.innerRef} flexGrow={1}>
              <ColumnList
                {...droppableProvided.droppableProps}
                className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
                sx={{ "&.isDraggingOver": { bgcolor: "action.hover" } }}
              />
              {droppableProvided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </RecordContextProvider>
  );
};

const BoardTitle = () => {
  const record = useRecordContext();
  const appTitle = useDefaultTitle();
  if (!record) return null;
  return (
    <>
      <Typography variant="h6" component="h2">
        {record?.name}
      </Typography>
      <title>{`${record?.name} - ${appTitle}`}</title>
    </>
  );
};

const BoardShowActions = () => {
  const board = useRecordContext();
  const [cardFilter, setCardFilter] = useCardFilter();

  return (
    <TopToolbar sx={{ justifyContent: "space-between", mb: 0, pt: 3, px: 0 }}>
      <BoardTitle />
      <Stack direction="row" spacing={1} ml="auto">
        <Box component={Form}>
          <SearchInput
            source="q"
            helperText={false}
            sx={{ mb: 0 }}
            onChange={(eventOrValue) =>
              setCardFilter(
                typeof eventOrValue === "string"
                  ? eventOrValue
                  : eventOrValue.target.value,
              )
            }
            defaultValue={cardFilter}
          />
        </Box>
        <DocumentsButton />
        <BoardMembersEdit />
        <CreateButton
          resource="columns"
          label="pm.newColumn"
          to={{
            pathname: `/boards/${board?.id}/columns/create`,
            search: `?source=${JSON.stringify({
              board_id: board?.id,
              created_at: new Date().toISOString(),
              position: board?.columns.length,
            })}`,
          }}
        />
      </Stack>
    </TopToolbar>
  );
};

const BoardLayoutRoot = (props: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      [`& .${ShowClasses.main}`]: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      },
      [`& .${ShowClasses.card}`]: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        mt: 1,
        bgcolor: "transparent",
      },
    }}
    {...props}
  />
);
