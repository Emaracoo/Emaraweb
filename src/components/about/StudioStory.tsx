"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

interface Stat { value: string; label: string }

interface Props {
  f: string; fs: string;
  eyebrow: string; heading: string; body1: string; body2: string;
  stats: Stat[];
  image: string;
}

export default function StudioStory({ f, fs, eyebrow, heading, body1, body2, stats, image }: Props) {
  const { ref, visible } = useFadeIn();

  return (
    <section id="story" className="py-24" style={{ background: "var(--em-bg)", scrollMarginTop: "6rem" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="overflow-hidden" style={{ aspectRatio: "3/4", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-32px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(32px)", transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s" }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-px" style={{ background: "#993434" }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{eyebrow}</span>
            </div>
            <h2 className="font-light leading-[1.1] mb-8" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)" }}>
              {heading}
            </h2>
            <p className="leading-relaxed mb-5" style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "var(--em-muted)" }}>{body1}</p>
            <p className="leading-relaxed mb-12" style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "var(--em-muted)" }}>{body2}</p>
            <div className="grid grid-cols-3 gap-0 border-t" style={{ borderColor: "var(--em-border)" }}>
              {stats.map((stat, i) => (
                <div key={stat.label} className="pt-8 pr-6" style={{ borderRight: i < stats.length - 1 ? "1px solid var(--em-border)" : "none", paddingLeft: i > 0 ? "1.5rem" : 0 }}>
                  <div className="font-light leading-none mb-1" style={{ fontFamily: fs, fontSize: "2.5rem", color: "#993434" }}>{stat.value}</div>
                  <div className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: f, color: "var(--em-muted)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
