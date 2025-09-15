import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Dashboard() {
  const { t } = useTranslation("common");

  return (
    <div className="container-x py-10">
      <h1 className="title">{t("dashboard.title", "Dashboard")}</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="btn-ghost mt-6"
        aria-label={t("auth.signOut", "Çıkış")}
      >
        {t("auth.signOut", "Çıkış")}
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: `/${ctx.locale ?? "de"}/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? "de", ["common"])),
    },
  };
};