import { addRevisionMethodsBasedOnSingleResource } from "@react-admin/ra-history";
import { addLocksMethodsBasedOnALockResource } from "@react-admin/ra-realtime";
import createFakeRestProvider from "ra-data-fakerest";
import { generateData } from "./dataGenerator/generateData";
import { withLifecycleCallbacks } from "react-admin";
import { getUserFromStorage } from "./utils";

const fakerestDataProvider = createFakeRestProvider(generateData(), true);

const baseDataProvider = addRevisionMethodsBasedOnSingleResource(
  addLocksMethodsBasedOnALockResource(fakerestDataProvider),
);

export const dataProvider = withLifecycleCallbacks(
  {
    ...baseDataProvider,
    subscribe: () => Promise.resolve(),
    unsubscribe: () => Promise.resolve(),
  },
  [
    {
      resource: "boards",
      beforeGetList: (params) => {
        const user = getUserFromStorage();

        return Promise.resolve({
          ...params,
          filter: {
            ...params.filter,
            user_id: user.id,
          },
        });
      },
    },
  ],
);
