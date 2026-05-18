"use client";

import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";
import { getUserInfo } from "../api-calls/auth-api";
import { useAuth } from "../auth/use-auth";
import { useQuery } from "@tanstack/react-query";
import { getPageHeaderContent } from "../lib/page-header";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { title, subtitle } = getPageHeaderContent(pathname);

  const { data: userInfo } = useQuery({
    queryKey: ["user-info", user],
    queryFn: getUserInfo,
    enabled: user != null,
  });

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6 text-foreground transition-colors duration-300">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserMenu name={userInfo?.name || "John Doe"} />
      </div>
    </header>
  );
}
