import { Droppable } from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import { CreateButton, RecordContextProvider, useRecordContext } from "react-admin";
import { useParams } from "react-router";
import { Card } from "./Card";

export const CardList = () => {
  const column = useRecordContext();
  if (!column) return null;
  const params = useParams<"boardId">();

  return (
    <Droppable droppableId={column!.id.toString()} type="card">
      {(droppableProvided, snapshot) => (
        <Box
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxHeight: "80vh",
            overflowY: "auto",
            scrollbarWidth: "thin",
            p: 1,
            mx: -1,
            "&.isDraggingOver": { bgcolor: "action.hover" },
          }}
        >
          {column.cards?.map((record: any) => (
            <RecordContextProvider key={record.id} value={record}>
              <Card />
            </RecordContextProvider>
          ))}
          {droppableProvided.placeholder}
          <CreateButton
            resource="cards"
            label="New card"
            to={{
              pathname: `/boards/${params.boardId}/cards/create`,
              search: `?source=${JSON.stringify({
                column_id: column?.id,
                position: column.cards?.length,
                created_at: new Date().toISOString(),
              })}`,
            }}
          />
        </Box>
      )}
    </Droppable>
  );
};
