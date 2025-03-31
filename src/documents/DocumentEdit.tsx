import { IconButton, Stack, Tooltip } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import {
  DeleteButton,
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
import { MarkdownInput } from "@react-admin/ra-markdown";
import { EditDialog } from "@react-admin/ra-form-layout";
import { useState } from "react";

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
      <SimpleForm
        toolbar={
          <Toolbar>
            <div className={ToolbarClasses.defaultToolbar}>
              <DeleteButton color="inherit" />
              <SaveButton alwaysEnable variant="outlined" color="inherit" />
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
  const translate = useTranslate();
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  return (
    <>
      {record?.title}
      <Tooltip
        // Prevent ghost tooltip
        key={String(fullScreen)}
        title={translate(fullScreen ? "pm.exit_full_screen" : "pm.full_screen")}
        placement="top"
      >
        <IconButton
          aria-label={translate(
            fullScreen ? "pm.exit_full_screen" : "pm.full_screen",
          )}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            setFullScreen((prev) => !prev);
          }}
          sx={{
            position: "absolute",
            right: (theme) => theme.spacing(4),
            top: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Tooltip>
      <title>{`${record?.title} - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};
