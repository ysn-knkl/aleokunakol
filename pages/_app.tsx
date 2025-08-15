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
  const { locale, locales = [], asPath } = useRouter();

  // Configurable base URL (ENV) and default locale for x-default
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const defaultLocale = "de"; // project-wide default when path has no locale

  // Current locale and OG locale mapping
  const current = (locale as keyof typeof LOCALE_TO_OG) || defaultLocale;
  const ogLocale = LOCALE_TO_OG[current] || LOCALE_TO_OG[defaultLocale];

  // Current path ("/" -> "") and canonical URL
  const path = asPath === "/" ? "" : asPath;
  const canonical = `${BASE_URL}/${current}${path}`.replace(/([^:]\/)\/+/, "$1");

  // hreflang alternates built from configured locales
  const alternates = [
    ...locales.map((lc) => ({
      rel: "alternate" as const,
      hrefLang: lc,
      href: `${BASE_URL}/${lc}${path}`,
    })),
    {
      rel: "alternate" as const,
      hrefLang: "x-default",
      href: `${BASE_URL}/${defaultLocale}${path}`,
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