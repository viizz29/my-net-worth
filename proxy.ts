import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "hi"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match localized routes and bare localized entry points
  matcher: ["/", "/(en|hi)/:path*", "/(login|accounts|transactions)/:path*"],
};
