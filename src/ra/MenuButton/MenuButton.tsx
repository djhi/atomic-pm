import { Box, BoxProps, Menu, MenuProps } from "@mui/material";
import { useEvent } from "ra-core";
import * as React from "react";
import { MenuButtonDeleteItem } from "./MenuButtonDeleteItem";
import { MenuButtonIconButton, MenuButtonIconButtonProps } from "./MenuButtonIconButton";
import { MenuButtonLinkItem } from "./MenuButtonLinkItem";
import { MenuButtonRecordLinkItem } from "./MenuButtonRecordLinkItem";
import { MenuButtonUpdateItem } from "./MenuButtonUpdateItem";
import { MenuButtonProvider } from "./MenuButtonProvider";
import { MenuButtonItemEditInDialog } from "./MenuButtonItemEditInDialog";

export const MenuButton = (props: MenuButtonProps) => {
  const { children, button, ButtonProps, MenuProps, ...rest } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleClick = useEvent((target: HTMLElement) => setAnchorEl(target));
  // biome-ignore lint/complexity/noBannedTypes: Same as MUI
  const handleClose = useEvent((event?: {}) => {
    // Avoid propagation of the event to the datagrid rowClick
    if (event) {
      (event as Event).stopPropagation();
    }
    setAnchorEl(null);
  });

  return (
    <Box {...rest}>
      <MenuButtonProvider
        value={{ closeMenu: handleClose, openMenu: handleClick }}
      >
        {button ?? <MenuButtonIconButton {...ButtonProps} />}
        <Menu
          open={!!anchorEl}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          onClose={(event) => handleClose(event)}
          {...MenuProps}
        >
          {children}
        </Menu>
      </MenuButtonProvider>
    </Box>
  );
};

export interface MenuButtonProps extends BoxProps {
  children?: React.ReactNode;
  button?: React.ReactNode;
  ButtonProps?: MenuButtonIconButtonProps;
  MenuProps?: MenuProps;
}

MenuButton.IconButton = MenuButtonIconButton;
MenuButton.LinkItem = MenuButtonLinkItem;
MenuButton.RecordLinkItem = MenuButtonRecordLinkItem;
MenuButton.UpdateItem = MenuButtonUpdateItem;
MenuButton.DeleteItem = MenuButtonDeleteItem;
MenuButton.EditInDialog = MenuButtonItemEditInDialog;
