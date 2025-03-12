import { Stack, ToolbarProps } from "@mui/material";
import { useGetLockLive } from "@react-admin/ra-realtime";
import {
  DeleteButton,
  SaveButton,
  Toolbar,
  useEditContext,
  useGetIdentity,
} from "react-admin";

export const BoardItemFormToolbar = ({ sx, ...props }: ToolbarProps) => {
  const { identity } = useGetIdentity();
  const editContext = useEditContext();
  const { data: lock } = useGetLockLive(undefined, undefined, {
    enabled: !!editContext,
  });

  const disabled = !!lock && lock?.identity !== identity?.id;
  return (
    <Toolbar
      disableGutters
      sx={{ bgcolor: "transparent", px: 2, ...sx }}
      {...props}
    >
      <Stack
        flex={1}
        direction="row"
        spacing={1}
        justifyContent="space-between"
      >
        <SaveButton disabled={disabled} />
        {editContext ? (
          <DeleteButton
            color="primary"
            size="medium"
            disabled={disabled}
            redirect={false}
          />
        ) : null}
      </Stack>
    </Toolbar>
  );
};
