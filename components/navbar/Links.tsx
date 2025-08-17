import { useState, useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Links({
  onOpenPrivacy,
  onOpenImpressum,
  isAuthed,
}: {
  onOpenPrivacy: () => void;
  onOpenImpressum: () => void;
  isAuthed: boolean;
}) {
  const { t } = useTranslation("common");
  const { locale = "de" } = useRouter();
  const [openOffer, setOpenOffer] = useState(false);
  const offerRef = useRef<HTMLDivElement | null>(null);

  const to = (hash: string) => `/${locale}${hash}`; // her zaman anasayfa + hash

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!offerRef.current) return;
      if (!offerRef.current.contains(e.target as Node)) setOpenOffer(false);
    };
    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Link href={to("#about")} className="nav-link">
        {t("nav.about")}
      </Link>

      {/* Angebot dropdown (desktop) */}
      <div className="relative hidden md:block" ref={offerRef}>
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
            <Link href={to("#angebot-1")} className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">
              QRI – Laserunterstützte Reflexintegration
            </Link>
            <Link href={to("#angebot-2")} className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">
              Primitive Reflex – Değerlendirme
            </Link>
            <Link href={to("#angebot-3")} className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">
              Duyusal Düzenleme ve Postür
            </Link>
            <Link href={to("#angebot-4")} className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">
              Aile Danışmanlığı & Takip
            </Link>
          </div>
        )}
      </div>

      <Link href={to("#services")} className="nav-link">
        {t("nav.services")}
      </Link>
      <Link href={to("#contact")} className="nav-link">
        {t("nav.contact")}
      </Link>

      {isAuthed && (
        <Link href={`/${locale}/exercises`} className="nav-link">
          {t("nav.exercises", "Egzersizler")}
        </Link>
      )}

      <button onClick={onOpenPrivacy} className="nav-link">
        {t("nav.privacy")}
      </button>
      <button onClick={onOpenImpressum} className="nav-link">
        {t("nav.impressum")}
      </button>
    </>
  );
}