import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const About: React.FC = () => {
  const { t } = useTranslation("common");

  // Gövde metnini paragraflara ayır
  const rawBody = t("about.body", { defaultValue: "" }) as string;
  const paragraphs = (rawBody || "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // Rozetler ve öne çıkanlar (i18n)
  const rawBadges = t("about.badges", { returnObjects: true }) as unknown;
  const badges = Array.isArray(rawBadges) ? (rawBadges as string[]) : [];

  const rawHighlights = t("about.highlights", { returnObjects: true }) as unknown;
  const highlights = Array.isArray(rawHighlights) ? (rawHighlights as string[]) : [];

  return (
    <section id="about" className="bg-surface-100/60">
      <div className="container-x grid gap-10 lg:grid-cols-[420px,1fr] pt-16 pb-24">
        {/* SOL: Profil / sticky kart */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="rounded-2xl border border-brand-300/30 bg-white shadow-soft overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/ale-dashboard.jpg"
                alt={t("about.imageAlt", "Porträt")}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                {t("about.title")}
              </h2>

              {/* rozetler (i18n) */}
              {badges.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {badges.map((b, i) => (
                    <span
                      key={i}
                      className={[
                        "px-3 py-1 text-sm rounded-full border",
                        i === 0
                          ? "bg-brand-50 text-brand-700 border-brand-200"
                          : "bg-gray-50 text-gray-700 border-gray-200",
                      ].join(" ")}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* mini öne çıkanlar (i18n) */}
              {highlights.length > 0 && (
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-600" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA */}
              <a
                href="#contact"
                className="mt-6 inline-flex items-center justify-center w-full rounded-xl bg-brand-600 text-white font-medium py-3 hover:bg-brand-700 transition"
                aria-label={t("nav.cta", "Termin buchen")}
              >
                {t("nav.cta")}
              </a>
            </div>
          </div>
        </aside>

        {/* SAĞ: içerik */}
        <article className="prose prose-neutral max-w-none">
          <h1 className="!mb-6 text-3xl md:text-4xl font-semibold tracking-tight">
            {t("about.title")}
          </h1>

          <div className="text-lg leading-8 text-gray-800">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "first-letter:text-5xl first-letter:font-semibold first-letter:mr-2 first-letter:leading-none"
                    : ""
                }
              >
                {p}
              </p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;