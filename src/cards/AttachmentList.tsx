import { IconButton, Stack, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useListContext } from "react-admin";
import { AttachmentItem } from "./AttachmentItem";

export const AttachmentList = ({ openFileDialog }: { openFileDialog: () => void }) => {
  const { data } = useListContext();

  return (
    <Stack direction="row" gap={1}>
      {data?.map((record) => (
        <AttachmentItem key={record.id} record={record} />
      ))}
      <Tooltip title="Add attachment">
        <IconButton
          onClick={() => openFileDialog()}
          aria-label="Add attachment"
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
