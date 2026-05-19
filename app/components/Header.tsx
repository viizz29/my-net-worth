import { getTranslations } from "next-intl/server";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./language-switcher";
import type { PageHeaderContentKey } from "../lib/page-header";

type HeaderProps = {
  locale: string;
  contentKey: PageHeaderContentKey;
};

export default async function Header({ locale, contentKey }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: "pageHeader" });
  const title = t(`${contentKey}.title`);
  const subtitle = t(`${contentKey}.subtitle`);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6 text-foreground transition-colors duration-300">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher locale={locale} />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
