import { ReactNode } from "react";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";

export default function MobileMenu({
  onClose,
  onOpenPrivacy,
  onOpenImpressum,
  UserMenu,
  LanguageSwitcher,
}: {
  onClose: () => void;
  onOpenPrivacy: () => void;
  onOpenImpressum: () => void;
  UserMenu: ReactNode;
  LanguageSwitcher: ReactNode;
}) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      {/* hafif karartma + blur */}
      <button
        aria-label="Kapat"
        className="absolute inset-0 bg-black/10 backdrop-blur-md"
        onClick={onClose}
      />

      {/* içerik kartı */}
      <div className="relative mx-4 mt-20 rounded-2xl border border-brand-300/30 bg-white shadow-xl p-6 space-y-6">
        {/* login ise üst banner */}
        {status === "authenticated" && (
          <div className="rounded-xl border border-brand-300/30 bg-surface-50 px-3 py-2">
            <p className="text-sm font-medium text-text-primary truncate">
              {session?.user?.name || session?.user?.email}
            </p>
            {session?.user?.email && (
              <p className="text-xs text-text-muted truncate">{session.user.email}</p>
            )}
          </div>
        )}

        <nav className="grid gap-2 text-text-primary">
          <a href="#about" className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100">
            {t("nav.about")}
          </a>

          <div className="rounded-xl px-3 py-3">
            <div className="text-lg font-medium mb-2">{t("nav.offer")}</div>
            <div className="grid">
              <a href="#angebot-1" className="rounded-lg px-3 py-2 hover:bg-surface-100 text-base">• QRI – Laserunterstützte Reflexintegration</a>
              <a href="#angebot-2" className="rounded-lg px-3 py-2 hover:bg-surface-100 text-base">• Primitive Reflex – Değerlendirme</a>
              <a href="#angebot-3" className="rounded-lg px-3 py-2 hover:bg-surface-100 text-base">• Duyusal Düzenleme ve Postür</a>
              <a href="#angebot-4" className="rounded-lg px-3 py-2 hover:bg-surface-100 text-base">• Aile Danışmanlığı & Takip</a>
            </div>
          </div>

          <a href="#services" className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100">
            {t("nav.services")}
          </a>
          <a href="#contact" className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100">
            {t("nav.contact")}
          </a>

          <button onClick={onOpenPrivacy} className="rounded-xl px-3 py-3 text-lg text-left font-medium hover:bg-surface-100">
            {t("nav.privacy")}
          </button>
          <button onClick={onOpenImpressum} className="rounded-xl px-3 py-3 text-lg text-left font-medium hover:bg-surface-100">
            {t("nav.impressum")}
          </button>
        </nav>

        <div className="pt-1">
          <a href="#contact" className="btn-primary w-full justify-center">
            {t("nav.cta")}
          </a>
        </div>

        <div className="flex items-center justify-between">
          {UserMenu}
          {LanguageSwitcher}
        </div>
      </div>

      {/* sağ üst X */}
      <button
        onClick={onClose}
        aria-label="Kapat"
        className="absolute right-4 top-4 h-10 w-10 grid place-items-center rounded-full bg-white/80 border border-brand-300/30 text-text-primary shadow-sm"
      >
        ✕
      </button>
    </div>
  );
}