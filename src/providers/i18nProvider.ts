import polyglotI18nProvider from "ra-i18n-polyglot";
import { englishMessages } from "./locales/en";

const asyncMessages = {
  fr: () => import("./locales/fr").then((messages) => messages.frenchMessages),
} as Record<string, () => Promise<Record<string, string>>>;

const messagesResolver = (locale: string) => {
  if (asyncMessages[locale]) {
    return asyncMessages[locale]();
  }
  return englishMessages;
};

export const i18nProvider = polyglotI18nProvider(
  messagesResolver,
  'en',
  [
    { locale: "en", name: "English" },
    { locale: "fr", name: "Français" },
  ],
);
