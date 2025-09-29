import React from 'react';
import { useTranslation } from 'next-i18next';
import ButtonCTA from './common/ButtonCTA';

const Hero: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section id="hero" className="relative flex h-screen items-center justify-center">
      {/* background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/ale-dashboard.jpg')" }}
      />
      {/* üstten koyu, alttan beyaza doğru gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-700/40 via-white/0 to-white" />

      <div className="container-x text-center mt-60 md:mt-96">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary drop-shadow-sm tracking-tight leading-tight">
          {t('hero.title')}
        </h1>
        <p className="lead mt-4 max-w-2xl mx-auto">{t('hero.lead')}</p>
        <div className="mt-10 flex items-center justify-center">
          <a href="#contact" className="btn-primary mt-8">
            {t('hero.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;