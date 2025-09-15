import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Services3: React.FC = () => {
  const { t } = useTranslation("common");

  // bullets'i önce çek, tipini daralt
  const rawBullets = t("services3.bullets", { returnObjects: true });
  const bullets = Array.isArray(rawBullets) ? (rawBullets as string[]) : [];

  return (
    <section id="services-3" className="relative section bg-white">
      {/* alt geçiş */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-700/40 via-white/0 to-white" />

      <div className="container-x grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h2 className="title">{t("services3.title")}</h2>
          <ul className="mt-6 space-y-3 text-text-secondary text-lg">
            {bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className="relative h-72 md:h-[420px] rounded-xl2 overflow-hidden border border-brand-300/30 shadow-soft">
          <Image
            src="/mother-child.jpg"
            alt={t("services3.imageAlt")}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Services3;
