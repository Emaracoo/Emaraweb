import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { S } from "@/lib/admin-styles";
import { deletePartner, savePartnersStats } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Partners" };

const SC: Record<string, string> = { PUBLISHED: "p", DRAFT: "d", ARCHIVED: "a" };

export default async function PartnersPage() {
  const [partners, statsSection] = await Promise.all([
    prisma.partner.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    prisma.homepageSection.findUnique({ where: { key: "partners_stats" } }),
  ]);
  const stats = (statsSection?.data as { stats?: { value: string; labelEn: string; labelAr: string }[] } | null)?.stats ?? [];

  return (
    <>
      <style>{S}</style>
      <div className="aph">
        <h1 className="apt">Partners & Clients <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: "14px" }}>({partners.length})</span></h1>
        <Link href="/admin/partners/new" className="ab ab-p"><Plus size={13} strokeWidth={2} />Add Partner</Link>
      </div>

      <div className="frm" style={{ marginBottom: "1.25rem" }}>
        <p className="fsec">Partners Page Stats Strip</p>
        <form action={savePartnersStats}>
          {Array.from({ length: 4 }).map((_, i) => {
            const stat = stats[i];
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr", gap: "1rem", marginBottom: "0.75rem" }}>
                <div className="frow" style={{ marginBottom: 0 }}>
                  <label className="flbl">Value</label>
                  <input name={`stat${i}_value`} className="finp" defaultValue={stat?.value ?? ""} placeholder="237" />
                </div>
                <div className="frow" style={{ marginBottom: 0 }}>
                  <label className="flbl">Label (EN)</label>
                  <input name={`stat${i}_labelEn`} className="finp" defaultValue={stat?.labelEn ?? ""} placeholder="Clients Served" />
                </div>
                <div className="frow" style={{ marginBottom: 0 }}>
                  <label className="flbl">Label (AR)</label>
                  <input name={`stat${i}_labelAr`} className="finp" dir="rtl" defaultValue={stat?.labelAr ?? ""} />
                </div>
              </div>
            );
          })}
          <div style={{ paddingTop: ".75rem" }}>
            <button type="submit" className="ab ab-s">Save Stats</button>
          </div>
        </form>
      </div>

      <div className="aw">
        {partners.length === 0 ? (
          <div className="aempty">No partners yet. <Link href="/admin/partners/new" className="alink">Add the first →</Link></div>
        ) : (
          <table className="tb">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Sector</th>
                <th>Website</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {partners.map(p => (
                <tr key={p.id} className="tr">
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt={p.nameEn} style={{ height: 32, width: "auto", maxWidth: 80, objectFit: "contain" }} />
                  </td>
                  <td>
                    <Link href={`/admin/partners/${p.id}/edit`} style={{ color: "#1A1A1A", textDecoration: "none", fontWeight: 500 }}>{p.nameEn}</Link>
                    {p.nameAr && <div className="atag" dir="rtl">{p.nameAr}</div>}
                  </td>
                  <td className="atag">{p.sector}</td>
                  <td className="atag">
                    {p.website ? <a href={p.website} target="_blank" rel="noopener noreferrer" className="alink">{p.website.replace(/^https?:\/\//, "")}</a> : "—"}
                  </td>
                  <td><span className={`bdg ${SC[p.status] ?? "d"}`}>{p.status.toLowerCase()}</span></td>
                  <td>
                    <div className="aact">
                      <Link href={`/admin/partners/${p.id}/edit`} className="ab ab-s">Edit</Link>
                      <DeleteButton action={deletePartner.bind(null, p.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
