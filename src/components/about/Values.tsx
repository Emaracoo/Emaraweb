"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

interface ValueItem { num: string; title: string; desc: string }

interface Props { f: string; fs: string; eyebrow: string; values: ValueItem[] }

export default function Values({ f, fs, eyebrow, values }: Props) {
  const { ref, visible } = useFadeIn();

  return (
    <section className="py-24" style={{ background: "var(--em-surface)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="flex items-center gap-3 mb-16" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <span className="w-10 h-px" style={{ background: "#993434" }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{eyebrow}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {values.map((v, i) => (
            <div key={i} className="relative p-10 border-t-2" style={{ borderTopColor: "var(--em-border)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms` }}>
              <div className="font-light leading-none select-none mb-6" style={{ fontFamily: fs, fontSize: "5rem", color: "var(--em-border)" }}>{v.num}</div>
              <h3 className="mb-4 font-light" style={{ fontFamily: fs, fontSize: "1.6rem", color: "var(--em-text)" }}>{v.title}</h3>
              <p className="leading-relaxed text-sm" style={{ fontFamily: f, fontWeight: 300, color: "var(--em-muted)" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
