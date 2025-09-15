import React from "react";

/**
 * Refined inline Calendly embed
 * - Full-width, minimal chrome (no heavy card)
 * - Enough responsive height to avoid inner scrollbars
 * - Subtle container styling, no extra borders
 */
export default function CalendlyPopup() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL!;

  if (!url) {
    return <p className="text-center text-red-500">Calendly URL missing</p>;
  }

  return (
    <div className="container-x">
      <div
        className="
          mx-auto max-w-5xl
          rounded-2xl
          bg-white/70
          backdrop-blur
          shadow-soft
          border border-brand-300/20
        "
      >
        <div
          className="
            relative w-full overflow-hidden rounded-xl
            min-h-[700px] h-auto
          "
        >
          <iframe
            src={url}
            title="Calendly"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}