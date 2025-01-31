
import { Admin, CustomRoutes, Resource } from 'react-admin';
import {
  ForgotPasswordPage,
  LoginPage,
  SetPasswordPage,
  defaultI18nProvider,
} from "ra-supabase";
import { Layout } from './layout/Layout';
import { dataProvider } from './providers/dataProvider';
import { authProvider } from './providers/authProvider';
import { BoardList } from './boards/BoardList';
import { BoardShow } from './boards/BoardShow';
import { Route } from 'react-router';


export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    i18nProvider={defaultI18nProvider}
    title="SupaBoards"
  >
    <CustomRoutes noLayout>
      <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
      <Route path={ForgotPasswordPage.path} element={<ForgotPasswordPage />} />
    </CustomRoutes>
    <Resource name="boards" list={BoardList} show={BoardShow} />
  </Admin>
);

    