// components/common/ConsentProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  applyConsentToGtag,
  defaultConsent,
  readConsent,
  saveConsent,
  type Consent,
} from "@/lib/consent";

type Ctx = {
  consent: Consent;
  setConsent: (c: Consent) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openPrefs: () => void;
  closePrefs: () => void;
  prefsOpen: boolean;
};

/**
 * perLocale = false -> TEK GLOBAL tercih (önerilen): kullanıcı bir kez karar verir, tüm dillerde geçerli.
 * perLocale = true  -> DİL BAŞINA ayrı tercih tutulur.
 */
export const ConsentProvider: React.FC<
  React.PropsWithChildren<{ perLocale?: boolean }>
> = ({ children, perLocale = false }) => {
  const { locale: activeLocale = "en" } = useRouter();
  const [consent, setConsentState] = useState<Consent>(defaultConsent);
  const [prefsOpen, setPrefsOpen] = useState(false);

  // İlk yükleme + locale değişiminde okuma
  useEffect(() => {
    const c = readConsent({ locale: activeLocale, perLocale });
    setConsentState(c);
    // Yalnızca karar verildiyse gtag'a uygula (ilk render'da gereksiz update olmasın)
    if (c.decided) applyConsentToGtag(c);
  }, [activeLocale, perLocale]);

  const setConsent = (c: Consent) => {
    setConsentState(c);
    saveConsent(c, { locale: activeLocale, perLocale });
    applyConsentToGtag(c);
  };

  const acceptAll = () =>
    setConsent({ decided: true, analytics: true, marketing: true });

  const rejectAll = () =>
    setConsent({ decided: true, analytics: false, marketing: false });

  const openPrefs = () => setPrefsOpen(true);
  const closePrefs = () => setPrefsOpen(false);

  const value = useMemo(
    () => ({ consent, setConsent, acceptAll, rejectAll, openPrefs, closePrefs, prefsOpen }),
    [consent, prefsOpen]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};

const ConsentContext = createContext<Ctx | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}