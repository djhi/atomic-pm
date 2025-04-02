import {
  DeleteButton,
  Form,
  FunctionField,
  ReferenceField,
  ReferenceManyField,
  SaveButton,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
  Translate,
  useDataProvider,
  useGetIdentity,
  useNotify,
  useRecordContext,
} from "react-admin";
import { ShowInDialogButton } from "@react-admin/ra-form-layout";
import GroupIcon from "@mui/icons-material/Group";
import { Chip, Stack } from "@mui/material";
import { AvatarField } from "../ui/AvatarField";

export const BoardMembersEdit = () => {
  const board = useRecordContext();
  const { identity } = useGetIdentity();

  // Don't render the button if user is not the owner of the list
  if (board?.user_id !== identity?.id) {
    return null;
  }

  return (
    <ShowInDialogButton
      maxWidth="md"
      fullWidth
      icon={<GroupIcon />}
      label="pm.members"
    >
      <SimpleShowLayout>
        <InviteUserForm />
        <ReferenceManyField reference="board_members" target="board_id">
          <SimpleList
            sx={{ width: "100%" }}
            rowSx={() => ({ display: "flex", justifyContent: "space-between" })}
            rowClick={false}
            primaryText={<ListMemberItem owner_id={board?.user_id} />}
          />
        </ReferenceManyField>
      </SimpleShowLayout>
    </ShowInDialogButton>
  );
};

const ListMemberItem = ({ owner_id }: { owner_id?: number }) => {
  const listMemberRecord = useRecordContext();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <ReferenceField reference="profiles" source="user_id" link={false}>
        <Stack direction="row" alignItems="center" gap={1}>
          <AvatarField />
          <TextField source="email" variant="body1" />
          <FunctionField
            render={(record) =>
              record?.id === owner_id ? (
                <Chip label={<Translate i18nKey="pm.board_owner" />} />
              ) : null
            }
          />
        </Stack>
      </ReferenceField>
      <DeleteButton
        redirect={false}
        disabled={listMemberRecord?.user_id === owner_id}
      />
    </Stack>
  );
};

const InviteUserForm = () => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const board = useRecordContext();

  return (
    <Form
      onSubmit={async (data: Record<string, unknown>) => {
        await dataProvider.invite({
          data: { ...data, board_id: board?.id },
        });
        notify("pm.invitation_sent");
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextInput
          source="email"
          label="pm.invitation_email"
          slotProps={{
            input: {
              endAdornment: <SaveButton variant="text" label="Invite" />,
            },
          }}
        />
      </Stack>
    </Form>
  );
};
