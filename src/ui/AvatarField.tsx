import { Avatar, AvatarProps, Tooltip } from "@mui/material";
import { useRecordContext } from "react-admin";

export const AvatarField = ({ sx, ...props }: AvatarProps) => {
  const profile = useRecordContext();
  let letter = profile?.email[0].toUpperCase();
  let tooltip = profile?.email;
  if (profile?.first_name) {
    letter = profile.first_name[0].toUpperCase();
    tooltip = `${profile?.first_name} (${profile?.email})`;
  }
  if (profile?.last_name) {
    letter += profile.last_name[0].toUpperCase();
    tooltip = `${profile?.last_name} (${profile?.email})`;
  }

  if (profile?.first_name && profile?.last_name) {
    tooltip = `${profile?.first_name} ${profile?.last_name} (${profile?.email})`;
  }
  return (
    <Tooltip title={tooltip}>
      <Avatar
        src={profile?.avatar?.src}
        sx={{ width: 24, height: 24, fontSize: "0.7222222222222222rem", ...sx }}
        {...props}
      >
        {letter}
      </Avatar>
    </Tooltip>
  );
};
