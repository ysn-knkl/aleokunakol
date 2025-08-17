// pages/exercises.tsx
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Exercise = {
  id: string;
  title: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  youtube?: string;
};

type Props = { exercises: Exercise[] };

export default function ExercisesPage({ exercises }: Props) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("exercises.title", "Egzersizler")} | QRI Reflex</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Navbar />

      {/* Fixed navbar altında boşluk */}
      <main className="pt-28 pb-16">
        {/* Üst başlık bloğu */}
        <section className="container-x">
          <div className="rounded-2xl bg-gradient-to-r from-brand-50 to-surface-50 border border-brand-300/30 p-6 md:p-8 shadow-soft">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              {t("exercises.title", "Egzersizler")}
            </h1>
            <p className="mt-3 text-text-secondary max-w-3xl">
              {t(
                "exercises.lead",
                "Kişisel programınıza eşlik eden görseller ve kısa açıklamalar. Lütfen tempo, tekrar ve set sayılarını size verilen plana göre uygulayın."
              )}
            </p>
          </div>
        </section>

        {/* Kartlar */}
        <section className="container-x mt-10">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 xl:grid-cols-3">
            {exercises.map((ex) => (
              <article
                key={ex.id}
                className="group rounded-2xl border border-brand-300/30 bg-white shadow-soft overflow-hidden transition hover:shadow-lg"
              >
                {/* Görseller */}
                <div className="grid grid-cols-2">
                  {/* BEFORE */}
                  <div className="relative aspect-[4/3] border-r border-brand-300/20">
                    <Image
                      src={ex.beforeImg}
                      alt={`${ex.title} — ${t("exercises.labels.before", "Önce")}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="absolute left-2 top-2 rounded-md bg-black/55 text-white text-[11px] px-2 py-1 tracking-wide">
                      {t("exercises.labels.before", "ÖNCE")}
                    </span>
                  </div>
                  {/* AFTER */}
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={ex.afterImg}
                      alt={`${ex.title} — ${t("exercises.labels.after", "Sonra")}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="absolute left-2 top-2 rounded-md bg-black/55 text-white text-[11px] px-2 py-1 tracking-wide">
                      {t("exercises.labels.after", "SONRA")}
                    </span>
                  </div>
                </div>

                {/* İçerik */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-text-primary">{ex.title}</h3>

                  <div className="mt-3 rounded-xl bg-surface-50 border border-brand-300/30 p-4">
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {ex.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {ex.youtube ? (
                      <a
                        href={ex.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline text-sm"
                      >
                        {t("exercises.video.watch", "YouTube’da izle")}
                      </a>
                    ) : (
                      <span className="text-text-muted text-sm">
                        {t("exercises.video.soon", "Video yakında")}
                      </span>
                    )}

                    {/* Hafif “chip” */}
                    <span className="rounded-full border border-brand-300/30 bg-surface-50 px-3 py-1 text-[12px] text-text-secondary">
                      {t("exercises.chip.guided", "Rehberli hareket")}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// ——————————————————————————————————————————
// SADECE GİRİŞ YAPANLAR GÖRSÜN: GSSP + i18n yükle
export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const locale = ctx.locale ?? "de";

  if (!session) {
    return {
      redirect: {
        destination: `/${locale}/login?callbackUrl=${encodeURIComponent(
          `/${locale}/exercises`
        )}`,
        permanent: false,
      },
    };
  }

  // — Şimdilik statik örnekler; projedeki mevcut görseller kullanıldı
  const exercises: Exercise[] = [
    {
      id: "neck-mob",
      title: "Boyun Mobilizasyonu",
      beforeImg: "/services.jpg",
      afterImg: "/ale-dashboard.jpg",
      description:
        "Omurga hizası korunarak yavaş fleksiyon/ekstansiyon ve yanal eğimler. Nefesle ritim tutarak yapın.",
      youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "shoulder-opener",
      title: "Omuz Açıcı",
      beforeImg: "/services.jpg",
      afterImg: "/hero.jpg",
      description:
        "Skapula stabil tutulurken band ile kontrollü dış rotasyon. Dirsek gövdeye yakın, omuzlar gevşek.",
      youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "core-activation",
      title: "Core Aktivasyonu",
      beforeImg: "/ale-dashboard.jpg",
      afterImg: "/services.jpg",
      description:
        "Diyafram nefesiyle hafif core bracing’i eşleştirerek başlangıç seviyesi stabilizasyon çalışması.",
      youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return {
    props: {
      exercises,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};