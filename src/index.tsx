import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, RouterProviderProps } from "react-router";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
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
      const router = createHashRouter(
        [
          {
            path: "*",
            element: <App />,
          },
        ],
        { basename: import.meta.env.VITE_BASENAME },
      );
      initializeApp(router);
    });
} else {
  const router = createBrowserRouter(
    [
      {
        path: "*",
        element: <App />,
      },
    ],
    { basename: import.meta.env.VITE_BASENAME },
  );
  initializeApp(router);
}
