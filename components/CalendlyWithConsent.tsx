// components/CalendlyWithConsent.tsx
import { useState } from "react";
import dynamic from "next/dynamic";

const CalendlyInline = dynamic(() => import("./CalendlyInline"), { ssr: false });

export default function CalendlyWithConsent() {
  const [consent, setConsent] = useState(false); 

  if (!consent) {
    return (
      <div className="card mx-auto max-w-4xl p-6 text-center">
        <p className="mb-4">Calendly randevu bileşenini göstermek için üçüncü taraf içerik izni gerekir.</p>
        <button className="btn-primary" onClick={() => setConsent(true)}>
          İzin ver ve göster
        </button>
      </div>
    );
  }
  return <CalendlyInline />;
}