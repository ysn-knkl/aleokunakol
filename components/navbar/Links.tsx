import { useState, useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";

export default function Links({
  onOpenPrivacy,
  onOpenImpressum,
}: {
  onOpenPrivacy: () => void;
  onOpenImpressum: () => void;
}) {
  const { t } = useTranslation("common");
  const [openOffer, setOpenOffer] = useState(false);
  const offerRef = useRef<HTMLDivElement | null>(null);

  // outside click
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
      <a href="#about" className="nav-link">{t("nav.about")}</a>

      {/* Angebot dropdown (desktop) */}
      <div className="relative hidden md:block" ref={offerRef}>
        <button
          onClick={() => setOpenOffer(v => !v)}
          className="nav-link flex items-center gap-1"
          aria-haspopup="menu"
          aria-expanded={openOffer}
        >
          {t("nav.offer")} ▾
        </button>
        {openOffer && (
          <div role="menu" className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-brand-300/30 shadow-soft p-2 z-50">
            <a href="#angebot-1" className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">QRI – Laserunterstützte Reflexintegration</a>
            <a href="#angebot-2" className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">Primitive Reflex – Değerlendirme</a>
            <a href="#angebot-3" className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">Duyusal Düzenleme ve Postür</a>
            <a href="#angebot-4" className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary">Aile Danışmanlığı & Takip</a>
          </div>
        )}
      </div>

      <a href="#services" className="nav-link">{t("nav.services")}</a>
      <a href="#contact"  className="nav-link">{t("nav.contact")}</a>
      <button onClick={onOpenPrivacy}  className="nav-link">{t("nav.privacy")}</button>
      <button onClick={onOpenImpressum} className="nav-link">{t("nav.impressum")}</button>
    </>
  );
}