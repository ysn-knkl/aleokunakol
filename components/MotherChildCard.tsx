import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

type Bullet = { title: string; description: string };

const MotherChildCard: React.FC = () => {
  const { t } = useTranslation("common");

  const left = (t("motherChildCard.left", { returnObjects: true }) as Bullet[]) || [];
  const right = (t("motherChildCard.right", { returnObjects: true }) as Bullet[]) || [];
  const title = t("motherChildCard.title");
  const imageAlt = t("motherChildCard.imageAlt");

  return (
    <section className="bg-surface-100" aria-labelledby="mother-child-title">
      <div className="container-x px-4 py-12 md:py-16">
        <h2 id="mother-child-title" className="title text-center">
          {title}
        </h2>

        <div className="mt-10 flex flex-col lg:flex-row items-start lg:items-center justify-center gap-10 lg:gap-12">
          {/* Left bullet points */}
          <div className="flex flex-col lg:w-1/3 space-y-8 lg:space-y-10">
            <h3 className="text-2xl font-semibold text-center">
              {t("motherChildCard.leftTitle")}
            </h3>

            {left.map(({ title, description }, idx) => (
              <div key={idx} className="flex items-start gap-4 relative">
                {/* SVG curved line from image to bullet */}
                <svg
                  className="hidden lg:block absolute left-full mt-8"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M40 20 C30 20, 20 0, 0 0" stroke="#2563EB" strokeWidth="2" />
                </svg>

                <div className="flex flex-col items-center z-10 pt-1">
                  <span className="w-3.5 h-3.5 bg-blue-600 rounded-full" />
                  {idx !== left.length - 1 && <span className="flex-1 w-px bg-blue-300" />}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h4>
                  <p className="text-gray-600 text-sm leading-snug">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center image */}
          <div className="my-4 lg:my-0 lg:w-1/3 flex justify-center relative">
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-lg border-4 border-white">
              <Image
                src="/mother-child.jpg"
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 33vw, 400px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          {/* Right bullet points */}
          <div className="flex flex-col lg:w-1/3">
            <h3 className="text-2xl font-semibold mb-3 text-center">
              {t("motherChildCard.rightTitle")}
            </h3>

            <p className="text-gray-700 mb-1">{t("motherChildCard.rightContent.desc")}</p>
            <span className="text-gray-700">{t("motherChildCard.rightContent.sp1")}</span>
            <span className="text-gray-700">{t("motherChildCard.rightContent.sp2")}</span>
            <span className="font-semibold text-gray-900 mb-6">
              {t("motherChildCard.rightContent.sp3")}
            </span>

            <div className="space-y-8 lg:space-y-6">
              {right.map(({ title, description }, idx) => (
                <div key={idx} className="flex items-start gap-4 relative">
                  {/* SVG curved line from image to bullet */}
                  <svg
                    className="hidden lg:block absolute -left-10 -translate-y-1/2"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M0 20 C10 20, 20 40, 40 40" stroke="#2563EB" strokeWidth="2" />
                  </svg>

                  <div className="flex flex-col items-center z-10 pt-1">
                    <span className="w-3.5 h-3.5 bg-blue-600 rounded-full" />
                    {idx !== right.length - 1 && <span className="flex-1 w-px bg-blue-300" />}
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h4>
                    <p className="text-gray-600 text-sm leading-snug">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotherChildCard;