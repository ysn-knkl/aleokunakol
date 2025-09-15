import React from "react";
import { useTranslation } from "next-i18next";

const InfoCard: React.FC = () => {
  const { t } = useTranslation("common");

  const cards = [
    {
      image: "/info-cards/info-card-1.jpg",
      title: t("infoCards.card1.title"),
      description: t("infoCards.card1.description"),
    },
    {
      image: "/info-cards/info-card-2.jpg",
      title: t("infoCards.card2.title"),
      description: t("infoCards.card2.description"),
    },
    {
      image: "/info-cards/info-card-3.jpg",
      title: t("infoCards.card3.title"),
      description: t("infoCards.card3.description"),
    },
  ];

  return (
    <section id="infocards" className="relative section bg-[#fff7f5]">
      {/* üst & alt geçiş */}
      <div className="pointer-events-none absolute -top-12 inset-x-0 h-12 bg-gradient-to-b from-white to-[#fff7f5]" />
      <div className="pointer-events-none absolute -bottom-12 inset-x-0 h-12 bg-gradient-to-b from-[#fff7f5] to-white" />

      <div className="container-x relative space-y-12 md:space-y-16">
        <h2 className="title text-center">{t("infoCards.title")}</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <article
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl shadow-lg transition-transform duration-500 hover:scale-[1.1] hover:shadow-xl"
            >
              {/* background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${card.image})` }}
              />

              {/* güçlü gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30 transition-opacity duration-500 group-hover:opacity-80" />

              {/* içerik */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 drop-shadow-lg">
                  {card.title}
                </h3>
                <p className="text-white text-sm md:text-base leading-snug drop-shadow-md">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCard;