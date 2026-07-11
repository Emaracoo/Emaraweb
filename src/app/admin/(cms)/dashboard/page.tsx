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
        .dash-stat { background:#fff; display:block; padding:1.35rem 1.5rem; border-radius:22px; text-decoration:none; position:relative; box-shadow:0 2px 10px rgba(0,0,0,.05); transition:transform .15s, box-shadow .15s; }
        .dash-stat:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.09); }
        .dash-enq-row { display:flex; align-items:center; gap:1rem; margin:0 .75rem .5rem; padding:.7rem 1rem; background:#F7F7F8; border-radius:999px; text-decoration:none; transition:background .12s; cursor:pointer; }
        .dash-enq-row:hover { background:#EFEFF1; }
        .dash-qa { display:flex; align-items:center; gap:.65rem; padding:.6rem .8rem; margin-bottom:.4rem; font-size:12.5px; color:#D0D0D4; background:rgba(255,255,255,.06); border-radius:999px; text-decoration:none; transition:all .12s; }
        .dash-qa:hover { background:rgba(255,255,255,.14); color:#fff; }
      `}</style>

      <div style={{ maxWidth: "1080px" }}>

        {/* Greeting */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h1 style={{ fontSize: "30px", fontWeight: 600, letterSpacing: "-0.02em", color: "#111", fontFamily: "var(--font-inter),system-ui,sans-serif", marginBottom: ".3rem" }}>
              {greeting}{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}
            </h1>
            <p style={{ fontSize: "13px", color: "#8A8A8E", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>
              Here&rsquo;s what&rsquo;s happening at Emara.
            </p>
          </div>
          <span style={{
            fontSize: "11px", color: "#8A8A8E", background: "#fff", borderRadius: "999px",
            padding: ".45rem 1rem", boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            fontFamily: "var(--font-inter),system-ui,sans-serif", whiteSpace: "nowrap",
          }}>
            {formatDate(new Date())}
          </span>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {statCards.map(card => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href} className="dash-stat">
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: ".9rem" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: card.urgent ? "rgba(153,52,52,.08)" : "#F2F2F4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={14} strokeWidth={1.5} color={card.urgent ? "#993434" : "#6A6A6E"} />
                  </div>
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight size={12} strokeWidth={1.5} color="#fff" />
                  </div>
                </div>
                <p style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.02em", color: card.urgent ? "#993434" : "#111", lineHeight: 1, marginBottom: ".4rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontVariantNumeric: "tabular-nums" }}>
                  {card.value}
                </p>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "#3A3A3E", marginBottom: ".1rem", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{card.label}</p>
                <p style={{ fontSize: "11px", color: "#A0A0A4", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{card.total}</p>
              </Link>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "1rem" }}>

          {/* Recent enquiries */}
          <div style={{ background: "#fff", borderRadius: "22px", boxShadow: "0 2px 10px rgba(0,0,0,.05)", paddingBottom: ".5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.15rem 1.5rem .9rem" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em", color: "#111", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>Recent Enquiries</h2>
              <Link href="/admin/enquiries" style={{ fontSize: "11px", fontWeight: 500, color: "#111", background: "#F2F2F4", borderRadius: "999px", padding: ".35rem .85rem", textDecoration: "none", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>View all →</Link>
            </div>

            {recent.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center" }}>
                <Inbox size={24} strokeWidth={1} color="#D0D0D4" style={{ margin: "0 auto .75rem" }} />
                <p style={{ fontSize: "13px", color: "#B0B0B4", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>No enquiries yet</p>
              </div>
            ) : (
              <div>
                {recent.map(enq => (
                  <Link key={enq.id} href={`/admin/enquiries/${enq.id}`} className="dash-enq-row">
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "#fff", flexShrink: 0, fontFamily: "var(--font-inter),system-ui,sans-serif" }}>
                      {enq.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "13px", fontWeight: 500, color: "#111", fontFamily: "var(--font-inter),system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{enq.name}</p>
                      <p style={{ fontSize: "11px", color: "#9A9A9E", fontFamily: "var(--font-inter),system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{enq.subject ?? enq.email}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: ".25rem", flexShrink: 0 }}>
                      <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: STATUS_COLORS[enq.status] ?? "#7A7A7E", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>
                        {enq.status.replace("_", " ")}
                      </span>
                      <span style={{ fontSize: "10px", color: "#B0B0B4", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{formatDate(enq.createdAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions — dark contrast panel */}
          <div style={{ background: "#111111", borderRadius: "22px", boxShadow: "0 12px 32px rgba(0,0,0,.25)", alignSelf: "start", overflow: "hidden" }}>
            <div style={{ padding: "1.15rem 1.4rem .75rem", display: "flex", alignItems: "center", gap: ".6rem" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plus size={13} strokeWidth={1.5} color="#fff" />
              </span>
              <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#fff", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>Quick Actions</h2>
            </div>
            <div style={{ padding: ".25rem .9rem 1rem" }}>
              {quickActions.map(action => {
                const Icon = action.icon;
                return (
                  <Link key={action.href} href={action.href} className="dash-qa">
                    <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={12} strokeWidth={1.5} />
                    </span>
                    <span style={{ fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{action.label}</span>
                    <ArrowRight size={11} strokeWidth={1.5} style={{ marginLeft: "auto", opacity: .6 }} />
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
