"use client";

import { useEffect, useRef, useState } from "react";
import { PenLine, Building2, TreePine, Layers, Ruler, FileSearch, Lightbulb, Globe, Hammer } from "lucide-react";

const services = [
  {
    icon: FileSearch,
    title: "Feasibility Studies",
    desc: "In-depth site analysis and project viability assessment to guide confident investment decisions.",
  },
  {
    icon: Lightbulb,
    title: "Conceptual Design",
    desc: "Creative exploration of spatial possibilities — translating brief into bold architectural narrative.",
  },
  {
    icon: PenLine,
    title: "Architectural Design",
    desc: "Full-service design from schematic concept through to detailed construction documentation.",
  },
  {
    icon: Ruler,
    title: "Interior Architecture",
    desc: "Seamless integration of interior space, materials, and light — designed from the inside out.",
  },
  {
    icon: Building2,
    title: "Urban Planning",
    desc: "Master planning and urban design strategies that shape resilient, liveable communities.",
  },
  {
    icon: TreePine,
    title: "Landscape Design",
    desc: "Landscape architecture that extends the built environment into the natural world.",
  },
  {
    icon: Layers,
    title: "Renovation & Adaptive Reuse",
    desc: "Breathing new life into existing structures while honouring their architectural heritage.",
  },
  {
    icon: Globe,
    title: "Sustainability Consulting",
    desc: "Environmental performance strategies integrated at every stage of the design process.",
  },
  {
    icon: Hammer,
    title: "Project Management",
    desc: "End-to-end coordination ensuring your project is delivered on time, on budget, and on vision.",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="bg-white py-28 lg:py-36" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
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
              What We Do
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-20 items-end mb-14">
            <h2
              className="text-[#111] text-5xl lg:text-6xl font-light leading-[1.1]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              A Full Spectrum<br />
              <em>of Expertise</em>
            </h2>
            <p
              className="text-[#8A8A8A] text-sm leading-relaxed lg:pb-2"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              From the first sketch to the final handover, we offer a complete range of architectural and design services tailored to every scale and ambition.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E3E0]">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-white p-10 group hover:bg-[#0D0D0D] transition-all duration-500 cursor-default"
                style={{
                  transitionDelay: visible ? `${i * 60}ms` : "0ms",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease, background 0.5s ease",
                }}
              >
                <div className="mb-6">
                  <Icon
                    size={28}
                    className="text-[#B89155] group-hover:text-[#D4AD7A] transition-colors duration-300"
                    strokeWidth={1}
                  />
                </div>
                <h3
                  className="text-[#111] group-hover:text-white text-xl font-light mb-3 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-[#8A8A8A] group-hover:text-white/50 text-sm leading-relaxed transition-colors duration-300"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {s.desc}
                </p>
                <div className="mt-8 w-0 group-hover:w-8 h-px bg-[#B89155] transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
