import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UnFavoriteIcon from "@mui/icons-material/FavoriteBorder";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import {
  CreateButton,
  RecordContextProvider,
  ReferenceManyField,
  useCreate,
  useDefaultTitle,
  useGetOne,
  useListContext,
  useNotify,
  useRecordContext,
  useTranslate,
  useUpdate,
} from "react-admin";
import { useMatch, useNavigate, useParams } from "react-router";
import Dropzone from "react-dropzone";
import { DocumentIconField } from "./DocumentIconField";
import { DocumentLink } from "./DocumentLink";

export const DocumentList = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();
  const match = useMatch("/boards/:boardId/documents/*");
  const [create] = useCreate("documents");
  const translate = useTranslate();

  const handleDropFile = (documents: File[]) => {
    const title = prompt("Enter the document title");
    if (!title) return;
    create("documents", {
      data: { board_id: params.boardId, title, content: documents[0] },
    });
  };

  if (!params.boardId) {
    return null;
  }

  return (
    <Drawer
      open={!!match}
      onClose={() => navigate(`/boards/${params.boardId}`)}
      anchor="right"
      slotProps={{
        paper: { sx: { width: "30vw" } },
      }}
    >
      <DocumentsTitle />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pr: 2 }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Documents
        </Typography>
        <CreateButton
          resource="documents"
          to={{
            pathname: `/boards/${params.boardId}/documents/create`,
            search: `?source=${JSON.stringify({ board_id: params.boardId })}`,
          }}
        />
      </Stack>
      <ReferenceManyField
        target="board_id"
        record={{ id: params.boardId }}
        reference="documents"
        perPage={1000}
        sort={{ field: "created_at", order: "ASC" }}
      >
        <DocumentListView />
        <ListLiveUpdate />
      </ReferenceManyField>
      <Dropzone multiple={false} onDrop={handleDropFile}>
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            sx={{
              m: 2,
              p: 2,
              border: "1px dashed grey",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="h6" color="textSecondary" align="center">
              {translate('pm.document_drop_instructions')}
            </Typography>
          </Box>
        )}
      </Dropzone>
    </Drawer>
  );
};

const DocumentListView = () => {
  const { data } = useListContext();
  // Put favorites first, then sort by title
  const sortedDocuments = data?.sort(
    (a, b) =>
      Number(b.favorite) - Number(a.favorite) || a.title.localeCompare(b.title),
  );

  return (
    <List disablePadding>
      {sortedDocuments?.map((record) => (
        <RecordContextProvider value={record} key={record.id}>
          <DocumentListItem />
        </RecordContextProvider>
      ))}
    </List>
  );
};

const DocumentsTitle = () => {
  const params = useParams<"boardId">();
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  return (
    <>
      <title>{`Documents - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};

const DocumentListItem = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const [update] = useUpdate();
  if (!record) return null;

  return (
    <ListItemButton component={DocumentLink}>
      <ListItemIcon>
        <DocumentIconField source="type" record={record} />
      </ListItemIcon>
      <ListItemText primary={record.title} />
      <IconButton
        edge="end"
        aria-label="delete"
        sx={{ position: "absolute", right: 24 }}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          update(
            "documents",
            {
              id: record?.id,
              data: {
                favorite: !record.favorite,
              },
              previousData: record,
            },
            {
              mutationMode: "optimistic",
              onSuccess: (data) => {
                notify(
                  `Document ${data.title} was ${
                    data.favorite
                      ? "added to favorites"
                      : "removed from favorites"
                  }`,
                );
              },
            },
          );
        }}
      >
        {record.favorite ? <FavoriteIcon /> : <UnFavoriteIcon />}
      </IconButton>
    </ListItemButton>
  );
};
