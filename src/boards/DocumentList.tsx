import { Drawer, Stack, Typography } from "@mui/material";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { CreateButton, ReferenceManyField, SimpleList } from "react-admin";
import { useMatch, useNavigate, useParams } from "react-router";
import { DocumentIconField } from "./DocumentIconField";

export const DocumentList = () => {
  const navigate = useNavigate();
  const params = useParams<"boardId">();
  const match = useMatch("/boards/:boardId/documents/*");

  if (!params.boardId) {
    return null;
  }

  return (
    <Drawer
      open={!!match}
      onClose={() => navigate(`/boards/${params.boardId}`)}
      anchor="right"
    >
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
      >
        <SimpleList
          primaryText={(record) => record.title}
          leftIcon={() => <DocumentIconField source="type" />}
          rowClick={(id) => `/boards/${params.boardId}/documents/${id}`}
        />
        <ListLiveUpdate />
      </ReferenceManyField>
    </Drawer>
  );
};
