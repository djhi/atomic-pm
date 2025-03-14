import { MswAdapter } from "fakerest";
import { http } from "msw";
import { setupWorker } from "msw/browser";
import { generateData } from "./dataGenerator/generateData";

export const setupFakeServer = () => {
  const data = generateData();
  const mswAdapter = new MswAdapter({
    baseUrl: import.meta.env.VITE_SIMPLE_REST_URL as string,
    data,
  });
  if (typeof window !== "undefined") {
    // @ts-expect-error give way to update data in the console
    (window as any)._database = mswAdapter.server.database;
  }

  const handler = mswAdapter.getHandler();
  const worker = setupWorker(
    // Make sure you use a RegExp to target all calls to the API
    http.all(
      new RegExp(import.meta.env.VITE_SIMPLE_REST_URL as string),
      handler,
    ),
  );
  return worker;
};
