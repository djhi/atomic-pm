import { Draggable } from "@hello-pangea/dnd";
import {
  Card as MuiCard,
  CardActions,
  CardContent,
  lighten,
  darken,
  Theme,
  Stack,
} from "@mui/material";
import {
  ChipField,
  FunctionField,
  ReferenceField,
  TextField,
  useRecordContext,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { MenuButton } from "../ra/MenuButton/MenuButton";
import { AvatarField } from "../ui/AvatarField";

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
            <Stack direction="row" alignItems="start" gap={1}>
              <FunctionField
                source="id"
                gutterBottom
                variant="h6"
                sx={{ color: "text.secondary", fontWeight: "normal" }}
                render={(record) => `#${record.id}`}
              />
              <TextField
                source="title"
                gutterBottom
                variant="h6"
                component="h2"
                sx={{ fontWeight: "normal" }}
              />
            </Stack>
            <CardMenu />
          </CardContent>
          <CardActions>
            <ChipField
              source="estimate"
              size="small"
              color="info"
              emptyText=" "
            />
            <ReferenceField
              source="assigned_user_id"
              reference="board_members_with_profiles"
            >
              <AvatarField />
            </ReferenceField>
          </CardActions>
        </MuiCard>
      )}
    </Draggable>
  );
};

const CardMenu = () => {
  const card = useRecordContext();
  const queryClient = useQueryClient();
  const params = useParams<"boardId">();
  if (!card) return null;

  return (
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
        mutationOptions={{
          onSuccess: () => {
            queryClient.setQueryData(
              [
                "boards",
                "getOne",
                {
                  id: params.boardId,
                  meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
                },
              ],
              (board: any) => ({
                ...board,
                columns: board.columns.map((column: any) =>
                  column.id === card.column_id
                    ? {
                        ...column,
                        cards: column.cards
                          .filter((oldCard: any) => card.id !== oldCard.id)
                          .map((oldCard: any) => ({
                            ...oldCard,
                            position:
                              oldCard.position > card.position
                                ? oldCard.position - 1
                                : oldCard.position,
                          })),
                      }
                    : column,
                ),
              }),
            );
          },
        }}
      />
    </MenuButton>
  );
};
