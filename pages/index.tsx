import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <>
      <Head>
        <title>QRI Reflex | Refleks Entegrasyonu</title>
        <meta
          name="description"
          content="Refleks terapisi, QRI, aromaterapi ve daha fazlası"
        />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "tr", ["common"])),
  },
});
