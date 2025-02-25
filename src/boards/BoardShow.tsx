import { CreateInDialogButton } from "@react-admin/ra-form-layout";
import {
  ReferenceManyField,
  required,
  Show,
  ShowClasses,
  SimpleForm,
  TextInput,
  TopToolbar,
  useDefaultTitle,
  useEvent,
  useGetManyReference,
  useRecordContext,
} from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { BoardMembersEdit } from "./BoardMembersEdit";
import { useMoveCard } from "./useMoveCard";
import { useMoveColumn } from "./useMoveColumn";
import { ColumnList } from "./ColumnList";

export const BoardShow = () => {
  const moveCard = useMoveCard();
  const moveColumn = useMoveColumn();
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
      await moveCard({
        cardId: parseInt(draggableId.replace("card-", "")),
        columnId: parseInt(destination.droppableId),
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
    <Show
      component="div"
      actions={<BoardShowActions />}
      sx={{ [`& .${ShowClasses.card}`]: { mt: 4 } }}
      queryOptions={{ meta: { columns: ["*, columns(*, cards(*))"] } }}
      title={<BoardTitle />}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <ReferenceManyField
          reference="columns"
          target="board_id"
          perPage={10000}
          sort={{ field: "position", order: "ASC" }}
        >
          <Droppable droppableId="board" type="column" direction="horizontal">
            {(droppableProvided, snapshot) => (
              <div ref={droppableProvided.innerRef}>
                <ColumnList
                  {...droppableProvided.droppableProps}
                  className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
                  sx={{
                    overflowX: "auto",
                    flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
                    pb: 2,
                    "&.isDraggingOver": { bgcolor: "action.hover" },
                  }}
                />
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <ListLiveUpdate />
        </ReferenceManyField>
      </DragDropContext>
    </Show>
  );
};

const BoardTitle = () => {
  const record = useRecordContext();
  const appTitle = useDefaultTitle();
  return (
    <>
      <span>{record?.name}</span>
      <title>
        {record?.name} - {appTitle}
      </title>
    </>
  );
};
const BoardShowActions = () => {
  const board = useRecordContext();
  const { total } = useGetManyReference("columns", {
    target: "board_id",
    id: board?.id,
    pagination: { page: 1, perPage: 10000 },
    sort: { field: "position", order: "ASC" },
  });

  return (
    <TopToolbar>
      <BoardMembersEdit />
      <CreateInDialogButton
        resource="columns"
        label="New column"
        maxWidth="md"
        fullWidth
        record={{
          board_id: board?.id,
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
