// components/Navbar.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Modal from "./common/Modal";
import { Links, MobileMenu, UserMenu } from './navbar/index'

import LanguageSwitcher from "./common/LanguageSwitcher";
import ImpressumContent from "./legal/ImpressumContent";
import PrivacyContent from "./legal/PrivacyContent";

const Navbar: React.FC = () => {
  const { t } = useTranslation("common");

  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);

  // shadow / bg on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    if (!openMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [openMobile]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="container-x">
          <div
            className={[
              "pointer-events-auto transition-all duration-300 rounded-2xl px-4 py-3",
              "border",
              scrolled
                ? "mt-3 bg-white/80 backdrop-blur border-brand-300/30 shadow-soft"
                : "mt-0 bg-transparent border-transparent shadow-none",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="#hero" className="flex items-center gap-3 shrink-0">
                <Image
                  src="/logo-ale.png"
                  alt="QRI Reflex Logo"
                  width={120}
                  height={36}
                  className="h-8 w-auto md:h-10"
                  priority
                />
              </a>

              {/* Desktop - center links */}
              <div className="hidden md:flex flex-1 items-center justify-center gap-6">
                <Links
                  onOpenPrivacy={() => setShowPrivacy(true)}
                  onOpenImpressum={() => setShowImpressum(true)}
                />
              </div>

              {/* Desktop - right cluster */}
              <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">
                <a href="#contact" className="btn-primary whitespace-nowrap">
                  {t("nav.cta")}
                </a>
                <UserMenu />
                <LanguageSwitcher />
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpenMobile((v) => !v)}
                className="md:hidden text-text-secondary hover:text-text-primary"
                aria-label="Menü"
                aria-expanded={openMobile}
                aria-controls="mobile-menu"
              >
                {openMobile ? "✕" : "☰"}
              </button>
            </div>

            {/* Mobile Menu */}
            {openMobile && (
              <MobileMenu
                onClose={() => setOpenMobile(false)}
                onOpenPrivacy={() => setShowPrivacy(true)}
                onOpenImpressum={() => setShowImpressum(true)}
                UserMenu={<UserMenu />}
                LanguageSwitcher={<LanguageSwitcher />}
              />
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