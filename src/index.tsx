import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, RouterProviderProps } from "react-router";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { App } from "./App";
import { setupFakeServer } from "./providers/fakerest/setupFakeServer";

const initializeApp = (router: RouterProviderProps['router']) => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
};
if (import.meta.env.VITE_PROVIDER === "fakerest") {
  setupFakeServer()
    .start({
      serviceWorker: {
        url: "./mockServiceWorker.js",
      },
      quiet: true, // Instruct MSW to not log requests in the console
      onUnhandledRequest: "bypass", // Instruct MSW to ignore requests we don't handle
    })
    .then(() => {
      const router = createHashRouter([
        {
          path: "*",
          element: (
            <NuqsAdapter>
              <App />
            </NuqsAdapter>
          ),
        },
      ]);
      initializeApp(router);
    });
} else {
  const router = createBrowserRouter(
    [
      {
        path: "*",
        element: (
          <NuqsAdapter>
            <App />
          </NuqsAdapter>
        ),
      },
    ],
    { basename: import.meta.env.VITE_BASENAME },
  );
  initializeApp(router);
}
