"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ContactCTA() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = (windowH - rect.top) / (windowH + rect.height);
      const offset = progress * 120 - 60; // ±60px parallax travel
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "520px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Parallax background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          top: "-80px",
          bottom: "-80px",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(26,10,10,0.78) 0%, rgba(68,25,25,0.65) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-24 max-w-3xl mx-auto">
        <p
          className="text-xs tracking-[0.35em] uppercase mb-6"
          style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.55)" }}
        >
          Have a project in mind?
        </p>

        <h2
          className="text-white font-light leading-tight mb-4"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
          }}
        >
          Let's build something<br />extraordinary together.
        </h2>

        <p
          className="mb-12"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Do not hesitate to reach out.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-[0.2em] uppercase text-white transition-all duration-300"
          style={{
            fontFamily: "var(--font-inter)",
            border: "1px solid rgba(255,255,255,0.55)",
            borderRadius: "9999px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#441919";
            e.currentTarget.style.borderColor = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
          }}
        >
          Let's Talk
          <span style={{ fontSize: "1rem" }}>↗</span>
        </Link>
      </div>
    </section>
  );
}
