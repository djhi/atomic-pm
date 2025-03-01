import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { type MouseEvent, useState } from "react";
import { Button, ListBase, RaRecord, useListContext } from "react-admin";
import { Link, useMatch } from "react-router";
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
        size="small"
        variant="text"
        color="inherit"
        endIcon={<KeyboardArrowDownIcon />}
        label="Boards"
      />
      <Menu
        id="boards-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { "aria-labelledby": "boards-button" },
        }}
      >
        {data.map((record) => (
          <BoardMenuItem key={record.id} record={record} />
        ))}
      </Menu>
    </>
  );
};

const BoardMenuItem = ({ record }: { record: RaRecord }) => {
  const match = useMatch(`/boards/${record.id}/*`);
  return (
    <MenuItem
      key={record.id}
      component={Link}
      to={`/boards/${record.id}`}
      selected={!!match}
    >
      {record.name}
    </MenuItem>
  );
};
