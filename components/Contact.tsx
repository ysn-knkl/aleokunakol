import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

const CalendlyPopup = dynamic(() => import("./CalendlyPopup"), { ssr: false });

const Contact: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <h2 className="title">{t('contact.title')}</h2>

        <div className="card mx-auto mt-8 max-w-4xl p-2">
          <CalendlyPopup />
        </div>

      </div>
    </section>
  );
};

export default Contact;

