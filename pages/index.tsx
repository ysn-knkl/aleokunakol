// pages/index.tsx
import {
  Navbar,
  Hero,
  About,
  Services,
  Contact,
  Footer,
  InfoCard,
  MotherChildCard,
  Services2,
  Services3,
  OfferPackages,
} from "../components";

import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo
        title={t("seo.title")}
        description={t("seo.description")}
        openGraph={{
          title: t("seo.title"),
          description: t("seo.description"),
        }}
      />

      <Navbar />
      <main>
        <Hero />
        <Services />
        <InfoCard />
        <Services2 />
        <Services3 />
        <MotherChildCard />
        <About />
        <OfferPackages />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = "de" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60, // opsiyonel: her 60 sn'de yeniden üretim
  };
};