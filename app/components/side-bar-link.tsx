"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/app/lib/utils";

const locales = ["en", "hi"];

type SidebarLinkProps = {
  href: string;
  label: string;
  icon: string;
};

function normalizePathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] && locales.includes(segments[0])) {
    const pathWithoutLocale = `/${segments.slice(1).join("/")}`;
    return pathWithoutLocale === "/" ? "/" : pathWithoutLocale.replace(/\/$/, "");
  }

  return pathname === "/" ? pathname : pathname.replace(/\/$/, "");
}

export default function SidebarLink({ href, label, icon }: SidebarLinkProps) {
  const pathname = normalizePathname(usePathname());

  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      title={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-4 rounded p-2 transition-colors",
        isActive
          ? "bg-muted font-medium text-foreground"
          : "text-foreground hover:bg-muted",
      )}
    >
      <div
        className={cn(
          "flex w-6 justify-center font-bold transition-colors",
          isActive ? "text-primary" : "text-muted-foreground",
        )}
      >
        {icon}
      </div>
      <span className="whitespace-nowrap text-sm font-medium group-data-[collapsed=true]/sidebar:hidden">
        {label}
      </span>
    </Link>
  );
}
