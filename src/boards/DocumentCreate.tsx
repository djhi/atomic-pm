import { Drawer, Stack } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import {
  BooleanInput,
  CreateBase,
  required,
  SimpleForm,
  TextInput,
  useDefaultTitle,
  useGetOne,
  useNotify,
  useTranslate,
} from "react-admin";
import { useMatch, useNavigate, useParams } from "react-router";

export const DocumentCreate = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const translate = useTranslate();
  const params = useParams<"boardId">();
  const match = useMatch("/boards/:boardId/documents/create");

  return (
    <Drawer
      open={!!match}
      onClose={() => navigate(`/boards/${params.boardId}/documents`)}
      anchor="right"
      PaperProps={{
        sx: {
          mr: "30vw",
          flexDirection: "row",
          "& form": { flex: 1, display: "flex", flexDirection: "column" },
        },
      }}
    >
      <CreateBase
        resource="documents"
        mutationOptions={{
          onSuccess: () => {
            notify(`resources.documents.notifications.created`, {
              type: "info",
              messageArgs: {
                smart_count: 1,
                _: translate(`ra.notification.created`, { smart_count: 1 }),
              },
            });
            navigate(`/boards/${params.boardId}/documents`);
          },
        }}
      >
        <DocumentTitle />
        <SimpleForm sx={{ flex: 1 }}>
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <TextInput source="title" validate={required()} />
            <BooleanInput source="favorite" />
          </Stack>
          <RichTextInput source="content" validate={required()} />
        </SimpleForm>
      </CreateBase>
    </Drawer>
  );
};

const DocumentTitle = () => {
  const params = useParams<"boardId">();
  const { data: board } = useGetOne("boards", { id: params.boardId }, { enabled: !!params.boardId });
  const appTitle = useDefaultTitle();
  return (
    <>
      <title>{`New Document - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};