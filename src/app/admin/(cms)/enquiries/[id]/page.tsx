import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { S } from "@/lib/admin-styles";
import { updateEnquiryStatus, saveEnquiryNote, deleteEnquiry } from "../actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Enquiry Detail" };

const STATUS_OPTIONS = ["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"];
const STATUS_CLASS: Record<string, string> = {
  NEW: "n", IN_PROGRESS: "i", RESOLVED: "r", ARCHIVED: "a",
};

function fmt(d: Date) {
  return d.toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const enq = await prisma.enquiry.findUnique({ where: { id } });
  if (!enq) notFound();

  return (
    <>
      <style>{S}</style>
      <Link href="/admin/enquiries" className="aback">← Back to Enquiries</Link>

      <div className="aph">
        <div>
          <h1 className="apt">{enq.name}</h1>
          <p className="asub">{enq.email}{enq.phone ? ` · ${enq.phone}` : ""}</p>
        </div>
        <div className="aact">
          <span className={`bdg ${STATUS_CLASS[enq.status] ?? "d"}`}>{enq.status.replace("_", " ")}</span>
          <DeleteButton action={deleteEnquiry.bind(null, enq.id)} label="Delete enquiry" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.25rem", alignItems: "start" }}>
        {/* Message */}
        <div>
          <div className="aw" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
            {enq.subject && (
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#1A1A1A", marginBottom: ".75rem", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>
                {enq.subject}
              </p>
            )}
            <p style={{ fontSize: "13px", color: "#3A3A3A", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "var(--font-inter),system-ui,sans-serif", margin: 0 }}>
              {enq.message}
            </p>
            <p style={{ fontSize: "11px", color: "#B0AEAA", marginTop: "1rem", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>
              Received {fmt(enq.createdAt)}
            </p>
          </div>

          {/* Notes */}
          <div className="aw">
            <div className="ah"><h2 className="at">Internal Notes</h2></div>
            <div style={{ padding: "1.25rem" }}>
              <form
                action={async (fd: FormData) => {
                  "use server";
                  await saveEnquiryNote(id, fd.get("notes") as string ?? "");
                }}
              >
                <textarea
                  name="notes"
                  defaultValue={enq.notes ?? ""}
                  className="ftxta"
                  placeholder="Add internal notes visible only to admins…"
                  style={{ marginBottom: ".75rem" }}
                />
                <button type="submit" className="ab ab-s">Save notes</button>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="aw">
          <div className="ah"><h2 className="at">Update Status</h2></div>
          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
            {STATUS_OPTIONS.map(s => (
              <form key={s} action={async () => { "use server"; await updateEnquiryStatus(id, s); }}>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 12px",
                    fontSize: "12.5px",
                    fontFamily: "var(--font-inter),system-ui,sans-serif",
                    cursor: "pointer",
                    background: enq.status === s ? "#F5F4F2" : "#fff",
                    border: "1px solid",
                    borderColor: enq.status === s ? "#D5D3CF" : "#E5E3DF",
                    fontWeight: enq.status === s ? 600 : 400,
                    color: enq.status === s ? "#1A1A1A" : "#5A5A5A",
                  }}
                >
                  {s.replace("_", " ")}
                  {enq.status === s && " ✓"}
                </button>
              </form>
            ))}
          </div>

          <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #F0EEEA" }}>
            <p className="flbl">Contact</p>
            <p style={{ fontSize: "13px", fontFamily: "var(--font-inter),system-ui,sans-serif", margin: "0 0 .25rem" }}>
              <a href={`mailto:${enq.email}`} className="alink">{enq.email}</a>
            </p>
            {enq.phone && (
              <p style={{ fontSize: "13px", fontFamily: "var(--font-inter),system-ui,sans-serif", margin: 0 }}>
                <a href={`tel:${enq.phone}`} className="alink">{enq.phone}</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
