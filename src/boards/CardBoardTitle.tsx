import { Typography } from "@mui/material";
import { Link, useGetOne } from "react-admin";
import { useParams } from "react-router";

export const CardBoardTitle = () => {
  const params = useParams<"boardId">();
  const { data: board } = useGetOne("boards", { id: params.boardId });

  return (
    <Link to={`/boards/${params.boardId}`}>
      <Typography variant="h5" component="h2">
        {board?.name}
      </Typography>
    </Link>
  );
};
