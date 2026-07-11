"use client";

import Link from "next/link";
import { ExternalLink, Bell } from "lucide-react";

interface Props {
  userName?: string | null;
  userEmail?: string | null;
}

export default function TopBar({ userName, userEmail }: Props) {
  const initials = userName
    ? userName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "A";

  return (
    <header style={{
      height: "72px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2rem",
      flexShrink: 0,
    }}>

      {/* Left: view site pill */}
      <Link
        href="/en"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "11.5px",
          fontWeight: 500,
          color: "#fff",
          background: "#441919",
          borderRadius: "999px",
          padding: "0.55rem 1.1rem",
          textDecoration: "none",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          boxShadow: "0 6px 16px rgba(68,25,25,0.25)",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        <span style={{
          width: "22px", height: "22px", borderRadius: "50%",
          background: "rgba(255,255,255,0.14)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ExternalLink size={11} strokeWidth={1.5} />
        </span>
        View site
      </Link>

      {/* Right: notifications + user pill */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link
          href="/admin/enquiries"
          aria-label="Enquiries"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(68,25,25,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Bell size={14} strokeWidth={1.5} color="#993434" />
        </Link>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.65rem",
          background: "#fff",
          borderRadius: "999px",
          padding: "0.3rem 0.9rem 0.3rem 0.3rem",
          boxShadow: "0 2px 8px rgba(68,25,25,0.10)",
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#993434",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 600,
            color: "#fff",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#3A3A3A",
              lineHeight: 1.3,
              margin: 0,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}>
              {userName ?? "Admin"}
            </p>
            <p style={{
              fontSize: "10px",
              color: "#9A9A9E",
              lineHeight: 1.3,
              margin: 0,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}>
              {userEmail ?? ""}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
