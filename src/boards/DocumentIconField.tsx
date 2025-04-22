import { FieldProps, useFieldValue } from "react-admin";
import DocumentIcon from "@mui/icons-material/Notes";
import DefaultFileIcon from "@mui/icons-material/InsertDriveFile";
import mime from "mime";
import { Chip, ChipProps } from "@mui/material";

export const DocumentIconField = ({
  ChipProps,
  ...props
}: FieldProps & { ChipProps?: Partial<ChipProps> }) => {
  const value = useFieldValue(props);
  if (value == null) {
    return <DocumentIcon />;
  }

  const fileExtension = mime.getExtension(value);
  if (fileExtension) {
    return (
      <Chip
        label={fileExtension}
        sx={{ textTransform: "uppercase" }}
        size="small"
        variant="outlined"
        {...ChipProps}
      />
    );
  }

  return <DefaultFileIcon />;
};
