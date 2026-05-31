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
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
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

        setIsSubscribeOpen(false);
        setEmail("");
        setIsSuccessOpen(true);
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

      {/* Success Modal */}
      <Modal
        title="Îți mulțumesc! 💛"
        open={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        size="lg"
      >
        <div className="not-prose grid gap-6 md:grid-cols-[1.1fr,1.3fr] items-start">
          {/* Left Column: Image */}
          <div className="relative h-64 md:h-[450px] overflow-hidden rounded-2xl border border-brand-300/20 shadow-md">
            <Image
              src="/mini-course/MSA5333.jpg"
              alt="Alexandra - Fizioterapeut"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
            />
          </div>

          {/* Right Column: Romanian subscription success message details */}
          <div className="space-y-6 text-text-primary text-[0.95rem] leading-relaxed">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-600 mb-2">
                Ești înscris/ă la Mini-cursul gratuit!
              </h3>
              <p className="text-sm font-semibold text-text-secondary leading-snug">
                Cum să îți dai seama dacă reflexele primitive neintegrate îți influențează copilul — astfel încât să știi ce să faci acasă, în doar 10–15 minute pe zi.
              </p>
            </div>

            <p className="text-text-secondary italic bg-surface-50 border-l-4 border-brand-400 p-3 rounded-r-xl">
              În câteva minute vei primi primul e-mail. Între timp, iată ce să faci ca să începi ușor și să obții rezultate:
            </p>

            {/* Step 1 */}
            <div className="space-y-3 bg-brand-50/30 border border-brand-100 p-4 rounded-xl">
              <h4 className="font-bold text-brand-700 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white text-xs">1</span>
                Pasul 1 (important): Verifică e-mailul
              </h4>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1">📩</span>
                  <span><strong>Verifică inbox-ul (și „Promotions/Spam”).</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">🔍</span>
                  <span>
                    Caută mesajul cu subiectul: <em>„Bun venit! De ce copilul vrea... dar uneori nu poate (încă)”</em>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">📥</span>
                  <span>
                    Dacă îl găsești, <strong>mută-l în Inbox</strong> ca să te asiguri că primești toate cele 5 e-mailuri.
                  </span>
                </li>
              </ul>
              <p className="text-xs text-text-secondary border-t border-brand-100/50 pt-2 mt-2">
                Dacă nu ajunge în 10 minute: caută după „Alexandra” sau scrie-mi la:{" "}
                <a href="mailto:info@aleokunakol.com" className="underline text-brand-600 font-semibold hover:text-brand-700">
                  info@aleokunakol.com
                </a>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 bg-brand-50/30 border border-brand-100 p-4 rounded-xl">
              <h4 className="font-bold text-brand-700 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white text-xs">2</span>
                Pasul 2: Intră în comunitatea de pe Facebook
              </h4>
              <p className="text-sm text-text-secondary pl-2">
                Pentru sprijin, întrebări și claritate, te invit în grupul meu privat:
              </p>
              
              <div className="pt-2 pb-3">
                <a
                  href="https://www.facebook.com/groups/1626279855278044/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group/btn overflow-hidden inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#1877f2] via-[#1a85f7] to-[#3b9cff] hover:from-[#166fe5] hover:to-[#2e8bed] text-white px-6 py-3.5 font-bold shadow-[0_4px_20px_rgba(24,119,242,0.35)] hover:shadow-[0_6px_25px_rgba(24,119,242,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center text-[0.98rem] tracking-wide"
                >
                  {/* Subtle shine reflection swipe */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-out" />
                  
                  {/* Glassmorphic Facebook Icon Badge */}
                  <div className="flex items-center justify-center bg-white/10 p-1.5 rounded-xl backdrop-blur-sm group-hover/btn:scale-110 transition-transform duration-300">
                    <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  
                  <span>Intră în grupul Facebook</span>
                  
                  {/* Interactive pointer icon */}
                  <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                    👉
                  </span>
                </a>
              </div>

              <div className="text-xs space-y-2 border-t border-brand-100/50 pt-2">
                <p className="font-semibold text-text-primary">
                  Când ceri acces, te rog să completezi:
                </p>
                <ul className="list-disc list-inside space-y-1 text-text-secondary pl-1">
                  <li>e-mailul cu care te-ai înscris</li>
                  <li>vârsta copilului</li>
                  <li>provocarea #1 (somn / emoții / atenție / postură etc.)</li>
                </ul>
              </div>
            </div>

            {/* Action Bar inside success */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsSuccessOpen(false)}
                className="rounded-full bg-surface-100 hover:bg-surface-200 border border-brand-300/30 px-6 py-2 text-sm font-semibold text-text-primary transition"
              >
                Închide
              </button>
            </div>
          </div>
        </div>
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
