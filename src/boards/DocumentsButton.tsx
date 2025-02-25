import { Button } from "react-admin";
import DocumentsIcon from "@mui/icons-material/Description";
import { Link, useParams } from "react-router";

export const DocumentsButton = () => {
  const params = useParams<"boardId">();
  return (
    <>
      <Button
        component={Link}
        to={`/boards/${params.boardId}/documents`}
        label="Documents"
      >
        <DocumentsIcon />
      </Button>
    </>
  );
};
