import { getRequestConfig } from "next-intl/server";
import ar from "../../locales/ar.json";
import en from "../../locales/en.json";
import { routing } from "./routing";

function ignoreIntlError() {}

const localeFiles: Record<string, Record<string, unknown>> = { ar, en };

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "ar")) {
    locale = routing.defaultLocale;
  }

  const messages = localeFiles[locale];
  if (!messages) {
    throw new Error(`Missing locale file: ${locale}`);
  }

  return {
    locale,
    messages,
    onError: ignoreIntlError,
    getMessageFallback({ namespace, key }) {
      return [namespace, key].filter(Boolean).join(".");
    },
  };
});
