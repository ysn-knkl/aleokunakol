// lib/consent.ts
export type Consent = {
  decided: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const defaultConsent: Consent = {
  decided: false,
  analytics: false,
  marketing: false,
};

/**
 * Eğer tüm diller için tek tercih kullanılacaksa -> GLOBAL anahtar.
 * Eğer dil bazlı ayrı tercih istersen -> LOCALE anahtar (örn: cookie_consent_v1_tr).
 */
const GLOBAL_KEY = "cookie_consent_v1";
const LOCALE_KEY = (locale: string) => `cookie_consent_v1_${locale}`;

export function readConsent(opts?: { locale?: string; perLocale?: boolean }): Consent {
  const { locale, perLocale } = opts || {};
  const key = perLocale && locale ? LOCALE_KEY(locale) : GLOBAL_KEY;
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (!raw) return defaultConsent;
    const parsed = JSON.parse(raw) as Consent;
    return { ...defaultConsent, ...parsed };
  } catch {
    return defaultConsent;
  }
}

export function saveConsent(
  c: Consent,
  opts?: { locale?: string; perLocale?: boolean }
) {
  const { locale, perLocale } = opts || {};
  const key = perLocale && locale ? LOCALE_KEY(locale) : GLOBAL_KEY;
  localStorage.setItem(key, JSON.stringify(c));
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/** Google Consent Mode v2 güncellemesi */
export function applyConsentToGtag(c: Consent) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer!.push(arguments);
    };

  window.gtag("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    // functionality/security 'granted' default'undan dokunmuyoruz
  });
}