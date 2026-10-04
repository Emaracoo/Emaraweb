"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/LangProvider";

gsap.registerPlugin(ScrollTrigger);

const GHOSTS = [
  { opacity: 0.18, blur: 4,  y: 48,  scaleX: 1.018 },
  { opacity: 0.10, blur: 8,  y: 90,  scaleX: 1.032 },
  { opacity: 0.05, blur: 14, y: 140, scaleX: 1.05  },
];

const FALLBACK = {
  en: {
    eyebrow: "Have a project in mind?",
    headline: "Let's build something\nextraordinary together.",
    cta: "Let's Talk",
  },
  ar: {
    eyebrow: "لديك مشروع في ذهنك؟",
    headline: "لنبنِ معاً\nشيئاً استثنائياً.",
    cta: "تواصل معنا",
  },
};

interface Props {
  eyebrowEn?: string | null;
  eyebrowAr?: string | null;
  headlineEn?: string | null;
  headlineAr?: string | null;
  ctaEn?: string | null;
  ctaAr?: string | null;
  bgImage?: string | null;
}

const DEFAULT_BG = "/projects/villa-tn/02.jpg";

export default function ContactCTA({ eyebrowEn, eyebrowAr, headlineEn, headlineAr, ctaEn, ctaAr, bgImage }: Props) {
  const lang        = useLang();
  const isAr        = lang === "ar";
  const fb          = FALLBACK[lang];
  const t = {
    eyebrow:  (isAr ? eyebrowAr  : eyebrowEn)  || fb.eyebrow,
    headline: (isAr ? headlineAr : headlineEn) || fb.headline,
    cta:      (isAr ? ctaAr      : ctaEn)      || fb.cta,
  };
  const f           = isAr ? "var(--font-cairo)" : "var(--font-saira)";
  const fs          = isAr ? "var(--font-cairo)" : "var(--font-cormorant)";
  // Blurred "ghost" copies read as smudges on Arabic script, so Arabic gets a plain fade
  const ghostCount  = isAr ? 0 : GHOSTS.length;
  const Arrow       = isAr ? ArrowUpLeft : ArrowUpRight;
  const sectionRef  = useRef<HTMLElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  const ghostRefs   = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const main    = mainTextRef.current;
    if (!section || !main) return;
    const ghosts  = ghostRefs.current.slice(0, ghostCount).filter(Boolean) as HTMLHeadingElement[];

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 85%", end: "top 35%", scrub: 1.2 },
    });

    tl.fromTo(main,
      { y: 40, opacity: 0, filter: "blur(2px)" },
      { y: 0,  opacity: 1, filter: "blur(0px)", ease: "power3.out" },
      0
    );

    ghosts.forEach((ghost, i) => {
      const g = GHOSTS[i];
      tl.fromTo(ghost,
        { y: g.y, opacity: g.opacity, filter: `blur(${g.blur}px)`, scaleX: g.scaleX },
        { y: 0,   opacity: 0,         filter: "blur(0px)",          scaleX: 1, ease: "power2.out" },
        i * 0.08
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [ghostCount]);

  const headlineStyle: React.CSSProperties = {
    fontFamily: fs,
    fontSize: isAr ? "clamp(2rem, 5vw, 4rem)" : "clamp(2.2rem, 6vw, 5rem)",
    fontWeight: 300,
    lineHeight: isAr ? 1.45 : 1.12,
    color: "#fff",
    whiteSpace: "pre-line",
    overflowWrap: "break-word",
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
      {/* Pinned background on desktop only — iOS/Android don't support background-attachment: fixed
          and render it as a blurry, over-zoomed crop */}
      <div
        className="absolute inset-0 bg-cover bg-center lg:bg-fixed"
        style={{ backgroundImage: `url('${bgImage || DEFAULT_BG}')` }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,10,10,0.86) 0%, rgba(68,25,25,0.74) 100%)" }} />

      <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto w-full">
        <p className="mb-6" style={{ fontFamily: f, fontSize: "clamp(1rem, 1.8vw, 1.35rem)", letterSpacing: "0.06em", color: "rgba(255,255,255,0.85)" }}>
          {t.eyebrow}
        </p>

        {/* The real headline sits in normal flow so any length of text pushes the button down;
            the ghost copies are laid over it purely for the scroll effect */}
        <div className="relative mx-auto mb-12" style={{ perspective: "1000px" }}>
          {GHOSTS.slice(0, ghostCount).map((_, i) => (
            <h2
              key={i}
              ref={(el) => { ghostRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{ ...headlineStyle, pointerEvents: "none", userSelect: "none" }}
              aria-hidden
            >
              {t.headline}
            </h2>
          ))}
          <h2 ref={mainTextRef} className="relative" style={headlineStyle}>
            {t.headline}
          </h2>
        </div>

        <Link
          href={`/${lang}/contact`}
          className="relative z-10 inline-flex items-center gap-3 px-10 py-4 text-sm tracking-[0.06em] transition-all duration-300"
          style={{ fontFamily: f, borderRadius: "9999px", background: "#fff", color: "#441919", border: "1px solid #fff" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#993434"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#993434"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#441919"; e.currentTarget.style.borderColor = "#fff"; }}
        >
          {t.cta}
          <Arrow size={16} strokeWidth={1.5} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
