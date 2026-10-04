"use client";

import { useRef, useState } from "react";

interface Props {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  folder?: string;
}

// Formats that can carry transparency (logos) are kept as PNG; photos are re-encoded as JPEG
const TRANSPARENT_TYPES = ["image/png", "image/webp", "image/gif"];

async function compressToBlob(file: File, maxWidth = 1600, quality = 0.80): Promise<Blob> {
  const keepAlpha = TRANSPARENT_TYPES.includes(file.type);
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, maxWidth / img.naturalWidth);
      const canvas = document.createElement("canvas");
      canvas.width  = Math.round(img.naturalWidth  * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("Compression failed")), keepAlpha ? "image/png" : "image/jpeg", quality);
    };
    img.onerror = reject;
    img.src = objectUrl;
  });
}

export function ImageUploadField({ name, label, defaultValue = "", required, folder = "projects" }: Props) {
  const [url, setUrl]             = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const inputRef                  = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    try {
      // SVGs are vector — upload untouched
      const blob = file.type === "image/svg+xml" ? file : await compressToBlob(file);
      const fd   = new FormData();
      fd.append("file", blob, file.name);
      fd.append("folder", folder);

      const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setUrl(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A5A5A", fontFamily: "var(--font-inter),system-ui,sans-serif", marginBottom: "0.4rem" }}>
        {label}{required && " *"}
      </label>

      <input type="hidden" name={name} value={url} required={required} />

      <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Upload a file or paste a URL"
          style={{ flex: 1, padding: ".55rem .75rem", border: "1px solid #E5E3DF", fontSize: "13px", fontFamily: "var(--font-inter),system-ui,sans-serif", outline: "none", background: "#fff" }}
          onFocus={e => (e.currentTarget.style.borderColor = "#993434")}
          onBlur={e  => (e.currentTarget.style.borderColor = "#E5E3DF")}
        />
        <label style={{ cursor: uploading ? "wait" : "pointer", display: "inline-flex", alignItems: "center", gap: "5px", padding: "7px 14px", fontSize: "12px", fontWeight: 600, fontFamily: "var(--font-inter),system-ui,sans-serif", background: uploading ? "#E5E3DF" : "#fff", color: "#3A3A3A", border: "1px solid #D5D3CF", whiteSpace: "nowrap" }}>
          {uploading ? "Uploading…" : "Upload file"}
          <input ref={inputRef} type="file" accept="image/*" disabled={uploading} onChange={handleFile} style={{ display: "none" }} />
        </label>
      </div>

      {error && (
        <p style={{ marginTop: "0.35rem", fontSize: "12px", color: "#991B1B", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{error}</p>
      )}

      {url && (
        <div style={{ marginTop: "0.75rem", position: "relative", display: "inline-block" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="preview" style={{ height: 140, width: "auto", maxWidth: "100%", objectFit: "cover", display: "block", border: "1px solid #E5E3DF" }} />
          <button type="button" onClick={() => setUrl("")} title="Remove"
            style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}
