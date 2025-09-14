// components/admin/MediaUploader.tsx
import * as React from "react";

type Props = {
  onUploaded: (urls: string[]) => void;   // yüklenen dosyaların secure_url listesi
  multiple?: boolean;
  accept?: string; // "image/*,video/*" vb.
  buttonLabel?: string;
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
  buttonLabel = "Dosya seç / sürükle-bırak",
}: Props) {
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
      alert(err?.message || "Yükleme hatası");
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
        aria-label="Dosya yükle"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-medium"> {buttonLabel} </div>
            <div className="text-xs text-text-secondary">
              Desteklenen türler: {accept}
            </div>
          </div>
          <div className="shrink-0">
            <span className="px-3 py-1 rounded-lg border">{uploading ? "Yükleniyor…" : "Yükle"}</span>
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
        <div className="mt-2 w-full h-2 rounded bg-surface-50">
          <div
            className="h-2 rounded bg-black transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}