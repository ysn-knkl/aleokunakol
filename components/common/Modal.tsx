import React, { ReactNode, useEffect, useRef } from "react";

type ModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "md" | "lg";
};

const Modal: React.FC<ModalProps> = ({
  title,
  open,
  onClose,
  children,
  size = "lg",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // ESC + body scroll lock
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onEsc);
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      setTimeout(() => cardRef.current?.focus(), 0);
    }
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const width = size === "lg" ? "max-w-3xl" : "max-w-xl";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={cardRef}
        className={`relative w-full ${width} rounded-2xl bg-white shadow-2xl border border-brand-300/30 overflow-hidden`}
      >
        {/* sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white/90 backdrop-blur px-5 py-4 border-b border-brand-300/30">
          <h2
            id="modal-title"
            className="text-base md:text-lg font-semibold text-text-primary"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="rounded-full p-2 text-text-secondary hover:text-text-primary hover:bg-surface-100"
          >
            ✕
          </button>
        </div>

        {/* content */}
        <div className="max-h-[80vh] overflow-y-auto px-5 py-5">
          <div className="prose prose-legal max-w-none">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
