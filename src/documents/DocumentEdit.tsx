import { Stack } from "@mui/material";
import {
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
import { MarkdownInput } from "@react-admin/ra-markdown";
import { EditDialog } from "@react-admin/ra-form-layout";
import { useState } from "react";
import { FormToolbar } from "../ra/FormToolbar";
import { FullscreenDialogButton } from "../ui/FullscreenDialogButton";

export const DocumentEdit = () => {
  const navigate = useNavigate();
  const translate = useTranslate();
  const params = useParams<"boardId">();
  const match = useMatch("/boards/:boardId/documents/:id");
  const notify = useNotify();
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <EditDialog
      id={match?.params.id}
      resource="documents"
      close={() => navigate(`/boards/${params.boardId}/documents`)}
      fullWidth
      maxWidth="lg"
      title={
        <DocumentTitle fullScreen={fullScreen} setFullScreen={setFullScreen} />
      }
      fullScreen={fullScreen}
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
      <SimpleForm toolbar={<FormToolbar />}>
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
    </EditDialog>
  );
};

const DocumentTitle = ({
  fullScreen,
  setFullScreen,
}: {
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
      {record?.title}
      <FullscreenDialogButton
        fullScreen={fullScreen}
        onClick={() => setFullScreen((previous) => !previous)}
      />
      <title>{`${record?.title} - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};
