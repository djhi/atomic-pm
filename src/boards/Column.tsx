import { Draggable } from "@hello-pangea/dnd";
import { Chip, darken, lighten, Stack, StackProps } from "@mui/material";
import { EditInDialogButton } from "@react-admin/ra-form-layout";
import { ReferenceManyCount, ReferenceManyField, required, TextField, TextInput, useRecordContext } from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { LockOnMount } from "./LockOnMount";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { FormWithLockSupport } from "./FormWithLockSupport";
import { CardList } from "./CardList";

export const Column = ({ sx, ...props }: StackProps) => {
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
            <TextField source="name" gutterBottom variant="h6" component="h2" />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
            >
              <Chip
                label={
                  <ReferenceManyCount
                    reference="cards"
                    target="column_id"
                    sort={{ field: "position", order: "ASC" }}
                  />
                }
              />
              <EditInDialogButton resource="columns" maxWidth="md" fullWidth>
                <LockOnMount />
                <RecordLiveUpdate />
                <FormWithLockSupport>
                  <TextInput source="name" validate={required()} />
                </FormWithLockSupport>
              </EditInDialogButton>
            </Stack>
          </Stack>
          <ReferenceManyField
            reference="cards"
            target="column_id"
            sort={{ field: "position", order: "ASC" }}
            perPage={10000}
          >
            <CardList />
            <ListLiveUpdate />
          </ReferenceManyField>
        </Stack>
      )}
    </Draggable>
  );
};
