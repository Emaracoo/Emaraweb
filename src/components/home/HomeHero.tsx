"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    tag: "Residential · Mina Garden City, Cairo",
    title: "Designing Spaces,\nCreating Experiences",
    project: "Villa TN, Mina Garden City",
    location: "Mina Garden City, Cairo",
    href: "/projects/villa-mina-garden-city",
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    tag: "Administrative · Maspero, Cairo",
    title: "Building Vision,\nCrafting Reality",
    project: "Al Arabiya News Studios",
    location: "Maspero, Cairo",
    href: "/projects/al-arabiya-studios",
  },
  {
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    tag: "Industrial · 10th of Ramadan City",
    title: "Architecture\nThat Endures",
    project: "Manar Tex Factory",
    location: "10th of Ramadan City",
    href: "/projects/manar-tex-factory",
  },
];

const STATS = [
  { target: 157, suffix: "+", label: "Projects" },
  { target: 86,  suffix: "+", label: "Clients"  },
  { target: 18,  suffix: "+", label: "Years"    },
  { target: 13,  suffix: "",  label: "Awards"   },
];

export default function HomeHero() {
  const [active,  setActive]  = useState(0);
  const [fading,  setFading]  = useState(false);
  const [counts,  setCounts]  = useState(STATS.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);

  const go = (i: number) => {
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 500);
  };

  /* Auto-advance slides */
  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setActive((p) => (p + 1) % slides.length); setFading(false); }, 500);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  /* Count-up animation when stats strip enters view */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      ob.disconnect();
      const duration = 1800;
      const start = performance.now();
      const frame = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setCounts(STATS.map(({ target }) => Math.round(ease * target)));
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }, { threshold: 0.3 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  const slide = slides[active];

  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{ height: "100svh", minHeight: "640px", background: "#1A1916" }}
    >
      {/* Background image — keyed by active so Ken Burns restarts per slide */}
      <div
        key={active}
        className="absolute inset-0 overflow-hidden"
        style={{
          opacity: fading ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.image}
          alt=""
          className="ken-burns w-full h-full object-cover"
          style={{ opacity: 0.75 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,25,22,0.92) 30%, rgba(26,25,22,0.35) 75%, rgba(26,25,22,0.15) 100%)" }} />
        <div className="absolute inset-x-0 top-0 h-40" style={{ background: "linear-gradient(to bottom, rgba(26,25,22,0.6) 0%, transparent 100%)" }} />
      </div>

      {/* Left edge: vertical slide counter */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
        <span className="text-xs text-white/30 mb-1" style={{ fontFamily: "var(--font-inter)", writingMode: "vertical-rl", letterSpacing: "0.2em" }}>
          0{active + 1}
        </span>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="block transition-all duration-400"
            style={{
              width: "1px",
              height: i === active ? "36px" : "12px",
              background: i === active ? "#E85830" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
        <span className="text-xs text-white/20 mt-1" style={{ fontFamily: "var(--font-inter)", writingMode: "vertical-rl", letterSpacing: "0.2em" }}>
          0{slides.length}
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full">
          <div
            className="transition-all duration-500"
            style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(12px)" : "translateY(0)" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px" style={{ background: "#E85830" }} />
              <span className="text-xs tracking-[0.35em] uppercase" style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}>
                {slide.tag}
              </span>
            </div>

            <h1
              className="text-white font-light whitespace-pre-line mb-14"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(3.5rem, 7vw, 7.5rem)",
                lineHeight: 1.02,
                maxWidth: "640px",
              }}
            >
              {slide.title}
            </h1>

            <div className="flex items-center gap-6 lg:gap-10 flex-wrap">
              <Link
                href="/projects"
                className="text-xs tracking-[0.25em] uppercase pb-px border-b transition-all duration-300"
                style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.35)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#E85830"; e.currentTarget.style.borderColor = "#E85830"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
              >
                View Our Work
              </Link>
              <Link
                href="/about"
                className="text-xs tracking-[0.25em] uppercase pb-px border-b transition-all duration-300"
                style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.35)", borderColor: "rgba(255,255,255,0.12)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                About Emara
              </Link>
            </div>
          </div>
        </div>

        {/* Floating project card — Archy style */}
        <div
          className="absolute bottom-10 right-8 lg:right-16 max-w-[260px] hidden lg:block transition-all duration-500"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <div className="p-5" style={{ background: "rgba(13,12,10,0.75)", backdropFilter: "blur(10px)", borderLeft: "2px solid #E85830" }}>
            <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}>
              Current Project
            </p>
            <p className="font-light mb-0.5" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", color: "#fff" }}>
              {slide.project}
            </p>
            <p className="text-xs mb-4" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.35)" }}>
              {slide.location}
            </p>
            <Link
              href={slide.href}
              className="text-xs tracking-[0.2em] uppercase pb-px border-b transition-all duration-300 w-fit inline-flex items-center gap-2"
              style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.15)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#E85830"; e.currentTarget.style.borderColor = "#E85830"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              Details →
            </Link>
          </div>
        </div>
      </div>

      {/* Count-up stats strip */}
      <div
        ref={statsRef}
        className="relative z-10 border-t shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(13,12,10,0.88)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="py-4 px-4 lg:px-8 flex items-center gap-3">
                <span className="font-light tabular-nums" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.9rem", color: "#E85830" }}>
                  {counts[i]}{s.suffix}
                </span>
                <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.35)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
