import { Card, CardContent, darken, lighten, Stack, Theme } from "@mui/material";
import { FunctionField, Identifier, Link, ReferenceField, TextField, useEvent, useRecordContext } from "react-admin";
import { BoardMenu } from "./BoardMenu";
import { useLastVisitDates } from "./useLastVisitDates";

export const BoardListItem = () => {
  const board = useRecordContext();
  const [, setVisitDates] = useLastVisitDates();

  const recordLastVisit = useEvent((boardId: Identifier) => {
    // Postpone the update to avoid re-rendering the list
    setTimeout(() => {
      setVisitDates((visitDates: Record<string, Date>) => ({
        ...visitDates,
        [boardId]: new Date().toISOString(),
      }));
    }, 50);
  });

  if (!board) return null;
  return (
    <Link
      to={`/boards/${board.id}`}
      sx={{ textDecoration: "none" }}
      onClick={() => recordLastVisit(board.id)}
    >
      <Card
        sx={{
          bgcolor: (theme: Theme) =>
            theme.palette.mode === "dark"
              ? lighten(theme.palette.background.default, 0.05)
              : darken(theme.palette.background.default, 0.1),
          "&:hover": { bgcolor: (theme) => theme.palette.action.hover },
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField source="name" gutterBottom variant="h5" component="h2" />
            <BoardMenu />
          </Stack>
          <TextField
            source="description"
            component="div"
            variant="body2"
            sx={{ color: "text.secondary" }}
          />
          <ReferenceField source="user_id" reference="profiles">
            <FunctionField render={(user) => `Created by ${user.email}`} />
          </ReferenceField>
        </CardContent>
      </Card>
    </Link>
  );
};
