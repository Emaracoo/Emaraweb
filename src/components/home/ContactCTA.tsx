"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const fb          = FALLBACK[lang];
  const t = {
    eyebrow:  (lang === "ar" ? eyebrowAr  : eyebrowEn)  || fb.eyebrow,
    headline: (lang === "ar" ? headlineAr : headlineEn) || fb.headline,
    cta:      (lang === "ar" ? ctaAr      : ctaEn)      || fb.cta,
  };
  const f           = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs          = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";
  const sectionRef  = useRef<HTMLElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  const ghostRefs   = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const main    = mainTextRef.current;
    const ghosts  = ghostRefs.current.filter(Boolean) as HTMLHeadingElement[];
    if (!section || !main || ghosts.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 80%", end: "center 40%", scrub: 1.4 },
    });

    tl.fromTo(main,
      { y: 56, opacity: 0, filter: "blur(2px)" },
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
  }, []);

  const headlineStyle: React.CSSProperties = {
    fontFamily: fs,
    fontSize: "clamp(2.8rem, 6vw, 5rem)",
    fontWeight: 300,
    lineHeight: 1.12,
    color: "#fff",
    whiteSpace: "pre-wrap",
    position: "absolute",
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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${bgImage || DEFAULT_BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,10,10,0.88) 0%, rgba(68,25,25,0.78) 100%)" }} />

      <div className="relative z-10 text-center px-6 py-24 max-w-3xl mx-auto w-full">
        <p className="mb-6" style={{ fontFamily: f, fontSize: "clamp(1rem, 1.8vw, 1.35rem)", letterSpacing: "0.06em", color: "rgba(255,255,255,0.85)" }}>
          {t.eyebrow}
        </p>

        <div className="relative mx-auto mb-12" style={{ perspective: "1000px", height: "clamp(7rem, 14vw, 12rem)" }}>
          {GHOSTS.map((_, i) => (
            <h2
              key={i}
              ref={(el) => { ghostRefs.current[i] = el; }}
              style={{ ...headlineStyle, pointerEvents: "none", userSelect: "none" }}
              aria-hidden
            >
              {t.headline}
            </h2>
          ))}
          <h2 ref={mainTextRef} style={{ ...headlineStyle, position: "absolute" }}>
            {t.headline}
          </h2>
        </div>

        <Link
          href={`/${lang}/contact`}
          className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-[0.06em] text-white transition-all duration-300"
          style={{ fontFamily: f, border: "1px solid rgba(255,255,255,0.55)", borderRadius: "9999px" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#441919"; e.currentTarget.style.borderColor = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)"; }}
        >
          {t.cta}
          <span style={{ fontSize: "1rem" }}>↗</span>
        </Link>
      </div>
    </section>
  );
}
