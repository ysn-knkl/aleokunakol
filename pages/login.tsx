// pages/login.tsx
import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LoginPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { t } = useTranslation("common");

  const locale = (router.locale || router.defaultLocale || "de") as string;
  const callbackUrl =
    typeof router.query.callbackUrl === "string"
      ? router.query.callbackUrl
      : `/${locale}/exercises`;

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, callbackUrl]);

  return (
    <main className="container-x py-16 md:py-24">
      <div className="mx-auto max-w-md rounded-2xl border border-brand-300/30 bg-white/80 backdrop-blur p-6 md:p-8 shadow-soft">
        <h1 className="title mb-6 text-center">{t("auth.signInTitle", "Anmelden")}</h1>
        <button
          type="button"
          className="btn-primary w-full"
          aria-label={t("auth.continueWithGoogle", "Mit Google fortfahren")}
          onClick={() =>
            signIn("google", {
              callbackUrl,
              prompt: "select_account",
            })
          }
        >
          {t("auth.continueWithGoogle", "Mit Google fortfahren")}
        </button>
      </div>
    </main>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = "de" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};