import { getRequestConfig } from "next-intl/server";

const locales = ["en", "hi"] as const;
const defaultLocale = "en";

function isLocale(
  locale: string | undefined,
): locale is (typeof locales)[number] {
  return locales.includes(locale as (typeof locales)[number]);
}

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const requestedLocale = locale ?? (await requestLocale);
  const resolvedLocale = isLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default,
  };
});
