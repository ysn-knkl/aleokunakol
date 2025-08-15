import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function NavAuth() {
  const { data: session, status } = useSession();
  const { locale = "de" } = useRouter();

  if (status === "loading") return null;

  return session ? (
    <button
      onClick={() => signOut({ callbackUrl: `/${locale}` })}
      className="nav-link"
    >
      Çıkış
    </button>
  ) : (
    <>
      <button
        onClick={() => signIn("google", { callbackUrl: `/${locale}` })}
        className="nav-link"
      >
        Google ile Giriş
      </button>
    </>
  );
}