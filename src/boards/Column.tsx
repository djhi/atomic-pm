import { Draggable } from "@hello-pangea/dnd";
import { Stack, StackProps, Typography } from "@mui/material";
import {
  EditButton,
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
  const { data: cards, total: totalCards } = useGetManyReference(
    "cards",
    {
      target: "column_id",
      id: column?.id,
      sort: { field: "position", order: "ASC" },
      pagination: { page: 1, perPage: 10000 },
    },
    {
      enabled: !!column,
    },
  );
  const totalEstimates = cards?.reduce(
    (acc: number, card: any) => acc + card.estimate,
    0,
  );

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
            bgcolor: "background.paper",
            opacity: snapshot?.isDragging ? 0.9 : 1,
            transform: snapshot?.isDragging ? "rotate(-2deg)" : "",
            width: { xs: "100%", sm: "100%", md: "350px" },
            flexShrink: 0,
            maxHeight: "85vh",
          }}
          {...provided?.draggableProps}
          {...provided?.dragHandleProps}
          ref={provided?.innerRef}
        >
          <Stack direction="column" gap={0.5} mb={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <TextField
                source="name"
                gutterBottom
                variant="h6"
                component="h2"
              />
              <EditButton
                to={{
                  pathname: `/boards/${params.boardId}/columns/${column?.id}`,
                }}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant="body1"
                color={
                  column?.maxCards != null &&
                  (totalCards || 0) > column?.maxCards
                    ? "warning"
                    : "info"
                }
              >
                {column?.maxCards != null
                  ? `${totalCards} / ${column?.maxEstimates}`
                  : totalCards}{" "}
                Cards
              </Typography>
              <Typography
                variant="body1"
                color={
                  column?.maxEstimates != null &&
                  totalEstimates > column?.maxEstimates
                    ? "warning"
                    : "info"
                }
              >
                {column?.maxEstimates != null
                  ? `${totalEstimates} / ${column?.maxEstimates}`
                  : totalEstimates}{" "}
                Points
              </Typography>
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
