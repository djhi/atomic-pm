import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  ContainerLayout,
  ContainerLayoutClasses,
  Header,
  HeaderClasses,
} from "@react-admin/ra-navigation";
import { type MouseEvent, useState, type ReactNode } from "react";
import {
  CheckForApplicationUpdate,
  ListBase,
  useListContext,
} from "react-admin";
import { Link } from "react-router";

export const Layout = ({ children }: { children: ReactNode }) => (
  <ContainerLayout
    appBar={<AppBar />}
    sx={{ [`& .${ContainerLayoutClasses.content}`]: { maxWidth: "unset" } }}
  >
    {children}
    <CheckForApplicationUpdate />
  </ContainerLayout>
);

const AppBar = () => (
  <Header
    menu={<BoardMenu />}
    sx={{
      [`& .${HeaderClasses.toolbar}`]: { justifyContent: "unset", gap: 1 },
      [`& .${HeaderClasses.menu}`]: { flexGrow: 1 },
    }}
  />
);

const BoardMenu = () => (
  <ListBase resource="boards">
    <BoardMenuView />
  </ListBase>
);

const BoardMenuView = () => {
  const { data, error, isPending } = useListContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isPending) {
    return null;
  }
  if (error) {
    return null;
  }

  return (
    <>
      <Button
        id="boards-button"
        aria-controls={open ? "boards-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="medium"
        endIcon={<KeyboardArrowDownIcon />}
      >
        Boards
      </Button>
      <Menu
        id="boards-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "boards-button",
        }}
      >
        {data.map((record) => (
          <MenuItem
            key={record.id}
            component={Link}
            to={`/boards/${record.id}/show`}
          >
            {record.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
