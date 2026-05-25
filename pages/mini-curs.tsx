import type { GetStaticProps } from "next";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { useCallback, useState, type FormEvent } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Modal from "@/components/common/Modal";
import { Footer, Navbar } from "@/components";

export default function MiniCursPage() {
  const { t } = useTranslation("common");
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    "https://www.aleokunakol.com/ro/mini-curs"
  )}`;
  const sections = [

    {
      title: "Cum să îți dai seama dacă reflexele primitive neintegrate îți influențează copilul astfel încât să știi ce să faci acasă, în doar 10–15 minute pe zi",
      body1: "Un mini-curs gratuit pe e-mail (6 mesaje) în care observi corpul înainte de comportament, înțelegi 4 reflexe-cheie (Moro, Galant, ATNR/STNR) și primești exerciții simple, blânde, pe care le poți aplica imediat.",
      body2: t(
        "miniCourse.sections.1.body2",
        "Vei găsi explicații clare, idei ușor de aplicat și un punct de plecare calm pentru a observa nevoile copilului tău fără presiune."
      ),
      image: "/mini-course/MSA5270.jpg",
      imageAlt: t("miniCourse.sections.1.imageAlt", "Sesiune de integrare a reflexelor"),
      reverse: false,
    },
    {
      title: "Beneficii",
      isList: true,
      items: [
        'Mini-chestionar de semne/simptome ca să știi rapid de unde pornești.',
        'Înveți să observi corpul copilului (nu doar comportamentul) și ce îți transmite sistemul nervos.',
        'Înțelegi 4 reflexe-cheie (Moro, Galant, ATNR, STNR) și cum se văd acasă.',
        'Primești exerciții blânde + un plan de 10–15 min/zi de aplicat imediat.',
        'Acces la grupul Facebook & comunitate pentru sprijin și claritate.',
      ],
      image: "/mini-course/MSA5047.jpg",
      imageAlt: t("miniCourse.sections.2.imageAlt", "Exerciții de reflex integrare"),
      reverse: true,
    },
    {
      title: "Despre mine",
      body1: "De peste un deceniu lucrez ca fizioterapeut, sprijinind copii cu dizabilități și întârzieri de dezvoltare. Am văzut atât magia, cât și limitele metodelor clasice — uneori, în ciuda muncii intense, corpul copilului rămânea „blocat” într-un tipar care nu se schimba.",
      body2: "Curiozitatea și compasiunea m-au dus către integrarea reflexelor primitive. După ce am descoperit Symphony of Reflexes (Bonnie Brandes), am urmat formarea QRI în 2019, la Madrid. De atunci, am început să observ mai des progrese mai rapide și mai stabile nu pentru că „forțam” noi abilități, ci pentru că sistemul nervos se regla, iar tensiunea din corp începea să cedeze.",
      body3: "Astăzi combin fizioterapia de bază (mișcare, exerciții, atingere blândă) cu integrarea reflexelor, adaptat fiecărui copil. Scopul meu rămâne același: să susțin reglarea și siguranța în corp, ca dezvoltarea să poată continua natural.",
      image: "/mini-course/MSA5333.jpg",
      imageAlt: t("miniCourse.sections.3.imageAlt", "Părinte și copil în sesiune"),
      reverse: false,
    },
    {
      title: "Este pentru tine dacă…",
      isList: true,
      items: [
        'copilul are reacții intense sau se sperie ușor',
        'tranzițiile sunt grele (plecat, îmbrăcat, schimbare de activitate)',
        'somnul e agitat / adormirea e dificilă',
        'la masă se foiește, se prăbușește sau obosește repede',
        'apar dificultăți de coordonare, postură, echilibru',
        'ai încercat „cu vorba bună” și tot simți că „nu se poate mereu”',
      ],
      image: "/mini-course/MSA4889.jpg",
      imageAlt: t("miniCourse.sections.4.imageAlt", "Materiale pentru părinți"),
      reverse: true,
    },
  ];

  const openSubscribeModal = useCallback(() => setIsSubscribeOpen(true), []);
  const closeSubscribeModal = useCallback(() => {
    setIsSubscribeOpen(false);
    setEmail("");
  }, []);

  const handleSubscribe = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const response = await fetch(
          "/api/activecampaign/subscribe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          }
        );

        if (!response.ok) {
          alert("Subscription failed");
          return;
        }

        alert("Successfully subscribed!");

        closeSubscribeModal();
      } catch (error) {
        console.log(error);

        alert("Something went wrong");
      }
    },
    [closeSubscribeModal, email]
  );
  const ActionBar = ({ subscribe = false, share = false }: { subscribe?: boolean; share?: boolean }) => (
    <div className="flex flex-col gap-3 bg-surface-50 p-4 md:flex-row md:items-center md:justify-center">
      {subscribe && (
        <button className="btn-primary justify-center text-center" onClick={openSubscribeModal}>
          {t("miniCourse.actions.subscribe", "Subscribe")}
        </button>
      )}
      {share && (
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-full border border-brand-300/40 px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:bg-white"
        >
          {t("miniCourse.actions.shareFacebook", "Share on Facebook")}
        </a>
      )}
    </div>
  );

  return (
    <>
      <NextSeo
        title={"Mini Curs"}
        description={"Un ghid scurt pentru părinți și copii."}
        openGraph={{
          title: "Mini Curs",
          description: "Un ghid scurt pentru părinți și copii.",
        }}
      />
      <Navbar />

      <main className="pt-28 pb-16">

        {/* Sayfa özel içerik */}
        <section className="container-x mt-10">
          <>
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div key={section.title} className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
                    <article
                      className={`rounded-2xl border border-brand-300/30 bg-white p-6 md:p-8 shadow-soft ${section.reverse ? "lg:order-2" : "lg:order-1"}`}
                    >
                      <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-text-primary">
                        {section.title}
                      </h2>
                      <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-text-secondary">
                        {
                          section.isList ?
                            <ul className="flex flex-col gap-4 mt-2">
                              {section?.items.map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                  <span className="text-[30px] leading-none text-black">•</span>
                                  <span>
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            :
                            <>
                              <p>{section.body1}</p>
                              <p>{section.body2}</p>
                              <p>{section.body3}</p>
                            </>
                        }
                      </div>
                    </article>

                    <div
                      className={`overflow-hidden rounded-2xl border border-brand-300/30 bg-white shadow-soft ${section.reverse ? "lg:order-1" : "lg:order-2"
                        }`}
                    >
                      <div className="relative h-80 md:h-[520px]">
                        <Image
                          src={section.image}
                          alt={section.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 52vw"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>

                  {index === 0 && <ActionBar subscribe />}
                  {index === 1 && <ActionBar share />}
                  {index === 2 && <ActionBar subscribe />}
                  {index === 3 && <ActionBar subscribe share />}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <span className="font-bold">
                Notă importantă:
              </span>
              Conținut educațional. Nu înlocuiește evaluarea medicală/terapeutică.
              Mini cursul nu este pentru a stabili un diagnostic și nu înlocuiește evaluarea medicală. Este un mini-ghid practic pentru părinți, bazat pe observație și pași blânzi de acasă.

            </div>
          </>
        </section>
      </main>

      <Footer showMaps={false} />

      <Modal
        title={t("miniCourse.subscribeModal.title", "Subscribe")}
        open={isSubscribeOpen}
        onClose={closeSubscribeModal}
        size="md"
      >
        <form onSubmit={handleSubscribe} className="not-prose space-y-4">
          <div>
            <label htmlFor="mini-curs-email" className="mb-2 block text-sm font-medium text-text-primary">
              {t("miniCourse.subscribeModal.emailLabel", "Email address")}
            </label>
            <input
              id="mini-curs-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("miniCourse.subscribeModal.emailPlaceholder", "Enter your email")}
              className="w-full rounded-xl border border-brand-300/30 px-4 py-3 text-text-primary outline-none transition focus:border-brand-500"
              required
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeSubscribeModal}
              className="rounded-full border border-brand-300/40 px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:bg-surface-100"
            >
              {t("common.cancel", "Cancel")}
            </button>
            <button type="submit" className="btn-primary justify-center text-center">
              {t("miniCourse.actions.subscribe", "Subscribe")}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = "de" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
