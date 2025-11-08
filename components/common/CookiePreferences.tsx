// components/common/CookiePreferences.tsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import Modal from "@/components/common/Modal";
import { useConsent } from "./ConsentProvider";

const CookiePreferences: React.FC = () => {
  const { t } = useTranslation("common");
  const { consent, setConsent, prefsOpen, closePrefs } = useConsent();
  const [analytics, setAnalytics] = useState<boolean>(consent.analytics);
  const [marketing, setMarketing] = useState<boolean>(consent.marketing);

  useEffect(() => {
    if (prefsOpen) {
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
    }
  }, [prefsOpen]); // eslint-disable-line

  const save = () => {
    setConsent({ decided: true, analytics, marketing });
    closePrefs();
  };

  return (
    <Modal title={t("cookies.prefs.title", "Çerez tercihleri")} open={prefsOpen} onClose={closePrefs}>
      <div className="space-y-4">
        <div className="rounded-md border p-3">
          <div className="font-medium">{t("cookies.prefs.essential.title", "Zorunlu çerezler")}</div>
          <p className="text-sm text-text-secondary">
            {t("cookies.prefs.essential.desc", "Oturum ve dil çerezleri. Her zaman aktiftir.")}
          </p>
          <div className="mt-2">
            <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs">
              {t("cookies.prefs.alwaysOn", "AÇIK")}
            </span>
          </div>
        </div>

        <label className="flex items-start gap-3 rounded-md border p-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          <div>
            <div className="font-medium">{t("cookies.prefs.analytics.title", "Analitik çerezler")}</div>
            <p className="text-sm text-text-secondary">
              {t("cookies.prefs.analytics.desc", "Trafik ölçümü ve performans (Google Analytics).")}
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 rounded-md border p-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
          <div>
            <div className="font-medium">{t("cookies.prefs.marketing.title", "Pazarlama çerezleri")}</div>
            <p className="text-sm text-text-secondary">
              {t("cookies.prefs.marketing.desc", "Reklam kişiselleştirme ve üçüncü taraf içerikler.")}
            </p>
          </div>
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={closePrefs} className="btn-outline px-3 py-2">
            {t("common.cancel", "Vazgeç")}
          </button>
          <button onClick={save} className="btn-primary px-3 py-2">
            {t("common.save", "Kaydet")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CookiePreferences;