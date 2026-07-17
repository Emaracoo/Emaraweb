import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import { Image as ImageIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Media" };

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default async function MediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, filename: true, originalName: true,
      url: true, mimeType: true, size: true, folder: true,
      altEn: true, createdAt: true,
    },
  });

  return (
    <>
      <style>{S}</style>
      <div className="aph">
        <h1 className="apt">Media Library <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: "14px" }}>({media.length})</span></h1>
      </div>

      {media.length === 0 ? (
        <div className="aw">
          <div className="aempty" style={{ padding: "4rem 2rem" }}>
            <ImageIcon size={32} strokeWidth={1} color="#D0CECC" style={{ margin: "0 auto 1rem" }} />
            <p style={{ marginBottom: ".5rem", fontWeight: 500, color: "#7A7A7A" }}>No media uploaded yet</p>
            <p style={{ fontSize: "12px", color: "#B0AEAA" }}>
              Upload images when creating projects, blog posts, or partners — they will appear here.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "1px", background: "#E5E3DF", border: "1px solid #E5E3DF", marginBottom: "1.25rem" }}>
            {media.map(m => (
              <div key={m.id} style={{ background: "#fff", padding: ".75rem", cursor: "pointer" }}>
                {m.mimeType.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt={m.altEn ?? m.originalName} style={{ width: "100%", height: 100, objectFit: "cover", marginBottom: ".5rem" }} />
                ) : (
                  <div style={{ width: "100%", height: 100, background: "#F5F4F2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: ".5rem" }}>
                    <ImageIcon size={24} color="#C5C3BF" strokeWidth={1} />
                  </div>
                )}
                <p style={{ fontSize: "11px", fontWeight: 500, color: "#3A3A3A", fontFamily: "var(--font-inter),system-ui,sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>
                  {m.originalName}
                </p>
                <p style={{ fontSize: "10px", color: "#9A9A9A", fontFamily: "var(--font-inter),system-ui,sans-serif", margin: ".1rem 0 0" }}>
                  {fmtSize(m.size)}
                </p>
              </div>
            ))}
          </div>
          <div className="aw">
            <table className="tb">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Folder</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {media.map(m => (
                  <tr key={m.id} className="tr">
                    <td style={{ fontWeight: 500 }}>{m.originalName}</td>
                    <td className="atag">{m.mimeType}</td>
                    <td className="atag">{fmtSize(m.size)}</td>
                    <td className="atag">{m.folder}</td>
                    <td>
                      <a href={m.url} target="_blank" rel="noopener noreferrer" className="alink" style={{ fontSize: "12px" }}>
                        Open ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
