"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, PenLine, Building2, Layers } from "lucide-react";

const featured = [
  {
    icon: PenLine,
    title: "Architectural Design",
    desc: "Full-service design from first concept to construction documentation — every detail resolved with care.",
    href: "/services",
  },
  {
    icon: Building2,
    title: "Urban Planning",
    desc: "Master planning and urban design strategies that create resilient, liveable communities.",
    href: "/services",
  },
  {
    icon: Layers,
    title: "Interior Architecture",
    desc: "Spaces designed from the inside out — where material, light, and function converge.",
    href: "/services",
  },
];

export default function ServicesTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section className="py-32 lg:py-44" style={{ background: "var(--em-bg)" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header row */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px" style={{ background: "#E85830" }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}>
                What We Do
              </span>
            </div>
            <h2
              className="font-light leading-[1.08]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 4vw, 3.75rem)", color: "var(--em-text)" }}
            >
              A Full Spectrum<br /><em>of Expertise</em>
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden lg:flex items-center gap-2 text-xs tracking-[0.2em] uppercase pb-1 border-b transition-all duration-300 group"
            style={{ fontFamily: "var(--font-inter)", color: "#1A1916", borderColor: "#1A1916" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#E85830";
              e.currentTarget.style.borderColor = "#E85830";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#1A1916";
              e.currentTarget.style.borderColor = "#1A1916";
            }}
          >
            All Services <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: "var(--em-border)" }}>
          {featured.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                className="group p-10 flex flex-col gap-6"
                style={{
                  background: "var(--em-card)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.55s ease ${i * 100}ms, transform 0.55s ease ${i * 100}ms, background 0.35s ease`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--em-card-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--em-card)"; }}
              >
                <Icon
                  size={28}
                  strokeWidth={1.25}
                  className="transition-colors duration-300"
                  style={{ color: "#E85830" }}
                />
                <div>
                  <h3
                    className="text-xl font-light mb-3 group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--em-text)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed group-hover:text-white/50 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--em-muted)" }}
                  >
                    {s.desc}
                  </p>
                </div>
                <div className="mt-auto">
                  <span
                    className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase pb-px border-b transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)", color: "#E85830", borderColor: "rgba(232,88,48,0.3)" }}
                  >
                    Learn more <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile link */}
        <div className="flex justify-center mt-10 lg:hidden">
          <Link href="/services" className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase border-b pb-1" style={{ color: "#1A1916", borderColor: "#1A1916", fontFamily: "var(--font-inter)" }}>
            All Services <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
