"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    headline: "Architecture\nThat Endures",
    sub: "We design spaces where light, material, and structure converge into something timeless.",
  },
  {
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
    headline: "Building Your\nVision",
    sub: "From concept to completion — every project is a dialogue between client and craft.",
  },
  {
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=1600&q=80",
    headline: "Transforming\nIdeas into Form",
    sub: "Award-winning design across residential, commercial, and cultural typologies.",
  },
];

const stats = [
  { value: "157", label: "Projects Completed" },
  { value: "86", label: "Happy Clients" },
  { value: "18", label: "Years of Practice" },
  { value: "13", label: "Awards Won" },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (idx: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 400);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % slides.length;
        setFading(true);
        setTimeout(() => setFading(false), 400);
        return next;
      });
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scrollDown = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex flex-col">
      {/* Background image */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slides[active].image}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-[#B89155]/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-12 pt-20">
        <div
          className="transition-all duration-700"
          style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(12px)" : "translateY(0)" }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-px bg-[#B89155]" />
            <span
              className="text-[#B89155] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-saira)" }}
            >
              Architecture Studio
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-white text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-light leading-[1.05] mb-8 whitespace-pre-line"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {slides[active].headline}
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/60 text-base lg:text-lg max-w-lg leading-relaxed mb-12"
            style={{ fontFamily: "var(--font-saira)", fontWeight: 300 }}
          >
            {slides[active].sub}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[#B89155] text-white hover:bg-[#D4AD7A] transition-colors px-10 py-4 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-saira)" }}
            >
              View Our Work
            </button>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-white/40 text-white/80 hover:border-[#B89155] hover:text-[#B89155] transition-all px-10 py-4 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-saira)" }}
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="relative z-10 flex items-center gap-2 px-6 lg:px-12 pb-8 max-w-7xl mx-auto w-full">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
            aria-label={`Slide ${i + 1}`}
          >
            <span
              className="block h-px transition-all duration-300"
              style={{
                width: i === active ? "40px" : "20px",
                background: i === active ? "#B89155" : "rgba(255,255,255,0.4)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Stats bar — inspired by Prague creative-banner */}
      <div
        className="relative z-10 border-t border-white/10"
        style={{ background: "rgba(8,8,8,0.85)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="py-6 px-8">
                <div
                  className="text-[#B89155] text-3xl lg:text-4xl font-light mb-1"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {s.value}
                  <span className="text-2xl">+</span>
                </div>
                <div
                  className="text-white/50 text-xs tracking-[0.15em] uppercase"
                  style={{ fontFamily: "var(--font-saira)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-44 right-8 lg:right-12 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-[#B89155] transition-colors group"
        aria-label="Scroll down"
      >
        <span
          className="text-xs tracking-[0.2em] uppercase rotate-90 origin-center"
          style={{ fontFamily: "var(--font-saira)", writingMode: "vertical-lr" }}
        >
          Scroll
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
}
