"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy } from "lucide-react";

const milestones = [
  {
    year: "2006",
    title: "Studio Founded",
    desc: "Emara established in Dubai with a first commission — the Al-Barsha private residence. A bold beginning for a small but ambitious team of five.",
    award: null,
  },
  {
    year: "2009",
    title: "First Commercial Project",
    desc: "Completion of the Oasis Business Park in Abu Dhabi marked our entry into commercial architecture, establishing new relationships with regional developers.",
    award: null,
  },
  {
    year: "2012",
    title: "LEAF Award — Best Commercial Building",
    desc: "Our first international recognition for the Al-Noor Tower, acknowledged for its integration of bioclimatic design principles in a high-rise typology.",
    award: "LEAF Award",
  },
  {
    year: "2015",
    title: "WAN Architecture Award",
    desc: "The Wadi Cultural Centre in Riyadh was recognised by the World Architecture News Awards for its contextual sensitivity and material innovation.",
    award: "WAN Award",
  },
  {
    year: "2018",
    title: "RIBA International Award",
    desc: "A landmark achievement — the Meridian Residences received the RIBA International Award, confirming Emara's position among the region's leading practices.",
    award: "RIBA International",
  },
  {
    year: "2021",
    title: "AIA Middle East Award",
    desc: "The Archive Library in Cairo received the AIA Middle East Excellence Award for its innovative approach to adaptive reuse in a historic urban context.",
    award: "AIA Award",
  },
  {
    year: "2024",
    title: "Studio of the Year — Dezeen Awards",
    desc: "Named Architecture Studio of the Year by Dezeen Awards, recognising Emara's contribution to architectural culture across the MENA region.",
    award: "Dezeen Awards",
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-28 lg:py-36" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-[#B89155]" />
            <span
              className="text-[#B89155] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Recognition
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-20 items-end mb-16">
            <h2
              className="text-[#111] text-5xl lg:text-6xl font-light leading-[1.1]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Eighteen Years<br />
              <em>of Achievement</em>
            </h2>
            <p
              className="text-[#8A8A8A] text-sm leading-relaxed lg:pb-2"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              A journey of growth, recognition, and deepening craft — from a five-person startup to one of the MENA region's most awarded studios.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 lg:left-1/2 top-0 w-px transition-all duration-[2000ms] ease-out"
            style={{
              background: "linear-gradient(to bottom, #B89155, rgba(184,145,85,0.1))",
              height: visible ? "100%" : "0%",
              transform: "translateX(-50%)",
            }}
          />

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => {
              const isRight = i % 2 !== 0;
              return (
                <div
                  key={m.year}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pb-16 last:pb-0"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
                  }}
                >
                  {/* Dot on timeline */}
                  <div
                    className="absolute left-0 lg:left-1/2 top-0 w-4 h-4 border-2 border-[#B89155] rounded-full hidden lg:block"
                    style={{
                      background: m.award ? "#B89155" : "#fff",
                      transform: "translate(-50%, 4px)",
                    }}
                  />

                  {/* Content */}
                  {isRight ? (
                    <>
                      <div className="hidden lg:block" />
                      <div className="pl-0 lg:pl-12">
                        <TimelineCard milestone={m} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-right pr-0 lg:pr-12">
                        <TimelineCard milestone={m} align="right" />
                      </div>
                      <div className="hidden lg:block" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ milestone, align = "left" }: {
  milestone: typeof milestones[0]; align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "ml-auto" : ""}>
      <div className="flex items-center gap-3 mb-3" style={{ justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
        <span
          className="text-[#B89155] text-sm font-light"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
        >
          {milestone.year}
        </span>
        {milestone.award && (
          <span className="flex items-center gap-1 bg-[#B89155]/10 text-[#B89155] text-xs px-3 py-1 tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
            <Trophy size={10} />
            {milestone.award}
          </span>
        )}
      </div>
      <h3
        className="text-[#111] text-xl font-light mb-3"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {milestone.title}
      </h3>
      <p
        className="text-[#8A8A8A] text-sm leading-relaxed max-w-sm"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 300,
          marginLeft: align === "right" ? "auto" : undefined,
        }}
      >
        {milestone.desc}
      </p>
    </div>
  );
}
