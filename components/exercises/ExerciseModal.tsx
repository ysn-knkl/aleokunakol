// components/exercises/ExerciseModal.tsx
import * as React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import type { ExerciseDoc, MediaItem } from "./ExerciseCard";

function getYoutubeId(url: string) {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/i
  );
  return m?.[1];
}

type Props = {
  open: boolean;
  exercise?: ExerciseDoc | null;
  onClose: () => void;
};

export default function ExerciseModal({ open, exercise, onClose }: Props) {
  const { t } = useTranslation("common");

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !exercise) return null;

  const images = (exercise.media || []).filter(
    (m): m is Extract<MediaItem, { type: "image" }> => m.type === "image"
  );
  const videos = (exercise.media || []).filter(
    (m): m is Extract<MediaItem, { type: "video" }> => m.type === "video"
  );
  const texts = (exercise.media || []).filter(
    (m): m is Extract<MediaItem, { type: "text" }> => m.type === "text"
  );

  const ytId = videos.map((v) => getYoutubeId(v.url)).find(Boolean);

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label={t("common.close", "Kapat")}
      />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div
          className="relative w-full max-w-4xl rounded-2xl bg-white border border-brand-300/30 shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exercise-modal-title"
        >
          <div className="flex items-center justify-between p-4 border-b border-brand-300/30">
            <h3
              id="exercise-modal-title"
              className="text-lg md:text-xl font-semibold text-text-primary"
            >
              {exercise.title}
            </h3>
            <button
              className="h-9 w-9 grid place-items-center rounded-full border border-brand-300/30"
              onClick={onClose}
              aria-label={t("common.close", "Kapat")}
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6">
            {/* Medya tarafı */}
            <div className="space-y-3">
              {/* Video öncelik, yoksa kapak */}
              {ytId ? (
                <div className="aspect-video rounded-xl overflow-hidden border border-brand-300/30">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${ytId}`}
                    title={t("exercise.videoTitle", "Egzersiz Videosu")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : images.length > 0 ? (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-brand-300/30">
                  <Image
                    src={images[0].url}
                    alt={exercise.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-xl border border-brand-300/30 grid place-items-center text-text-muted">
                  {t("exercise.noMedia", "Medya yok")}
                </div>
              )}

              {/* Küçük görseller */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(1, 5).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden border border-brand-300/30"
                    >
                      <Image
                        src={img.url}
                        alt={`${t("exercise.thumbnail", "Küçük görsel")} ${i + 1}`}
                        fill
                        sizes="25vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bilgi tarafı */}
            <div className="space-y-4">
              {exercise.description && (
                <p className="text-text-secondary leading-relaxed">
                  {exercise.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {exercise.level && (
                  <span className="rounded-full border border-brand-300/30 bg-surface-50 px-3 py-1 text-[12px] text-text-secondary">
                    {t("exercise.level", "Seviye")}: {exercise.level}
                  </span>
                )}
                {(exercise.bodyParts || []).map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-brand-300/30 bg-surface-50 px-3 py-1 text-[12px] text-text-secondary"
                  >
                    {b}
                  </span>
                ))}
                {(exercise.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-300/30 bg-surface-50 px-3 py-1 text-[12px] text-text-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {texts.length > 0 && (
                <div className="rounded-xl bg-surface-50 border border-brand-300/30 p-4 text-sm text-text-secondary">
                  {texts[0].content}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}