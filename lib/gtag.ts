// lib/gtag.ts
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

type EventProps = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const pageview = (url: string) => {
  if (!GA_ID) return;
  if (typeof window === "undefined") return;
  (window as any).gtag("config", GA_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: EventProps) => {
  if (!GA_ID) return;
  if (typeof window === "undefined") return;
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
