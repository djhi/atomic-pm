import {
  Admin,
  bwLightTheme,
  bwDarkTheme,
  CustomRoutes,
  ResourceContextProvider,
} from "react-admin";
import { Navigate, Route } from "react-router";
import {
  ForgotPasswordPage,
  LoginPage,
  SetPasswordPage,
  defaultI18nProvider,
} from "ra-supabase";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { queryClient } from "./providers/queryClient";
import { Layout } from "./layout/Layout";
import { BoardList } from "./boards/BoardList";
import { BoardShow } from "./boards/BoardShow";

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
    dashboard={() => <Navigate to="/boards" />}
  >
    <CustomRoutes noLayout>
      <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
      <Route path={ForgotPasswordPage.path} element={<ForgotPasswordPage />} />
    </CustomRoutes>
    <CustomRoutes>
      <Route
        path="/boards/*"
        element={
          <ResourceContextProvider value="boards">
            <BoardList />
          </ResourceContextProvider>
        }
      />
      <Route
        path="/boards/:boardId/*"
        element={
          <ResourceContextProvider value="boards">
            <BoardShow />
          </ResourceContextProvider>
        }
      />
    </CustomRoutes>
  </Admin>
);
