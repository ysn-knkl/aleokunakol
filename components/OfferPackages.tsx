import React from "react";
import { useTranslation } from "next-i18next";

type Card = { title: string; price: string; desc: string; note: string };

const OfferPackages = () => {
    const { t } = useTranslation("common");

    const title = t("packages.title");
    const subtitle = t("packages.subtitle");

    const sessionPacks = (t("packages.sessionPacks", { returnObjects: true }) as Card[]) || [];
    const intensive = t("packages.intensive", { returnObjects: true }) as Card;

    // 3 paket + 1 intensive = 4 kart
    const cards: Card[] = [...sessionPacks, intensive];

    return (
        <section id="packages" className="bg-surface-100/70 relative section">

            {/* alt geçiş */}
            <div className="absolute -bottom-4 inset-x-0 h-12 bg-gradient-to-b from-[#fff7f5] to-white" />

            <div className="container-x py-16">
                {/* Büyük başlık + daha kompakt açıklama */}
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
                    {title}
                </h2>
                <p className="mt-3 text-base md:text-lg lg:text-base text-text-secondary">
                    {subtitle}
                </p>

                {/* 4 kolon grid, eşit yükseklik */}
                <div className="mt-10 grid gap-6 auto-rows-fr sm:grid-cols-2 lg:grid-cols-4">
                    {sessionPacks.map((p, i) => (
                        <article
                            key={i}
                            className="h-full rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-gray-50 shadow-sm p-6 flex flex-col transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-400/60"
                        >
                            <header>
                                <h3 className="text-lg md:text-xl font-semibold text-gray-900">{p.title}</h3>
                                <div className="mt-2 text-2xl md:text-3xl font-bold text-brand-600">
                                    {p.price}
                                </div>
                            </header>

                            <p className="mt-3 text-sm text-gray-600 flex-1">{p.desc}</p>

                            {/* soft divider */}
                            <div className="mt-6 border-t border-gray-100" />

                            <div className="mt-4 text-xs text-gray-400">
                                {t("packages.smallPrint")}
                            </div>
                        </article>
                    ))}

                    {/* intensive kart (özel stil, aynı satırda) */}
                    {/* intensive kart (özel stil, premium görünüm) */}
                    <article className="relative h-full rounded-2xl border-2 border-amber-400/80 bg-gradient-to-br from-amber-50 via-amber-100 to-white shadow-[0_8px_24px_rgba(251,191,36,0.25)] p-6 flex flex-col overflow-hidden group">
                        {/* Shine efekti */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out" />



                        <header className="flex items-center gap-3">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                    d="M6 14l4-4 8-3-3 8-4 4-5 1 1-6z"
                                    stroke="currentColor"
                                    className="text-amber-600"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                                <path d="M14 10l-4 4" stroke="currentColor" className="text-amber-600" strokeWidth="1.5" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900">{intensive.title}</h3>
                        </header>

                        <div className="mt-2 text-3xl font-bold text-amber-700">{intensive.price}</div>
                        <p className="mt-3 text-sm text-gray-700">{intensive.desc}</p>

                        <div className="mt-4 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 p-3 text-sm shadow-inner">
                            {intensive.note}
                        </div>

                        <div className="mt-auto pt-6 text-xs text-gray-500">{t("packages.smallPrint")}</div>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default OfferPackages;