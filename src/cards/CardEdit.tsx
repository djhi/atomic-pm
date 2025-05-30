import { Fragment, useMemo, useRef, useState } from "react";
import {
  ChipField,
  DateField,
  Form,
  FunctionField,
  Identifier,
  RaRecord,
  ReferenceArrayField,
  ReferenceArrayInput,
  ReferenceManyField,
  SaveContextProvider,
  SimpleList,
  SingleFieldList,
  TextField,
  Translate,
  useCreate,
  useDefaultTitle,
  useEvent,
  useGetOne,
  useRecordContext,
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
  CardContent,
} from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TagIcon from "@mui/icons-material/Sell";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { CreateRevisionOnSave } from "@react-admin/ra-history";
import { MarkdownField } from "@react-admin/ra-markdown";
import { EditDialog } from "@react-admin/ra-form-layout";
import Dropzone from "react-dropzone";
import { FormWithLockSupport } from "../ra/FormWithLockSupport";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { EditInPlaceInput } from "../ra/EditInPlaceInput";
import { EditInPlace } from "../ra/EditInPlace";
import { RichTextMarkdownInput } from "../ra/RichTextMarkdownInput";
import { PopoverForm } from "../ra/PopoverForm";
import { ReferenceField } from "../ra/ReferenceField";
import { ListSelectorInput } from "../ra/ListSelectorInput";
import { AvatarField } from "../ui/AvatarField";
import { NewMessage } from "./NewMessage";
import { HideHistoryButton } from "./HideHistoryButton";
import { CardRevisionDetails } from "./CardRevisionDetails";
import { EstimatesChoicesInput } from "./EstimatesChoicesInput";
import { useCardFromBoardAndNumber } from "./useCardFromBoardAndNumber";
import { useUpdateBoard } from "../useUpdateBoard";
import { MenuButton } from "../ra/MenuButton/MenuButton";
import { TagsSelector } from "./TagsSelector";
import { AvatarList } from "../ui/AvatarList";
import { ColumnSelector } from "./ColumnSelector";
import { AttachmentList } from "./AttachmentList";
import { FullscreenDialogButton } from "../ui/FullscreenDialogButton";

export const CardEdit = () => {
  const params = useParams<"boardId">();
  const { data: card } = useCardFromBoardAndNumber();
  const { updateCard } = useUpdateBoard();
  const [fullScreen, setFullScreen] = useState(false);
  const navigate = useNavigate();
  const closeIsFromMutationSuccess = useRef(false);
  if (!card) return null;

  return (
    <EditDialog
      resource="cards"
      id={card.id}
      record={card}
      close={() => {
        // We don't want to close the dialog on mutation success
        if (closeIsFromMutationSuccess.current) {
          closeIsFromMutationSuccess.current = false;
          return;
        }
        navigate(`/boards/${params.boardId}`);
      }}
      fullWidth
      fullScreen={fullScreen}
      mutationMode="pessimistic"
      mutationOptions={{
        onSuccess: (data: RaRecord) => {
          updateCard({
            board_id: params.boardId!,
            record: data,
            update: () => data,
          });
          closeIsFromMutationSuccess.current = true;
        },
      }}
      maxWidth="lg"
      title={
        <FullscreenDialogButton
          fullScreen={fullScreen}
          onClick={() => setFullScreen((previous) => !previous)}
        />
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
  const record = useRecordContext();
  const navigate = useNavigate();
  const [create] = useCreate("card_attachments");
  const { updateColumn, updateCard, moveCard } = useUpdateBoard();

  const columnSelectorSaveContext = useMemo(
    () => ({
      save: (data: { column_id: Identifier; position: number }) => {
        moveCard({
          board_id: params.boardId!,
          cardId: record!.id,
          sourceColumnId: record!.column_id,
          destinationColumnId: data.column_id,
          position: data.position,
        });
      },
    }),
    [],
  );

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
                }}
              >
                {/* disabled until locks can be removed on tab close <LockOnMount /> */}
                <RecordLiveUpdate />
                <CreateRevisionOnSave skipUserDetails>
                  <Stack direction="column" gap={1}>
                    <Stack direction="row" gap={1} width="100%" mb={2}>
                      <FunctionField
                        source="number"
                        variant="h3"
                        sx={{ color: "text.secondary", fontWeight: "normal" }}
                        render={(record) => `#${record.number}`}
                      />
                      <Form>
                        <EditInPlaceInput
                          source="title"
                          renderField={(ref) => (
                            <Tooltip
                              title="Double click to edit"
                              placement="top"
                            >
                              <TextField
                                ref={ref}
                                source="title"
                                variant="h3"
                                component="h2"
                              />
                            </Tooltip>
                          )}
                        />
                      </Form>
                      <MenuButton>
                        <MenuButton.DeleteItem
                          mutationMode="pessimistic"
                          mutationOptions={{
                            onSuccess: (_data, { previousData }) => {
                              if (!previousData) return;
                              updateColumn({
                                board_id: params.boardId!,
                                record: { id: previousData.column_id },
                                update: (record) => ({
                                  ...record,
                                  cards: record.cards
                                    .filter(
                                      (oldCard: any) =>
                                        previousData.id !== oldCard.id,
                                    )
                                    .map((oldCard: any) => ({
                                      ...oldCard,
                                      position:
                                        oldCard.position > previousData.position
                                          ? oldCard.position - 1
                                          : oldCard.position,
                                    })),
                                }),
                              });
                              navigate(`/boards/${params.boardId}`);
                            },
                          }}
                        />
                      </MenuButton>
                    </Stack>
                    <Stack
                      direction="row"
                      gap={2}
                      alignItems="center"
                      width="100%"
                    >
                      <SaveContextProvider value={columnSelectorSaveContext}>
                        <PopoverForm
                          source="column_id"
                          input={<ColumnSelector />}
                        >
                          <ReferenceField
                            source="column_id"
                            reference="columns"
                            link={false}
                            emptyText={
                              <Chip
                                label={<Translate i18nKey="pm.no_column" />}
                                icon={<ViewColumnIcon />}
                              />
                            }
                          >
                            <ChipField
                              source="name"
                              icon={<ViewColumnIcon />}
                            />
                          </ReferenceField>
                        </PopoverForm>
                      </SaveContextProvider>
                      <PopoverForm
                        source="assigned_user_ids"
                        mutationOptions={{
                          onSuccess: (data: RaRecord) => {
                            updateCard({
                              board_id: params.boardId!,
                              record: data,
                              update: () => data,
                            });
                          },
                        }}
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
                          <AvatarList
                            empty={
                              <Chip
                                label={<Translate i18nKey="pm.unnasigned" />}
                                icon={<AccountCircleIcon />}
                              />
                            }
                          />
                        </ReferenceArrayField>
                      </PopoverForm>
                      <PopoverForm
                        source="estimate"
                        mutationOptions={{
                          onSuccess: (data: RaRecord) => {
                            updateCard({
                              board_id: params.boardId!,
                              record: data,
                              update: () => data,
                            });
                          },
                        }}
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
                                label={<Translate i18nKey="pm.no_estimate" />}
                                icon={<AddCircleIcon />}
                              />
                            );
                          }}
                        />
                      </PopoverForm>
                    </Stack>
                    <PopoverForm
                      source="tags_ids"
                      mutationOptions={{
                        onSuccess: (data: RaRecord) => {
                          updateCard({
                            board_id: params.boardId!,
                            record: data,
                            update: () => data,
                          });
                        },
                      }}
                      input={
                        <ReferenceArrayInput
                          source="tags_ids"
                          reference="tags"
                          filter={{ board_id: params.boardId }}
                          sort={{ field: "name", order: "ASC" }}
                        >
                          <TagsSelector />
                        </ReferenceArrayInput>
                      }
                    >
                      <ReferenceArrayField source="tags_ids" reference="tags">
                        <SingleFieldList
                          linkType={false}
                          empty={
                            <Chip
                              label={<Translate i18nKey="pm.no_tags" />}
                              icon={<TagIcon />}
                            />
                          }
                        >
                          <ChipField source="name" icon={<TagIcon />} />
                        </SingleFieldList>
                      </ReferenceArrayField>
                    </PopoverForm>
                    <ReferenceManyField
                      reference="card_attachments"
                      target="card_id"
                    >
                      <AttachmentList openFileDialog={openFileDialog} />
                    </ReferenceManyField>
                  </Stack>
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
                                <Translate i18nKey="ra.action.save" />
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
                                  <Translate i18nKey="pm.no_description" />
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
                        <Translate i18nKey="pm.no_history" />
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
                              textWrap: "auto",
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
