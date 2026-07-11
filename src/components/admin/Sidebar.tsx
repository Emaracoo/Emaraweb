"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Inbox, Building2, Layers, BookOpen,
  Users, Image, Home, Info, Navigation, Search, Settings,
  BarChart3, Activity, LogOut,
} from "lucide-react";

const NAV = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard",  href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    section: "Leads",
    items: [
      { label: "Enquiries",  href: "/admin/enquiries",  icon: Inbox },
    ],
  },
  {
    section: "Content",
    items: [
      { label: "Projects",   href: "/admin/projects",   icon: Building2  },
      { label: "Services",   href: "/admin/services",   icon: Layers     },
      { label: "Blog",       href: "/admin/blog",       icon: BookOpen   },
      { label: "Partners",   href: "/admin/partners",   icon: Users      },
      { label: "Media",      href: "/admin/media",      icon: Image      },
    ],
  },
  {
    section: "Pages",
    items: [
      { label: "Homepage",   href: "/admin/homepage",   icon: Home       },
      { label: "About",      href: "/admin/about",      icon: Info       },
      { label: "Navigation", href: "/admin/navigation", icon: Navigation },
    ],
  },
  {
    section: "System",
    items: [
      { label: "SEO",        href: "/admin/seo",        icon: Search     },
      { label: "Settings",   href: "/admin/settings",   icon: Settings   },
      { label: "Users",      href: "/admin/users",      icon: Users      },
      { label: "Analytics",  href: "/admin/analytics",  icon: BarChart3  },
      { label: "Activity",   href: "/admin/activity",   icon: Activity   },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin/dashboard") return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside style={{
      width: "216px",
      flexShrink: 0,
      background: "#F7F7F8",
      borderRadius: "28px",
      boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      <style>{`
        .sb-item { display:flex; align-items:center; gap:.65rem; margin:2px 12px; padding:.55rem .9rem; font-size:12.5px; border-radius:999px; text-decoration:none; transition:all .15s; font-family:var(--font-inter),system-ui,sans-serif; }
        .sb-item.active { background:#111111; color:#fff; font-weight:500; box-shadow:0 6px 16px rgba(0,0,0,.25); }
        .sb-item.idle { color:#8A8A8E; font-weight:400; }
        .sb-item.idle:hover { background:#ECECEE; color:#111; }
        .sb-nav::-webkit-scrollbar { display:none; }
      `}</style>

      {/* Logo */}
      <div style={{ padding: "1.4rem 1.5rem 1rem", flexShrink: 0, display: "flex", alignItems: "center", gap: ".6rem" }}>
        <Link href="/admin/dashboard" style={{ display: "flex", alignItems: "center", gap: ".6rem", textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Emara Admin" style={{ height: "44px", width: "auto", display: "block" }} />
          <span style={{
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#B0B0B4",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}>Admin</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="sb-nav" style={{ flex: 1, overflowY: "auto", padding: "0.25rem 0 0.75rem", scrollbarWidth: "none" }}>
        {NAV.map(group => (
          <div key={group.section} style={{ marginBottom: "0.35rem" }}>
            <p style={{
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#B0B0B4",
              padding: "0.6rem 1.5rem 0.35rem",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}>
              {group.section}
            </p>
            {group.items.map(item => {
              const active = isActive(item.href);
              const Icon   = item.icon;
              return (
                <Link key={item.href} href={item.href} className={`sb-item ${active ? "active" : "idle"}`}>
                  <span style={{
                    width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                    background: active ? "rgba(255,255,255,0.14)" : "#fff",
                    boxShadow: active ? "none" : "0 1px 3px rgba(0,0,0,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={13} strokeWidth={1.5} color={active ? "#fff" : "#6A6A6E"} />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{ padding: "0.9rem 1rem 1.1rem", borderTop: "1px solid #ECECEE", flexShrink: 0 }}>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            width: "100%",
            padding: "0.55rem 0.75rem",
            fontSize: "12px",
            color: "#8A8A8E",
            background: "#fff",
            border: "none",
            borderRadius: "999px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
            cursor: "pointer",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#993434")}
          onMouseLeave={e => (e.currentTarget.style.color = "#8A8A8E")}
        >
          <LogOut size={13} strokeWidth={1.5} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
