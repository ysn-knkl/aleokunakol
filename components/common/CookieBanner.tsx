// components/common/CookieBanner.tsx
import React from "react";
import { useTranslation } from "next-i18next";
import { useConsent } from "./ConsentProvider";

const CookieBanner: React.FC = () => {
  const { t } = useTranslation("common");
  const { consent, acceptAll, rejectAll, openPrefs } = useConsent();

  if (consent.decided) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60]">
      <div className="mx-auto max-w-4xl rounded-t-xl border border-brand-300/40 bg-white/90 backdrop-blur p-4 shadow-lg">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-secondary">
            {t(
              "cookies.banner.text",
              "Bu sitede temel çerezlerin yanında analitik ve pazarlama çerezleri kullanabiliriz. Tercihini seçebilirsin."
            )}
          </p>
          <div className="flex gap-2">
            <button onClick={rejectAll} className="btn-secondary px-3 py-2 text-sm">
              {t("cookies.banner.onlyEssential", "Yalnızca zorunlu")}
            </button>
            <button onClick={openPrefs} className="btn-outline px-3 py-2 text-sm">
              {t("cookies.banner.preferences", "Tercihler")}
            </button>
            <button onClick={acceptAll} className="btn-primary px-3 py-2 text-sm">
              {t("cookies.banner.acceptAll", "Kabul et")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;