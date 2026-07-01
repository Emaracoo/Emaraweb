import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { S } from "@/lib/admin-styles";
import { deleteEnquiry } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Enquiries" };

const STATUS_CLASS: Record<string, string> = {
  NEW: "n", IN_PROGRESS: "i", RESOLVED: "r", ARCHIVED: "a",
};

function fmt(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const where = status && status !== "all" ? { status: status as never } : {};
  const enquiries = await prisma.enquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const counts = await prisma.enquiry.groupBy({
    by: ["status"],
    _count: true,
  });
  const total = await prisma.enquiry.count();

  const tabs = [
    { key: "all", label: "All", count: total },
    { key: "NEW", label: "New", count: counts.find(c => c.status === "NEW")?._count ?? 0 },
    { key: "IN_PROGRESS", label: "In Progress", count: counts.find(c => c.status === "IN_PROGRESS")?._count ?? 0 },
    { key: "RESOLVED", label: "Resolved", count: counts.find(c => c.status === "RESOLVED")?._count ?? 0 },
    { key: "ARCHIVED", label: "Archived", count: counts.find(c => c.status === "ARCHIVED")?._count ?? 0 },
  ];

  const active = status ?? "all";

  return (
    <>
      <style>{S}</style>
      <div className="aph">
        <h1 className="apt">Enquiries</h1>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "0", marginBottom: "1.25rem", borderBottom: "1px solid #E5E3DF" }}>
        {tabs.map(t => (
          <Link
            key={t.key}
            href={t.key === "all" ? "/admin/enquiries" : `/admin/enquiries?status=${t.key}`}
            style={{
              padding: "8px 14px",
              fontSize: "12px",
              color: active === t.key ? "#993434" : "#7A7A7A",
              textDecoration: "none",
              borderBottom: active === t.key ? "2px solid #993434" : "2px solid transparent",
              fontFamily: "var(--font-inter),system-ui,sans-serif",
              fontWeight: active === t.key ? 500 : 400,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginBottom: "-1px",
            }}
          >
            {t.label}
            <span style={{ fontSize: "10px", background: "#F0EEEA", color: "#7A7A7A", padding: "1px 6px", borderRadius: "10px" }}>
              {t.count}
            </span>
          </Link>
        ))}
      </div>

      <div className="aw">
        {enquiries.length === 0 ? (
          <div className="aempty">No enquiries found.</div>
        ) : (
          <table className="tb">
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(enq => (
                <tr key={enq.id} className="tr">
                  <td>
                    <Link href={`/admin/enquiries/${enq.id}`} style={{ color: "#1A1A1A", textDecoration: "none", fontWeight: 500 }}>
                      {enq.name}
                    </Link>
                    <div className="atag">{enq.email}</div>
                  </td>
                  <td style={{ maxWidth: "300px" }}>
                    <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {enq.subject ?? "(no subject)"}
                    </span>
                    <div className="atag" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {enq.message.slice(0, 60)}…
                    </div>
                  </td>
                  <td><span className={`bdg ${STATUS_CLASS[enq.status] ?? "d"}`}>{enq.status.replace("_", " ")}</span></td>
                  <td className="atag">{fmt(enq.createdAt)}</td>
                  <td>
                    <div className="aact">
                      <Link href={`/admin/enquiries/${enq.id}`} className="ab ab-s">View</Link>
                      <DeleteButton action={deleteEnquiry.bind(null, enq.id)} />
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
