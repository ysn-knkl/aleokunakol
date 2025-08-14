import React from "react";

export default function CalendlyInline() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL!;
  return (
    <div className="card mx-auto max-w-4xl p-2">
      <iframe
        src={url}
        title="Calendly"
        className="h-[640px] w-full rounded-xl"
        style={{ border: 0 }}
        loading="lazy"
      />
    </div>
  );
}