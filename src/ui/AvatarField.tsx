import { Avatar } from "@mui/material";
import { useRecordContext } from "react-admin";

export const AvatarField = () => {
  const profile = useRecordContext();
  let letter = profile?.email[0].toUpperCase();
  if (profile?.first_name) {
    letter = profile.first_name[0].toUpperCase();
  }
  if (profile?.last_name) {
    letter += profile.last_name[0].toUpperCase();
  }
  return (
    <Avatar
      src={profile?.avatar?.src}
      sx={{ width: 24, height: 24, fontSize: "0.7222222222222222rem" }}
    >
      {letter}
    </Avatar>
  );
};
