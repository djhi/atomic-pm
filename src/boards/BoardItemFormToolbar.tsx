import { Stack } from "@mui/material";
import { useGetLockLive } from "@react-admin/ra-realtime";
import { DeleteButton, SaveButton, Toolbar, useGetIdentity } from "react-admin";

export const BoardItemFormToolbar = () => {
  const { data: lock } = useGetLockLive();
  const { identity } = useGetIdentity();

  const disabled = !!lock && lock?.identity !== identity?.id;
  return (
    <Toolbar>
      <Stack flex={1} direction="row" spacing={1} justifyContent="space-between">
        <SaveButton disabled={disabled} />
        <DeleteButton
          color="primary"
          size="medium"
          disabled={disabled}
          redirect={false}
        />
      </Stack>
    </Toolbar>
  );
};
