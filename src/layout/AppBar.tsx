import { Box, Link, AppBar as MuiAppBar, styled, Toolbar } from "@mui/material";
import {
  HeaderClasses,
  HeaderProps,
  useContainerLayout,
} from "@react-admin/ra-navigation";
import { Link as RouterLink } from "react-router-dom";
import { LoadingIndicator, useBasename } from "react-admin";
import { BoardMenu } from "./BoardMenu";
import { InvitationNotifier } from "./InvitationNotifier";
import { UserMenu } from "./UserMenu";

export const AppBar = (props: HeaderProps) => {
  const { title = "React-admin" } = useContainerLayout(props);
  const baseName = useBasename();

  return (
    <Root position="static" color="secondary" className={HeaderClasses.root}>
      <Toolbar variant="dense" className={HeaderClasses.toolbar}>
        <Box className={HeaderClasses.title}>
          <Link
            component={RouterLink}
            to={`${baseName}/`}
            variant="h6"
            color="inherit"
            underline="none"
            sx={{
              fontSize: (theme) => theme.typography.fontSize,
            }}
          >
            {title}
          </Link>
          <BoardMenu />
          <InvitationNotifier />
        </Box>
        <Box className={HeaderClasses.actions}>
          <LoadingIndicator />
          <UserMenu />
        </Box>
      </Toolbar>
    </Root>
  );
};

const Root = styled(MuiAppBar, {
  name: "RaHeader",
  overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${HeaderClasses.toolbar}`]: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  [`& .${HeaderClasses.title}`]: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  [`& .${HeaderClasses.menu}`]: {
    alignItems: "center",
  },
  [`& .${HeaderClasses.actions}`]: {
    display: "flex",
    alignItems: "center",
  },
}));
