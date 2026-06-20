"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = ["Let's build something", "extraordinary together."];

// Ghost layers: opacity, blur, y-offset (starting state before scroll resolves them)
const GHOSTS = [
  { opacity: 0.18, blur: 4,  y: 48,  scaleX: 1.018 },
  { opacity: 0.10, blur: 8,  y: 90,  scaleX: 1.032 },
  { opacity: 0.05, blur: 14, y: 140, scaleX: 1.05  },
];

export default function ContactCTA() {
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  const ghostRefs   = useRef<(HTMLHeadingElement | null)[]>([]);

  /* ── Parallax background ──────────────────────────────────────────── */
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      el.style.transform = `translateY(${progress * 120 - 60}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Scroll-scrubbed ghost text animation ─────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    const main    = mainTextRef.current;
    const ghosts  = ghostRefs.current.filter(Boolean) as HTMLHeadingElement[];
    if (!section || !main || ghosts.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "center 40%",
        scrub: 1.4,        // silky lag — higher = more inertia
      },
    });

    // Main text: slides up from below, fades in
    tl.fromTo(
      main,
      { y: 56, opacity: 0, filter: "blur(2px)", letterSpacing: "0.06em" },
      { y: 0,  opacity: 1, filter: "blur(0px)", letterSpacing: "normal", ease: "power3.out" },
      0
    );

    // Ghost layers: each starts further behind, resolves to invisible
    // They stagger in start position so they peel away as scroll advances
    ghosts.forEach((ghost, i) => {
      const g = GHOSTS[i];
      tl.fromTo(
        ghost,
        {
          y:       g.y,
          opacity: g.opacity,
          filter:  `blur(${g.blur}px)`,
          scaleX:  g.scaleX,
        },
        {
          y:       0,
          opacity: 0,
          filter:  "blur(0px)",
          scaleX:  1,
          ease:    "power2.out",
        },
        // Each ghost starts animating a bit before the previous one clears
        i * 0.08
      );
    });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  const headlineStyle: React.CSSProperties = {
    fontFamily: "var(--font-cormorant)",
    fontSize: "clamp(2.8rem, 6vw, 5rem)",
    fontWeight: 300,
    lineHeight: 1.12,
    color: "#fff",
    whiteSpace: "pre-wrap" as const,
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
    transformOrigin: "center bottom",
    willChange: "transform, opacity, filter",
    margin: 0,
    padding: 0,
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "520px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          top: "-80px",
          bottom: "-80px",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(26,10,10,0.78) 0%, rgba(68,25,25,0.65) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-24 max-w-3xl mx-auto w-full">
        <p
          className="text-xs tracking-[0.35em] uppercase mb-6"
          style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.55)" }}
        >
          Have a project in mind?
        </p>

        {/* Ghost text stack */}
        <div
          className="relative mx-auto mb-12"
          style={{
            perspective: "1000px",
            // height is set to match the headline so ghosts don't shift layout
            height: "clamp(7rem, 14vw, 12rem)",
          }}
        >
          {/* Ghost copies (rendered behind, in reverse order) */}
          {GHOSTS.map((_, i) => (
            <h2
              key={i}
              ref={(el) => { ghostRefs.current[i] = el; }}
              style={{ ...headlineStyle, pointerEvents: "none", userSelect: "none" }}
              aria-hidden
            >
              {HEADLINE.join("\n")}
            </h2>
          ))}

          {/* Main (real) text on top */}
          <h2
            ref={mainTextRef}
            style={{ ...headlineStyle, position: "absolute" }}
          >
            {HEADLINE.join("\n")}
          </h2>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-[0.2em] uppercase text-white transition-all duration-300"
          style={{
            fontFamily: "var(--font-inter)",
            border: "1px solid rgba(255,255,255,0.55)",
            borderRadius: "9999px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#441919";
            e.currentTarget.style.borderColor = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
          }}
        >
          Let's Talk
          <span style={{ fontSize: "1rem" }}>↗</span>
        </Link>
      </div>
    </section>
  );
}
