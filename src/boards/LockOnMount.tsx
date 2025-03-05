import { Alert, Box } from "@mui/material";
import { useGetLockLive, useLockOnMount } from "@react-admin/ra-realtime";
import { useGetOne, useTranslate } from "react-admin";

export const LockOnMount = () => {
  const { error } = useLockOnMount();
  const translate = useTranslate();
  const { data: lock } = useGetLockLive();
  const { data: editor } = useGetOne(
    "profiles",
    { id: lock?.identity },
    { enabled: !!lock },
  );
  if (!error) {
    return null;
  }
  return (
    <Box>
      {error ? (
        <Alert severity="info" sx={{ borderRadius: 0 }}>
          {translate("pm.locked", { name: editor?.email })}
        </Alert>
      ) : null}
    </Box>
  );
};
