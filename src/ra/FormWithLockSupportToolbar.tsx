import { Stack, ToolbarProps } from "@mui/material";
import { useGetLockLive } from "@react-admin/ra-realtime";
import {
  DeleteButton,
  SaveButton,
  Toolbar,
  ToolbarClasses,
  useEditContext,
  useGetIdentity,
} from "react-admin";

export const FormWithLockSupportToolbar = (props: ToolbarProps) => {
  const { identity } = useGetIdentity();
  const editContext = useEditContext();
  const { data: lock } = useGetLockLive(undefined, undefined, {
    enabled: !!editContext,
  });

  const disabled = !!lock && lock?.identity !== identity?.id;
  return (
    <Toolbar {...props}>
      <Stack flex={1} direction="row" spacing={1} justifyContent="end">
        {editContext ? (
          <div className={ToolbarClasses.defaultToolbar}>
            <DeleteButton
              color="primary"
              size="medium"
              disabled={disabled}
              redirect={false}
            />
            <SaveButton
              variant="outlined"
              color="inherit"
              disabled={disabled}
            />
          </div>
        ) : (
          <SaveButton variant="outlined" color="inherit" disabled={disabled} />
        )}
      </Stack>
    </Toolbar>
  );
};
