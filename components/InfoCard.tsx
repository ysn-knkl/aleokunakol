import React from 'react';
import { useTranslation } from 'next-i18next';

const InfoCards: React.FC = () => {
    const { t } = useTranslation('common');

    const cards = [
        {
            image: '/info-cards/info-card-1.jpg',
            title: t('infoCards.card1.title'),
            description: t('infoCards.card1.description'),
        },
        {
            image: '/info-cards/info-card-2.jpg',
            title: t('infoCards.card2.title'),
            description: t('infoCards.card2.description'),
        },
        {
            image: '/info-cards/info-card-3.jpg',
            title: t('infoCards.card3.title'),
            description: t('infoCards.card3.description'),
        },
    ];

    return (
        <div className="w-3/4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden"
                        style={{ backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="absolute inset-0  flex flex-col justify-start items-center text-left p-4 md:p-6">
                            <h3 className="text-white text-xl md:text-2xl font-semibold mb-1 drop-shadow-sm">{card.title}</h3>
                            <p className="text-white/90 text-sm md:text-base leading-snug max-w-[90%] drop-shadow-sm">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoCards;
