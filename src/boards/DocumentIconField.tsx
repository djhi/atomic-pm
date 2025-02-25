import { FieldProps, useFieldValue } from "react-admin";
import DocumentIcon from "@mui/icons-material/Notes";
import LinkIcon from "@mui/icons-material/OpenInNew";
import PdfIcon from "@mui/icons-material/PictureAsPdf";

export const DocumentIconField = (props: FieldProps) => {
  const value = useFieldValue(props);

  switch (value) {
    case "link":
      return <LinkIcon />;
    case "pdf":
      return <PdfIcon />;
    default:
      return <DocumentIcon />;
  }
};
