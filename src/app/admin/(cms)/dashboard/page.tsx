import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Inbox, Building2, BookOpen, Users, ArrowRight, Plus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  const [enquiries, projects, blogPosts, partners, newEnquiries] = await Promise.all([
    prisma.enquiry.count(),
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.partner.count({ where: { status: "PUBLISHED" } }),
    prisma.enquiry.count({ where: { status: "NEW" } }),
  ]);
  return { enquiries, projects, blogPosts, partners, newEnquiries };
}

async function getRecentEnquiries() {
  return prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    select: { id: true, name: true, email: true, subject: true, status: true, createdAt: true },
  });
}

const STATUS_COLORS: Record<string, string> = {
  NEW:         "#993434",
  IN_PROGRESS: "#8C7A3A",
  RESOLVED:    "#4A8C5C",
  ARCHIVED:    "#4A4A4A",
};

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function DashboardPage() {
  const session = await auth();
  const [stats, recent] = await Promise.all([getStats(), getRecentEnquiries()]);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const statCards = [
    { label: "New Enquiries",      value: stats.newEnquiries, total: `${stats.enquiries} total`,  icon: Inbox,     href: "/admin/enquiries", urgent: stats.newEnquiries > 0 },
    { label: "Published Projects", value: stats.projects,     total: "in portfolio",               icon: Building2, href: "/admin/projects",  urgent: false },
    { label: "Published Posts",    value: stats.blogPosts,    total: "on blog",                    icon: BookOpen,  href: "/admin/blog",      urgent: false },
    { label: "Active Partners",    value: stats.partners,     total: "clients listed",             icon: Users,     href: "/admin/partners",  urgent: false },
  ];

  const quickActions = [
    { label: "New Project",    href: "/admin/projects/new", icon: Building2 },
    { label: "New Blog Post",  href: "/admin/blog/new",     icon: BookOpen  },
    { label: "Add Partner",    href: "/admin/partners/new", icon: Users     },
    { label: "View Enquiries", href: "/admin/enquiries",    icon: Inbox     },
  ];

  return (
    <>
      <style>{`
        .dash-stat { background:#fff; display:block; padding:1.25rem 1.5rem; text-decoration:none; position:relative; transition:background .15s; }
        .dash-stat:hover { background:#FAFAF9; }
        .dash-enq-row { display:flex; align-items:center; gap:1rem; padding:.875rem 1.25rem; border-bottom:1px solid #F5F4F2; text-decoration:none; transition:background .1s; cursor:pointer; }
        .dash-enq-row:last-child { border-bottom:none; }
        .dash-enq-row:hover { background:#FAFAF9; }
        .dash-qa { display:flex; align-items:center; gap:.625rem; padding:.625rem .75rem; font-size:12.5px; color:#3A3A3A; text-decoration:none; transition:all .1s; }
        .dash-qa:hover { background:#F5F4F2; color:#993434; }
        .dash-qa:hover .qa-plus-icon { color:#993434; }
      `}</style>

      <div style={{ maxWidth: "1080px" }}>

        {/* Greeting */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 500, color: "#1A1A1A", fontFamily: "var(--font-inter),system-ui,sans-serif", marginBottom: ".25rem" }}>
            {greeting}{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}
          </h1>
          <p style={{ fontSize: "13px", color: "#7A7A7A", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>
            Here&rsquo;s what&rsquo;s happening at Emara.
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1px", background: "#E5E3DF", border: "1px solid #E5E3DF", marginBottom: "1.75rem" }}>
          {statCards.map(card => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href} className="dash-stat">
                {card.urgent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "#993434" }} />}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: ".75rem" }}>
                  <div style={{ width: "32px", height: "32px", background: card.urgent ? "rgba(153,52,52,.08)" : "#F5F4F2", border: `1px solid ${card.urgent ? "rgba(153,52,52,.2)" : "#E5E3DF"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={14} strokeWidth={1.5} color={card.urgent ? "#993434" : "#7A7A7A"} />
                  </div>
                  <ArrowRight size={13} strokeWidth={1.5} color="#C5C3BF" />
                </div>
                <p style={{ fontSize: "28px", fontWeight: 700, color: card.urgent ? "#993434" : "#1A1A1A", lineHeight: 1, marginBottom: ".35rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontVariantNumeric: "tabular-nums" }}>
                  {card.value}
                </p>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "#3A3A3A", marginBottom: ".15rem", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{card.label}</p>
                <p style={{ fontSize: "11px", color: "#9A9A9A", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{card.total}</p>
              </Link>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "1.25rem" }}>

          {/* Recent enquiries */}
          <div style={{ background: "#fff", border: "1px solid #E5E3DF" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", borderBottom: "1px solid #F0EEEA" }}>
              <h2 style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>Recent Enquiries</h2>
              <Link href="/admin/enquiries" style={{ fontSize: "11px", color: "#993434", textDecoration: "none", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>View all →</Link>
            </div>

            {recent.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center" }}>
                <Inbox size={24} strokeWidth={1} color="#D0CECC" style={{ margin: "0 auto .75rem" }} />
                <p style={{ fontSize: "13px", color: "#B0AEAA", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>No enquiries yet</p>
              </div>
            ) : (
              <div>
                {recent.map(enq => (
                  <Link key={enq.id} href={`/admin/enquiries/${enq.id}`} className="dash-enq-row">
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#F5F4F2", border: "1px solid #E5E3DF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "#7A7A7A", flexShrink: 0, fontFamily: "var(--font-inter),system-ui,sans-serif" }}>
                      {enq.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "13px", fontWeight: 500, color: "#1A1A1A", fontFamily: "var(--font-inter),system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{enq.name}</p>
                      <p style={{ fontSize: "11px", color: "#9A9A9A", fontFamily: "var(--font-inter),system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{enq.subject ?? enq.email}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: ".25rem", flexShrink: 0 }}>
                      <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: STATUS_COLORS[enq.status] ?? "#7A7A7A", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>
                        {enq.status.replace("_", " ")}
                      </span>
                      <span style={{ fontSize: "10px", color: "#B0AEAA", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{formatDate(enq.createdAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div style={{ background: "#fff", border: "1px solid #E5E3DF", alignSelf: "start" }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #F0EEEA" }}>
              <h2 style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>Quick Actions</h2>
            </div>
            <div style={{ padding: ".5rem" }}>
              {quickActions.map(action => {
                const Icon = action.icon;
                return (
                  <Link key={action.href} href={action.href} className="dash-qa">
                    <div style={{ width: "24px", height: "24px", background: "#F5F4F2", border: "1px solid #E5E3DF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={12} strokeWidth={1.5} />
                    </div>
                    <span style={{ fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{action.label}</span>
                    <Plus size={11} strokeWidth={2} style={{ marginLeft: "auto", color: "#C5C3BF" }} className="qa-plus-icon" />
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
