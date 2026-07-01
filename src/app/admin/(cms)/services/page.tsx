import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { S } from "@/lib/admin-styles";
import { deleteService } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

const SC: Record<string, string> = { PUBLISHED: "p", DRAFT: "d", ARCHIVED: "a" };

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <style>{S}</style>
      <div className="aph">
        <h1 className="apt">Services <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: "14px" }}>({services.length})</span></h1>
        <Link href="/admin/services/new" className="ab ab-p"><Plus size={13} strokeWidth={2} />New Service</Link>
      </div>
      <div className="aw">
        {services.length === 0 ? (
          <div className="aempty">No services yet. <Link href="/admin/services/new" className="alink">Create the first →</Link></div>
        ) : (
          <table className="tb">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Icon</th>
                <th>Status</th>
                <th>Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id} className="tr">
                  <td>
                    <Link href={`/admin/services/${s.id}/edit`} style={{ color: "#1A1A1A", textDecoration: "none", fontWeight: 500 }}>{s.titleEn}</Link>
                    {s.titleAr && <div className="atag" dir="rtl">{s.titleAr}</div>}
                  </td>
                  <td className="atag">{s.slug}</td>
                  <td className="atag">{s.icon ?? "—"}</td>
                  <td><span className={`bdg ${SC[s.status] ?? "d"}`}>{s.status.toLowerCase()}</span></td>
                  <td className="atag">{s.sortOrder}</td>
                  <td>
                    <div className="aact">
                      <Link href={`/admin/services/${s.id}/edit`} className="ab ab-s">Edit</Link>
                      <DeleteButton action={deleteService.bind(null, s.id)} />
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
