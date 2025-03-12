import { Box, Stack } from "@mui/material";
import {
  DeleteButton,
  Edit,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  ToolbarClasses,
  useDefaultTitle,
  useGetOne,
  useNotify,
  useRecordContext,
  useTranslate,
} from "react-admin";
import { useMatch, useNavigate, useParams } from "react-router";
import { CardBoardTitle } from "./CardBoardTitle";
import { MarkdownInput } from "@react-admin/ra-markdown";

export const DocumentEdit = () => {
  const navigate = useNavigate();
  const translate = useTranslate();
  const params = useParams<"boardId">();
  const match = useMatch("/boards/:boardId/documents/:id");
  const notify = useNotify();

  return (
    <Edit
      component={Box}
      id={match?.params.id}
      resource="documents"
      mutationOptions={{
        onSuccess: () => {
          notify(`resources.documents.notifications.updated`, {
            type: "info",
            messageArgs: {
              smart_count: 1,
              _: translate("ra.notification.updated", { smart_count: 1 }),
            },
            undoable: true,
          });
          navigate(`/boards/${params.boardId}/documents`);
        },
      }}
    >
      <CardBoardTitle />
      <DocumentTitle />
      <SimpleForm
        component={Box}
        sx={{ py: 4, flex: 1 }}
        toolbar={
          <Toolbar disableGutters sx={{ bgcolor: "transparent" }}>
            <div className={ToolbarClasses.defaultToolbar}>
              <SaveButton alwaysEnable />
              <DeleteButton color="inherit" />
            </div>
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
    </Edit>
  );
};

const DocumentTitle = () => {
  const record = useRecordContext();
  const params = useParams<"boardId">();
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  return (
    <>
      <title>{`${record?.title} - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};
