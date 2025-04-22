import { Droppable } from "@hello-pangea/dnd";
import { Box, BoxProps } from "@mui/material";
import { RecordContextProvider, useRecordContext } from "react-admin";
import { Card } from "./Card";
import { NewCard } from "./NewCard";

export const CardList = () => {
  const column = useRecordContext();
  if (!column) return null;

  return (
    <Droppable droppableId={column!.id.toString()} type="card">
      {(droppableProvided, snapshot) => (
        <CardListRoot
          ref={droppableProvided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
          {...droppableProvided.droppableProps}
        >
          {column.cards?.map((record: any) => (
            <RecordContextProvider key={record.id} value={record}>
              <Card />
            </RecordContextProvider>
          ))}
          {droppableProvided.placeholder}
          <NewCard column={column} />
        </CardListRoot>
      )}
    </Droppable>
  );
};

const CardListRoot = ({ isDraggingOver, ...rest }: BoxProps & { isDraggingOver: boolean }) => (
  <Box
    className={isDraggingOver ? " isDraggingOver" : ""}
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
    {...rest}
  />
);
