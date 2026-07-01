import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Analytics" };

function fmt(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function AnalyticsPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const [
    totalEnquiries,
    monthEnquiries,
    weekEnquiries,
    newEnquiries,
    resolvedEnquiries,
    totalProjects,
    publishedProjects,
    totalBlog,
    publishedBlog,
    totalPartners,
    recentEnquiries,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.enquiry.count({ where: { createdAt: { gte: startOfWeek } } }),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.count({ where: { status: "RESOLVED" } }),
    prisma.project.count(),
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.partner.count({ where: { status: "PUBLISHED" } }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, name: true, email: true, subject: true, status: true, createdAt: true },
    }),
  ]);

  const statGroups = [
    {
      title: "Enquiries",
      stats: [
        { label: "Total", value: totalEnquiries },
        { label: "This Month", value: monthEnquiries },
        { label: "This Week", value: weekEnquiries },
        { label: "Awaiting Response", value: newEnquiries },
        { label: "Resolved", value: resolvedEnquiries },
      ],
    },
    {
      title: "Content",
      stats: [
        { label: "Total Projects", value: totalProjects },
        { label: "Published", value: publishedProjects },
        { label: "Total Blog Posts", value: totalBlog },
        { label: "Published Posts", value: publishedBlog },
        { label: "Active Partners", value: totalPartners },
      ],
    },
  ];

  const SC: Record<string, string> = { NEW: "n", IN_PROGRESS: "i", RESOLVED: "r", ARCHIVED: "a" };

  return (
    <>
      <style>{S}</style>
      <div className="aph"><h1 className="apt">Analytics</h1></div>

      {statGroups.map(g => (
        <div key={g.title} style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 700, color: "#9A9A9A", textTransform: "uppercase", letterSpacing: ".07em", fontFamily: "var(--font-inter),system-ui,sans-serif", marginBottom: ".75rem" }}>
            {g.title}
          </h2>
          <div className="astats">
            {g.stats.map(s => (
              <div key={s.label} className="astat">
                <div className="astat-v">{s.value}</div>
                <div className="astat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="aw">
        <div className="ah"><h2 className="at">Recent Enquiries</h2></div>
        {recentEnquiries.length === 0 ? (
          <div className="aempty">No enquiries yet.</div>
        ) : (
          <table className="tb">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map(e => (
                <tr key={e.id} className="tr">
                  <td style={{ fontWeight: 500 }}>{e.name}</td>
                  <td className="atag">{e.subject ?? "(no subject)"}</td>
                  <td><span className={`bdg ${SC[e.status] ?? "d"}`}>{e.status.replace("_", " ")}</span></td>
                  <td className="atag">{fmt(e.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
