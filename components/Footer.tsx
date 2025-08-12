import React from 'react';
import { useTranslation } from 'next-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="mt-20">
      <div className="h-72 w-full overflow-hidden">
        <iframe
          /* Google Maps embed kodu buraya */
        />
      </div>

      <div className="bg-surface-50 border-t border-brand-300/30">
        <div className="container-x grid gap-8 py-10 md:grid-cols-3">
          <div>
            <h4 className="text-text-primary text-lg font-semibold">{t('footer.title')}</h4>
            <p className="text-text-secondary mt-3">{t('footer.description')}</p>
          </div>

          <div>
            <h5 className="text-text-primary font-semibold">{t('footer.contactTitle')}</h5>
            <ul className="mt-3 space-y-1 text-text-secondary">
              <li>{t('footer.contact.address')}</li>
              <li>{t('footer.contact.email')}</li>
              <li>{t('footer.contact.phone')}</li>
            </ul>
          </div>

          <div>
            <h5 className="text-text-primary font-semibold">{t('footer.quickLinksTitle')}</h5>
            <ul className="mt-3 space-y-1">
              <li><a href="#about" className="nav-link">{t('footer.links.about')}</a></li>
              <li><a href="#services" className="nav-link">{t('footer.links.services')}</a></li>
              <li><a href="#contact" className="nav-link">{t('footer.links.contact')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-300/30">
          <div className="container-x flex flex-col md:flex-row items-center justify-between py-5">
            <p className="text-text-muted text-sm">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <p className="text-text-muted text-sm">{t('footer.location')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
