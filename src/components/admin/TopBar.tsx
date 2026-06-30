import Link from "next/link";
import { ExternalLink } from "lucide-react";

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
      height: "52px",
      background: "#161616",
      borderBottom: "1px solid #1E1E1E",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 1.5rem",
      flexShrink: 0,
    }}>

      {/* Left: view site link */}
      <Link
        href="/en"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "11px",
          color: "#4A4A4A",
          textDecoration: "none",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          transition: "color 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#993434")}
        onMouseLeave={e => (e.currentTarget.style.color = "#4A4A4A")}
      >
        <ExternalLink size={12} strokeWidth={1.5} />
        View site
      </Link>

      {/* Right: user info */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ textAlign: "right" }}>
          <p style={{
            fontSize: "12px",
            fontWeight: 500,
            color: "#D0CCC8",
            lineHeight: 1.3,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}>
            {userName ?? "Admin"}
          </p>
          <p style={{
            fontSize: "10px",
            color: "#4A4A4A",
            lineHeight: 1.3,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}>
            {userEmail ?? ""}
          </p>
        </div>
        <div style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: "rgba(153,52,52,0.2)",
          border: "1px solid rgba(153,52,52,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: 600,
          color: "#993434",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          flexShrink: 0,
        }}>
          {initials}
        </div>
      </div>
    </header>
  );
}
