import { ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SOCIAL_LINKS } from "@/lib/socialLinks";

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
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);

  // route değiştiğinde kapan
  useEffect(() => {
    const handler = () => onClose();
    router.events.on("routeChangeStart", handler);
    return () => router.events.off("routeChangeStart", handler);
  }, [router.events, onClose]);

  // dış tık kapan
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const to = (hash: string) => `/${locale}${hash}`;

  const hrefHash = (hash: string) => ({
    pathname: "/",
    hash: hash.replace(/^#/, ""),
  });

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div
        ref={boxRef}
        className="relative mx-4 mt-20 rounded-2xl border border-brand-300/30 bg-white shadow-xl p-6 space-y-6 max-h-[80vh] overflow-y-auto"
      >
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
          <Link href={hrefHash("#about")} className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100">
            {t("nav.about")}
          </Link>
          <Link href={hrefHash("#packages")} className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100">
            {t("nav.services")}
          </Link>
          {/* <Link href={hrefHash("#contact")} className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100">
            {t("nav.contact")}
          </Link> */}

          {isAuthed && (
            <Link
              href={{ pathname: "/exercises" }}
              locale={locale}
              className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100"
            >
              {t("nav.exercises", "Egzersizler")}
            </Link>
          )}

          {isAdmin && (
            <Link
              href={{ pathname: "/admin" }}
              locale={locale}
              className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface-100"
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

        {/* <div className="pt-1">
          <Link href={to("#contact")} className="btn-primary w-full justify-center">
            {t("nav.cta")}
          </Link>
        </div> */}

        <div className="border-t border-brand-300/30 pt-4">
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-3">
            {t("footer.social.title", "Sosyal medya")}
          </p>
          <div className="flex items-center gap-3 mt-4">
            {SOCIAL_LINKS.map(({ key, href, fallbackLabel, Icon, color }) => {
              const label = t(`footer.social.${key}`, fallbackLabel);
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="inline-flex items-center justify-center text-text-primary transition-transform hover:-translate-y-0.5 hover:scale-110"
                  style={{
                    color: color,
                  }}
                >
                  <Icon aria-hidden className="text-3xl" />
                  <span className="sr-only">{label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          {UserMenu}
          {LanguageSwitcher}
        </div>
      </div>
    </div>
  );
}
