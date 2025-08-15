import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Modal from "./common/Modal";
import ImpressumContent from "./legal/ImpressumContent";
import PrivacyContent from "./legal/PrivacyContent";
import LanguageSwitcher from "./common/LanguageSwitcher";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const locale = (router.locale as string) || "de";

  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [openOffer, setOpenOffer] = useState(false);
  const [openOfferMobile, setOpenOfferMobile] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);

  const offerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!offerRef.current) return;
      if (!offerRef.current.contains(e.target as Node)) setOpenOffer(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOffer(false);
        setOpenMobile(false);
        setOpenOfferMobile(false);
      }
    };
    document.addEventListener("click", onClick, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const DesktopOffer = () => (
    <div className="relative" ref={offerRef}>
      <button
        onClick={() => setOpenOffer((v) => !v)}
        className="nav-link flex items-center gap-1"
        aria-haspopup="menu"
        aria-expanded={openOffer}
      >
        {t("nav.offer")} ▾
      </button>
      {openOffer && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-brand-300/30 shadow-soft p-2 z-50"
        >
          <a
            href="#angebot-1"
            role="menuitem"
            className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary"
            onClick={() => setOpenOffer(false)}
          >
            QRI – Laserunterstützte Reflexintegration
          </a>
          <a
            href="#angebot-2"
            role="menuitem"
            className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary"
            onClick={() => setOpenOffer(false)}
          >
            Primitive Reflex – Değerlendirme
          </a>
          <a
            href="#angebot-3"
            role="menuitem"
            className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary"
            onClick={() => setOpenOffer(false)}
          >
            Duyusal Düzenleme ve Postür
          </a>
          <a
            href="#angebot-4"
            role="menuitem"
            className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary"
            onClick={() => setOpenOffer(false)}
          >
            Aile Danışmanlığı & Takip
          </a>
        </div>
      )}
    </div>
  );

  const Links = () => (
    <>
      <a href="#about" className="nav-link">
        {t("nav.about")}
      </a>

      <div className="hidden md:block">
        <DesktopOffer />
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setOpenOfferMobile((v) => !v)}
          className="nav-link"
          aria-expanded={openOfferMobile}
        >
          {t("nav.offer")} {openOfferMobile ? "▴" : "▾"}
        </button>
        {openOfferMobile && (
          <div className="mt-2 ml-2 grid">
            <a href="#angebot-1" className="nav-link">
              • QRI – Laserunterstützte Reflexintegration
            </a>
            <a href="#angebot-2" className="nav-link">
              • Primitive Reflex – Değerlendirme
            </a>
            <a href="#angebot-3" className="nav-link">
              • Duyusal Düzenleme ve Postür
            </a>
            <a href="#angebot-4" className="nav-link">
              • Aile Danışmanlığı & Takip
            </a>
          </div>
        )}
      </div>

      <a href="#services" className="nav-link">
        {t("nav.services")}
      </a>
      <a href="#contact" className="nav-link">
        {t("nav.contact")}
      </a>
      <button onClick={() => setShowPrivacy(true)} className="nav-link">
        {t("nav.privacy")}
      </button>
      <button onClick={() => setShowImpressum(true)} className="nav-link">
        {t("nav.impressum")}
      </button>
    </>
  );

  // === Avatar + Dropdown ===
  const UserMenu: React.FC = () => {
    const { data: session, status } = useSession();
    const [openUser, setOpenUser] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const onClick = (e: MouseEvent) => {
        if (!ref.current) return;
        if (!ref.current.contains(e.target as Node)) setOpenUser(false);
      };
      document.addEventListener("click", onClick, { passive: true });
      return () => document.removeEventListener("click", onClick);
    }, []);

    const initials = (() => {
      const name = session?.user?.name?.trim() || "";
      if (!name) return null;
      const parts = name.split(/\s+/).slice(0, 2);
      return parts.map((p) => p[0]?.toUpperCase()).join("");
    })();

    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpenUser((v) => !v)}
          className="h-9 w-9 md:h-10 md:w-10 rounded-full grid place-items-center bg-surface-200 text-text-secondary hover:bg-surface-100 transition"
          aria-haspopup="menu"
          aria-expanded={openUser}
          aria-label="User menu"
        >
          {initials ? (
            <span className="rounded-full bg-brand-700/90 text-white h-9 w-9 md:h-10 md:w-10 grid place-items-center font-semibold">
              {initials}
            </span>
          ) : (
            // simple user icon
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
            </svg>
          )}
        </button>

        {openUser && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-brand-300/30 shadow-soft p-2 z-50"
          >
            {session ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {session.user?.name || session.user?.email}
                  </p>
                  {session.user?.email && (
                    <p className="text-xs text-text-muted truncate">{session.user.email}</p>
                  )}
                </div>
                <div className="my-1 h-px bg-brand-300/30" />
                <button
                  onClick={() => signOut({ callbackUrl: `/${locale}` })}
                  className="w-full text-left rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary"
                  role="menuitem"
                >
                  {t("auth.signOut", "Sign out")}
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("google", { callbackUrl: `/${locale}` })}
                className="w-full text-left rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary"
                role="menuitem"
              >
                {t("auth.signIn", "Sign in")}
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

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
                <Links />
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

            {/* Mobile dropdown */}
            {openMobile && (
              <div id="mobile-menu" className="md:hidden mt-3 grid gap-3">
                <Links />
                <a href="#contact" className="btn-primary">{t("nav.cta")}</a>
                <UserMenu />
                <div className="mt-1"><LanguageSwitcher /></div>
              </div>
            )}
          </div>
        </div>
      </nav>

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