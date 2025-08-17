// pages/login.tsx
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  const callbackUrl =
    typeof router.query.callbackUrl === "string"
      ? router.query.callbackUrl
      : `/${router.locale ?? "de"}/exercises`;

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  return (
    <main className="container-x py-16">
      <h1 className="title mb-6">Sign in</h1>
      <button
        className="btn-primary"
        onClick={() =>
          signIn("google", {
            callbackUrl,
            prompt: "select_account",
          })
        }
      >
        Continue with Google
      </button>
    </main>
  );
}