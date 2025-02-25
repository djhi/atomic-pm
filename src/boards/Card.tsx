import { Draggable } from "@hello-pangea/dnd";
import { Card as MuiCard, CardActions, CardContent } from "@mui/material";
import { EditButton, TextField, useRecordContext } from "react-admin";
import { useNavigate, useParams } from "react-router";

export const Card = () => {
  const card = useRecordContext();
  const navigate = useNavigate();
  const params = useParams<"boardId">();
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
            cursor: "pointer",
            "&:hover": { bgcolor: (theme) => theme.palette.action.hover, '& .RaEditButton-root': {
              bgcolor: (theme) => theme.palette.background.default,
            } },
          }}
          {...provided?.draggableProps}
          {...provided?.dragHandleProps}
          ref={provided?.innerRef}
          onClick={() => {
            navigate(`/boards/${params.boardId}/cards/${card?.id}`);
          }}
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
            <EditButton
              to={{ pathname: `/boards/${params.boardId}/cards/${card?.id}` }}
            />
          </CardActions>
        </MuiCard>
      )}
    </Draggable>
  );
};
