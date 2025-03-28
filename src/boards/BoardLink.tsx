import { Stack, Typography } from "@mui/material";
import { Link, useGetOne } from "react-admin";
import { useParams } from "react-router";

export const BoardLink = () => {
  const params = useParams<"boardId">();
  const { data: board } = useGetOne("boards", { id: params.boardId });

  return (
    <Stack direction="row" gap={1}>
      <Typography variant="body2" color="text.secondary">
        Board:
      </Typography>
      <Link to={`/boards/${params.boardId}`}>
        <Typography variant="body2">{board?.name}</Typography>
      </Link>
    </Stack>
  );
};
