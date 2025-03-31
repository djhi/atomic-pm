import { bwLightTheme, bwDarkTheme } from "react-admin";

const spacing = (times: number) => times * (bwLightTheme.spacing as number);
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        minHeight: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
        backgroundSize: "100%",
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: "20px 24px",
      },
    },
  },
  RaToolbar: {
    styleOverrides: {
      root: {
        "&.RaToolbar-desktopToolbar": {
          paddingLeft: spacing(2),
          paddingRight: spacing(2),
          backgroundColor: "transparent",
          justifyContent: "end",
        },
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        backgroundColor: "transparent",
        justifyContent: "end",
      },
    },
  },
};
export const darkTheme = {
  ...bwDarkTheme,
  components: {
    ...bwDarkTheme.components,
    ...components,
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  },
};
export const lightTheme = {
  ...bwLightTheme,
  components: {
    ...bwLightTheme.components,
    ...components,
  },
};
