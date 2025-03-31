import { Admin, CustomRoutes, DataProvider, AuthProvider } from "react-admin";
import { Navigate, Route } from "react-router";
import { ForgotPasswordPage, LoginPage, SetPasswordPage } from "ra-supabase";

import { queryClient } from "./providers/queryClient";
import { Layout } from "./layout/Layout";
import { BoardList } from "./boards/list/BoardList";
import { BoardShow } from "./boards/BoardShow";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./layout/themes";
import { i18nProvider } from "./providers/i18nProvider";

export const App = () => {
  const [dataProvider, setDataProvider] = useState<DataProvider>();
  const [authProvider, setAuthProvider] = useState<AuthProvider>();

  useEffect(() => {
    if (import.meta.env.VITE_PROVIDER === "supabase") {
      import("./providers/supabase").then(({ authProvider, dataProvider }) => {
        setDataProvider(dataProvider);
        setAuthProvider(authProvider);
      });
    } else {
      import("./providers/fakerest").then(({ authProvider, dataProvider }) => {
        setDataProvider(dataProvider);
        setAuthProvider(authProvider);
      });
    }
  }, []);

  if (!dataProvider || !authProvider) {
    return null;
  }

  return (
    <Admin
      layout={Layout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      i18nProvider={i18nProvider}
      queryClient={queryClient}
      title="SupaBoards"
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      dashboard={() => <Navigate to="/boards" />}
    >
      <CustomRoutes noLayout>
        <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
        <Route
          path={ForgotPasswordPage.path}
          element={<ForgotPasswordPage />}
        />
      </CustomRoutes>
      <CustomRoutes>
        <Route path="/boards/*" element={<BoardList />} />
        <Route
          // Here it's important to name the board id parameter "boardId" and not "id"
          // to avoid conflicts with the default "id" used by sub resources that leverage
          // the default react-admin components (Edit, Show)
          path="/boards/:boardId/*"
          element={<BoardShow />}
        />
      </CustomRoutes>
    </Admin>
  );
};
