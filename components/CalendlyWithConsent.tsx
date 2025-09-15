// components/CalendlyWithConsent.tsx
import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

const CalendlyInline = dynamic(() => import("./CalendlyInline"), { ssr: false });

export default function CalendlyWithConsent() {
  const { t } = useTranslation("common");
  const [consent, setConsent] = useState(false);

  if (!consent) {
    return (
      <div className="card mx-auto max-w-4xl p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">
          {t("calendly.consent.title")}
        </h3>
        <p className="mb-4 text-text-secondary">
          {t("calendly.consent.body")}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="btn-primary" onClick={() => setConsent(true)}>
            {t("calendly.consent.allow")}
          </button>
          {/* İstersen bilgilendirme linki/Modal tetikleyebilirsin
          <a href="/privacy" className="btn-ghost">
            {t("calendly.consent.moreInfo")}
          </a> */}
        </div>
      </div>
    );
  }

  return <CalendlyInline />;
}