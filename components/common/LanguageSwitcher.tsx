import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const LOCALE_META: Record<string, { label: string; flag: string }> = {
    tr: { label: "Türkçe", flag: "/flags/tr.svg" },
    en: { label: "English", flag: "/flags/en.svg" },
    de: { label: "Deutsch", flag: "/flags/de.svg" },
    ro: { label: "Română", flag: "/flags/ro.svg" },
};

export default function LanguageSwitcher() {
    const router = useRouter();
    const currentRaw = (router.locale as string) || "tr";
    const current = LOCALE_META[currentRaw] ? currentRaw : "tr";

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const switchTo = async (locale: string) => {
        setOpen(false);
        await router.push(router.asPath, router.asPath, { locale });
    };

    // dışarı tıklayınca kapat
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("click", onClick, { passive: true });
        return () => document.removeEventListener("click", onClick);
    }, []);

    const locales = (router.locales ?? []).filter((l) => l !== current);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-brand-300/40 bg-white/70 px-3 py-1.5 hover:bg-white transition"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Dil değiştir"
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
