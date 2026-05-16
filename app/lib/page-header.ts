export type PageHeaderContent = {
  title: string;
  subtitle: string;
};

type RouteHeaderDefinition = {
  href: string;
  content: PageHeaderContent;
};

const routeHeaderDefinitions: RouteHeaderDefinition[] = [
  {
    href: "/accounts",
    content: {
      title: "Accounts",
      subtitle: "Manage the accounts that power your net worth tracking.",
    },
  },
  {
    href: "/transactions",
    content: {
      title: "Transactions",
      subtitle: "Review, create, and update the activity across your accounts.",
    },
  },
  {
    href: "/",
    content: {
      title: "Dashboard",
      subtitle: "Your financial overview",
    },
  },
];

export function getPageHeaderContent(pathname: string): PageHeaderContent {
  const matchedRoute = routeHeaderDefinitions.find(({ href }) => {
    if (href === "/") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  });

  return (
    matchedRoute?.content ??
    routeHeaderDefinitions[routeHeaderDefinitions.length - 1].content
  );
}
