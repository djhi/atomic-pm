import { Fragment } from "react";
import {
  ChipField,
  DateField,
  Edit,
  EditClasses,
  FunctionField,
  ReferenceInput,
  ReferenceManyField,
  SimpleList,
  TextField,
  useDefaultTitle,
  useGetOne,
  useRecordContext,
  useTranslate,
  WithRecord,
} from "react-admin";
import { useParams } from "react-router";
import {
  Box,
  Divider,
  Stack,
  Tooltip,
  Typography,
  Chip,
  Toolbar,
  Button,
} from "@mui/material";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { CreateRevisionOnSave } from "@react-admin/ra-history";
import { MarkdownField } from "@react-admin/ra-markdown";
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
import { BoardLink } from "../boards/BoardLink";
import { NewMessage } from "./NewMessage";
import { HideHistoryButton } from "./HideHistoryButton";
import { CardRevisionDetails } from "./CardRevisionDetails";
import { EstimatesChoicesInput } from "./EstimatesChoicesInput";
import { useCardFromBoardAndNumber } from "./useCardFromBoardAndNumber";

export const CardEdit = () => {
  const params = useParams<"boardId" | "id">();
  const { data: card } = useCardFromBoardAndNumber();
  const translate = useTranslate();

  if (!card) return null;

  return (
    <Edit
      resource="cards"
      id={card.id}
      record={card}
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
      redirect={false}
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
                toolbar={<Fragment />}
              >
                <Stack direction="row" gap={1}>
                  <FunctionField
                    source="number"
                    gutterBottom
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
                        <Chip
                          label={translate("pm.unnasigned")}
                          icon={<AccountCircleIcon />}
                        />
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
                          <Button size="small" type="submit">
                            {translate("ra.action.save")}
                          </Button>
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
