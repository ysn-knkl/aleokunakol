import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Services2: React.FC = () => {
  const { t } = useTranslation("common");

  // bullets'i önce çek, tipini daralt
  const rawBullets = t("services2.bullets", { returnObjects: true });
  const bullets = Array.isArray(rawBullets) ? (rawBullets as string[]) : [];

  return (
    <section id="services-2" className="section bg-surface-100">
      <div className="container-x grid gap-10 md:grid-cols-2 items-center">
        <div className="relative h-72 md:h-[420px] rounded-xl2 overflow-hidden border border-brand-300/30 shadow-soft">
          <Image
            src="/qri-laser.jpg"
            alt={t("services2.imageAlt")}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <ul className="mt-6 space-y-3 text-text-secondary text-lg">
          {bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services2;