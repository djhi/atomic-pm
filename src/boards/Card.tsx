import { Draggable } from "@hello-pangea/dnd";
import { Card as MuiCard, CardActions, CardContent } from "@mui/material";
import { EditInDialogButton } from "@react-admin/ra-form-layout";
import { required, TextField, TextInput, useRecordContext } from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { RichTextInput } from "ra-input-rich-text";
import { FormWithLockSupport } from "./FormWithLockSupport";
import { LockOnMount } from "./LockOnMount";

export const Card = () => {
  const card = useRecordContext();
  return (
    <Draggable
      draggableId={`card-${card!.id}`}
      index={card!.position}
      // @ts-expect-error Draggable type is not defined in @hello-pangea/dnd
      type="card"
    >
      {(provided, snapshot) => (
        <MuiCard
          elevation={snapshot?.isDragging ? 3 : 1}
          sx={{
            bgcolor: (theme) => theme.palette.background.default,
            opacity: snapshot?.isDragging ? 0.9 : 1,
            transform: snapshot?.isDragging ? "rotate(-2deg)" : "",
            my: 1,
            cursor: 'pointer',
            "&:hover": { bgcolor: (theme) => theme.palette.action.hover },
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
          </CardActions>
        </MuiCard>
      )}
    </Draggable>
  );
};
