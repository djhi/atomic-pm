import {
  ChipField,
  ChoicesContextProvider,
  ChoicesContextValue,
  ChoicesProps,
  DateField,
  Edit,
  EditClasses,
  InputProps,
  ReferenceInput,
  ReferenceManyField,
  SimpleList,
  TextField,
  useChoicesContext,
  useDefaultTitle,
  useGetOne,
  useInput,
  useList,
  useNotify,
  useRecordContext,
  useSuggestions,
  useTranslate,
  WithRecord,
} from "react-admin";
import { useParams } from "react-router";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Stack,
  TextField as MuiTextField,
  Tooltip,
  Typography,
  Chip,
} from "@mui/material";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { CreateRevisionOnSave } from "@react-admin/ra-history";
import { LockOnMount } from "../ra/LockOnMount";
import { FormWithLockSupport } from "../ra/FormWithLockSupport";
import { FormWithLockSupportToolbar } from "../ra/FormWithLockSupportToolbar";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { EditInPlaceInput } from "../ra/EditInPlaceInput";
import { BoardLink } from "../boards/BoardLink";
import { AvatarField } from "../ui/AvatarField";
import { NewMessage } from "./NewMessage";
import { HideHistoryButton } from "./HideHistoryButton";
import { CardRevisionDetails } from "./CardRevisionDetails";
import { EditInPlace } from "../ra/EditInPlace";
import { MarkdownField } from "@react-admin/ra-markdown";
import { RichTextMarkdownInput } from "../ra/RichTextMarkdownInput";
import { PopoverInput, usePopoverInput } from "../ra/PopoverInput";
import { ReferenceField } from "../ra/ReferenceField";
import { useMemo } from "react";

export const CardEdit = () => {
  const params = useParams<"boardId" | "id">();
  const notify = useNotify();

  return (
    <Edit
      resource="cards"
      id={params.id}
      component={Box}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        [`& .${EditClasses.main}`]: {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        },
        [`& .${EditClasses.card}`]: {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
        },
      }}
      mutationMode="optimistic"
      mutationOptions={{
        onSuccess: () => {
          notify("ra.notification.updated", {
            type: "info",
            messageArgs: { smart_count: 1 },
            undoable: true,
          });
        },
      }}
    >
      <CardTitle />
      <Stack direction="column" gap={4} flexGrow={1}>
        <BoardLink />
        <Stack direction="row" gap={4} flexGrow={1} pb={4}>
          <Stack
            direction="column"
            flexGrow={1}
            sx={{
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
                  "& > .MuiStack-root": { flexGrow: 1 },
                }}
                toolbar={
                  <FormWithLockSupportToolbar
                    sx={{ position: "sticky", bottom: 0, px: 0 }}
                  />
                }
              >
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
                <Stack
                  direction="row"
                  gap={2}
                  sx={{ mt: 2 }}
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
                        <Chip label="No column" icon={<StopCircleIcon />} />
                      }
                    >
                      <ChipField source="name" icon={<StopCircleIcon />} />
                    </ReferenceField>
                  </PopoverInput>
                  <PopoverInput
                    source="assigned_user_id"
                    input={
                      <ReferenceInput
                        source="assigned_user_id"
                        reference="board_members_with_profiles"
                        filter={{ board_id: params.boardId }}
                        sort={{ field: "email", order: "ASC" }}
                      >
                        <ListSelectorInput optionText="email" />
                      </ReferenceInput>
                    }
                  >
                    <ReferenceField
                      source="assigned_user_id"
                      reference="board_members_with_profiles"
                      link={false}
                      emptyText={
                        <Chip label="Unassigned" icon={<AccountCircleIcon />} />
                      }
                    >
                      <ChipField source="email" icon={<AvatarField />} />
                    </ReferenceField>
                  </PopoverInput>
                  <PopoverInput
                    source="estimate"
                    input={
                      <EstimatesChoicesInput source="estimate">
                        <ListSelectorInput />
                      </EstimatesChoicesInput>
                    }
                  >
                    <ChipField source="estimate" icon={<AddCircleIcon />} />
                  </PopoverInput>
                </Stack>
                <EditInPlace
                  sx={{ mt: 4, flexGrow: 1 }}
                  input={
                    <RichTextMarkdownInput
                      source="description"
                      fullWidth
                      label={false}
                    />
                  }
                >
                  <Tooltip title="Double click to edit">
                    <Stack>
                      <WithRecord
                        render={(record) =>
                          record?.description ? (
                            <MarkdownField
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
                              Nothing here
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
                empty={<Typography variant="body2">No messages yet</Typography>}
                primaryText={(record) => (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    mb={1}
                    component="span"
                  >
                    <ReferenceField
                      source="user_id"
                      reference="profiles"
                      link={false}
                    >
                      <Stack direction="row" spacing={1} component="span">
                        <AvatarField />
                        <TextField
                          source="email"
                          variant="body1"
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
    </Edit>
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

const ListSelectorInput = (props: Partial<InputProps> & ChoicesProps) => {
  const choicesContext = useChoicesContext(props);
  const { field } = useInput(choicesContext);
  const { getChoiceText, getChoiceValue } = useSuggestions(props);
  const popoverContext = usePopoverInput();
  const translate = useTranslate();
  const { allChoices, selectedChoices, setFilters, total } = choicesContext;
  return (
    <Stack direction="column" gap={1}>
      <List sx={{ flexGrow: 1 }}>
        <ListItem>
          {allChoices != null && allChoices.length < (total ?? 0) ? (
            <MuiTextField
              placeholder={translate("ra.action.search")}
              onChange={(event) => setFilters({ q: event.target.value })}
            />
          ) : null}
        </ListItem>
        {allChoices?.map((record) => (
          <ListItemButton
            selected={selectedChoices?.find(
              (choice) => choice.id === getChoiceValue(record),
            )}
            key={record.id}
            onClick={() => field.onChange(getChoiceValue(record))}
          >
            {getChoiceText(record)}
          </ListItemButton>
        ))}
      </List>
      <Button
        form="card-edit-form"
        variant="outlined"
        type="submit"
        sx={{ border: "none" }}
        onClick={popoverContext.close}
      >
        {translate("ra.action.save")}
      </Button>
    </Stack>
  );
};

const EstimatesChoicesInput = ({
  children,
  ...props
}: InputProps & { children: React.ReactNode }) => {
  const { field } = useInput(props);
  const list = useList({
    data: Estimates,
  });
  const choices = useMemo(
    () => ({
      ...list,
      allChoices: list.data ?? [],
      availableChoices: list.data ?? [],
      selectedChoices: list.data?.filter((choice) => choice.id === field.value) ?? [],
      source: props.source,
      isFromReference: false,
      total: list.total ?? 0,
    }) as ChoicesContextValue,
    [list],
  );
  return (
    <ChoicesContextProvider value={choices}>{children}</ChoicesContextProvider>
  );
};

const Estimates = [
  { id: 0, name: "0" },
  { id: 0.5, name: "0.5" },
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 5, name: "5" },
  { id: 8, name: "8" },
  { id: 13, name: "13" },
];
