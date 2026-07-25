"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangProvider";

export interface HeroSlide { image: string; mobileImage?: string | null; titleEn: string; titleAr: string | null }
export interface HeroStat { value: number; suffix: string; labelEn: string; labelAr: string }

/* Fallbacks used only if the database has no slides/stats configured yet */
const SLIDE_IMAGES = [
  "/projects/villa-tn/01.jpg",
  "/projects/al-arabiya-studios/01.jpg",
  "/projects/manar-tex-factory/01.jpg",
  "/projects/villa-hm/01.jpg",
  "/projects/abu-simbel-factory/01.jpg",
];

const TITLES_EN = [
  "Designing Spaces,\nCreating Experiences",
  "Building Vision,\nCrafting Reality",
  "Architecture\nThat Endures",
  "Detail by Detail,\nDecade after Decade",
  "Engineering with\nan Artist's Eye",
];

const TITLES_AR = [
  "تصميم المساحات،\nصناعة التجارب",
  "بناء الرؤية،\nصياغة الواقع",
  "هندسة\nتدوم للأجيال",
  "تفصيلة بتفصيلة،\nعقداً بعد عقد",
  "هندسة\nبعين فنان",
];

const FALLBACK_SLIDES: HeroSlide[] = SLIDE_IMAGES.map((image, i) => ({ image, titleEn: TITLES_EN[i], titleAr: TITLES_AR[i] }));

const FALLBACK_STATS: HeroStat[] = [
  { value: 40,     suffix: "", labelEn: "Years of Experience", labelAr: "عاماً من الخبرة" },
  { value: 237,    suffix: "", labelEn: "Clients",             labelAr: "عميل"            },
  { value: 423,    suffix: "", labelEn: "Projects",            labelAr: "مشروع"           },
  { value: 397587, suffix: "", labelEn: "Sq Feet",             labelAr: "قدم مربع"        },
];

interface Props {
  slides?: HeroSlide[];
  stats?: HeroStat[];
  eyebrowEn?: string | null;
  eyebrowAr?: string | null;
  cta1LabelEn?: string | null;
  cta1LabelAr?: string | null;
  cta1Href?: string | null;
  cta2LabelEn?: string | null;
  cta2LabelAr?: string | null;
  cta2Href?: string | null;
}

export default function HomeHero({
  slides: slidesProp, stats: statsProp, eyebrowEn, eyebrowAr,
  cta1LabelEn, cta1LabelAr, cta1Href, cta2LabelEn, cta2LabelAr, cta2Href,
}: Props) {
  const lang    = useLang();
  const isAr    = lang === "ar";
  const rawSlides = slidesProp && slidesProp.length > 0 ? slidesProp : FALLBACK_SLIDES;
  const slides  = rawSlides.map(s => ({ image: s.image, mobileImage: s.mobileImage, title: (isAr ? s.titleAr : s.titleEn) || s.titleEn }));
  const rawStats = statsProp && statsProp.length > 0 ? statsProp : FALLBACK_STATS;
  const STATS   = rawStats.map(s => ({ target: s.value, suffix: s.suffix, label: (isAr ? s.labelAr : s.labelEn) || s.labelEn }));
  const eyebrow = (isAr ? eyebrowAr : eyebrowEn) || (isAr ? "عالم من الواقع" : "A World Of Reality");
  const cta1 = { label: (isAr ? cta1LabelAr : cta1LabelEn) || (isAr ? "اكتشف أعمالنا" : "View Our Work"), href: cta1Href || `/${lang}/projects` };
  const cta2 = { label: (isAr ? cta2LabelAr : cta2LabelEn) || (isAr ? "عن إعمار" : "About Emara"), href: cta2Href || `/${lang}/about` };
  const f       = isAr ? "var(--font-cairo)" : "var(--font-saira)";
  const fSerif  = isAr ? "var(--font-cairo)" : "var(--font-cormorant)";

  const [active,  setActive]  = useState(0);
  const [fading,  setFading]  = useState(false);
  const [counts,  setCounts]  = useState(STATS.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const go = (i: number) => {
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 500);
  };

  const advance = () => go((active + 1) % slides.length);
  const goBack  = () => go((active - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setActive((p) => (p + 1) % slides.length); setFading(false); }, 500);
    }, 5500);
    return () => clearInterval(t);
  }, [slides.length]);

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const slide = slides[active];

  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{ height: "100svh", minHeight: "640px", background: "#441919" }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) < 40) return;
        const forward = isAr ? delta < 0 : delta > 0;
        if (forward) advance(); else goBack();
      }}
    >
      <div
        key={active}
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: fading ? 0 : 1, transition: "opacity 0.6s ease" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          {slide.mobileImage && <source media="(max-width: 767px)" srcSet={slide.mobileImage} />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.image} alt="" className="ken-burns w-full h-full object-cover" style={{ opacity: 0.75 }} />
        </picture>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to ${isAr ? "left" : "right"}, rgba(26,25,22,0.92) 30%, rgba(26,25,22,0.35) 75%, rgba(26,25,22,0.15) 100%)` }} />
        <div className="absolute inset-x-0 top-0 h-40" style={{ background: "linear-gradient(to bottom, rgba(26,25,22,0.6) 0%, transparent 100%)" }} />
      </div>

      {/* Slide counter */}
      <div className="absolute top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3" style={isAr ? { right: "1.5rem" } : { left: "1.5rem" }}>
        <span className="text-xs text-white/30 mb-1" style={{ fontFamily: f, writingMode: "vertical-rl", letterSpacing: "0.2em" }}>
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
              background: i === active ? "#993434" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
        <span className="text-xs text-white/20 mt-1" style={{ fontFamily: f, writingMode: "vertical-rl", letterSpacing: "0.2em" }}>
          0{slides.length}
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px" style={{ background: "#993434" }} />
            <span className="text-xs tracking-[0.35em] uppercase" style={{ fontFamily: f, color: "#993434" }}>
              {eyebrow}
            </span>
          </div>

          <div
            className="transition-all duration-500"
            style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(12px)" : "translateY(0)" }}
          >
            <h1
              className="text-white font-light whitespace-pre-line mb-14"
              style={{ fontFamily: fSerif, fontSize: "clamp(3.5rem, 7vw, 7.5rem)", lineHeight: 1.02, maxWidth: "640px" }}
            >
              {slide.title}
            </h1>
          </div>

          <div className="flex items-center gap-6 lg:gap-10 flex-wrap">
            <Link
              href={cta1.href}
              className="text-xs tracking-[0.25em] uppercase pb-px border-b transition-all duration-300"
              style={{ fontFamily: f, color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#993434"; e.currentTarget.style.borderColor = "#993434"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
            >
              {cta1.label}
            </Link>
            <Link
              href={cta2.href}
              className="text-xs tracking-[0.25em] uppercase pb-px border-b transition-all duration-300"
              style={{ fontFamily: f, color: "rgba(255,255,255,0.35)", borderColor: "rgba(255,255,255,0.12)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              {cta2.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide dots — mobile only */}
      {slides.length > 1 && (
        <div className="relative z-10 flex lg:hidden items-center justify-center gap-2 shrink-0" style={{ paddingBottom: "1rem" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === active ? "20px" : "6px",
                height: "6px",
                borderRadius: "9999px",
                background: i === active ? "#993434" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      )}

      {/* Stats strip */}
      <div
        ref={statsRef}
        className="relative z-10 border-t shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(13,12,10,0.88)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="py-4 px-4 lg:px-8 flex items-center gap-3">
                <span className="font-light tabular-nums" style={{ fontFamily: fSerif, fontSize: "1.9rem", color: "#993434" }}>
                  {counts[i].toLocaleString(isAr ? "ar-EG" : "en-US")}{s.suffix}
                </span>
                <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: f, color: "rgba(255,255,255,0.35)" }}>
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
