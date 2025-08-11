import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="QRI Reflex | Refleks Entegrasyonu"
        description="Refleks terapisi, QRI, aromaterapi ve daha fazlası"
        openGraph={{
          type: "website",
          locale: "tr_TR",
          url: "https://www.example.com",
          site_name: "QRI Reflex",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
