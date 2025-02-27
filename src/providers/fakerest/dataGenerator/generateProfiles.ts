import { faker } from "@faker-js/faker";
import { defaultProfile } from "./defaultData";


export const generateProfiles = () => {
  return [
    defaultProfile,
    {
      id: 2,
      email: faker.internet.email({ provider: "atomic.dev" }),
      password: "demo",
    },
    {
      id: 3,
      email: faker.internet.email({ provider: "atomic.dev" }),
      password: "demo",
    },
  ];
};
