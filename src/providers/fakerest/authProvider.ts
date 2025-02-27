import { AuthProvider } from "react-admin";
import { dataProvider } from "./dataProvider";
import { DEFAULT_USER, getUserFromStorage, USER_STORAGE_KEY } from "./utils";

localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ ...DEFAULT_USER }));

async function getUser(email: string) {
  const profiles = await dataProvider.getList("profiles", {
    pagination: { page: 1, perPage: 200 },
    sort: { field: "name", order: "ASC" },
  });

  if (!profiles.data.length) {
    return { ...DEFAULT_USER };
  }

  const user = profiles.data.find((profile: any) => profile.email === email);
  if (!user || user.disabled) {
    return { ...DEFAULT_USER };
  }
  return user;
}

export const authProvider: AuthProvider = {
  login: async ({ email }) => {
    const user = await getUser(email);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => (getUserFromStorage() ? Promise.resolve() : Promise.reject()),
  getIdentity: () => {
    const user = getUserFromStorage();
    return Promise.resolve({
      id: user.id,
      fullName: user.email,
    });
  },
};
