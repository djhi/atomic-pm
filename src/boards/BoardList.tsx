import {
  Box,
  Card,
  CardContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import {
  DeleteButton,
  EmptyClasses,
  EmptyProps,
  FunctionField,
  Link,
  List,
  RecordContextProvider,
  RecordRepresentation,
  ReferenceField,
  required,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  ToolbarClasses,
  TopToolbar,
  useDefaultTitle,
  useGetResourceLabel,
  useListContext,
  useRecordContext,
  useResourceContext,
  useResourceDefinition,
  useTranslate,
} from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import Inbox from "@mui/icons-material/Inbox";
import { BoardCreate } from "./BoardCreate";
import { MenuButton } from "../ra/MenuButton/MenuButton";

export const BoardList = () => (
  <>
    <List
      resource="boards"
      component="div"
      actions={<BoardListActions />}
      empty={<BoardEmpty />}
      title={<BoardListTitle />}
    >
      <BoardListView />
      <ListLiveUpdate />
    </List>
  </>
);

const BoardListTitle = () => {
  const appTitle = useDefaultTitle();
  const { defaultTitle } = useListContext();
  return (
    <>
      <span>{defaultTitle}</span>
      <title>{`${defaultTitle} - ${appTitle}`}</title>
    </>
  );
};

const BoardListActions = () => (
  <TopToolbar>
    <BoardCreate />
  </TopToolbar>
);

const BoardListView = () => {
  const { data, error, isPending } = useListContext();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid2 container spacing={2}>
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
            <BoardListItem />
          </Grid2>
        </RecordContextProvider>
      ))}
    </Grid2>
  );
};

const BoardListItem = () => {
  const board = useRecordContext();
  if (!board) return null;
  return (
    <Link to={`/boards/${board.id}`} sx={{ textDecoration: "none" }}>
      <Card
        sx={{ "&:hover": { bgcolor: (theme) => theme.palette.action.hover } }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField source="name" gutterBottom variant="h5" component="h2" />
            <BoardMenu />
          </Stack>
          <TextField
            source="description"
            component="div"
            variant="body2"
            sx={{ color: "text.secondary" }}
          />
          <ReferenceField source="user_id" reference="profiles">
            <FunctionField render={(user) => `Created by ${user.email}`} />
          </ReferenceField>
        </CardContent>
      </Card>
    </Link>
  );
};

const BoardMenu = () => {
  const board = useRecordContext();
  if (!board) return null;

  return (
    <MenuButton ButtonProps={{ label: "pm.actionList" }}>
      <MenuButton.RecordLinkItem label="ra.action.show" link="show" />
      <MenuButton.EditInDialog title={<RecordRepresentation />}>
        <SimpleForm
          toolbar={
            <Toolbar>
              <div className={ToolbarClasses.defaultToolbar}>
                <SaveButton alwaysEnable />
                <DeleteButton color="inherit" />
              </div>
            </Toolbar>
          }
        >
          <TextInput source="name" validate={required()} />
          <TextInput source="description" multiline minRows={4} />
        </SimpleForm>
      </MenuButton.EditInDialog>
      <MenuButton.DeleteItem mutationMode="pessimistic" />
    </MenuButton>
  );
};

const BoardEmpty = (props: EmptyProps) => {
  const { className } = props;
  const { hasCreate } = useResourceDefinition(props);
  const resource = useResourceContext(props);
  const translate = useTranslate();
  const getResourceLabel = useGetResourceLabel();
  const resourceName = translate(`resources.${resource}.forcedCaseName`, {
    smart_count: 0,
    _: resource ? getResourceLabel(resource, 0) : undefined,
  });

  const emptyMessage = translate("ra.page.empty", { name: resourceName });
  const inviteMessage = translate("ra.page.invite");

  return (
    <Box
      sx={{
        flex: 1,
        [`& .${EmptyClasses.message}`]: {
          textAlign: "center",
          opacity: (theme) => (theme.palette.mode === "light" ? 0.5 : 0.8),
          margin: "0 1em",
          color: (theme) =>
            theme.palette.mode === "light"
              ? "inherit"
              : theme.palette.text.primary,
        },

        [`& .${EmptyClasses.icon}`]: {
          width: "9em",
          height: "9em",
        },

        [`& .${EmptyClasses.toolbar}`]: {
          textAlign: "center",
          marginTop: "2em",
        },
      }}
      className={className}
    >
      <div className={EmptyClasses.message}>
        <Inbox className={EmptyClasses.icon} />
        <Typography variant="h4" paragraph>
          {translate(`resources.${resource}.empty`, {
            _: emptyMessage,
          })}
        </Typography>
        {hasCreate && (
          <Typography variant="body1">
            {translate(`resources.${resource}.invite`, {
              _: inviteMessage,
            })}
          </Typography>
        )}
      </div>
      <div className={EmptyClasses.toolbar}>
        <BoardCreate />
      </div>
    </Box>
  );
};
