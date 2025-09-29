import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]"; // relative path
import type { Session } from "next-auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type MediaItem =
  | { type: "image"; url: string }
  | { type: "video"; url: string }
  | { type: "text"; content: string };

type AssignedExercise = {
  assignmentId: string;
  schedule: { sets?: number; reps?: number; days?: string[] };
  startAt?: string | null;
  endAt?: string | null;
  status: string;
  notes: string;
  createdAt: string;
  exercise: {
    id: string;
    title: string;
    slug?: string;
    level?: string;
    description?: string;
    bodyParts: string[];
    tags: string[];
    media: MediaItem[];
  };
};

const ExercisesPage: NextPage = () => {
  const { t } = useTranslation("common");
  const [items, setItems] = React.useState<AssignedExercise[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState<AssignedExercise | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/me/assignments").then((x) => x.json());
      if (!r?.ok) setError(r?.error || t("common.error", "Hata"));
      else setItems(r.data || []);
    } catch (e: any) {
      setError(e?.message || t("common.error", "Hata"));
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="exercises" className="relative min-h-screen flex flex-col">
      {/* background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-700/40 via-white/0 to-white" />

      <Head>
        <title>
          {t("nav.exercises", "Übungen")} • {t("brand.name", "QRI")}
        </title>
        <meta name="description" content={t("seo.description")} />
      </Head>

      <Navbar />

      <div className="flex-1  container-x py-8 mt-24">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            {t("exercises.title", "Egzersizlerim")}
          </h1>
          <button
            onClick={load}
            className="px-3 py-2 rounded-lg border hover:bg-surface-50"
            aria-label={t("common.refresh", "Yenile")}
          >
            {t("common.refresh", "Yenile")}
          </button>
        </div>

        {loading ? (
          <div className="text-text-secondary">
            {t("common.loading", "Yükleniyor…")}
          </div>
        ) : error ? (
          <div className="text-red-600">
            {t("common.error", "Hata")}: {error}
          </div>
        ) : items.length === 0 ? (
          <div className="text-text-secondary">
            {t(
              "exercises.empty",
              "Henüz sana atanmış bir egzersiz bulunmuyor."
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((a) => {
              const img = (a.exercise.media || []).find(
                (m) => m.type === "image"
              ) as { type: "image"; url: string } | undefined;
              return (
                <div
                  key={a.assignmentId}
                  className="rounded-2xl border shadow-soft overflow-hidden bg-white flex flex-col"
                >
                  {img?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img.url}
                      alt={a.exercise.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-surface-100 flex items-center justify-center text-text-secondary text-sm">
                      {t("exercises.noImage", "Görsel yok")}
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-sm text-text-secondary mb-1">
                      {a.exercise.level ||
                        t("exercises.levelUnknown", "Seviye ?")}
                    </div>
                    <div className="font-medium">{a.exercise.title}</div>
                    <div className="text-xs text-text-secondary mt-1">
                      {a.schedule?.sets
                        ? `${a.schedule.sets} ${t("exercises.set", "set")}`
                        : "-"}{" "}
                      •{" "}
                      {a.schedule?.reps
                        ? `${a.schedule.reps} ${t("exercises.rep", "tekrar")}`
                        : "-"}{" "}
                      •{" "}
                      {Array.isArray(a.schedule?.days)
                        ? a.schedule.days.join(", ")
                        : "-"}
                    </div>
                    <div className="mt-auto pt-3">
                      <button
                        className="w-full px-3 py-2 rounded-lg border hover:bg-surface-50"
                        onClick={() => setOpen(a)}
                      >
                        {t("exercises.details", "Detay")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detay Modal */}
        {open && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setOpen(null)}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold">
                  {open.exercise.title}
                </h3>
                <button
                  className="px-3 py-1 rounded border hover:bg-surface-50"
                  onClick={() => setOpen(null)}
                >
                  {t("common.close", "Kapat")}
                </button>
              </div>
              <div className="mt-4 grid gap-3">
                <div className="text-sm text-text-secondary">
                  {(open.exercise.level || "-") + " • "}
                  {open.exercise.bodyParts?.length
                    ? open.exercise.bodyParts.join(", ")
                    : "-"}
                </div>

                {open.exercise.description ? (
                  <p className="text-sm">{open.exercise.description}</p>
                ) : null}

                {open.exercise.media?.some((m) => m.type === "text") ? (
                  <div className="rounded-lg border p-3 bg-surface-50">
                    {
                      (open.exercise.media.find(
                        (m) => m.type === "text"
                      ) as any)?.content
                    }
                  </div>
                ) : null}

                {open.exercise.media?.some((m) => m.type === "video") ? (
                  <a
                    className="inline-block px-3 py-2 rounded-lg border hover:bg-surface-50 text-sm"
                    href={
                      (open.exercise.media.find(
                        (m) => m.type === "video"
                      ) as any)?.url
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("exercises.openVideo", "Videoyu Aç")}
                  </a>
                ) : null}

                <div className="text-xs text-text-secondary">
                  {t("exercises.plan", "Plan")}:{" "}
                  {(open.schedule?.sets
                    ? `${open.schedule.sets} ${t("exercises.set", "set")}`
                    : "-") +
                    " • " +
                    (open.schedule?.reps
                      ? `${open.schedule.reps} ${t(
                          "exercises.rep",
                          "tekrar"
                        )}`
                      : "-") +
                    " • " +
                    (Array.isArray(open.schedule?.days)
                      ? open.schedule.days.join(", ")
                      : "-")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer showMaps={false} />
    </section>
  );
};

export default ExercisesPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = (await getServerSession(
    ctx.req,
    ctx.res,
    authOptions as any
  )) as Session | null;

  if (!session?.user?.email) {
    const locale = ctx.locale || "de";
    return {
      redirect: {
        destination: `/${locale}/login?callbackUrl=/${locale}/exercises`,
        permanent: false,
      },
    };
  }

  const locale = ctx.locale ?? "de";
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};