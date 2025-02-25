import { Droppable } from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import { RecordContextProvider, required, SimpleForm, TextInput, useListContext, useRecordContext } from "react-admin";
import { CreateInDialogButton } from "@react-admin/ra-form-layout";
import { RichTextInput } from "ra-input-rich-text";
import { Card } from "./Card";

export const CardList = () => {
  const column = useRecordContext();
  const { data, error, isPending } = useListContext();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Droppable droppableId={column!.id.toString()} type="card">
      {(droppableProvided, snapshot) => (
        <Box
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
          sx={{
            maxHeight: "80vh",
            overflowY: "auto",
            "&.isDraggingOver": { bgcolor: "action.hover" },
          }}
        >
          {data.map((record) => (
            <RecordContextProvider key={record.id} value={record}>
              <Card />
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
        </Box>
      )}
    </Droppable>
  );
};
