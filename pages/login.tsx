import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const locale = (router.locale as string) || "de";
  const callbackUrl = /(\/|^)login(\?|$|\/)/.test(router.asPath) ? `/${locale}` : router.asPath;

  return (
    <>
      <Head>
        <title>Giriş Yap</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="w-full max-w-md rounded-2xl border border-brand-300/30 bg-white/80 backdrop-blur p-6 shadow-soft">
          <h1 className="text-2xl font-semibold text-text-primary text-center">Giriş Yap</h1>

          <div className="mt-6 grid gap-3">
            <button
              onClick={() => signIn("google", { callbackUrl })}
              className="w-full rounded-xl border border-brand-300/40 px-4 py-3 hover:bg-surface-100 transition"
            >
              Google ile devam et
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    return { redirect: { destination: `/${ctx.locale ?? "de"}`, permanent: false } };
  }
  return { props: {} };
};