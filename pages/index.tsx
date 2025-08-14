import { Navbar, Hero, About, Services, Contact, Footer, Angebot, InfoCard, MotherChildCard } from "../components";

import { GetStaticProps } from "next";
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
        <About />
        <Services />
        <Angebot />
        <InfoCard />
        <MotherChildCard />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "de", ["common"])),
  },
});
