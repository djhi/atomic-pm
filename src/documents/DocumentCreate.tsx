import { Box, Stack } from "@mui/material";
import {
  Create,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useDefaultTitle,
  useGetOne,
  useNotify,
  useTranslate,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import { MarkdownInput } from "@react-admin/ra-markdown";
import { BoardLink } from "../boards/BoardLink";

export const DocumentCreate = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const translate = useTranslate();
  const params = useParams<"boardId">();

  return (
    <Create
      component={Box}
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
      <BoardLink />
      <DocumentTitle />
      <SimpleForm
        component={Box}
        sx={{ py: 4, flex: 1 }}
        toolbar={
          <Toolbar disableGutters sx={{ bgcolor: "transparent" }}>
            <SaveButton alwaysEnable />
          </Toolbar>
        }
      >
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <TextInput source="title" validate={required()} />
        </Stack>
        <MarkdownInput source="content" validate={required()} />
      </SimpleForm>
    </Create>
  );
};

const DocumentTitle = () => {
  const params = useParams<"boardId">();
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  return (
    <>
      <title>{`New Document - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};
