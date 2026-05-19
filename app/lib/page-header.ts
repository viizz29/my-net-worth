export type PageHeaderContentKey = "accounts" | "transactions" | "dashboard";

type RouteHeaderDefinition = {
  href: string;
  contentKey: PageHeaderContentKey;
};

const routeHeaderDefinitions: RouteHeaderDefinition[] = [
  {
    href: "/accounts",
    contentKey: "accounts",
  },
  {
    href: "/transactions",
    contentKey: "transactions",
  },
  {
    href: "/",
    contentKey: "dashboard",
  },
];

function getPathnameWithoutLocale(pathname: string, locale: string) {
  const localePrefix = `/${locale}`;

  if (pathname === localePrefix) {
    return "/";
  }

  if (pathname.startsWith(`${localePrefix}/`)) {
    return pathname.slice(localePrefix.length);
  }

  return pathname;
}

export function getPageHeaderContentKey(
  pathname: string,
  locale: string,
): PageHeaderContentKey {
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname, locale);
  const matchedRoute = routeHeaderDefinitions.find(({ href }) => {
    if (href === "/") {
      return pathnameWithoutLocale === href;
    }

    return (
      pathnameWithoutLocale === href ||
      pathnameWithoutLocale.startsWith(`${href}/`)
    );
  });

  return (
    matchedRoute?.contentKey ??
    routeHeaderDefinitions[routeHeaderDefinitions.length - 1].contentKey
  );
}
