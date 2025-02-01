import {
  lighten,
  Card,
  CardActions,
  CardContent,
  Stack,
  type StackProps,
  darken,
} from "@mui/material";
import {
  CreateInDialogButton,
  EditInDialogButton,
} from "@react-admin/ra-form-layout";
import { RichTextInput } from "ra-input-rich-text";
import {
  DeleteButton,
  Empty,
  RecordContextProvider,
  ReferenceManyField,
  required,
  Show,
  ShowClasses,
  SimpleForm,
  TextField,
  TextInput,
  TopToolbar,
  useEvent,
  useGetManyReference,
  useListContext,
  useRecordContext,
} from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { BoardMembersEdit } from "./BoardMembersEdit";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { LockOnMount } from "./LockOnMount";
import { FormWithLockSupport } from "./FormWithLockSupport";
import { useMoveCard } from "./useMoveCard";
import { useMoveColumn } from "./useMoveColumn";

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
                <ColumnListView
                  {...droppableProvided.droppableProps}
                  className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
                  sx={{
                    overflowX: "auto",
                    flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
                    pb: 2,
                    "&.isDraggingOver": {
                      bgcolor: "action.hover",
                    },
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

const BoardShowActions = () => {
  const board = useRecordContext();
  const { total } = useGetManyReference("columns", {
    target: "board_id",
    id: board?.id,
    pagination: { page: 1, perPage: 10000 },
    sort: { field: "position", order: "ASC" },
  });

  return (
    <TopToolbar sx={{ justifyContent: "unset" }}>
      <TextField
        source="name"
        component="h1"
        variant="h4"
        sx={{ flexGrow: 1 }}
      />
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

const ColumnListView = (props: StackProps) => {
  const { data, error, isPending } = useListContext();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data.length === 0) return <Empty />;

  return (
    <Stack direction="row" minHeight="80vh" gap={2} {...props}>
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <ColumnListItem
            sx={{
              width: { xs: "100%", sm: "100%", md: "400px" },
              padding: 2,
            }}
          />
        </RecordContextProvider>
      ))}
    </Stack>
  );
};

const ColumnListItem = ({ sx, ...props }: StackProps) => {
  const column = useRecordContext();
  return (
    <Draggable
      draggableId={`column-${column!.id}`}
      index={column!.position}
      // @ts-expect-error Draggable type is not defined in @hello-pangea/dnd
      type="column"
    >
      {(provided, snapshot) => (
        <Stack
          {...props}
          sx={{
            ...sx,
            borderRadius: (theme) => theme.shape.borderRadius,
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? lighten(theme.palette.background.default, 0.1)
                : darken(theme.palette.background.default, 0.1),
            opacity: snapshot?.isDragging ? 0.9 : 1,
            transform: snapshot?.isDragging ? "rotate(-2deg)" : "",
          }}
          {...provided?.draggableProps}
          {...provided?.dragHandleProps}
          ref={provided?.innerRef}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField source="name" gutterBottom variant="h5" component="h2" />
            <EditInDialogButton resource="columns" maxWidth="md" fullWidth>
              <LockOnMount />
              <RecordLiveUpdate />
              <FormWithLockSupport>
                <TextInput source="name" validate={required()} />
              </FormWithLockSupport>
            </EditInDialogButton>
          </Stack>
          <ReferenceManyField
            reference="cards"
            target="column_id"
            sort={{ field: "position", order: "ASC" }}
            perPage={10000}
          >
            <CardListView />
            <ListLiveUpdate />
          </ReferenceManyField>
        </Stack>
      )}
    </Draggable>
  );
};

const CardListView = () => {
  const column = useRecordContext();
  const { data, error, isPending } = useListContext();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Droppable droppableId={column!.id.toString()} type="card">
      {(droppableProvided, snapshot) => (
        <div ref={droppableProvided.innerRef}>
          <Stack
            spacing={2}
            direction="column"
            {...droppableProvided.droppableProps}
            className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
            sx={{
              "&.isDraggingOver": {
                bgcolor: "action.hover",
              },
            }}
          >
            {data.map((record) => (
              <RecordContextProvider key={record.id} value={record}>
                <CardListItem />
              </RecordContextProvider>
            ))}
            {droppableProvided.placeholder}
            <CreateInDialogButton
              resource="cards"
              label="New card"
              record={{
                column_id: column?.id,
                position: data.length,
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
          </Stack>
        </div>
      )}
    </Droppable>
  );
};

const CardListItem = () => {
  const card = useRecordContext();
  return (
    <Draggable
      draggableId={`card-${card!.id}`}
      index={card!.position}
      // @ts-expect-error Draggable type is not defined in @hello-pangea/dnd
      type="card"
    >
      {(provided, snapshot) => (
        <Card
          elevation={snapshot?.isDragging ? 3 : 1}
          sx={{
            bgcolor: (theme) => theme.palette.background.default,
            opacity: snapshot?.isDragging ? 0.9 : 1,
            transform: snapshot?.isDragging ? "rotate(-2deg)" : "",
          }}
          {...provided?.draggableProps}
          {...provided?.dragHandleProps}
          ref={provided?.innerRef}
        >
          <CardContent>
            <TextField
              source="title"
              gutterBottom
              variant="h5"
              component="h2"
            />
          </CardContent>
          <CardActions>
            <EditInDialogButton resource="cards" maxWidth="md" fullWidth>
              <LockOnMount />
              <ListLiveUpdate />
              <FormWithLockSupport>
                <TextInput source="title" validate={required()} />
                <RichTextInput source="description" />
              </FormWithLockSupport>
            </EditInDialogButton>
            <DeleteButton color="inherit" redirect={false} />
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
};
