import React from 'react';
import { useTranslation } from 'next-i18next';

const About: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <section id="about" className="section">
      <div className="container-x">
        <h2 className="title">{t('aboutTitle')}</h2>
        <p className="lead mt-4">{t('aboutDescription')}</p>
      </div>
    </section>
  );
};

export default About;