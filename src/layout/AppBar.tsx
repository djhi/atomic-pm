import { Header, HeaderClasses } from "@react-admin/ra-navigation";
import { BoardMenu } from "./BoardMenu";
import { InvitationNotifier } from "./InvitationNotifier";
import { UserMenu } from "./UserMenu";
import { LoadingIndicator } from "react-admin";

export const AppBar = () => (
  <Header
    menu={null}
    toolbar={
      <>
        <BoardMenu />
        <InvitationNotifier />
        <LoadingIndicator />
      </>
    }
    userMenu={<UserMenu />}
    sx={{
      [`& .${HeaderClasses.toolbar}`]: { justifyContent: "unset", gap: 1 },
      [`& .${HeaderClasses.menu}`]: { flexGrow: 1 },
    }}
  />
);
