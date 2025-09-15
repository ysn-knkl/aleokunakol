import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

type LinksProps = {
  onOpenPrivacy: () => void;
  onOpenImpressum: () => void;
  isAuthed: boolean;
};

export default function Links({ onOpenPrivacy, onOpenImpressum, isAuthed }: LinksProps) {
  const { t } = useTranslation("common");
  const { locale = "de", asPath } = useRouter();

  // hash linkleri her zaman anasayfaya yönlendir (locale otomatik korunur)
  const hrefHash = (hash: string) => ({
    pathname: "/",
    hash: hash.replace(/^#/, ""),
  });

  const isActive = (hash: string) => asPath.endsWith(hash);

  const base = "nav-link inline-flex items-center rounded-xl px-2 py-1.5 transition";
  const active = "text-text-primary";
  const normal = "text-text-secondary hover:text-text-primary";

  return (
    <>
      <Link
        href={hrefHash("#about")}
        locale={locale}
        className={`${base} ${isActive("#about") ? active : normal}`}
        aria-current={isActive("#about") ? "page" : undefined}
      >
        {t("nav.about", "Über Mich")}
      </Link>

      <Link
        href={hrefHash("#services")}
        locale={locale}
        className={`${base} ${isActive("#services") ? active : normal}`}
        aria-current={isActive("#services") ? "page" : undefined}
      >
        {t("nav.services", "Leistungen")}
      </Link>

      <Link
        href={hrefHash("#contact")}
        locale={locale}
        className={`${base} ${isActive("#contact") ? active : normal}`}
        aria-current={isActive("#contact") ? "page" : undefined}
      >
        {t("nav.contact", "Termin")}
      </Link>

      {isAuthed && (
        <Link
          href={{ pathname: "/exercises" }}
          locale={locale}
          className={`${base} ${asPath.includes("/exercises") ? active : normal}`}
          aria-current={asPath.includes("/exercises") ? "page" : undefined}
        >
          {t("nav.exercises", "Übungen")}
        </Link>
      )}

      <button onClick={onOpenPrivacy} className={`${base} ${normal}`} type="button">
        {t("nav.privacy", "Datenschutz")}
      </button>
      <button onClick={onOpenImpressum} className={`${base} ${normal}`} type="button">
        {t("nav.impressum", "Impressum")}
      </button>
    </>
  );
}