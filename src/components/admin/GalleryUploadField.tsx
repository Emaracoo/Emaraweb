"use client";

import { useRef, useState } from "react";

interface Props {
  name: string;
  defaultValue?: string[];
  folder?: string;
}

async function compressToBlob(file: File, maxWidth = 1200, quality = 0.78): Promise<Blob> {
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
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("Compression failed")), "image/jpeg", quality);
    };
    img.onerror = reject;
    img.src = objectUrl;
  });
}

export function GalleryUploadField({ name, defaultValue = [], folder = "projects" }: Props) {
  const [urls, setUrls]           = useState<string[]>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]   = useState("");
  const [error, setError]         = useState("");
  const inputRef                  = useRef<HTMLInputElement>(null);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setError("");
    setUploading(true);
    const added: string[] = [];

    for (let i = 0; i < files.length; i++) {
      setProgress(`Uploading ${i + 1} / ${files.length}…`);
      try {
        const blob = await compressToBlob(files[i]);
        const fd   = new FormData();
        fd.append("file", blob, files[i].name);
        fd.append("folder", folder);

        const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Upload failed");
        added.push(json.url);
      } catch (err) {
        setError(`Failed on ${files[i].name}: ${err instanceof Error ? err.message : "error"}`);
      }
    }

    setUrls(prev => [...prev, ...added]);
    setUploading(false);
    setProgress("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(idx: number) {
    setUrls(prev => prev.filter((_, i) => i !== idx));
  }

  function moveLeft(idx: number) {
    if (idx === 0) return;
    setUrls(prev => { const a = [...prev]; [a[idx - 1], a[idx]] = [a[idx], a[idx - 1]]; return a; });
  }

  function moveRight(idx: number) {
    setUrls(prev => {
      if (idx >= prev.length - 1) return prev;
      const a = [...prev]; [a[idx], a[idx + 1]] = [a[idx + 1], a[idx]]; return a;
    });
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A5A5A", fontFamily: "var(--font-inter),system-ui,sans-serif", marginBottom: "0.4rem" }}>
        Gallery Images
      </label>

      <input type="hidden" name={name} value={urls.join(", ")} />

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <label style={{ cursor: uploading ? "wait" : "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", fontSize: "12px", fontWeight: 600, fontFamily: "var(--font-inter),system-ui,sans-serif", background: uploading ? "#E5E3DF" : "#fff", color: "#3A3A3A", border: "1px solid #D5D3CF" }}>
          {uploading ? progress || "Uploading…" : "Upload images"}
          <span style={{ color: "#9A9A9A", fontWeight: 400 }}>select multiple</span>
          <input ref={inputRef} type="file" accept="image/*" multiple disabled={uploading} onChange={handleFiles} style={{ display: "none" }} />
        </label>
      </div>

      {error && (
        <p style={{ marginTop: "0.35rem", fontSize: "12px", color: "#991B1B", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{error}</p>
      )}

      {urls.length > 0 && (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
            {urls.map((url, i) => (
              <div key={url + i} style={{ position: "relative", border: "1px solid #E5E3DF" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`gallery ${i + 1}`} style={{ width: 100, height: 72, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", background: "rgba(0,0,0,0.45)" }}>
                  <button type="button" onClick={() => moveLeft(i)} disabled={i === 0}
                    style={{ flex: 1, color: "#fff", border: "none", background: "transparent", cursor: i === 0 ? "default" : "pointer", fontSize: 16, padding: "1px 0", opacity: i === 0 ? 0.3 : 1 }}>
                    ‹
                  </button>
                  <button type="button" onClick={() => moveRight(i)} disabled={i === urls.length - 1}
                    style={{ flex: 1, color: "#fff", border: "none", background: "transparent", cursor: i === urls.length - 1 ? "default" : "pointer", fontSize: 16, padding: "1px 0", opacity: i === urls.length - 1 ? 0.3 : 1 }}>
                    ›
                  </button>
                </div>
                <button type="button" onClick={() => remove(i)} title="Remove"
                  style={{ position: "absolute", top: 3, right: 3, width: 20, height: 20, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  ×
                </button>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "0.4rem", fontSize: "11px", color: "#9A9A9A", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>
            {urls.length} image{urls.length !== 1 ? "s" : ""} · use ‹ › to reorder
          </p>
        </>
      )}
    </div>
  );
}
