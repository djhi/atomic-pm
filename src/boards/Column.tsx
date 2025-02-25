import { Draggable } from "@hello-pangea/dnd";
import { Chip, darken, lighten, Stack, StackProps } from "@mui/material";
import {
  EditButton,
  ReferenceManyCount,
  ReferenceManyField,
  TextField,
  useGetManyReference,
  useRecordContext,
} from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { CardList } from "./CardList";
import { useParams } from "react-router";

export const Column = ({ sx, ...props }: StackProps) => {
  const column = useRecordContext();
  const params = useParams<"boardId">();
  // TODO: Ideally we should have a view for columns that include the total estimates
  const { data: cards } = useGetManyReference("cards", {
    target: "column_id",
    id: column?.id,
    sort: { field: "position", order: "ASC" },
    pagination: { page: 1, perPage: 10000 },
  });
  const totalEstimates = cards?.reduce(
    (acc: number, card: any) => acc + card.estimate,
    0,
  );
  console.log({ totalEstimates })

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
            borderRadius: (theme) => theme.shape.borderRadius / 4,
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? lighten(theme.palette.background.default, 0.2)
                : darken(theme.palette.background.default, 0.1),
            opacity: snapshot?.isDragging ? 0.9 : 1,
            transform: snapshot?.isDragging ? "rotate(-2deg)" : "",
            width: { xs: "100%", sm: "100%", md: "350px" },
            flexShrink: 0,
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
              <Chip
                color={
                  column?.maxEstimates != null && totalEstimates > column?.maxEstimates
                    ? 'warning'
                    : 'info'
                }
                label={
                  column?.maxEstimates != null
                    ? `${totalEstimates} / ${column?.maxEstimates}`
                    : totalEstimates
                }
              />
              <EditButton
                to={{
                  pathname: `/boards/${params.boardId}/columns/${column?.id}`,
                }}
              />
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
