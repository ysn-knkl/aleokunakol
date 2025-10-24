// pages/_app.tsx
import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import nextI18NextConfig from "../next-i18next.config";
import BackToTop from "@/components/common/BackToTop";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Script from "next/script";
import { GA_ID, pageview } from "@/lib/gtag";

const LOCALE_TO_OG: Record<string, string> = {
  de: "de_AT",
  en: "en_US",
  tr: "tr_TR",
  ro: "ro_RO",
};

function AppSeo() {
  const { t } = useTranslation("common");
  const { locale, locales = [], defaultLocale = "de", asPath } = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const current = (locale ?? defaultLocale ?? "de") as keyof typeof LOCALE_TO_OG;
  const ogLocale = LOCALE_TO_OG[current] || LOCALE_TO_OG.de;

  // canonical
  const canonical = `${BASE_URL}${asPath}`.replace(/([^:]\/)\/+/, "$1");

  // asPath’ten locale prefix’ini sök → hreflang üretimi için
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re =
    locales.length > 0
      ? new RegExp(`^/(?:${locales.map(esc).join("|")})(?=/|$)`)
      : /^$/;
  const pathNoLocale = asPath.replace(re, "") || "/";

  // hreflang alternates (link rel="alternate")
  const alternates = [
    ...locales.map((lc) => ({
      rel: "alternate" as const,
      hrefLang: lc,
      href: `${BASE_URL}/${lc}${pathNoLocale}`.replace(/([^:]\/)\/+/, "$1"),
    })),
    {
      rel: "alternate" as const,
      hrefLang: "x-default",
      href: `${BASE_URL}/${defaultLocale}${pathNoLocale}`.replace(/([^:]\/)\/+/, "$1"),
    },
  ];

  // OG locale alternates → meta ile eklenecek
  const ogLocaleAlternate = locales
    .filter((lc) => lc !== current)
    .map((lc) => LOCALE_TO_OG[lc] || null)
    .filter(Boolean) as string[];

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
        // localeAlternate: ogLocaleAlternate, // ❌ Kaldırıldı
      }}
      additionalLinkTags={alternates}
      // 🔧 OG locale alternates'i manuel meta olarak ekle
      additionalMetaTags={ogLocaleAlternate.map((alt) => ({
        property: "og:locale:alternate",
        content: alt,
      }))}
    />
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  // track route changes for SPA navigation
  React.useEffect(() => {
    const handleRoute = (url: string) => pageview(url);
    router.events.on("routeChangeComplete", handleRoute);
    return () => router.events.off("routeChangeComplete", handleRoute);
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <AppSeo />

      {/* Google Analytics */}
      {GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}

      <Component {...pageProps} />
      <BackToTop />
      <WhatsAppButton />
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);