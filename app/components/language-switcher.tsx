"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const locales = ["en", "hi"];

type LanguageSwitcherProps = {
  locale: string;
};

function buildLocalePathname(pathname: string, locale: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] && locales.includes(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  return `/${segments.join("/")}`;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const targetLocale = locales.find((item) => item !== locale) ?? locale;
  const localeName = t(targetLocale === "en" ? "english" : "hindi");
  const href = buildLocalePathname(pathname ?? "/", targetLocale);
  const search = searchParams?.toString();
  const linkHref = search ? `${href}?${search}` : href;

  return (
    <Link
      href={linkHref}
      className="rounded-lg border border-border bg-muted/80 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
      aria-label={t("label")}
    >
      {t("switchTo", { locale: localeName })}
    </Link>
  );
}
