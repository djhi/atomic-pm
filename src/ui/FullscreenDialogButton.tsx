import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { Translate, useTranslate } from "react-admin";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export const FullscreenDialogButton = ({
  fullScreen,
  ...rest
}: { fullScreen: boolean } & IconButtonProps) => {
  const translate = useTranslate();
  return (
    <Tooltip
      // Prevent ghost tooltip
      key={String(fullScreen)}
      title={
        <Translate
          i18nKey={fullScreen ? "pm.exit_full_screen" : "pm.full_screen"}
        />
      }
      placement="top"
    >
      <IconButton
        aria-label={translate(
          fullScreen ? "pm.exit_full_screen" : "pm.full_screen",
        )}
        sx={{
          position: "absolute",
          right: (theme) => theme.spacing(4),
          top: (theme) => theme.spacing(1),
          color: (theme) => theme.palette.grey[500],
        }}
        {...rest}
      >
        {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Tooltip>
  );
};
