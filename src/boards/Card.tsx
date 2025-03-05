import { Draggable } from "@hello-pangea/dnd";
import {
  Card as MuiCard,
  CardActions,
  CardContent,
  lighten,
  darken,
  Theme,
} from "@mui/material";
import { ChipField, TextField, useRecordContext } from "react-admin";
import { useNavigate, useParams } from "react-router";
import { MenuButton } from "../ra/MenuButton/MenuButton";

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
              "& .card-menu-button": {
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
          <CardContent
            sx={{
              position: "relative",
            }}
          >
            <TextField
              source="title"
              gutterBottom
              variant="h6"
              component="h2"
              sx={{ maxWidth: "80%", fontWeight: "normal" }}
            />
            <MenuButton
              ButtonProps={{
                className: "card-menu-button",
                sx: {
                  position: "absolute",
                  opacity: 0,
                  transition: "opacity 300ms",
                  right: 12,
                  top: 12,
                },
              }}
            >
              <MenuButton.LinkItem
                label="ra.action.edit"
                to={`/boards/${params.boardId}/cards/${card?.id}`}
              />
              <MenuButton.DeleteItem
                resource="cards"
                record={card!}
                mutationMode="pessimistic"
              />
            </MenuButton>
          </CardContent>
          <CardActions>
            <ChipField source="estimate" size="small" color="info" />
          </CardActions>
        </MuiCard>
      )}
    </Draggable>
  );
};
