import * as React from "react";

export const MenuButtonContext =
	React.createContext<MenuButtonContextValue | null>(null);

export type MenuButtonContextValue = {
  isOpen: boolean;
  closeMenu: () => void;
  openMenu: (anchorEl: HTMLElement) => void;
};
