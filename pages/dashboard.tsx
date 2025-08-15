import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="container-x py-10">
      <h1 className="title">Dashboard</h1>
      <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-ghost mt-6">
        Çıkış
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return { redirect: { destination: `/${ctx.locale ?? "de"}/login`, permanent: false } };
  }
  return { props: {} };
};