"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("Invalid email or password.");
        setLoading(false);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Check server logs.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display:   "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0D0D0D",
      padding: "1.5rem",
    }}>

      {/* Background texture */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle at 60% 30%, rgba(153,52,52,0.04) 0%, transparent 60%)",
      }} />

      <div style={{ width: "100%", maxWidth: "380px", position: "relative" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Emara Co."
            style={{ height: "72px", width: "auto", filter: "brightness(0) invert(1)", display: "inline-block" }}
          />
          <p style={{
            marginTop: "0.75rem",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}>
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#161616",
          border: "1px solid #2A2A2A",
          padding: "2rem",
        }}>
          <h1 style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#F0ECE8",
            marginBottom: "1.5rem",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}>
            Sign in
          </h1>

          {error && (
            <div style={{
              background: "rgba(153,52,52,0.12)",
              border: "1px solid rgba(153,52,52,0.35)",
              color: "#CC6666",
              fontSize: "12px",
              padding: "0.65rem 0.85rem",
              marginBottom: "1.25rem",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#993434")}
                onBlur={e  => (e.currentTarget.style.borderColor = "#2A2A2A")}
              />
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={{ ...inputStyle, paddingRight: "2.75rem" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#993434")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "#2A2A2A")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#5A5A5A", padding: 0,
                    display: "flex", alignItems: "center",
                  }}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: loading ? "#6B2A2A" : "#993434",
                color: "#fff",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#7A2828"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#993434"; }}
            >
              {loading && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: "center",
          marginTop: "1.5rem",
          fontSize: "11px",
          color: "rgba(255,255,255,0.15)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}>
          Emara Co. · Internal use only
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.05em",
  color: "#6B6B6B",
  marginBottom: "0.4rem",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  textTransform: "uppercase",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.75rem",
  background: "#0D0D0D",
  border: "1px solid #2A2A2A",
  color: "#F0ECE8",
  fontSize: "13px",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};
