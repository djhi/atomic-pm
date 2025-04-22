import * as React from "react";
import { Button, CreateBase, Form, RaRecord, TextInput, useTranslateLabel } from "react-admin";
import { Card as MuiCard, CardContent } from "@mui/material";
import { useUpdateBoard } from "../useUpdateBoard";

export const NewCard = ({ column }: { column: RaRecord }) => {
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
