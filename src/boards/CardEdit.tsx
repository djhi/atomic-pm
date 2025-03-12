import React, { ChangeEvent } from "react";
import { MarkdownField, MarkdownInput } from "@react-admin/ra-markdown";
import {
  AutocompleteInput,
  DateField,
  Edit,
  EditClasses,
  InputProps,
  Labeled,
  NumberField,
  RaRecord,
  RecordContextProvider,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  required,
  SimpleList,
  TextField,
  TextInput,
  useDefaultTitle,
  useEvent,
  useGetList,
  useGetOne,
  useListContext,
  useNotify,
  useRecordContext,
  useTranslate,
  WithRecord,
} from "react-admin";
import { useParams } from "react-router";
import {
  Box,
  Divider,
  FormControlLabel,
  Link,
  Popover,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQueryClient } from "@tanstack/react-query";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import {
  CreateRevisionOnSave,
  ReferenceRecordContextProvider,
  SmartFieldDiff,
} from "@react-admin/ra-history";
import get from "lodash/get";
import { LockOnMount } from "./LockOnMount";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { EstimateInput } from "./EstimateInput";
import { NewMessage } from "./NewMessage";
import { CardBoardTitle } from "./CardBoardTitle";
import { AvatarField } from "./AvatarField";
import { EditInPlace, useEditInPlace } from "../ra/EditInPlace";
import { FormWithLockSupport } from "./FormWithLockSupport";
import { BoardItemFormToolbar } from "./BoardItemFormToolbar";

export const CardEdit = () => {
  const params = useParams<"boardId" | "id">();
  const queryClient = useQueryClient();
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
      title={<CardTitle />}
      mutationMode="optimistic"
      mutationOptions={{
        onSuccess: (data: any) => {
          notify("ra.notification.updated", {
            type: "info",
            messageArgs: { smart_count: 1 },
            undoable: true,
          });
          queryClient.setQueryData<any>(
            [
              "boards",
              "getOne",
              {
                id: String(params.boardId),
                meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
              },
            ],
            (record: any) => {
              return {
                ...record,
                columns: record.columns.map((column: any) =>
                  column.id === data.column_id
                    ? {
                        ...column,
                        cards: column.cards.map((card: any) =>
                          card.id === data.id ? { ...card, ...data } : card,
                        ),
                      }
                    : column,
                ),
              };
            },
          );
        },
      }}
    >
      <Stack direction="column" gap={4} flexGrow={1}>
        <CardBoardTitle />
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
                sx={{
                  p: 0,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
                toolbar={
                  <BoardItemFormToolbar
                    sx={{ position: "sticky", bottom: 0, px: 0 }}
                  />
                }
              >
                <EditInPlace
                  input={
                    <TextInput
                      source="title"
                      validate={required()}
                      autoFocus
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  }
                >
                  <TextField source="title" variant="h3" component="h2" />
                </EditInPlace>
                <Stack
                  direction="row"
                  gap={2}
                  sx={{ mt: 2 }}
                  justifyContent="space-between"
                  width="100%"
                >
                  <Labeled
                    source="column_id"
                    component="label"
                    sx={{ flexGrow: 1 }}
                  >
                    <ReferenceInput source="column_id" reference="columns">
                      <AutocompleteInput
                        optionText="name"
                        TextFieldProps={{
                          label: null,
                        }}
                      />
                    </ReferenceInput>
                  </Labeled>
                  <Labeled
                    source="assigned_user_id"
                    component="label"
                    sx={{ flexGrow: 1 }}
                  >
                    <ReferenceInput
                      source="assigned_user_id"
                      reference="profiles"
                    >
                      <AutocompleteInput
                        optionText="email"
                        TextFieldProps={{
                          label: null,
                        }}
                      />
                    </ReferenceInput>
                  </Labeled>
                  <Labeled
                    source="estimate"
                    component="label"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <EstimateInput source="estimate" hideLabel />
                  </Labeled>
                </Stack>
                <EditInPlace
                  sx={{ mt: 4 }}
                  input={
                    <CardDescriptionInput
                      source="description"
                      validate={required()}
                    />
                  }
                >
                  <Labeled source="description">
                    <WithRecord
                      render={(record) =>
                        record?.description ? (
                          <MarkdownField source="description" />
                        ) : (
                          <Typography variant="body2">Nothing here</Typography>
                        )
                      }
                    />
                  </Labeled>
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
                      <RevisionDetails />
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
    <>
      <span>
        {record?.title} - {column?.name}
      </span>
      <title>{`${record?.title} - ${column?.name} - ${board?.name} - ${appTitle}`}</title>
    </>
  );
};

const CardDescriptionInput = (props: Omit<InputProps, "helperText">) => {
  const editInPlace = useEditInPlace();
  const translate = useTranslate();

  return (
    <Stack>
      <MarkdownInput {...props} fullWidth />
      <div>
        <Link
          component="button"
          fontSize="small"
          onClick={() => editInPlace.setIsEditing(false)}
        >
          {translate("ra.action.cancel")}
        </Link>
      </div>
    </Stack>
  );
};

const HideHistoryButton = () => {
  const listContext = useListContext();
  const { filterValues, setFilters } = listContext;
  const isSelected = filterValues?.type == undefined;

  const handleClick = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilters({ ...filterValues, type: undefined });
    } else {
      setFilters({ ...filterValues, type: "comment" });
    }
  });

  return (
    <FormControlLabel
      control={<Switch checked={isSelected} onChange={handleClick} />}
      label={"Show history"}
    />
  );
};

const RevisionDetails = () => {
  return (
    <ReferenceField source="revision_id" reference="revisions">
      <WithRecord
        render={(record) => (
          <RecordContextProvider value={record.data}>
            <CardDiff revision={record} />
          </RecordContextProvider>
        )}
      />
    </ReferenceField>
  );
};

const CardDiff = ({ revision }: { revision: RaRecord }) => {
  const record = useRecordContext();
  const referenceRecords = useGetList("revisions", {
    filter: {
      "date@lt": revision.date,
      recordId: revision.recordId,
      resource: "cards",
    },
    sort: { field: "date", order: "DESC" },
    pagination: { page: 1, perPage: 1 },
  });

  if (!record) return null;
  if (!referenceRecords.data || referenceRecords.data?.length === 0) {
    return (
      <Typography variant="body2" component="span">
        Created the card
      </Typography>
    );
  }
  const referenceRecord = referenceRecords.data[0].data;
  const fields = Object.keys(record).filter(
    (field) => get(record, field) !== get(referenceRecord, field),
  );

  return (
    <Stack gap={1} component="span">
      {fields.map((field) => {
        switch (field) {
          case "column_id":
            return (
              <Labeled source="column_id" component="span">
                <Stack direction="row" gap={1} component="span">
                  <RecordContextProvider value={referenceRecord}>
                    <ReferenceField source="column_id" reference="columns">
                      <TextField
                        source="name"
                        component="span"
                        sx={{ color: "text.secondary" }}
                      />
                    </ReferenceField>
                  </RecordContextProvider>
                  <ArrowForwardIcon />
                  <ReferenceField source="column_id" reference="columns">
                    <TextField
                      source="name"
                      component="span"
                      sx={{ color: "text.primary" }}
                    />
                  </ReferenceField>
                </Stack>
              </Labeled>
            );
          case "assigned_user_id":
            return (
              <Labeled source="assigned_user_id" component="span">
                <Stack direction="row" gap={1} component="span">
                  <RecordContextProvider value={referenceRecord}>
                    <ReferenceField
                      source="assigned_user_id"
                      reference="profiles"
                      emptyText="Unassigned"
                    >
                      <TextField
                        source="email"
                        component="span"
                        sx={{ color: "text.secondary" }}
                      />
                    </ReferenceField>
                  </RecordContextProvider>
                  <ArrowForwardIcon />
                  <ReferenceField
                    source="assigned_user_id"
                    reference="profiles"
                    emptyText="Unassigned"
                  >
                    <TextField
                      source="email"
                      component="span"
                      sx={{ color: "text.primary" }}
                    />
                  </ReferenceField>
                </Stack>
              </Labeled>
            );
          case "estimate":
            return (
              <Labeled source="estimate" component="span">
                <Stack direction="row" gap={1} component="span">
                  <RecordContextProvider value={referenceRecord}>
                    <NumberField
                      source="estimate"
                      component="span"
                      sx={{ color: "text.secondary" }}
                    />
                  </RecordContextProvider>
                  <ArrowForwardIcon />
                  <NumberField
                    source="estimate"
                    component="span"
                    sx={{ color: "text.primary" }}
                  />
                </Stack>
              </Labeled>
            );
          case "title":
            return (
              <Labeled source="title" component="span">
                <Stack direction="row" gap={1} component="span">
                  <RecordContextProvider value={referenceRecord}>
                    <TextField
                      source="title"
                      component="span"
                      sx={{ color: "text.secondary" }}
                    />
                  </RecordContextProvider>
                  <ArrowForwardIcon />
                  <TextField
                    source="title"
                    component="span"
                    sx={{ color: "text.primary" }}
                  />
                </Stack>
              </Labeled>
            );
          case "description":
            return (
              <ReferenceRecordContextProvider value={referenceRecord}>
                <DescriptionDiff />
              </ReferenceRecordContextProvider>
            );
          case "position":
            return null;
          default:
            return (
              <Typography variant="body2" component="span">
                {revision.message}
              </Typography>
            );
        }
      })}
    </Stack>
  );
};

const DescriptionDiff = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Link
        component="button"
        aria-describedby={id}
        onClick={handleClick}
        sx={{ textAlign: "left" }}
      >
        Changed the description
      </Link>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <SmartFieldDiff
            source="description"
            sx={{
              "& .RaLabeled-label": {
                display: "none",
              },
            }}
          />
        </Typography>
      </Popover>
    </>
  );
};
