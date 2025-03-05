import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Logout,
  UserMenu as RaUserMenu,
  useLocale,
  useLocales,
  useSetLocale,
  useTheme,
  useThemesContext,
  useTranslate,
} from "react-admin";

export const UserMenu = () => (
  <RaUserMenu>
    <ThemeMenu />
    <Divider />
    <LocalesMenu />
    <Divider />
    <Logout />
  </RaUserMenu>
);

const ThemeMenu = () => {
  const translate = useTranslate();
  const { darkTheme, defaultTheme } = useThemesContext();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });
  const [theme, setTheme] = useTheme(
    defaultTheme || (prefersDarkMode && darkTheme ? "dark" : "light"),
  );

  const handleTogglePaletteType = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const toggleThemeTitle = translate("ra.action.toggle_theme", {
    _: "Toggle Theme",
  });

  return (
    <MenuItem onClick={handleTogglePaletteType}>
      <ListItemIcon>
        {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </ListItemIcon>
      <ListItemText primary={toggleThemeTitle} />
    </MenuItem>
  );
};

const LocalesMenu = () => {
  const locales = useLocales();
  const currentLocale = useLocale();
  const setLocale = useSetLocale();

  return (
    <>
      {locales.map((locale) => (
        <MenuItem key={locale.locale} onClick={() => setLocale(locale.locale)}>
          <ListItemIcon>
            {currentLocale === locale.locale ? <CheckIcon /> : null}
          </ListItemIcon>
          <ListItemText primary={locale.name} />
        </MenuItem>
      ))}
    </>
  );
};
