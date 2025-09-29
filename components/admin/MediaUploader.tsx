// components/admin/MediaUploader.tsx
import * as React from "react";
import { useTranslation } from "next-i18next";

type Props = {
  onUploaded: (urls: string[]) => void;   // yüklenen dosyaların secure_url listesi
  multiple?: boolean;
  accept?: string; // "image/*,video/*" vb.
  buttonLabel?: string; // varsa bu, i18n üstüne yazılır
};

type Signing = {
  cloudName: string;
  apiKey: string;
  uploadUrl: string;
  signature: string;
  timestamp: number;
  folder: string;
};

export default function MediaUploader({
  onUploaded,
  multiple = true,
  accept = "image/*,video/*",
  buttonLabel,
}: Props) {
  const { t } = useTranslation("common");

  const [dragOver, setDragOver] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState<number>(0);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const requestSignature = async (): Promise<Signing> => {
    const res = await fetch("/api/upload/sign", { method: "POST" }).then((r) => r.json());
    if (!res.ok) throw new Error(res.error || "sign error");
    return res.data as Signing;
  };

  const doUpload = async (files: FileList | File[]) => {
    if (!files || !files.length) return;
    setUploading(true);
    setProgress(0);

    try {
      const sign = await requestSignature();
      const urls: string[] = [];
      const list = Array.from(files);

      for (let i = 0; i < list.length; i++) {
        const f = list[i];
        const fd = new FormData();
        fd.append("file", f);
        fd.append("api_key", sign.apiKey);
        fd.append("timestamp", String(sign.timestamp));
        fd.append("folder", sign.folder);
        fd.append("signature", sign.signature);

        const xhr = new XMLHttpRequest();
        const p = new Promise<string>((resolve, reject) => {
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const percent = Math.round(((i + e.loaded / e.total) / list.length) * 100);
              setProgress(percent);
            }
          };
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  const json = JSON.parse(xhr.responseText);
                  urls.push(json.secure_url);
                  resolve(json.secure_url);
                } catch (err) {
                  reject(err);
                }
              } else {
                reject(new Error(`upload failed: ${xhr.status}`));
              }
            }
          };
        });
        xhr.open("POST", sign.uploadUrl, true);
        xhr.send(fd);
        await p;
      }

      onUploaded(urls);
    } catch (err: any) {
      alert(err?.message || t("common.error", "Hata"));
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) doUpload(e.target.files);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      doUpload(e.dataTransfer.files);
    }
  };

  const label = buttonLabel ?? t("uploader.pickOrDrop", "Dosya seç / sürükle-bırak");

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={[
          "border-2 border-dashed rounded-xl p-4 text-sm cursor-pointer",
          dragOver ? "border-black bg-surface-50" : "border-brand-300/50",
        ].join(" ")}
        onClick={() => inputRef.current?.click()}
        aria-label={t("uploader.ariaLabel", "Dosya yükle")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-medium">{label}</div>
            <div className="text-xs text-text-secondary">
              {t("uploader.supported", "Desteklenen türler")}: {accept}
            </div>
          </div>
          <div className="shrink-0">
            <span className="px-3 py-1 rounded-lg border">
              {uploading ? t("common.loading", "Yükleniyor…") : t("uploader.upload", "Yükle")}
            </span>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={onInput}
        />
      </div>

      {uploading && (
        <div className="mt-2 w-full h-2 rounded bg-surface-50" aria-label={t("uploader.progress", "Yükleme durumu")}>
          <div
            className="h-2 rounded bg-black transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}