import {
  Badge,
  Popover,
  ListItem,
  List,
  ListItemText,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import MailIcon from "@mui/icons-material/Mail";
import {
  Button,
  ListBase,
  useDataProvider,
  useGetIdentity,
  useListContext,
  useNotify,
} from "react-admin";
import { type MouseEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ListLiveUpdate } from "@react-admin/ra-realtime";

export const InvitationNotifier = () => {
  const { identity } = useGetIdentity();
  return (
    <ListBase
      resource="invitations"
      sort={{ field: "created_at", order: "DESC" }}
      filter={{ email: identity?.fullName }}
      queryOptions={{ enabled: !!identity }}
    >
      <InvitationNotifierListView />
      <ListLiveUpdate />
    </ListBase>
  );
};

const InvitationNotifierListView = () => {
  const { data, isPending, total } = useListContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        label="pm.invitations"
        disabled={isPending}
        onClick={handleClick}
        color="inherit"
        variant="text"
        size="small"
      >
        <Badge color="secondary" badgeContent={total}>
          <MailIcon />
        </Badge>
      </Button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleClose}
      >
        <List>
          {data?.length === 0 && (
            <ListItem>
              <ListItemText>No invitations</ListItemText>
            </ListItem>
          )}
          {data?.map((invitation) => (
            <InvitationItem
              key={invitation.id}
              invitation={invitation}
              onClose={handleClose}
            />
          ))}
        </List>
      </Popover>
    </>
  );
};

const InvitationItem = ({
  invitation,
  onClose,
}: {
  invitation: any;
  onClose: () => void;
}) => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const notify = useNotify();

  const handleAccept = () => {
    dataProvider
      .answerInvitation({
        data: { invitation_id: invitation.id, accepted: true },
      })
      .catch(() => {
        notify("Failed to accept invitation, please try again later", {
          type: "error",
        });
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["boards"] });
        queryClient.invalidateQueries({ queryKey: ["invitations"] });
        onClose();
      });
  };

  const handleDecline = () => {
    dataProvider.answerInvitation({
      data: { invitation_id: invitation.id, accepted: true },
    });
  };

  return (
    <ListItem>
      <Stack direction="row" spacing={1} alignItems="center">
        <ListItemText>
          {`You're invited to the board `} <em>{invitation.board_name}</em> by{" "}
          <em>{invitation.invited_by}</em>
        </ListItemText>
        <Button label="Accept" onClick={handleAccept}>
          <CheckIcon />
        </Button>
        <Button label="Decline" color="inherit" onClick={handleDecline}>
          <DeleteIcon />
        </Button>
      </Stack>
    </ListItem>
  );
};
