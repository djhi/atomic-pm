import { InputProps, useTranslate } from "react-admin";
import { Link, Stack } from "@mui/material";
import { MarkdownInput } from "@react-admin/ra-markdown";
import { useEditInPlace } from "../ra/EditInPlace";

export const CardDescriptionInput = (props: Omit<InputProps, "helperText">) => {
  const editInPlace = useEditInPlace();
  const translate = useTranslate();

  return (
    <Stack>
      <MarkdownInput {...props} fullWidth />
      <div>
        <Link
          component="button"
          fontSize="small"
          onClick={() => editInPlace.setIsEditing(false)}
        >
          {translate("ra.action.cancel")}
        </Link>
      </div>
    </Stack>
  );
};
