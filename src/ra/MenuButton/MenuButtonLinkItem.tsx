import { MenuItem, type MenuItemProps } from "@mui/material";
import { Translate } from "ra-core";
import * as React from "react";
import { Link, type LinkProps } from "react-router-dom";
import { useMenuButton } from "./useMenuButton";

export const MenuButtonLinkItem = React.forwardRef<
  HTMLAnchorElement,
  MenuItemProps<typeof Link> &
    LinkProps & {
      label: string;
      ref?: React.Ref<HTMLAnchorElement>;
    }
>(({ label, ...props }, ref) => {
  const { closeMenu } = useMenuButton();
  return (
    <MenuItem
      ref={ref}
      component={Link}
      onClick={closeMenu}
      {...props}
    >
      <Translate i18nKey={label}>{label}</Translate>
    </MenuItem>
  );
});
