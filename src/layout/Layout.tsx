import {
  ContainerLayout,
  ContainerLayoutClasses,
} from "@react-admin/ra-navigation";
import type { ReactNode } from "react";
import { CheckForApplicationUpdate } from "react-admin";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppBar } from "./AppBar";

export const Layout = ({ children }: { children: ReactNode }) => (
  <ContainerLayout
    appBar={<AppBar />}
    sx={{
      [`&`]: {
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
      },
      [`& .${ContainerLayoutClasses.content}`]: {
        maxWidth: "unset",
        bgcolor: "transparent",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      },
    }}
  >
    {children}
    <CheckForApplicationUpdate />
    <ReactQueryDevtools />
  </ContainerLayout>
);
