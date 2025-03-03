import { Draggable } from "@hello-pangea/dnd";
import {
  Card as MuiCard,
  CardActions,
  CardContent,
  lighten,
  darken,
  Theme,
  Typography,
} from "@mui/material";
import {
  EditButton,
  FunctionField,
  TextField,
  useRecordContext,
} from "react-admin";
import { useNavigate, useParams } from "react-router";

export const Card = () => {
  const card = useRecordContext();
  if (!card) return null;
  const navigate = useNavigate();
  const params = useParams<"boardId">();
  return (
    <Draggable
      draggableId={`card-${card.column_id}-${card!.id}`}
      index={card!.position}
      // @ts-expect-error Draggable type is not defined in @hello-pangea/dnd
      type="card"
    >
      {(provided, snapshot) => (
        <MuiCard
          elevation={snapshot?.isDragging ? 3 : 1}
          sx={{
            flexShrink: 0,
            flexGrow: 0,
            bgcolor: (theme: Theme) =>
              theme.palette.mode === "dark"
                ? lighten(theme.palette.background.default, 0.05)
                : darken(theme.palette.background.default, 0.1),
            opacity: snapshot?.isDragging ? 0.9 : 1,
            transform: snapshot?.isDragging ? "rotate(-2deg)" : "",
            m: 0,
            cursor: "pointer",
            "&:hover": {
              bgcolor: (theme) => theme.palette.action.hover,
              "& .RaEditButton-root": {
                bgcolor: (theme) => theme.palette.background.default,
                opacity: 1,
              },
            },
          }}
          {...provided?.draggableProps}
          {...provided?.dragHandleProps}
          ref={provided?.innerRef}
          onClick={() => {
            navigate(`/boards/${params.boardId}/cards/${card?.id}`);
          }}
        >
          <CardContent sx={{ position: "relative" }}>
            <TextField
              source="title"
              gutterBottom
              variant="h5"
              component="h2"
              sx={{ maxWidth: "80%" }}
            />
            <Typography
              variant="body2"
              color="info"
              sx={{
                position: "absolute",
                right: (theme) => theme.spacing(1),
                top: (theme) => theme.spacing(1),
              }}
            >
              <FunctionField
                render={(record) =>
                  record.estimate > 1
                    ? `${record.estimate} points`
                    : `${record.estimate} point`
                }
              />
            </Typography>
          </CardContent>
          <CardActions>
            <EditButton
              variant="text"
              // @ts-ignore Until react-admin is updated
              icon={null}
              to={{ pathname: `/boards/${params.boardId}/cards/${card?.id}` }}
              sx={{ opacity: 0, transition: "opacity 0.3s" }}
            />
          </CardActions>
        </MuiCard>
      )}
    </Draggable>
  );
};
