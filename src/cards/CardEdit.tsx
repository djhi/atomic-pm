import { Fragment, useState } from "react";
import {
  ChipField,
  Confirm,
  DateField,
  FunctionField,
  RaRecord,
  ReferenceArrayField,
  ReferenceArrayInput,
  ReferenceInput,
  ReferenceManyField,
  SimpleList,
  SingleFieldList,
  TextField,
  useCreate,
  useDefaultTitle,
  useDeleteWithConfirmController,
  useEvent,
  useGetOne,
  useListContext,
  useRecordContext,
  useTranslate,
  WithRecord,
} from "react-admin";
import { useNavigate, useParams } from "react-router";
import {
  Divider,
  Stack,
  Tooltip,
  Typography,
  Chip,
  Toolbar,
  Button as MuiButton,
  IconButton,
  CardContent,
} from "@mui/material";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FileIcon from "@mui/icons-material/InsertDriveFile";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { CreateRevisionOnSave } from "@react-admin/ra-history";
import { MarkdownField } from "@react-admin/ra-markdown";
import { EditDialog } from "@react-admin/ra-form-layout";
import Dropzone from "react-dropzone";
import { LockOnMount } from "../ra/LockOnMount";
import { FormWithLockSupport } from "../ra/FormWithLockSupport";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { EditInPlaceInput } from "../ra/EditInPlaceInput";
import { EditInPlace } from "../ra/EditInPlace";
import { RichTextMarkdownInput } from "../ra/RichTextMarkdownInput";
import { PopoverInput } from "../ra/PopoverInput";
import { ReferenceField } from "../ra/ReferenceField";
import { ListSelectorInput } from "../ra/ListSelectorInput";
import { AvatarField } from "../ui/AvatarField";
import { NewMessage } from "./NewMessage";
import { HideHistoryButton } from "./HideHistoryButton";
import { CardRevisionDetails } from "./CardRevisionDetails";
import { EstimatesChoicesInput } from "./EstimatesChoicesInput";
import { useCardFromBoardAndNumber } from "./useCardFromBoardAndNumber";
import { useSignedUrl } from "../ra/useSignedUrl";

export const CardEdit = () => {
  const params = useParams<"boardId">();
  const { data: card } = useCardFromBoardAndNumber();
  const [fullScreen, setFullScreen] = useState(false);
  const navigate = useNavigate();
  const translate = useTranslate();
  if (!card) return null;

  return (
    <EditDialog
      resource="cards"
      id={card.id}
      record={card}
      close={() => navigate(`/boards/${params.boardId}`)}
      fullWidth
      fullScreen={fullScreen}
      maxWidth="lg"
      title={
        <Tooltip
          // Prevent ghost tooltip
          key={String(fullScreen)}
          title={translate(
            fullScreen ? "pm.exit_full_screen" : "pm.full_screen",
          )}
          placement="top"
        >
          <IconButton
            aria-label={translate(
              fullScreen ? "pm.exit_full_screen" : "pm.full_screen",
            )}
            onClick={() => setFullScreen(!fullScreen)}
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
      }
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        "& .MuiDialog-paper": {
          minHeight: "80vh",
        },
        "& .MuiCardContent-root": {
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <CardContent>
        <CardEditView />
      </CardContent>
    </EditDialog>
  );
};

const CardEditView = () => {
  const params = useParams<"boardId" | "id">();
  const translate = useTranslate();
  const record = useRecordContext();
  const [create] = useCreate("card_attachments");
  const handleDropFile = useEvent((files: File[]) => {
    if (!record) return;

    for (const file of files) {
      create("card_attachments", {
        data: {
          board_id: params.boardId,
          card_id: record.id,
          file,
        },
      });
    }
  });
  return (
    <Dropzone multiple onDrop={handleDropFile} noClick noKeyboard>
      {({ getRootProps, getInputProps, open: openFileDialog }) => (
        <>
          <CardTitle />
          <input {...getInputProps()} />
          <Stack direction="column" gap={4} flexGrow={1} {...getRootProps()}>
            <Stack direction="row" gap={4} flexGrow={1} pb={4}>
              <Stack
                direction="column"
                flexGrow={1}
                sx={{
                  mt: -4,
                  "& form": {
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  },
                }}
              >
                <LockOnMount />
                <RecordLiveUpdate />
                <CreateRevisionOnSave skipUserDetails>
                  <FormWithLockSupport
                    id="card-edit-form"
                    sx={{
                      p: 0,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      "& > .MuiStack-root": { flexGrow: 1, gap: 2 },
                    }}
                    toolbar={<Fragment />}
                  >
                    <Stack direction="row" gap={1} width="100%">
                      <FunctionField
                        source="number"
                        variant="h3"
                        sx={{ color: "text.secondary", fontWeight: "normal" }}
                        render={(record) => `#${record.number}`}
                      />
                      <EditInPlaceInput
                        source="title"
                        renderField={(ref) => (
                          <Tooltip title="Double click to edit" placement="top">
                            <TextField
                              ref={ref}
                              source="title"
                              variant="h3"
                              component="h2"
                            />
                          </Tooltip>
                        )}
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      gap={2}
                      alignItems="center"
                      width="100%"
                    >
                      <PopoverInput
                        source="column_id"
                        input={
                          <ReferenceInput
                            source="column_id"
                            reference="columns"
                            filter={{ board_id: params.boardId }}
                            sort={{ field: "position", order: "ASC" }}
                          >
                            <ListSelectorInput optionText="name" />
                          </ReferenceInput>
                        }
                      >
                        <ReferenceField
                          source="column_id"
                          reference="columns"
                          link={false}
                          emptyText={
                            <Chip
                              label={translate("pm.no_column")}
                              icon={<StopCircleIcon />}
                            />
                          }
                        >
                          <ChipField source="name" icon={<StopCircleIcon />} />
                        </ReferenceField>
                      </PopoverInput>
                      <PopoverInput
                        source="assigned_user_ids"
                        input={
                          <ReferenceArrayInput
                            source="assigned_user_ids"
                            reference="board_members_with_profiles"
                            filter={{ board_id: params.boardId }}
                            sort={{ field: "email", order: "ASC" }}
                          >
                            <ListSelectorInput optionText="email" multiple />
                          </ReferenceArrayInput>
                        }
                      >
                        <ReferenceArrayField
                          source="assigned_user_ids"
                          reference="board_members_with_profiles"
                        >
                          <SingleFieldList
                            linkType={false}
                            empty={
                              <Chip
                                label={translate("pm.unnasigned")}
                                icon={<AccountCircleIcon />}
                              />
                            }
                          >
                            <ChipField source="email" icon={<AvatarField />} />
                          </SingleFieldList>
                        </ReferenceArrayField>
                      </PopoverInput>
                      <PopoverInput
                        source="estimate"
                        input={
                          <EstimatesChoicesInput source="estimate">
                            <ListSelectorInput />
                          </EstimatesChoicesInput>
                        }
                      >
                        <FunctionField
                          render={(record) => {
                            if (record.estimate) {
                              return (
                                <ChipField
                                  source="estimate"
                                  icon={<AddCircleIcon />}
                                />
                              );
                            }
                            return (
                              <Chip
                                label={translate("pm.no_estimate")}
                                icon={<AddCircleIcon />}
                              />
                            );
                          }}
                        />
                      </PopoverInput>
                    </Stack>
                    <ReferenceManyField
                      reference="card_attachments"
                      target="card_id"
                    >
                      <AttachmentList openFileDialog={openFileDialog} />
                    </ReferenceManyField>
                    <EditInPlace
                      sx={{ mt: 4, flexGrow: 1 }}
                      input={
                        <>
                          <RichTextMarkdownInput
                            source="description"
                            fullWidth
                            label={false}
                          />
                          <Toolbar disableGutters>
                            <Stack direction="row" spacing={1}>
                              <MuiButton size="small" type="submit">
                                {translate("ra.action.save")}
                              </MuiButton>
                              <EditInPlace.CancelButton size="small" />
                            </Stack>
                          </Toolbar>
                        </>
                      }
                    >
                      <Tooltip title="Double click to edit">
                        <Stack>
                          <WithRecord
                            render={(record) =>
                              record?.description ? (
                                <MarkdownField
                                  key={record.description}
                                  source="description"
                                  label={false}
                                  sx={{
                                    flexGrow: 1,
                                    "& .toastui-editor-contents": {
                                      typography: "body1",
                                    },
                                  }}
                                />
                              ) : (
                                <Typography variant="body1">
                                  {translate("pm.no_description")}
                                </Typography>
                              )
                            }
                          />
                        </Stack>
                      </Tooltip>
                    </EditInPlace>
                  </FormWithLockSupport>
                </CreateRevisionOnSave>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="column" gap={1} flexGrow={0} width={1 / 4}>
                <NewMessage />
                <ReferenceManyField
                  reference="card_events"
                  target="card_id"
                  perPage={1000}
                  filter={{ type: "comment" }}
                >
                  <HideHistoryButton />
                  <SimpleList
                    disablePadding
                    sx={{ "& li": { px: 0 } }}
                    empty={
                      <Typography variant="body2">
                        {translate("pm.no_history")}
                      </Typography>
                    }
                    primaryText={(record) => (
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={1}
                        component="span"
                      >
                        <ReferenceField
                          source="user_id"
                          reference="profiles"
                          link={false}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            component="span"
                            alignItems="center"
                          >
                            <AvatarField />
                            <FunctionField
                              render={(record) => {
                                if (record.first_name && record.last_name) {
                                  return `${record.first_name} ${record.last_name}`;
                                }
                                if (record.first_name) {
                                  return record.first_name;
                                }
                                return record.email;
                              }}
                              sx={{ fontWeight: "bold" }}
                            />
                          </Stack>
                        </ReferenceField>
                        <DateField
                          record={record}
                          color="textSecondary"
                          source="date"
                          showTime
                          options={{ dateStyle: "short", timeStyle: "short" }}
                        />
                      </Stack>
                    )}
                    secondaryText={(record) => (
                      <Stack
                        direction="row"
                        component="span"
                        gap={1}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        {record?.type === "revision" ? (
                          <CardRevisionDetails />
                        ) : (
                          <TextField
                            source="message"
                            component="pre"
                            variant="body1"
                            sx={{
                              display: "block",
                              width: "100%",
                              p: 2,
                              bgcolor: (theme) => theme.palette.action.hover,
                              borderRadius: (theme) => theme.shape.borderRadius,
                            }}
                          />
                        )}
                      </Stack>
                    )}
                  />
                  <ListLiveUpdate />
                </ReferenceManyField>
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </Dropzone>
  );
};

const CardTitle = () => {
  const record = useRecordContext();
  const params = useParams<"boardId">();
  const { data: column } = useGetOne(
    "columns",
    { id: record?.column_id },
    { enabled: record?.column_id != null },
  );
  const { data: board } = useGetOne(
    "boards",
    { id: params.boardId },
    { enabled: !!params.boardId },
  );
  const appTitle = useDefaultTitle();
  if (!record) return null;
  return (
    <title>{`${record?.title} - ${column?.name} - ${board?.name} - ${appTitle}`}</title>
  );
};

const AttachmentList = ({ openFileDialog }: { openFileDialog: () => void }) => {
  const { data } = useListContext();

  return (
    <Stack direction="row" gap={1} alignItems="center" justifyContent="center">
      {data?.map((record) => (
        <AttachmentItem key={record.id} record={record} />
      ))}
      <Tooltip title="Add attachment">
        <IconButton
          onClick={() => openFileDialog()}
          aria-label="Add attachment"
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

const AttachmentItem = ({ record }: { record: RaRecord }) => {
  const fileName = record.path.split("/").pop().split(".")[0];
  const { data: signedUrl } = useSignedUrl({
    bucket: "documents",
    filePath: record?.path,
  });
  const { open, isPending, handleDialogOpen, handleDialogClose, handleDelete } =
    useDeleteWithConfirmController({
      resource: "card_attachments",
      record,
      redirect: false,
    });
  const handleDeleteButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    handleDialogOpen(event);
  };
  return (
    <>
      <Chip
        clickable
        component="a"
        download
        target="_blank"
        href={signedUrl}
        label={fileName}
        icon={<FileIcon />}
        onDelete={handleDeleteButtonClick}
      />
      <Confirm
        isOpen={open}
        loading={isPending}
        title="ra.message.delete_title"
        content="ra.message.delete_content"
        translateOptions={{
          name: "",
          id: fileName,
        }}
        onConfirm={handleDelete}
        onClose={handleDialogClose}
      />
    </>
  );
};
