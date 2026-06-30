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
      width: "220px",
      flexShrink: 0,
      height: "100vh",
      background: "#111111",
      borderRight: "1px solid #1E1E1E",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>

      {/* Logo */}
      <div style={{ padding: "1.25rem 1.25rem 1rem", borderBottom: "1px solid #1E1E1E", flexShrink: 0 }}>
        <Link href="/admin/dashboard">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Emara Admin"
            style={{ height: "52px", width: "auto", filter: "brightness(0) invert(1)", display: "block" }}
          />
        </Link>
        <p style={{
          marginTop: "0.4rem",
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#3A3A3A",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}>Admin</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0", scrollbarWidth: "none" }}>
        {NAV.map(group => (
          <div key={group.section} style={{ marginBottom: "0.25rem" }}>
            <p style={{
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#3A3A3A",
              padding: "0.5rem 1.25rem 0.3rem",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}>
              {group.section}
            </p>
            {group.items.map(item => {
              const active = isActive(item.href);
              const Icon   = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    padding: "0.5rem 1.25rem",
                    fontSize: "12.5px",
                    fontWeight: active ? 500 : 400,
                    color: active ? "#F0ECE8" : "#5A5A5A",
                    background: active ? "rgba(153,52,52,0.12)" : "transparent",
                    borderLeft: active ? "2px solid #993434" : "2px solid transparent",
                    textDecoration: "none",
                    transition: "all 0.15s",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.color = "#D0CCC8";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.color = "#5A5A5A";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{ padding: "0.75rem", borderTop: "1px solid #1E1E1E", flexShrink: 0 }}>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            width: "100%",
            padding: "0.5rem 0.5rem",
            fontSize: "12px",
            color: "#4A4A4A",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#993434")}
          onMouseLeave={e => (e.currentTarget.style.color = "#4A4A4A")}
        >
          <LogOut size={13} strokeWidth={1.5} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
