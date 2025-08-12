import React, { useEffect, useState } from "react";
import Modal from "./common/Modal";
import ImpressumContent from "./legal/ImpressumContent";
import PrivacyContent from "./legal/PrivacyContent";
import LanguageSwitcher from "./common/LanguageSwitcher";
import { useTranslation } from "next-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation("common");

  const [scrolled, setScrolled] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAngebot, setOpenAngebot] = useState(false);
  const [openAngebotM, setOpenAngebotM] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const DesktopAngebot = () => (
    <div className="relative">
      <button
        onClick={() => setOpenAngebot((v) => !v)}
        className="nav-link flex items-center gap-1"
        aria-haspopup="menu"
        aria-expanded={openAngebot}
      >
        {t("nav.offer")} ▾
      </button>
      {openAngebot && (
        <div
          className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-brand-300/30 shadow-soft p-2 z-50"
          onMouseLeave={() => setOpenAngebot(false)}
        >
          <a href="#angebot-1" className="block rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">
            {t("offer.blocks.0.title")}
          </a>
          <a href="#angebot-2" className="block rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">
            {t("offer.blocks.1.title")}
          </a>
          <a href="#angebot-3" className="block rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">
            {t("offer.blocks.2.title")}
          </a>
          <a href="#angebot-4" className="block rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">
            {t("offer.blocks.3.title")}
          </a>
        </div>
      )}
    </div>
  );

  const Links = () => (
    <>
      <a href="#about" className="nav-link">{t("nav.about")}</a>

      {/* Desktop: Angebot dropdown */}
      <div className="hidden md:block">
        <DesktopAngebot />
      </div>

      {/* Mobile: Angebot alt linkler */}
      <div className="md:hidden">
        <button
          onClick={() => setOpenAngebotM((v) => !v)}
          className="nav-link"
          aria-expanded={openAngebotM}
        >
          {t("nav.offer")} {openAngebotM ? "▴" : "▾"}
        </button>
        {openAngebotM && (
          <div className="mt-2 ml-2 grid">
            <a href="#angebot-1" className="nav-link">• {t("offer.blocks.0.title")}</a>
            <a href="#angebot-2" className="nav-link">• {t("offer.blocks.1.title")}</a>
            <a href="#angebot-3" className="nav-link">• {t("offer.blocks.2.title")}</a>
            <a href="#angebot-4" className="nav-link">• {t("offer.blocks.3.title")}</a>
          </div>
        )}
      </div>

      <a href="#services" className="nav-link">{t("nav.services")}</a>
      <a href="#contact" className="nav-link">{t("nav.contact")}</a>
      <button onClick={() => setShowPrivacy(true)} className="nav-link">
        {t("nav.privacy")}
      </button>
      <button onClick={() => setShowImpressum(true)} className="nav-link">
        {t("nav.impressum")}
      </button>
      <a href="#contact" className="btn-primary ml-1">
        {t("nav.cta")}
      </a>
    </>
  );

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="container-x">
          <div
            className={[
              "pointer-events-auto transition-all duration-300 rounded-2xl px-4 py-3 nav-shadow-fix",
              "border",
              scrolled
                ? "mt-3 bg-white/80 backdrop-blur border-brand-300/30 shadow-soft"
                : "mt-0 bg-transparent border-transparent shadow-none",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              <a href="#hero" className="flex items-center">
                <img
                  src="/logo-ale.png"
                  alt="Logo"
                  className="h-10 w-auto md:h-12"
                />
              </a>

              {/* Desktop */}
              <div className="hidden md:flex items-center gap-6">
                <Links />
                <LanguageSwitcher />
              </div>

              {/* Mobile toggle */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden text-text-secondary hover:text-text-primary"
                aria-label="Menü"
              >
                {open ? "✕" : "☰"}
              </button>
            </div>

            {/* Mobile drawer */}
            {open && (
              <div className="md:hidden mt-3 grid gap-3">
                <Links />
                <div className="mt-1"><LanguageSwitcher /></div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modals */}
      <Modal
        title={t("impressum.title")}
        open={showImpressum}
        onClose={() => setShowImpressum(false)}
      >
        <ImpressumContent />
      </Modal>

      <Modal
        title={t("privacy.title")}
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      >
        <PrivacyContent />
      </Modal>
    </>
  );
};

export default Navbar;
