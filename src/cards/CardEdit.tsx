import { MarkdownField } from "@react-admin/ra-markdown";
import {
  AutocompleteInput,
  DateField,
  Edit,
  EditClasses,
  Labeled,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  required,
  SimpleList,
  TextField,
  TextInput,
  useDefaultTitle,
  useGetOne,
  useNotify,
  useRecordContext,
  WithRecord,
} from "react-admin";
import { useParams } from "react-router";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { CreateRevisionOnSave } from "@react-admin/ra-history";
import { LockOnMount } from "../ra/LockOnMount";
import { FormWithLockSupport } from "../ra/FormWithLockSupport";
import { FormWithLockSupportToolbar } from "../ra/FormWithLockSupportToolbar";
import { RecordLiveUpdate } from "../ra/RecordLiveUpdate";
import { EditInPlace } from "../ra/EditInPlace";
import { BoardLink } from "../boards/BoardLink";
import { AvatarField } from "../ui/AvatarField";
import { EstimateInput } from "./EstimateInput";
import { NewMessage } from "./NewMessage";
import { HideHistoryButton } from "./HideHistoryButton";
import { CardRevisionDetails } from "./CardRevisionDetails";
import { CardDescriptionInput } from "./CardDescriptionInput";

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
                sx={{
                  p: 0,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
                toolbar={
                  <FormWithLockSupportToolbar
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
                    <ReferenceInput
                      source="column_id"
                      reference="columns"
                      filter={{ board_id: params.boardId }}
                    >
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
                      reference="board_members_with_profiles"
                      filter={{ board_id: params.boardId }}
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
