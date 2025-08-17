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
import { Links, MobileMenu, UserMenu } from "./navbar/index";

const Navbar: React.FC = () => {
  const { t } = useTranslation("common");
  const { status } = useSession();
  const isAuthed = status === "authenticated";
  const { locale = "de" } = useRouter();

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
    if (!openMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
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
              {/* LOGO: her zaman anasayfa + #hero */}
              <Link href={`/${locale}#hero`} className="flex items-center gap-3 shrink-0">
                <Image
                  src="/logo-ale.png"
                  alt="QRI Reflex Logo"
                  width={120}
                  height={36}
                  className="h-8 w-auto md:h-10"
                  priority
                />
              </Link>

              {/* Desktop orta linkler */}
              <div className="hidden md:flex flex-1 items-center justify-center gap-6">
                <Links
                  onOpenPrivacy={() => setShowPrivacy(true)}
                  onOpenImpressum={() => setShowImpressum(true)}
                  isAuthed={isAuthed}
                />
              </div>

              {/* Desktop sağ */}
              <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">
                <Link href={`/${locale}#contact`} className="btn-primary whitespace-nowrap">
                  {t("nav.cta")}
                </Link>
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

            {openMobile && (
              <MobileMenu
                onClose={() => setOpenMobile(false)}
                onOpenPrivacy={() => setShowPrivacy(true)}
                onOpenImpressum={() => setShowImpressum(true)}
                UserMenu={<UserMenu />}
                LanguageSwitcher={<LanguageSwitcher />}
                isAuthed={isAuthed}
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