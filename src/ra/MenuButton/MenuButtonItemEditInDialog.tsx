import { MenuItem } from "@mui/material";
import {
  EditInDialogButton,
  EditInDialogButtonProps,
} from "@react-admin/ra-form-layout";
import { useMenuButton } from "./useMenuButton";

export const MenuButtonItemEditInDialog = (props: EditInDialogButtonProps) => {
  const { closeMenu } = useMenuButton();

  return (
    <EditInDialogButton
      resource="boards"
      maxWidth="md"
      fullWidth
      onClose={() => closeMenu()}
      {...props}
      // @ts-expect-error Fix ra-form-layout types
      icon={null}
      ButtonProps={{
        // @ts-expect-error Fix ra-form-layout types
        component: MenuItem,
        sx: {
          border: "none",
          borderRadius: 0,
          color: "inherit",
          display: "flex",
          fontSize: (theme) => theme.typography.fontSize,
          fontWeight: "inherit",
          justifyContent: "flex-start",
          px: 2,
          textAlign: "left",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        },
      }}
    ></EditInDialogButton>
  );
};
