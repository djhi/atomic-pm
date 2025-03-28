import * as React from "react";
import {
  Button,
  ListBase,
  RaRecord,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useEvent,
  useGetIdentity,
  useListContext,
  useTranslate,
} from "react-admin";
import { useMatch, useNavigate, useParams } from "react-router";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { CreateDialog } from "@react-admin/ra-form-layout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MenuButton } from "../ra/MenuButton/MenuButton";
import { useMenuButton } from "../ra/MenuButton/useMenuButton";
import { MenuItem, MenuItemProps } from "@mui/material";

export const BoardMenu = () => (
  <ListBase resource="boards">
    <BoardMenuView />
    <ListLiveUpdate />
  </ListBase>
);

const BoardMenuView = () => {
  const { data, error, isPending } = useListContext();
  const { identity } = useGetIdentity();
  const [createBoard, setCreateBoard] = React.useState(false);
  const params = useParams<"boardId">();
  const navigate = useNavigate();
  const handleCreateBoardClick = useEvent(() => {
    setCreateBoard(true);
  });

  if (isPending) {
    return null;
  }
  if (error) {
    return null;
  }

  return (
    <>
      <MenuButton
        key={params.boardId}
        button={<BoardMenuButton />}
        id="boards-menu"
      >
        {data.map((record) => (
          <BoardMenuItem key={record.id} record={record} />
        ))}
        <CreateBoardMenuItem onClick={handleCreateBoardClick} />
      </MenuButton>

      <CreateDialog
        isOpen={createBoard}
        close={() => setCreateBoard(false)}
        resource="boards"
        maxWidth="md"
        fullWidth
        record={{ user_id: identity?.id, created_at: new Date().toISOString() }}
        mutationOptions={{
          onSuccess: (data) => navigate(`/boards/${data.id}`),
        }}
      >
        <SimpleForm
          toolbar={
            <Toolbar
              sx={{
                "&.RaToolbar-desktopToolbar": { px: 2 },
                bgcolor: "transparent",
                justifyContent: "end",
              }}
            >
              <SaveButton variant="outlined" color="inherit" alwaysEnable />
            </Toolbar>
          }
        >
          <TextInput source="name" validate={required()} autoFocus />
          <TextInput source="description" multiline minRows={4} />
        </SimpleForm>
      </CreateDialog>
    </>
  );
};

const CreateBoardMenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  ({ onClick, ...props }, ref) => {
    const { closeMenu } = useMenuButton();
    const translate = useTranslate();
    return (
      <MenuItem
        {...props}
        ref={ref}
        onClick={(event) => {
          closeMenu();
          onClick && onClick(event);
        }}
      >
        {translate("pm.newBoard")}
      </MenuItem>
    );
  },
);

const BoardMenuButton = () => {
  const { isOpen, openMenu } = useMenuButton();

  return (
    <Button
      id="boards-button"
      aria-controls={isOpen ? "boards-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={isOpen ? "true" : undefined}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        openMenu(event.currentTarget);
      }}
      size="small"
      variant="text"
      color="inherit"
      endIcon={<KeyboardArrowDownIcon />}
      label="pm.boards"
    />
  );
};

const BoardMenuItem = React.forwardRef<HTMLAnchorElement, { record: RaRecord }>(
  ({ record }, ref) => {
    const match = useMatch(`/boards/${record.id}/*`);
    return (
      <MenuButton.LinkItem
        to={`/boards/${record.id}`}
        selected={!!match}
        label={record.name}
        ref={ref}
      />
    );
  },
);
