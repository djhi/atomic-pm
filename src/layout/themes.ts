import { bwLightTheme, bwDarkTheme } from "react-admin";

export const darkTheme = {
  ...bwDarkTheme,
  components: {
    ...bwDarkTheme.components,
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
  },
};
export const lightTheme = {
  ...bwLightTheme,
  components: {
    ...bwLightTheme.components,
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
  },
};
