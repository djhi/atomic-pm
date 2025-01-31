import { Alert, AlertTitle, Box } from "@mui/material";
import { useGetLockLive, useLockOnMount } from "@react-admin/ra-realtime";
import { useGetOne } from "react-admin";

export const LockOnMount = () => {
  const { isLocked, error } = useLockOnMount();
  const { data: lock } = useGetLockLive();
  const { data: editor } = useGetOne(
    "profiles",
    {
      id: lock?.identity,
    },
    {
      enabled: !!lock,
    },
  );
  return (
    <Box>
      {error && (
        <Alert severity="info" sx={{ borderRadius: 0 }}>
          <AlertTitle>Post is readonly</AlertTitle> Edited by {editor?.email}.
        </Alert>
      )}
      {isLocked && (
        <Alert severity="success" sx={{ borderRadius: 0 }}>
          <AlertTitle>Post locked</AlertTitle> Only you can edit it.
        </Alert>
      )}
    </Box>
  );
};
