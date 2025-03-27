import * as React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Card as MuiCard, CardContent, Box } from "@mui/material";
import {
  Button,
  CreateBase,
  Form,
  RaRecord,
  RecordContextProvider,
  TextInput,
  useRecordContext,
  useTranslateLabel,
} from "react-admin";
import { Card } from "./Card";
import { useUpdateBoard } from "../useUpdateBoard";

export const CardList = () => {
  const column = useRecordContext();
  if (!column) return null;

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
          <NewCard column={column} />
        </Box>
      )}
    </Droppable>
  );
};

const NewCard = ({ column }: { column: RaRecord }) => {
  const [newCard, setNewCard] = React.useState(false);
  const [key, setKey] = React.useState(0);
  const translateLabel = useTranslateLabel();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { updateColumn } = useUpdateBoard();

  React.useEffect(() => {
    if (!newCard) return;
    const handleExit = (event: KeyboardEvent | MouseEvent) => {
      if ((event as KeyboardEvent).key === "Escape") {
        setNewCard(false);
      }

      if ((event as KeyboardEvent).key) {
        return;
      }

      if (event.target !== inputRef.current) {
        setNewCard(false);
      }
    };
    document.addEventListener("keydown", handleExit);
    document.addEventListener("click", handleExit);

    return () => {
      document.removeEventListener("keydown", handleExit);
    };
  }, [newCard]);

  if (newCard) {
    return (
      <CreateBase
        resource="cards"
        record={{
          column_id: column?.id,
          position: column.cards?.length,
          created_at: new Date().toISOString(),
        }}
        mutationOptions={{
          onSuccess: (data) => {
            updateColumn({
              board_id: column.board_id,
              record: { id: data.column_id },
              update: (record) => ({
                ...record,
                cards: [...record.cards, data],
              }),
            });
            setKey((prevKey) => prevKey + 1);
          },
        }}
      >
        <MuiCard onClick={(event) => event.stopPropagation()}>
          <CardContent>
            <Form key={key}>
              <TextInput
                source="title"
                helperText={false}
                label={false}
                inputRef={inputRef}
                placeholder={
                  translateLabel({
                    source: "title",
                    resource: "cards",
                  }) as string
                }
                slotProps={{
                  input: {
                    autoFocus: true,
                    "aria-label": translateLabel({
                      source: "title",
                      resource: "cards",
                    }) as string,
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    border: "none",
                    backgroundColor: "transparent",
                    outline: "none",
                  },
                  "& .MuiInputBase-root": {
                    border: "none",
                    backgroundColor: "transparent",
                  },
                  "& .MuiInputBase-input:focus": {
                    border: "none",
                    outline: "none",
                    backgroundColor: (theme) => theme.palette.action.focus,
                  },
                }}
              />
            </Form>
          </CardContent>
        </MuiCard>
      </CreateBase>
    );
  }
  return (
    <Button
      resource="cards"
      label="pm.newCard"
      variant="text"
      onClick={() => setTimeout(() => setNewCard(true))}
    />
  );
};
