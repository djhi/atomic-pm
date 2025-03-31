import { Stack, ToolbarProps } from "@mui/material";
import { useContext } from "react";
import {
  DeleteButton,
  SaveButton,
  Toolbar,
  ToolbarClasses,
  EditContext,
} from "react-admin";

export const FormToolbar = (props: ToolbarProps) => {
  const editContext = useContext(EditContext);

  return (
    <Toolbar {...props}>
      <Stack flex={1} direction="row" spacing={1} justifyContent="end">
        {editContext ? (
          <div className={ToolbarClasses.defaultToolbar}>
            <DeleteButton color="primary" size="medium" redirect={false} />
            <SaveButton variant="outlined" color="inherit" alwaysEnable />
          </div>
        ) : (
          <SaveButton variant="outlined" color="inherit" alwaysEnable />
        )}
      </Stack>
    </Toolbar>
  );
};
