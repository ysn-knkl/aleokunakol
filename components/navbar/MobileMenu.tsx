import { ReactNode } from "react";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import ButtonCTA from "../common/ButtonCTA";

export default function MobileMenu({
  onClose,
  onOpenPrivacy,
  onOpenImpressum,
  UserMenu,
  LanguageSwitcher,
  isAuthed,
}: {
  onClose: () => void;
  onOpenPrivacy: () => void;
  onOpenImpressum: () => void;
  UserMenu: ReactNode;
  LanguageSwitcher: ReactNode;
  isAuthed: boolean;
}) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();
  const isAdmin = Boolean((session?.user as any)?.role === "admin");
  const { locale = "de" } = useRouter();

  const hrefHash = (hash: string) => ({
    pathname: "/",
    hash: hash.replace(/^#/, ""),
  });

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <button
        aria-label="Kapat"
        className="absolute inset-0 bg-black/10 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative mx-4 mt-20 rounded-2xl border border-brand-300/30 bg-white shadow-xl p-6 space-y-6 max-h-[80vh] overflow-y-auto">
        {status === "authenticated" && (
          <div className="rounded-xl border border-brand-300/30 bg-surface-50 px-3 py-2">
            <p className="text-sm font-medium text-text-primary truncate">
              {session?.user?.name || session?.user?.email}
            </p>
            {session?.user?.email && (
              <p className="text-xs text-text-muted truncate">
                {session.user.email}
              </p>
            )}
          </div>
        )}

        <nav className="grid gap-2 text-text-primary">
          <Link
            href={hrefHash("#about")}
            className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100"
            onClick={onClose}
          >
            {t("nav.about")}
          </Link>

          <Link
            href={hrefHash("#services")}
            className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100"
            onClick={onClose}
          >
            {t("nav.services")}
          </Link>
          <Link
            href={hrefHash("#contact")}
            className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100"
            onClick={onClose}
          >
            {t("nav.contact")}
          </Link>

          {isAuthed && (
            <Link
              href={{ pathname: "/exercises" }}
              locale={locale}
              className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100"
              onClick={onClose}
            >
              {t("nav.exercises", "Egzersizler")}
            </Link>
          )}

          {isAdmin && (
            <Link
              href={{ pathname: "/admin" }}
              locale={locale}
              className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100"
              onClick={onClose}
            >
              Admin Panel
            </Link>
          )}

          <button
            onClick={() => {
              onOpenPrivacy();
              onClose();
            }}
            className="rounded-xl px-3 py-3 text-lg text-left font-medium hover:bg-surface-100"
          >
            {t("nav.privacy")}
          </button>
          <button
            onClick={() => {
              onOpenImpressum();
              onClose();
            }}
            className="rounded-xl px-3 py-3 text-lg text-left font-medium hover:bg-surface-100"
          >
            {t("nav.impressum")}
          </button>
        </nav>

        <div className="pt-1">
          <ButtonCTA href="/#contact" size="md" variant="outline" ariaLabel={t("nav.cta")}>
            {t("nav.cta")}
          </ButtonCTA>
        </div>

        <div className="flex items-center justify-between">
          {UserMenu}
          {LanguageSwitcher}
        </div>
      </div>

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