// components/exercises/ExerciseCard.tsx
import * as React from "react";
import Image from "next/image";

export type MediaItem =
  | { type: "image"; url: string }
  | { type: "video"; url: string }
  | { type: "text"; content: string };

export type ExerciseDoc = {
  _id: string;
  title: string;
  description?: string;
  level?: "easy" | "medium" | "hard" | string;
  tags?: string[];
  bodyParts?: string[];
  media?: MediaItem[];
  slug?: string;
};

function pickCover(ex?: ExerciseDoc): string {
  const img = ex?.media?.find((m) => m.type === "image") as MediaItem | undefined;
  return (img as any)?.url || "/services.jpg"; // fallback: proje içindeki görsel
}

function levelColor(level?: string) {
  switch (level) {
    case "easy":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "medium":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "hard":
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-surface-50 text-text-secondary border-brand-300/30";
  }
}

type Props = {
  exercise: ExerciseDoc;
  onOpen: (exercise: ExerciseDoc) => void;
};

export default function ExerciseCard({ exercise, onOpen }: Props) {
  const cover = pickCover(exercise);
  const tagChip = (exercise.tags || []).slice(0, 2).join(" • ");

  return (
    <article
      className="group rounded-2xl border border-brand-300/30 bg-white shadow-soft overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={() => onOpen(exercise)}
      role="button"
      aria-label={`${exercise.title} detayını aç`}
    >
      {/* Kapak */}
      <div className="relative aspect-[4/3]">
        <Image
          src={cover}
          alt={exercise.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {exercise.level && (
          <span
            className={`absolute left-3 top-3 rounded-full border px-2 py-1 text-xs font-medium ${levelColor(
              exercise.level
            )}`}
          >
            {exercise.level}
          </span>
        )}
      </div>

      {/* İçerik */}
      <div className="p-5">
        <h3 className="text-lg md:text-xl font-semibold text-text-primary line-clamp-2">
          {exercise.title}
        </h3>

        {exercise.description && (
          <p className="mt-2 text-sm text-text-secondary line-clamp-2">
            {exercise.description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-full border border-brand-300/30 bg-surface-50 px-3 py-1 text-[12px] text-text-secondary">
            {tagChip || "Rehberli hareket"}
          </span>

          <span className="text-[12px] text-text-muted">
            {(exercise.bodyParts || []).slice(0, 2).join(" • ")}
          </span>
        </div>
      </div>
    </article>
  );
}