import { IconButton, Stack, Tooltip } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import {
  required,
  SimpleForm,
  TextInput,
  useDefaultTitle,
  useGetOne,
  useNotify,
  useTranslate,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import { MarkdownInput } from "@react-admin/ra-markdown";
import { CreateDialog } from "@react-admin/ra-form-layout";
import { useState } from "react";
import { FormToolbar } from "../ra/FormToolbar";

export const DocumentCreate = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const translate = useTranslate();
  const params = useParams<"boardId">();
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <CreateDialog
      resource="documents"
      title={
        <DocumentTitle fullScreen={fullScreen} setFullScreen={setFullScreen} />
      }
      fullWidth
      maxWidth="lg"
      fullScreen={fullScreen}
      close={() => navigate(`/boards/${params.boardId}/documents`)}
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
    </CreateDialog>
  );
};

const DocumentTitle = ({
  fullScreen,
  setFullScreen,
}: {
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const params = useParams<"boardId">();
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  const translate = useTranslate();
  const title = translate("pm.newDocument");
  return (
    <>
      {title}
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
      <title>{`${title} - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};
