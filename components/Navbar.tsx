import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";

import Modal from "./common/Modal";
import LanguageSwitcher from "./common/LanguageSwitcher";
import ImpressumContent from "./legal/ImpressumContent";
import PrivacyContent from "./legal/PrivacyContent";

// parçalar
import Links from "./navbar/Links";
import MobileMenu from "./navbar/MobileMenu";
import UserMenu from "./navbar/UserMenu";

const Navbar: React.FC = () => {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";
  const isAdmin = Boolean((session?.user as any)?.role === "admin");
  const router = useRouter();
  const locale = (router.locale as string) || "de";

  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOpenImpressum = () => setShowImpressum(true);
    const onOpenPrivacy = () => setShowPrivacy(true);

    window.addEventListener("open-impressum", onOpenImpressum as EventListener);
    window.addEventListener("open-privacy", onOpenPrivacy as EventListener);

    return () => {
      window.removeEventListener("open-impressum", onOpenImpressum as EventListener);
      window.removeEventListener("open-privacy", onOpenPrivacy as EventListener);
    };
  }, []);

  // mobil menü açıkken body scroll kilidi
  useEffect(() => {
    if (!openMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openMobile]);

  const openPrivacy = () => setShowPrivacy(true);
  const openImpressum = () => setShowImpressum(true);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-3 focus:py-2 focus:rounded-md focus:bg-white focus:shadow"
      >
        {t("nav.skipToContent", "Zum Inhalt springen")}
      </a>

      <nav
        className={`fixed inset-x-0 top-0 z-50 ${
          openMobile ? "pointer-events-auto" : "pointer-events-none"
        }`}
        role="navigation"
        aria-label={t("nav.primary", "Hauptnavigation")}
      >
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
              {/* LOGO */}
              <Link href={{ pathname: "/", hash: "hero" }} locale={locale} className="flex items-center gap-3 shrink-0">
                <Image
                  src="/logo-ale.png"
                  alt={t("nav.logoAlt", "QRI Reflex Logo")}
                  width={120}
                  height={36}
                  className="h-8 w-auto md:h-10"
                  priority
                />
              </Link>

              {/* Desktop orta linkler */}
              <div className="hidden md:flex flex-1 items-center justify-center gap-6">
                <Links isAuthed={isAuthed} />
              </div>

              {/* Desktop sağ */}
              <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">
                <Link href={`/${locale}#contact`} className="btn-primary whitespace-nowrap">
                  {t("nav.cta")}
                </Link>
                <UserMenu
                  isAdmin={isAdmin}
                  locale={locale}
                  onOpenPrivacy={openPrivacy}
                  onOpenImpressum={openImpressum}
                />
                <LanguageSwitcher />
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpenMobile((v) => !v)}
                className="md:hidden text-text-secondary hover:text-text-primary"
                aria-label={openMobile ? t("nav.closeMenu", "Menü schließen") : t("nav.openMenu", "Menü öffnen")}
                aria-expanded={openMobile}
                aria-controls="mobile-menu"
              >
                <span aria-hidden>{openMobile ? "✕" : "☰"}</span>
              </button>
            </div>

            {openMobile && (
              <div id="mobile-menu">
                <MobileMenu
                  onClose={() => setOpenMobile(false)}
                  onOpenPrivacy={openPrivacy}
                  onOpenImpressum={openImpressum}
                  UserMenu={
                    <UserMenu
                      mobile
                      isAdmin={isAdmin}
                      locale={locale}
                      onOpenPrivacy={openPrivacy}
                      onOpenImpressum={openImpressum}
                    />
                  }
                  LanguageSwitcher={<LanguageSwitcher />}
                  isAuthed={isAuthed}
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modals */}
      <Modal
        title={t("impressum.title", "Impressum")}
        open={showImpressum}
        onClose={() => setShowImpressum(false)}
      >
        <ImpressumContent />
      </Modal>

      <Modal
        title={t("privacy.title", "Datenschutz")}
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      >
        <PrivacyContent />
      </Modal>
    </>
  );
};

export default Navbar;