import { MenuItem, type MenuItemProps } from "@mui/material";
import { useTranslate } from "ra-core";
import * as React from "react";
import { Link, type LinkProps } from "react-router-dom";
import { useMenuButton } from "./useMenuButton";

export const MenuButtonLinkItem = React.forwardRef<
	HTMLAnchorElement,
	MenuItemProps &
		LinkProps & {
			label: string;
		}
>(({ label, ...props }, ref) => {
	const translate = useTranslate();
	const { closeMenu } = useMenuButton();
	return (
		<MenuItem ref={ref} component={Link} onClick={closeMenu} {...props}>
			{translate(label, { _: label })}
		</MenuItem>
	);
});
