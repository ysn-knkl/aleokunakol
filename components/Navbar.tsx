import React, { useEffect, useState } from "react";
import Modal from "./common/Modal";
import ImpressumContent from "./legal/ImpressumContent";
import PrivacyContent from "./legal/PrivacyContent";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const Links = () => (
    <>
      <a href="#about" className="nav-link">
        Hakkımda
      </a>
      <a href="#services" className="nav-link">
        Hizmetler
      </a>
      <a href="#contact" className="nav-link">
        Kontakt
      </a>
      <button onClick={() => setShowPrivacy(true)} className="nav-link">
        Datenschutz
      </button>
      <button onClick={() => setShowImpressum(true)} className="nav-link">
        Impressum
      </button>
      <a href="#contact" className="btn-primary ml-1">
        Randevu Al
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
              "border", // width sabit: flicker yok
              scrolled
                ? "mt-3 bg-white/80 backdrop-blur border-brand-300/30 shadow-soft"
                : "mt-0 bg-transparent border-transparent shadow-none",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              <a href="#hero" className="flex items-center">
                <img
                  src="/logo-ale.png" 
                  alt="QRI Reflex Logo"
                  className="h-10 w-auto md:h-12"
                />
              </a>
              <div className="hidden md:flex items-center gap-6">
                <Links />
              </div>
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden text-text-secondary hover:text-text-primary"
                aria-label="Menü"
              >
                {open ? "✕" : "☰"}
              </button>
            </div>
            {open && (
              <div className="md:hidden mt-3 grid gap-3">
                <Links />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Gizlilik Politikası */}
      <Modal title="Impressum" open={showImpressum} onClose={() => setShowImpressum(false)}>
        <ImpressumContent />
      </Modal>

      <Modal title="Datenschutzerklärung" open={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <PrivacyContent />
      </Modal>
    </>
  );
};

export default Navbar;
