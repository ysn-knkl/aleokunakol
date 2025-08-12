import "../styles/globals.css";
import type { AppProps } from "next/app";
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
  const { locale, locales, asPath } = useRouter();

  const current = locale ?? "de";
  const ogLocale = LOCALE_TO_OG[current] || "de_AT";

  // hreflang/alternate
  const hrefLangs =
    (locales || []).map((lc) => ({
      rel: "alternate",
      hrefLang: lc,
      href: `/${lc}${asPath === "/" ? "" : asPath}`,
    })) ?? [];

  // x-default (varsayılan)
  hrefLangs.push({
    rel: "alternate",
    hrefLang: "x-default",
    href: `${asPath}`,
  });

  return (
    <DefaultSeo
      title={t("seo.title")}
      description={t("seo.description")}
      openGraph={{
        type: "website",
        locale: ogLocale,
        site_name: t("seo.siteName"),
      }}
      additionalLinkTags={hrefLangs}
    />
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppSeo />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
