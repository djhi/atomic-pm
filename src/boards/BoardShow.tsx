import {
  CreateButton,
  RecordContextProvider,
  Show,
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
import { BoardMembersEdit } from "./BoardMembersEdit";
import { ColumnList } from "./ColumnList";
import { ColumnCreate } from "./ColumnCreate";
import { ColumnEdit } from "./ColumnEdit";
import { CardCreate } from "./CardCreate";
import { CardEdit } from "./CardEdit";
import { DocumentsButton } from "./DocumentsButton";
import { FavoriteDocuments } from "./FavoriteDocuments";
import { Stack } from "@mui/material";
import { DocumentCreate } from "./DocumentCreate";
import { DocumentEdit } from "./DocumentEdit";
import { DocumentList } from "./DocumentList";
import { useBoardDragAndDrop } from "./useBoardDragAndDrop";

export const BoardShow = () => {
  const params = useParams<"boardId">();

  return (
    <>
      <Show
        id={params.boardId}
        resource="boards"
        component="div"
        actions={<BoardShowActions />}
        sx={{ [`& .${ShowClasses.card}`]: { mt: 1, bgcolor: "transparent" } }}
        queryOptions={{
          meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
        }}
        title={<BoardTitle />}
      >
        <BoardShowLayout />
      </Show>
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
        <Route
          path="cards/*"
          element={
            <>
              <CardCreate />
              <CardEdit />
            </>
          }
        />
      </Routes>
      <DocumentList />
      <DocumentCreate />
      <DocumentEdit />
    </>
  );
};

const BoardShowLayout = () => {
  const [board, { moveCard, moveColumn }] = useBoardDragAndDrop();

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
        cardId,
        sourceColumnId,
        destinationColumnId,
        position: destination.index,
      });
    }
    if (type === "column") {
      await moveColumn({
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
            <div ref={droppableProvided.innerRef}>
              <ColumnList
                {...droppableProvided.droppableProps}
                className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
                sx={{ "&.isDraggingOver": { bgcolor: "action.hover" } }}
              />
              {droppableProvided.placeholder}
            </div>
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
      <span>{record?.name}</span>
      <title>{`${record?.name} - ${appTitle}`}</title>
    </>
  );
};

const BoardShowActions = () => {
  const board = useRecordContext();

  return (
    <TopToolbar sx={{ justifyContent: "space-between" }}>
      <FavoriteDocuments />
      <Stack direction="row" spacing={1} ml="auto">
        <DocumentsButton />
        <BoardMembersEdit />
        <CreateButton
          resource="columns"
          label="New column"
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
