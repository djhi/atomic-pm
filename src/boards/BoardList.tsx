import {
  Box,
  Card,
  CardContent,
  darken,
  Grid2,
  lighten,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import {
  DeleteButton,
  EmptyClasses,
  EmptyProps,
  FunctionField,
  Identifier,
  InfiniteList,
  Link,
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
  useEvent,
  useGetResourceLabel,
  useListContext,
  useRecordContext,
  useResourceContext,
  useResourceDefinition,
  useStore,
  useTranslate,
} from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import Inbox from "@mui/icons-material/Inbox";
import { BoardCreate } from "./BoardCreate";
import { MenuButton } from "../ra/MenuButton/MenuButton";

export const BoardList = () => (
  <>
    <InfiniteList
      resource="boards"
      component="div"
      actions={<BoardListActions />}
      empty={<BoardEmpty />}
      title={<BoardListTitle />}
    >
      <BoardListView />
      <ListLiveUpdate />
    </InfiniteList>
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
  const [visitDates] = useLastVisitDates();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort boards by last visit date most recent first
  // Sort the others by creation date
  const sortedData = data.sort((a, b) => {
    if (visitDates[b.id] && visitDates[a.id]) {
      return (
        new Date(visitDates[b.id]).getTime() -
        new Date(visitDates[a.id]).getTime()
      );
    }
    if (visitDates[b.id]) {
      return 1;
    }
    if (visitDates[a.id]) {
      return -1;
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <Grid2 container spacing={2}>
      {sortedData.map((record) => (
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
  const [, setVisitDates] = useLastVisitDates();

  const recordLastVisit = useEvent((boardId: Identifier) => {
    // Postpone the update to avoid re-rendering the list
    setTimeout(() => {
      setVisitDates((visitDates: Record<string, Date>) => ({
        ...visitDates,
        [boardId]: new Date().toISOString(),
      }));
    }, 50);
  });

  if (!board) return null;
  return (
    <Link
      to={`/boards/${board.id}`}
      sx={{ textDecoration: "none" }}
      onClick={() => recordLastVisit(board.id)}
    >
      <Card
        sx={{
          bgcolor: (theme: Theme) =>
            theme.palette.mode === "dark"
              ? lighten(theme.palette.background.default, 0.05)
              : darken(theme.palette.background.default, 0.1),
          "&:hover": { bgcolor: (theme) => theme.palette.action.hover },
        }}
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
                <DeleteButton color="inherit" />
                <SaveButton variant="outlined" color="inherit" alwaysEnable />
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

const useLastVisitDates = () =>
  useStore<Record<string, Date>>("boards.visit_dates", {});
