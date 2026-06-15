"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 157, suffix: "+", label: "Projects Completed", desc: "Across 12 countries" },
  { value: 86, suffix: "+", label: "Happy Clients", desc: "From private to public sector" },
  { value: 40, suffix: "", label: "Studio Members", desc: "Architects, engineers & researchers" },
  { value: 13, suffix: "", label: "Design Awards", desc: "Regional & international recognition" },
];

function useCounter(target: number, visible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);

  return count;
}

function StatItem({ value, suffix, label, desc, visible, delay }: {
  value: number; suffix: string; label: string; desc: string; visible: boolean; delay: number;
}) {
  const count = useCounter(value, visible);

  return (
    <div
      className="flex flex-col items-center justify-center text-center px-8 py-14 border-b border-white/10 lg:border-b-0 lg:border-r last:border-r-0 last:border-b-0 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="text-[#B89155] text-7xl lg:text-8xl font-light leading-none mb-4"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {count}{suffix}
      </div>
      <div
        className="text-white text-xs tracking-[0.2em] uppercase mb-2"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
      </div>
      <div
        className="text-white/35 text-xs"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
      >
        {desc}
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#111111] py-0" ref={ref}>
      {/* Top accent line */}
      <div
        className="h-px bg-gradient-to-r from-transparent via-[#B89155] to-transparent"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} visible={visible} delay={i * 150} />
          ))}
        </div>
      </div>

      <div
        className="h-px bg-gradient-to-r from-transparent via-[#B89155] to-transparent"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease" }}
      />
    </section>
  );
}
