import React from 'react';
import { useTranslation } from 'next-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section id="hero" className="relative flex h-screen items-center justify-center">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/ale-dashboard.jpg')" }}
      />
      {/* alttan hafif beyaz → okunabilirlik */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-700/35 via-white/0 to-white/70" />
      <div className="container-x text-center mt-60 md:mt-96">
        <h1 className="text-4xl md:text-4xl font-bold text-text-primary drop-shadow-sm tracking-tight leading-tight">
          {t('hero.title')}
        </h1>
        <p className="lead mt-4">
          {t('hero.lead')}
        </p>
        <a href="#contact" className="btn-primary mt-10 px-8 py-3 text-lg rounded-full shadow-lg hover:scale-105 transition-transform">
          {t('hero.cta')}
        </a>
      </div>
    </section>
  );
};

export default Hero;
