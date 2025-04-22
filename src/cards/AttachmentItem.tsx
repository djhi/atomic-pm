import { Confirm, RaRecord, useDeleteWithConfirmController } from "react-admin";
import FileIcon from "@mui/icons-material/InsertDriveFile";
import { useSignedUrl } from "../ra/useSignedUrl";
import { Chip } from "@mui/material";

export const AttachmentItem = ({ record }: { record: RaRecord }) => {
  const fileName = record.path.split("/").pop().split(".")[0];
  const { data: signedUrl } = useSignedUrl({
    bucket: "documents",
    filePath: record?.path,
  });
  const { open, isPending, handleDialogOpen, handleDialogClose, handleDelete } =
    useDeleteWithConfirmController({
      resource: "card_attachments",
      record,
      redirect: false,
    });
  const handleDeleteButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    handleDialogOpen(event);
  };
  return (
    <>
      <Chip
        clickable
        component="a"
        download
        target="_blank"
        href={signedUrl}
        label={fileName}
        icon={<FileIcon />}
        onDelete={handleDeleteButtonClick}
      />
      <Confirm
        isOpen={open}
        loading={isPending}
        title="ra.message.delete_title"
        content="ra.message.delete_content"
        translateOptions={{
          name: "",
          id: fileName,
        }}
        onConfirm={handleDelete}
        onClose={handleDialogClose}
      />
    </>
  );
};
