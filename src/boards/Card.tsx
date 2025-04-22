import { Draggable } from "@hello-pangea/dnd";
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
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
  useRecordContext,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import { AvatarList } from "../ui/AvatarList";
import { CardMenu } from "./CardMenu";

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
        <CardRoot
          isDragging={snapshot.isDragging}
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
        </CardRoot>
      )}
    </Draggable>
  );
};

const CardRoot = ({
  isDragging,
  ...rest
}: { isDragging: boolean } & MuiCardProps) => (
  <MuiCard
    elevation={isDragging ? 3 : 1}
    sx={{
      flexShrink: 0,
      flexGrow: 0,
      bgcolor: (theme: Theme) =>
        theme.palette.mode === "dark"
          ? lighten(theme.palette.background.default, 0.05)
          : darken(theme.palette.background.default, 0.1),
      opacity: isDragging ? 0.9 : 1,
      transform: isDragging ? "rotate(-2deg)" : "",
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
    {...rest}
  />
);
