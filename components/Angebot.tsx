import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function Angebot() {
    const { t } = useTranslation('common');

    const blocks = t('offer.blocks', { returnObjects: true }) as Array<{
        title: string;
        bullets: string[];
    }>;

    return (
        <section id="angebot" className="section bg-surface-100">
            <div className="container-x space-y-16">
                <h2 className="title">{t('offer.title')}</h2>

                {blocks.map((b, idx) => {
                    const reverse = idx % 2 === 1;
                    const id = `angebot-${idx + 1}`;
                    return (
                        <div
                            key={id}
                            id={id}
                            className="grid items-center gap-10 md:grid-cols-2 scroll-mt-24"
                        >
                            <div className={reverse ? 'md:order-2' : ''}>
                                <h3 className="text-2xl font-semibold text-text-primary">{b.title}</h3>
                                <ul className="mt-5 space-y-3 text-text-secondary text-lg list-disc list-inside">
                                    {b.bullets.map((li, i) => (
                                        <li key={i}>{li}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={`relative h-72 md:h-[420px] rounded-xl2 overflow-hidden border border-brand-300/30 shadow-soft ${reverse ? 'md:order-1' : ''}`}>
                                <Image
                                    src="/info-cards/info-card-1.jpg"
                                    alt={b.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
