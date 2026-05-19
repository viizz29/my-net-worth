"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/app/lib/utils";

export default function SidebarShell({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const t = useTranslations("sideBar");

  return (
    <aside
      data-collapsed={isCollapsed}
      className={cn(
        "group/sidebar min-h-screen overflow-hidden border-r border-border bg-sidebar p-4 text-foreground transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="mb-4 flex h-10 items-center">
        <div className="mr-auto whitespace-nowrap text-xl font-bold text-blue-600 group-data-[collapsed=true]/sidebar:hidden dark:text-blue-400">
          {t("brand")}
        </div>
        <button
          onClick={() => setIsCollapsed((collapsed) => !collapsed)}
          className={cn(
            "rounded p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            isCollapsed && "mx-auto",
          )}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-expanded={!isCollapsed}
          type="button"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {children}
    </aside>
  );
}
