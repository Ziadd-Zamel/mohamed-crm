import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|api|sitemap\\.xml|robots\\.txt).*)"],
};
