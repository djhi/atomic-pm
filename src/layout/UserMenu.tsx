import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
  useMediaQuery,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import PersonIcon from "@mui/icons-material/Person";
import {
  ImageField,
  ImageInput,
  Logout,
  UserMenu as RaUserMenu,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useGetIdentity,
  useLocale,
  useLocales,
  useSetLocale,
  useTheme,
  useThemesContext,
  useTranslate,
  useUserMenu,
} from "react-admin";
import { EditDialog } from "@react-admin/ra-form-layout";
import { useState } from "react";

export const UserMenu = () => {
  const { identity } = useGetIdentity();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <Box
      sx={{
        "& .RaUserMenu-userButton": {
          fontSize: 0,
          lineHeight: 0,
          textDecoration: '',
          pr: 1
        },
      }}
    >
      <RaUserMenu>
        <EditProfileMenuItem
          onClick={() => {
            setEditDialogOpen(true);
          }}
        />
        <Divider />
        <ThemeMenu />
        <Divider />
        <LocalesMenu />
        <Divider />
        <Logout />
      </RaUserMenu>
      <EditDialog
        resource="profiles"
        id={identity?.id}
        title={null}
        fullWidth
        maxWidth="md"
        isOpen={editDialogOpen}
        close={() => setEditDialogOpen(false)}
      >
        <SimpleForm
          toolbar={
            <Toolbar>
              <SaveButton />
            </Toolbar>
          }
        >
          <TextInput source="first_name" />
          <TextInput source="last_name" />
          <ImageInput source="avatar">
            <ImageField source="src" title="title" />
          </ImageInput>
        </SimpleForm>
      </EditDialog>
    </Box>
  );
};

const EditProfileMenuItem = ({ onClick, ...props }: MenuItemProps) => {
  const translate = useTranslate();
  const userMenuContext = useUserMenu();
  if (!userMenuContext) {
    throw new Error("<EditProfileButton> should be used inside a <UserMenu>");
  }
  const { onClose } = userMenuContext;
  return (
    <MenuItem
      onClick={(event) => {
        onClose();
        onClick && onClick(event);
      }}
      {...props}
    >
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={translate("pm.editProfile")} />
    </MenuItem>
  );
};

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
