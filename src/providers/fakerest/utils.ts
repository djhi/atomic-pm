export const USER_STORAGE_KEY = "user";

export const DEFAULT_USER = {
  id: 0,
  email: "janedoe@atomic.dev",
  password: "demo",
} as const;

export const getUserFromStorage = () => {
    const userItem = localStorage.getItem(USER_STORAGE_KEY);
    return userItem ? JSON.parse(userItem) : null;
}