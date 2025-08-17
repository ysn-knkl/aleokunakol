// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const LOCALE_TO_OG: Record<string, string> = {
  tr: "tr_TR",
  en: "en_US",
  de: "de_AT",
  ro: "ro_RO",
};

function AppSeo() {
  const { t } = useTranslation("common");
  const { locale, locales = [], defaultLocale, asPath } = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const current = (locale ?? defaultLocale ?? "de") as keyof typeof LOCALE_TO_OG;
  const ogLocale = LOCALE_TO_OG[current] || LOCALE_TO_OG.de;

  // asPath şu anki URL'i (aktif locale ile) içerir → canonical bunu doğrudan kullansın
  const canonical = `${BASE_URL}${asPath}`.replace(/([^:]\/)\/+/, "$1");

  // asPath içindeki mevcut locale prefix'ini sök (hreflang üretimi için)
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re =
    locales.length > 0
      ? new RegExp(`^/(?:${locales.map(esc).join("|")})(?=/|$)`)
      : /^$/; // boş, match etmez
  const pathNoLocale = asPath.replace(re, "") || "/";

  // hreflang alternates
  const alternates = [
    ...locales.map((lc) => ({
      rel: "alternate" as const,
      hrefLang: lc,
      href: `${BASE_URL}/${lc}${pathNoLocale}`.replace(/([^:]\/)\/+/, "$1"),
    })),
    {
      rel: "alternate" as const,
      hrefLang: "x-default",
      href: `${BASE_URL}/${defaultLocale ?? "de"}${pathNoLocale}`.replace(
        /([^:]\/)\/+/,
        "$1"
      ),
    },
  ];

  return (
    <DefaultSeo
      title={t("seo.title")}
      description={t("seo.description")}
      canonical={canonical}
      openGraph={{
        type: "website",
        locale: ogLocale,
        site_name: t("seo.siteName"),
        url: canonical,
      }}
      additionalLinkTags={alternates}
    />
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppSeo />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);