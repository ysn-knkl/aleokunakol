// components/common/LanguageSwitcher.tsx
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const SUPPORTED = ["de", "en", "tr", "ro"] as const;
type Supported = typeof SUPPORTED[number];

const LOCALE_META: Record<Supported, { label: string; flag: string }> = {
  de: { label: "Deutsch", flag: "/flags/de.svg" },
  en: { label: "English", flag: "/flags/en.svg" },
  tr: { label: "Türkçe", flag: "/flags/tr.svg" },
  ro: { label: "Română", flag: "/flags/ro.svg" },
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Varsayılanı her zaman Almanca yap
  const current = (SUPPORTED.includes(router.locale as Supported)
    ? router.locale
    : "de") as Supported;

  const switchTo = async (locale: Supported) => {
    setOpen(false);
    document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=${
      60 * 60 * 24 * 365
    }`;
    await router.push(router.asPath, router.asPath, { locale });
  };

  // dışarı tık & Esc kapatma
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick as any);
      document.removeEventListener("keydown", onKey as any);
    };
  }, []);

  const locales: Supported[] = SUPPORTED.filter((l) => l !== current);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-brand-300/40 bg-white/70 px-3 py-1.5 hover:bg-white transition"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Sprache ändern"
      >
        <img
          src={LOCALE_META[current].flag}
          alt={LOCALE_META[current].label}
          className="h-5 w-7 rounded-sm object-cover"
        />
        <span className="hidden sm:inline text-sm text-text-secondary">
          {LOCALE_META[current].label}
        </span>
        <span className="text-text-secondary">▾</span>
      </button>

      {open && locales.length > 0 && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-brand-300/30 shadow-soft p-1 z-50"
        >
          {locales.map((lc) => (
            <button
              key={lc}
              onClick={() => switchTo(lc)}
              role="menuitem"
              className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary"
            >
              <img
                src={LOCALE_META[lc].flag}
                alt={LOCALE_META[lc].label}
                className="h-5 w-6 rounded-sm object-cover"
              />
              <span>{LOCALE_META[lc].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}