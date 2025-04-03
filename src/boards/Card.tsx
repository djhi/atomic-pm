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
  ReferenceArrayField,
  SingleFieldList,
  TextField,
  Translate,
  useRecordContext,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import { MenuButton } from "../ra/MenuButton/MenuButton";
import { useUpdateBoard } from "../useUpdateBoard";
import { AvatarList } from "../ui/AvatarList";
import { useBoardFilterContext } from "./BoardFilterContext";

export const Card = () => {
  const card = useRecordContext();
  if (!card) return null;
  const filter = useBoardFilterContext();
  if (filter) {
    if (!card.title.match(filter)) {
      return null;
    }
  }

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
            navigate(`/boards/${params.boardId}/cards/${card?.number}`);
          }}
        >
          <CardContent
            sx={{
              position: "relative",
              pb: 0,
            }}
          >
            <Stack direction="row" alignItems="start" gap={1}>
              <FunctionField
                source="number"
                gutterBottom
                variant="h6"
                sx={{ color: "text.secondary", fontWeight: "normal" }}
                render={(record) => `#${record.number}`}
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
            <ReferenceArrayField
              source="assigned_user_ids"
              reference="board_members_with_profiles"
            >
              <AvatarList />
            </ReferenceArrayField>
            <ReferenceArrayField
              source="tags_ids"
              reference="tags"
              sx={{ display: "flex", flexGrow: 1, justifyContent: "end" }}
            >
              <SingleFieldList linkType={false} />
            </ReferenceArrayField>
          </CardActions>
        </MuiCard>
      )}
    </Draggable>
  );
};

const CardMenu = () => {
  const card = useRecordContext();
  const params = useParams<"boardId">();
  const { updateColumn } = useUpdateBoard();

  if (!card) return null;

  return (
    <MenuButton
      ButtonProps={{
        label: "pm.actionList",
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
        to={`/boards/${params.boardId}/cards/${card?.number}`}
      />
      <MenuButton.DeleteItem
        resource="cards"
        id={`${params.boardId}-${card.id}`}
        mutationMode="pessimistic"
        confirmTitle={
          <Translate
            i18nKey="ra.message.delete_title"
            options={{ id: card.title }}
          />
        }
        mutationOptions={{
          onSuccess: () => {
            updateColumn({
              board_id: params.boardId!,
              record: { id: card.column_id },
              update: (record) => ({
                ...record,
                cards: record.cards
                  .filter((oldCard: any) => card.id !== oldCard.id)
                  .map((oldCard: any) => ({
                    ...oldCard,
                    position:
                      oldCard.position > card.position
                        ? oldCard.position - 1
                        : oldCard.position,
                  })),
              }),
            });
          },
        }}
      />
    </MenuButton>
  );
};
