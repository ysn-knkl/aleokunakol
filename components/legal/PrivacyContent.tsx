import { useTranslation } from "next-i18next";

export default function PrivacyContent() {
  const { t } = useTranslation("common");

  const section = (key: string) => t(`privacy.${key}`, { returnObjects: true }) as any;

  const renderList = (lines?: string[]) =>
    lines?.map((line, i) => (
      <p key={i} className="mb-2">
        {line}
      </p>
    ));

  return (
    <div className="prose max-w-none">
      <h2>{t("privacy.title")}</h2>
      <p>{t("privacy.stand", { date: "Oktober 2025" })}</p>

      {/* 1 */}
      <h3>{section("section1").title}</h3>
      {renderList(section("section1").lines)}
      <p>{section("section1").note}</p>

      {/* 2 */}
      <h3>{section("section2").title}</h3>

      {/* 2.1 */}
      <h4>{section("section2.sub1").title}</h4>
      <p>{section("section2.sub1").data}</p>
      <p>{section("section2.sub1").purpose}</p>
      <p>{section("section2.sub1").legal}</p>

      {/* 2.2 */}
      <h4>{section("section2.sub2").title}</h4>
      <p>{section("section2.sub2").data}</p>
      <p>{section("section2.sub2").purpose}</p>
      <p>{section("section2.sub2").legal}</p>
      <p>{section("section2.sub2").note}</p>

      {/* 2.3 */}
      <h4>{section("section2.sub3").title}</h4>
      <p>{section("section2.sub3").data}</p>
      <p>{section("section2.sub3").purpose}</p>
      <p>{section("section2.sub3").legal}</p>

      {/* 2.4 */}
      <h4>{section("section2.sub4").title}</h4>
      <p>{section("section2.sub4").data}</p>
      <p>{section("section2.sub4").purpose}</p>
      <p>{section("section2.sub4").legal}</p>

      {/* 2.5 */}
      <h4>{section("section2.sub5").title}</h4>
      <p>{section("section2.sub5").data}</p>
      <p>{section("section2.sub5").purpose}</p>
      <p>{section("section2.sub5").legal}</p>

      {/* 2.6 */}
      <h4>{section("section2.sub6").title}</h4>
      <p>{section("section2.sub6").data}</p>
      <p>{section("section2.sub6").legal1}</p>
      <p>{section("section2.sub6").whatsapp}</p>
      <p>{section("section2.sub6").legal2}</p>

      {/* 3 */}
      <h3>{section("section3").title}</h3>
      {renderList(section("section3").list)}
      <p>{section("section3").note}</p>

      {/* 4 */}
      <h3>{section("section4").title}</h3>
      <p>{section("section4").text}</p>

      {/* 5 */}
      <h3>{section("section5").title}</h3>
      {renderList(section("section5").lines)}

      {/* 6 */}
      <h3>{section("section6").title}</h3>
      <p>{section("section6").text}</p>

      {/* 7 */}
      <h3>{section("section7").title}</h3>
      <p>{section("section7").text}</p>
      <p>{section("section7").contact}</p>
      <p>{section("section7").authority}</p>

      {/* 8 */}
      <h3>{section("section8").title}</h3>
      {renderList(section("section8").lines)}

      {/* 9 */}
      <h3>{section("section9").title}</h3>
      <p>{section("section9").text}</p>

      {/* 10 */}
      <h3>{section("section10").title}</h3>
      <p>{section("section10").text}</p>

      {/* 11 */}
      <h3>{section("section11").title}</h3>
      <p>{section("section11").text}</p>
    </div>
  );
}