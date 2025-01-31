import {
  ContainerLayout,
  ContainerLayoutClasses,
} from "@react-admin/ra-navigation";
import type { ReactNode } from "react";
import { CheckForApplicationUpdate } from "react-admin";
import { AppBar } from "./AppBar";

export const Layout = ({ children }: { children: ReactNode }) => (
  <ContainerLayout
    appBar={<AppBar />}
    sx={{ [`& .${ContainerLayoutClasses.content}`]: { maxWidth: "unset" } }}
  >
    {children}
    <CheckForApplicationUpdate />
  </ContainerLayout>
);
