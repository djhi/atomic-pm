import { Drawer, Stack } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import {
  BooleanInput,
  EditBase,
  required,
  SimpleForm,
  TextInput,
  useDefaultTitle,
  useGetOne,
  useNotify,
  useRecordContext,
  useTranslate,
} from "react-admin";
import { useMatch, useNavigate, useParams } from "react-router";

export const DocumentEdit = () => {
  const navigate = useNavigate();
  const translate = useTranslate();
  const params = useParams<"boardId">();
  const match = useMatch("/boards/:boardId/documents/:id");
  const notify = useNotify();

  return (
    <Drawer
      open={!!match && match.params.id !== "create"}
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
      {match?.params.id ? (
        <EditBase
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
        </EditBase>
      ) : null}
    </Drawer>
  );
};

const DocumentTitle = () => {
  const record = useRecordContext();
  const params = useParams<"boardId">();
  const { data: board } = useGetOne("boards", { id: params.boardId }, { enabled: !!params.boardId });
  const appTitle = useDefaultTitle();
  return (
    <>
      <title>{`${record?.title} - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};