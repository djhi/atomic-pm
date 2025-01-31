import { useGetLockLive } from "@react-admin/ra-realtime";
import { DeleteButton, SaveButton, Toolbar, useGetIdentity } from "react-admin";

export const BoardItemFormToolbar = () => {
  const { data: lock } = useGetLockLive();
  const { identity } = useGetIdentity();

  const disabled = !!lock && lock?.identity !== identity?.id;
  return (
    <Toolbar>
      <SaveButton disabled={disabled} />
      <DeleteButton disabled={disabled} redirect={false} />
    </Toolbar>
  );
};
