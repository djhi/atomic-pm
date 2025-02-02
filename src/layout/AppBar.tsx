import { Header, HeaderClasses } from "@react-admin/ra-navigation";
import { BoardMenu } from "./BoardMenu";
import { Stack } from "@mui/material";
import { InvitationNotifier } from "./InvitationNotifier";
import { TitlePortal } from "react-admin";

export const AppBar = () => (
  <Header
    menu={
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <TitlePortal />
        <BoardMenu />
        <InvitationNotifier />
      </Stack>
    }
    sx={{
      [`& .${HeaderClasses.toolbar}`]: { justifyContent: "unset", gap: 1 },
      [`& .${HeaderClasses.menu}`]: { flexGrow: 1 },
    }}
  />
);
