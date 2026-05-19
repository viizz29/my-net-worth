"use client";

import { useTranslations } from "next-intl";
import SidebarLink from "./side-bar-link";
import SidebarShell from "./side-bar-shell";

const navItems = [
  { href: "/", labelKey: "home", icon: "H" },
  { href: "/accounts", labelKey: "accounts", icon: "A" },
  { href: "/transactions", labelKey: "transactions", icon: "T" },
];

export default function Sidebar() {
  const t = useTranslations("sideBar");

  return (
    <SidebarShell>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            label={t(item.labelKey)}
            icon={item.icon}
          />
        ))}
      </nav>
    </SidebarShell>
  );
}
