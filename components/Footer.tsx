import React from "react";
import { useTranslation } from "next-i18next";

type FooterProps = {
  showMaps?: boolean;
  onOpenPrivacy?: () => void;
  onOpenImpressum?: () => void;
};

const Footer = ({ showMaps = true, onOpenPrivacy, onOpenImpressum }: FooterProps) => {
  const { t, i18n } = useTranslation("common");
  const mapSrc = `https://www.google.com/maps?q=beholistic%20Argentinierstra%C3%9Fe%2018/3%2C%201040%20Vienna&z=16&output=embed&hl=${i18n.language}`;

  // Global event helper'ları (prop yoksa kullan)
  const emitImpressum = () => {
    if (onOpenImpressum) return onOpenImpressum();
    window.dispatchEvent(new Event("open-impressum"));
  };
  const emitPrivacy = () => {
    if (onOpenPrivacy) return onOpenPrivacy();
    window.dispatchEvent(new Event("open-privacy"));
  };

  return (
    <footer className="container-x">
      {showMaps && (
        <div className="w-full overflow-hidden aspect-[16/9] md:aspect-[21/9] min-h-[280px]">
          <iframe
            title="Beholistic – Argentinierstraße 18/3, 1040 Vienna (Google Maps)"
            src={mapSrc}
            loading="lazy"
            className="h-full w-full"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <p className="sr-only">
            <a
              href="https://www.google.com/maps?q=beholistic%20Argentinierstra%C3%9Fe%2018/3%2C%201040%20Vienna"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </p>
        </div>
      )}

      <div className="bg-surface-50 border-t border-brand-300/30">
        <div className="container-x grid gap-8 py-10 md:grid-cols-3">
          <div>
            <h4 className="text-text-primary text-lg font-semibold">{t("footer.title")}</h4>
            <p className="text-text-secondary mt-3">{t("footer.description")}</p>
          </div>

          <div>
            <h5 className="text-text-primary font-semibold">{t("footer.contactTitle")}</h5>
            <ul className="mt-3 space-y-1 text-text-secondary">
              <li>{t("footer.contact.address")}</li>
              <li>
                <a
                  href={`mailto:${t("footer.contact.email")}`}
                  className="hover:underline"
                >
                  {t("footer.contact.email")}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t("phoneNumber")}`}
                  className="hover:underline"
                >
                  {t("footer.contact.phone")}
                </a>
              </li>            </ul>
          </div>

          <div>
            <h5 className="text-text-primary font-semibold">{t("footer.quickLinksTitle")}</h5>
            <ul className="mt-3 space-y-1">
              <li><a href="#about" className="nav-link">{t("footer.links.about")}</a></li>
              <li><a href="#services" className="nav-link">{t("footer.links.services")}</a></li>
              <li><a href="#contact" className="nav-link">{t("footer.links.contact")}</a></li>

              {/* YENİ: Impressum & Datenschutz */}
              <li>
                <button type="button" onClick={emitImpressum} className="nav-link">
                  {t("nav.impressum", "Impressum")}
                </button>
              </li>
              <li>
                <button type="button" onClick={emitPrivacy} className="nav-link">
                  {t("nav.privacy", "Datenschutz")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-300/30">
          <div className="container-x flex flex-col md:flex-row items-center justify-between py-5">
            <p className="text-text-muted text-sm">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <p className="text-text-muted text-sm">{t("footer.location")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;