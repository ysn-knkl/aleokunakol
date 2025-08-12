import { useTranslation } from "next-i18next";

export default function ImpressumContent() {
  const { t } = useTranslation("common");

  // adres satırları dizi olarak gelir
  const rawLines = t("impressum.addressLines", { returnObjects: true });
  const addressLines = Array.isArray(rawLines) ? (rawLines as string[]) : [];

  return (
    <div className="prose max-w-none">
      <h2>{t("impressum.title")}</h2>
      <p>{t("impressum.legalLine")}</p>

      <address className="not-italic">
        <strong>{t("impressum.name")}</strong>
        <br />
        {t("impressum.profession")}
        <br />
        {addressLines.map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
        <strong>{t("email")}</strong>{" "}
        <a href={`mailto:${t("impressum.emailAddress")}`}>
          {t("impressum.emailAddress")}
        </a>
        <br />
        <strong>{t("phone")}</strong>{" "}
        <a href={`tel:${t("impressum.phoneNumber")}`}>
          {t("impressum.phoneNumber")}
        </a>
      </address>

      <h3>{t("impressum.subject")}</h3>
      <p>{t("impressum.subjectText")}</p>

      <h3>{t("impressum.membership")}</h3>
      <p>{t("impressum.membershipText")}</p>

      <h3>{t("impressum.law")}</h3>
      <p>{t("impressum.lawText")}</p>

      <h3>{t("impressum.disclaimer")}</h3>
      <p>{t("impressum.disclaimerText")}</p>

      <h3>Urheberrecht</h3>
      <p>{t("impressum.copyrightText")}</p>
    </div>
  );
}
