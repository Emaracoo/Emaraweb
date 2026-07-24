"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

interface Props { f: string; fs: string; eyebrow: string; heading: string; p1: string; p2: string; p3: string }

export default function BuiltOnExpertise({ f, fs, eyebrow, heading, p1, p2, p3 }: Props) {
  const { ref, visible } = useFadeIn();

  return (
    <section className="py-24" style={{ background: "var(--em-surface)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="max-w-3xl" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px" style={{ background: "#993434" }} />
            <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{eyebrow}</span>
          </div>
          <h2 className="font-light leading-[1.1] mb-8" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)" }}>{heading}</h2>
          <p className="leading-relaxed mb-5" style={{ fontFamily: f, fontWeight: 300, fontSize: "0.95rem", color: "var(--em-muted)" }}>{p1}</p>
          <p className="leading-relaxed mb-5" style={{ fontFamily: f, fontWeight: 300, fontSize: "0.95rem", color: "var(--em-muted)" }}>{p2}</p>
          <p className="leading-relaxed"     style={{ fontFamily: f, fontWeight: 300, fontSize: "0.95rem", color: "var(--em-muted)" }}>{p3}</p>
        </div>
      </div>
    </section>
  );
}
