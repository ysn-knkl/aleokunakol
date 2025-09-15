// components/common/ButtonCTA.tsx
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href?: string;          // Link ise kullan
  onClick?: () => void;   // Button ise kullan
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

const sizeMap = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-lg",
};

export default function ButtonCTA({
  children,
  href,
  onClick,
  size = "lg",
  variant = "solid",
  loading = false,
  disabled = false,
  className = "",
  ariaLabel,
}: Props) {
  const common =
    "inline-flex items-center justify-center rounded-2xl whitespace-nowrap select-none " +
    "transition-all duration-200 focus-visible:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-600 " +
    "active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

  const solid =
    "relative " +
    "bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 text-white " +
    "shadow-[0_8px_30px_rgba(16,185,129,.35)] " +
    "hover:shadow-[0_12px_36px_rgba(16,185,129,.45)] " +
    "hover:brightness-[1.05] " +
    // glassy overlay & shine
    "before:absolute before:inset-0 before:rounded-2xl before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition " +
    "after:pointer-events-none after:absolute after:-inset-x-10 after:-inset-y-1 after:bg-gradient-to-r after:from-white/0 after:via-white/35 after:to-white/0 " +
    "after:translate-x-[-120%] hover:after:translate-x-[120%] after:transition-transform after:duration-700 after:rounded-2xl";

  const outline =
    "border border-emerald-600/50 text-emerald-700 bg-white/60 backdrop-blur " +
    "hover:bg-white hover:border-emerald-600";

  const sizing = sizeMap[size];

  const inner = (
    <span className="inline-flex items-center gap-2">
      {loading && (
        <svg
          className="h-5 w-5 animate-spin"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" className="opacity-25" stroke="currentColor" strokeWidth="4" fill="none" />
          <path d="M4 12a8 8 0 0 1 8-8" className="opacity-75" stroke="currentColor" strokeWidth="4" fill="none" />
        </svg>
      )}
      <span>{children}</span>
      {/* chevron */}
      {!loading && (
        <svg className="h-5 w-5 -mr-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );

  const classes = [
    common,
    sizing,
    variant === "solid" ? solid : outline,
    className,
  ].join(" ");

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={classes}
        onClick={disabled || loading ? (e) => e.preventDefault() : undefined}
      >
        {inner}
      </Link>
    );
    }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled || loading}
      className={classes}
    >
      {inner}
    </button>
  );
}