import * as React from "react";

export const MenuButtonContext =
	React.createContext<MenuButtonContextValue | null>(null);

export type MenuButtonContextValue = {
	closeMenu: () => void;
	openMenu: (anchorEl: HTMLElement) => void;
};
