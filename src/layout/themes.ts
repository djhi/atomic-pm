import { bwLightTheme, bwDarkTheme } from "react-admin";

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
  RaToolbar: {
    styleOverrides: {
      root: {
        backgroundColor: "transparent",
      },
    },
  }
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
