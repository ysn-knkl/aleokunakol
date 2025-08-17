// components/navbar/UserMenu.tsx
import { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const { t } = useTranslation("common");
  const router = useRouter();
  const locale = (router.locale as string) || "de";

  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Outside click → close
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);

  // ESC → close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Desktop dropdown alignment
  useEffect(() => {
    if (!open || !rootRef.current) return;
    const trigger = rootRef.current.querySelector("button[data-trigger='user-desktop']");
    if (!trigger) return;
    const rect = (trigger as HTMLElement).getBoundingClientRect();
    const viewportW = window.innerWidth;
    const menuW = 260; // px
    const spaceRight = viewportW - rect.right;
    setAlignRight(spaceRight >= menuW + 8); // enough space on the right → anchor right edge
  }, [open]);

  const initials =
    session?.user?.name
      ?.trim()
      ?.split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "";

  // MOBILE: direct action by auth state
  const handleMobileClick = () => {
    if (status === "authenticated") {
      signOut({ callbackUrl: `/${locale}` });
    } else {
      // force account chooser
      signIn("google", { callbackUrl: `/${locale}`, prompt: "select_account" });
    }
  };

  return (
    <div className="relative" ref={rootRef}>
      {/* Desktop trigger: badge (initials if authed, generic if not) */}
      <button
        data-trigger="user-desktop"
        onClick={() => setOpen((v) => !v)}
        className="hidden md:grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-full bg-surface-200 text-text-secondary hover:bg-surface-100 transition"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="User menu"
        title="User menu"
      >
        {status === "authenticated" && initials ? (
          <span className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-brand-700/90 text-white grid place-items-center font-semibold">
            {initials}
          </span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
          </svg>
        )}
      </button>

      {/* Mobile trigger: only Sign in / Sign out text button */}
      <button
        onClick={handleMobileClick}
        className="md:hidden rounded-xl px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-100 transition"
        aria-label={status === "authenticated" ? t("auth.signOut", "Sign out") : t("auth.signIn", "Sign in")}
      >
        {status === "authenticated" ? t("auth.signOut", "Sign out") : t("auth.signIn", "Sign in")}
      </button>

      {/* Desktop dropdown */}
      {open && (
        <div
          role="menu"
          className={`absolute ${alignRight ? "right-0" : "left-0"} mt-2 w-64 max-w-[calc(100vw-24px)] rounded-2xl bg-white border border-brand-300/30 shadow-soft p-2 z-50`}
        >
          {status === "authenticated" ? (
            <>
              {/* top: name & email */}
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-text-primary truncate">
                  {session?.user?.name || session?.user?.email}
                </p>
                {session?.user?.email && (
                  <p className="text-xs text-text-muted truncate">{session.user.email}</p>
                )}
              </div>
              <div className="my-1 h-px bg-brand-300/30" />
              {/* bottom: logout */}
              <button
                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                className="w-full text-left rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary"
                role="menuitem"
              >
                {t("auth.signOut", "Sign out")}
              </button>
            </>
          ) : (
            // not authed: only Sign in (with Google chooser)
            <button
              onClick={() => signIn("google", { callbackUrl: `/${locale}`, prompt: "select_account" })}
              className="w-full text-left rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-surface-100 hover:text-text-primary"
              role="menuitem"
            >
              {t("auth.signIn", "Sign in")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}