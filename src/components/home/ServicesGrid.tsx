"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Building2, Layers, PenLine, TreePine, Wrench, HardHat, Box } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service { icon: LucideIcon; title: string; desc: string; badge: string | null }

const SERVICES_EN: Service[] = [
  { icon: Building2, title: "Structural Design",            desc: "Concrete & steel facilities per Egyptian, American, European and British codes.",                           badge: null      },
  { icon: Layers,    title: "Architectural Design",          desc: "Exterior and interior designs for villas, palaces, factories, restaurants, and more.",                     badge: null      },
  { icon: PenLine,   title: "Interior Architecture",         desc: "Planning interiors to meet functional requirements while maximising spatial utilisation.",                 badge: null      },
  { icon: TreePine,  title: "Landscape Design",              desc: "Softscape planting and hardscape — pergolas, pools, walkways, fountains, and lighting.",                   badge: null      },
  { icon: Wrench,    title: "Restoration & Strengthening",   desc: "Repair of structural elements, treatment of cracks and fissures.",                                         badge: null      },
  { icon: HardHat,   title: "Construction Supervision",      desc: "Full review of specs, drawings, schedules, on-site inspection and soil reports.",                          badge: null      },
  { icon: Box,       title: "Model Making",                  desc: "Scaled architectural maquettes — the craft that started Emara in 1989.",                                   badge: "Gallery" },
];

const SERVICES_AR: Service[] = [
  { icon: Building2, title: "التصميم الإنشائي",         desc: "منشآت خرسانية وفولاذية وفق المعايير المصرية والأمريكية والأوروبية والبريطانية.", badge: null    },
  { icon: Layers,    title: "التصميم المعماري",          desc: "تصاميم خارجية وداخلية للفيلات والقصور والمصانع والمطاعم وما سواها.",              badge: null    },
  { icon: PenLine,   title: "العمارة الداخلية",          desc: "تخطيط الفراغات الداخلية لتلبية المتطلبات الوظيفية مع تعظيم الاستفادة المكانية.", badge: null    },
  { icon: TreePine,  title: "تصميم المناظر الطبيعية",   desc: "الزراعة الناعمة والعناصر الصلبة — البيرغولا والمسابح والممشى والنوافير والإضاءة.", badge: null   },
  { icon: Wrench,    title: "الترميم والتقوية",          desc: "إصلاح العناصر الإنشائية ومعالجة الشقوق والصدوع.",                                badge: null    },
  { icon: HardHat,   title: "الإشراف على التنفيذ",      desc: "مراجعة شاملة للمواصفات والرسومات والجداول الزمنية والتفتيش الميداني وتقارير التربة.", badge: null },
  { icon: Box,       title: "صناعة المجسمات",            desc: "نماذج معمارية مصغّرة — الحرفة التي أسست إعمار عام ١٩٨٩.",                        badge: "معرض" },
];

const LABELS = {
  en: { eyebrow: "07 Services", heading: "Every discipline,\nin one studio.", cta: "View all services →" },
  ar: { eyebrow: "٠٧ خدمات",   heading: "كل التخصصات،\nفي استوديو واحد.",  cta: "عرض جميع الخدمات ←" },
};

interface Props { lang: "en" | "ar" }

const STACK_DEPTH  = 3;
const CARD_H       = 380; // px — front card height
const PEEK         = 18;  // px — how much each hidden card peeks below the one above

export default function ServicesGrid({ lang }: Props) {
  const [active,  setActive]  = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [paused,  setPaused]  = useState(false);
  const animating = useRef(false);

  const services = lang === "ar" ? SERVICES_AR : SERVICES_EN;
  const n        = services.length;
  const lbl      = LABELS[lang];
  const f        = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs       = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";

  // Keep a ref to always-current advance so the auto-play interval captures it correctly
  const advanceFn = useRef<() => void>(() => {});

  const goTo = (target: number) => {
    if (animating.current || target === active) return;
    animating.current = true;
    setExiting(active);
    setTimeout(() => {
      setActive(target);
      setExiting(null);
      animating.current = false;
    }, 420);
  };

  const advance = () => goTo((active + 1) % n);
  advanceFn.current = advance;

  // Auto-play: reschedule after every active change
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => advanceFn.current(), 3800);
    return () => clearTimeout(t);
  }, [active, paused]);

  // Container needs room for the peeking layers below the front card
  const containerH = CARD_H + PEEK * (STACK_DEPTH - 1);

  return (
    <section
      style={{ background: "var(--em-surface)", padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 8vw, 5rem)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto" style={{ maxWidth: "80rem" }}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6" style={{ marginBottom: "3.5rem" }}>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ fontFamily: f, color: "#993434" }}>
              {lbl.eyebrow}
            </p>
            <h2 className="font-light leading-[1.15]" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)", whiteSpace: "pre-line" }}>
              {lbl.heading}
            </h2>
          </div>
          <Link
            href={`/${lang}/services`}
            className="text-xs tracking-[0.2em] uppercase shrink-0"
            style={{ fontFamily: f, color: "#993434", borderBottom: "1px solid #993434", paddingBottom: "2px", alignSelf: "flex-end" }}
          >
            {lbl.cta}
          </Link>
        </div>

        {/* Stack + side list */}
        <div className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-start ${lang === "ar" ? "lg:flex-row-reverse" : ""}`}>

          {/* ── Stacked cards ──────────────────────────────────────── */}
          <div
            className="w-full lg:flex-1 cursor-pointer select-none"
            style={{ position: "relative", height: `${containerH}px` }}
            onClick={advance}
          >
            {services.map((service, i) => {
              const isExiting = i === exiting;
              const offset    = (i - active + n) % n;
              const inStack   = offset < STACK_DEPTH;

              // Cards not in the visible stack & not exiting are hidden
              if (!inStack && !isExiting) return null;

              const Icon     = service.icon;
              const isFront  = offset === 0 && !isExiting;

              // Stack positions: front floats up, behind cards peek from below
              let translateY: number;
              let scaleX: number;
              let opacity: number;
              let zIndex: number;

              if (isExiting) {
                // Fly out upward
                translateY = -90;
                scaleX     = 1;
                opacity    = 0;
                zIndex     = 20;
              } else {
                translateY = offset * PEEK;
                scaleX     = 1 - offset * 0.03;
                opacity    = offset === 0 ? 1 : offset === 1 ? 0.78 : 0.52;
                zIndex     = STACK_DEPTH - offset;
              }

              return (
                <div
                  key={service.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left:  `${(1 - scaleX) * 50}%`,
                    right: `${(1 - scaleX) * 50}%`,
                    height: `${CARD_H}px`,
                    zIndex,
                    transform: `translateY(${translateY}px)`,
                    opacity,
                    transition: isExiting
                      ? "transform 0.38s cubic-bezier(0.4,0,1,1), opacity 0.28s ease"
                      : "transform 0.52s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease, left 0.52s ease, right 0.52s ease",
                    background: isFront ? "#441919" : "var(--em-card)",
                    border: "1px solid",
                    borderColor: isFront ? "#682A2A" : "var(--em-border)",
                    padding: "clamp(1.75rem, 3vw, 2.5rem)",
                    display: "flex",
                    flexDirection: "column",
                    pointerEvents: isFront ? "auto" : "none",
                  }}
                >
                  {/* Icon + counter */}
                  <div className="flex items-start justify-between" style={{ marginBottom: "2rem" }}>
                    <Icon size={22} color={isFront ? "#cc6666" : "#993434"} strokeWidth={1.5} />
                    {isFront && (
                      <span className="text-xs tabular-nums" style={{ fontFamily: f, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em" }}>
                        {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-light leading-snug" style={{ fontFamily: fs, fontSize: "clamp(1.5rem, 2.2vw, 2rem)", color: isFront ? "#fff" : "var(--em-text)", marginBottom: "1rem" }}>
                    {service.title}
                    {service.badge && (
                      <span style={{ display: "inline-block", marginInlineStart: "0.6rem", fontSize: "0.55rem", padding: "3px 8px", background: "rgba(153,52,52,0.18)", color: "#993434", letterSpacing: "0.12em", textTransform: "uppercase", verticalAlign: "middle" }}>
                        {service.badge}
                      </span>
                    )}
                  </h3>

                  {/* Description — only front card */}
                  {isFront && (
                    <p style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "rgba(255,255,255,0.52)", lineHeight: 1.78, flex: 1 }}>
                      {service.desc}
                    </p>
                  )}

                  {isFront && (
                    <div className="flex items-center justify-between" style={{ marginTop: "2rem" }}>
                      <Link
                        href={`/${lang}/services`}
                        className="text-xs tracking-[0.2em] uppercase"
                        style={{ fontFamily: f, color: "#cc6666", borderBottom: "1px solid rgba(204,102,102,0.35)", paddingBottom: "2px" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {lang === "ar" ? "اعرف أكثر ←" : "Learn more →"}
                      </Link>
                      <span className="text-xs" style={{ fontFamily: f, color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
                        {lang === "ar" ? "اضغط للتالي" : "tap to advance"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Side navigation list ────────────────────────────────── */}
          <div className="w-full lg:w-60 shrink-0">
            {services.map((service, i) => {
              const isActive = i === active;
              return (
                <button
                  key={service.title}
                  onClick={() => goTo(i)}
                  className="w-full flex items-center gap-4 py-3 text-start transition-colors duration-200"
                  style={{ borderBottom: "1px solid var(--em-border)", background: "none", cursor: "pointer" }}
                >
                  <span className="shrink-0 text-xs tabular-nums" style={{ fontFamily: f, color: isActive ? "#993434" : "var(--em-muted)", letterSpacing: "0.08em", minWidth: "1.8rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm flex-1" style={{ fontFamily: f, fontWeight: isActive ? 500 : 300, color: isActive ? "var(--em-text)" : "var(--em-muted)", lineHeight: 1.4 }}>
                    {service.title}
                  </span>
                  <span className="shrink-0" style={{ width: isActive ? "20px" : "0", height: "1px", background: "#993434", transition: "width 0.3s ease" }} />
                </button>
              );
            })}

            {/* Progress dots */}
            <div className="flex gap-1.5 mt-5">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{ height: "2px", width: i === active ? "24px" : "8px", background: i === active ? "#993434" : "var(--em-border)", transition: "width 0.35s ease, background 0.3s ease", border: "none", cursor: "pointer", padding: 0 }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
