"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We listen deeply. Understanding your vision, constraints, and context before a single line is drawn.",
  },
  {
    num: "02",
    title: "Concept",
    desc: "Bold ideas take form. We explore spatial possibilities and establish the architectural narrative.",
  },
  {
    num: "03",
    title: "Development",
    desc: "Detail by detail, the design is refined. Every material, section, and system resolved with precision.",
  },
  {
    num: "04",
    title: "Delivery",
    desc: "On site, on budget, on vision. We oversee every stage of construction through to final handover.",
  },
];

export default function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section className="py-32 lg:py-44" style={{ background: "var(--em-surface)" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className="flex items-center gap-4 mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <span className="w-10 h-px" style={{ background: "#E85830" }} />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}
          >
            How We Work
          </span>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative p-8 lg:p-12 border-t-2 group"
              style={{
                borderTopColor: "var(--em-border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
              }}
            >
              {/* Hover top border becomes orange */}
              <div
                className="absolute top-0 left-0 h-0.5 transition-all duration-500 group-hover:w-full"
                style={{ background: "#E85830", width: 0 }}
              />

              {/* Number */}
              <div
                className="font-light mb-8 leading-none select-none"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "6rem", color: "var(--em-border)" }}
              >
                {step.num}
              </div>

              {/* Title */}
              <h3
                className="text-lg font-light mb-3 group-hover:text-[#E85830] transition-colors duration-300"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", color: "var(--em-text)" }}
              >
                {step.title}
              </h3>

              {/* Desc */}
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--em-muted)" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
