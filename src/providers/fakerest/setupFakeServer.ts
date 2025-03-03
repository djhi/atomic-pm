import { MswAdapter } from "fakerest";
import { http } from "msw";
import { setupWorker } from "msw/browser";
import { generateData } from "./dataGenerator/generateData";

export const setupFakeServer = () => {
  const data = generateData();
  const mswAdapter = new MswAdapter({
    baseUrl: "http://localhost:3000",
    data,
  });
  if (typeof window !== "undefined") {
    // @ts-expect-error give way to update data in the console
    (window as any)._database = mswAdapter.server.database;
  }

  const handler = mswAdapter.getHandler();
  const worker = setupWorker(
    // Make sure you use a RegExp to target all calls to the API
    http.all(/http:\/\/localhost:3000/, handler),
  );
  return worker;
};
