
import { Admin, bwLightTheme, bwDarkTheme, CustomRoutes, Resource } from 'react-admin';
import { Route } from "react-router";
import {
  ForgotPasswordPage,
  LoginPage,
  SetPasswordPage,
  defaultI18nProvider,
} from "ra-supabase";
import { dataProvider } from './providers/dataProvider';
import { authProvider } from './providers/authProvider';
import { queryClient } from './providers/queryClient';
import { Layout } from './layout/Layout';
import { BoardList } from './boards/BoardList';
import { BoardShow } from './boards/BoardShow';

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    i18nProvider={defaultI18nProvider}
    queryClient={queryClient}
    title="SupaBoards"
    lightTheme={bwLightTheme}
    darkTheme={bwDarkTheme}
  >
    <CustomRoutes noLayout>
      <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
      <Route path={ForgotPasswordPage.path} element={<ForgotPasswordPage />} />
    </CustomRoutes>
    <Resource name="boards" list={BoardList} show={BoardShow} />
  </Admin>
);

    