import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { type MouseEvent, useState } from "react";
import { ListBase, useListContext } from "react-admin";
import { Link } from "react-router";
import { ListLiveUpdate } from "@react-admin/ra-realtime";

export const BoardMenu = () => (
  <ListBase resource="boards">
    <BoardMenuView />
    <ListLiveUpdate />
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
