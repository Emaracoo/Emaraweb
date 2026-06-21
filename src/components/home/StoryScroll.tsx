"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    num: "01",
    eyebrow: "Founded 1989",
    headline: "Rooted in craft,\ndriven by vision.",
    body: "What began with hand-built architectural models — every detail miniaturised, every material considered — became a four-decade practice spanning industrial structures, villas, palaces, and civic landmarks across Egypt.",
    side: "left",
  },
  {
    num: "02",
    eyebrow: "157 Projects",
    headline: "Scale earned\nproject by project.",
    body: "From an 11,000m² textile factory in 10th of Ramadan City to broadcast studios at the heart of Maspero — each commission has sharpened our command of structure, material, and place.",
    side: "right",
  },
  {
    num: "03",
    eyebrow: "Seven Disciplines",
    headline: "One studio,\nno limits.",
    body: "Structural engineering. Architecture. Interior design. Landscape. Restoration. Supervision. Model making. Every discipline held in-house so nothing is lost in translation between vision and delivery.",
    side: "left",
  },
];

export default function StoryScroll() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const panelRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img     = imgRef.current;
    if (!wrapper || !img) return;

    const ctx = gsap.context(() => {

      // Very subtle image scale over the full wrapper scroll
      gsap.fromTo(img,
        { scale: 1.0 },
        {
          scale: 1.07,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      // Each chapter: staggered reveal of number line, headline, body
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        const line = lineRefs.current[i];
        const num  = panel.querySelector(".ch-num");
        const eye  = panel.querySelector(".ch-eye");
        const head = panel.querySelector(".ch-head");
        const body = panel.querySelector(".ch-body");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });

        if (line) {
          tl.fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
            0
          );
        }
        if (num) {
          tl.fromTo(num,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            0.1
          );
        }
        if (eye) {
          tl.fromTo(eye,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            0.15
          );
        }
        if (head) {
          tl.fromTo(head,
            { opacity: 0, y: 40, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
            0.2
          );
        }
        if (body) {
          tl.fromTo(body,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            0.38
          );
        }
      });

    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>

      {/* ── Sticky background ───────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Image */}
        <div
          ref={imgRef}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            willChange: "transform",
          }}
        />

        {/* Gradient — heavier at bottom so text layers read cleanly */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(20,8,8,0.5) 0%, rgba(20,8,8,0.3) 40%, rgba(20,8,8,0.72) 100%)",
          }}
        />

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-saira)",
              fontSize: "0.6rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            Scroll
          </span>
          <span
            style={{
              display: "block",
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
            }}
          />
        </div>
      </div>

      {/* ── Scrolling content ───────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "-100vh",
        }}
      >
        {/* Spacer — image breathes before first chapter arrives */}
        <div style={{ height: "75vh" }} />

        {CHAPTERS.map((ch, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el; }}
            style={{
              padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)",
              display: "flex",
              justifyContent:
                ch.side === "right"
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <div style={{ maxWidth: "480px", width: "100%" }}>

              {/* Horizontal rule that animates in */}
              <div
                ref={(el) => { lineRefs.current[i] = el; }}
                style={{
                  height: "1px",
                  background: "#993434",
                  transformOrigin: "left center",
                  marginBottom: "1.5rem",
                  width: "48px",
                }}
              />

              {/* Number + eyebrow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "1.4rem",
                }}
              >
                <span
                  className="ch-num"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.1)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {ch.num}
                </span>
                <span
                  className="ch-eye"
                  style={{
                    fontFamily: "var(--font-saira)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "#993434",
                  }}
                >
                  {ch.eyebrow}
                </span>
              </div>

              {/* Headline */}
              <h3
                className="ch-head"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                  fontWeight: 300,
                  lineHeight: 1.08,
                  color: "#ffffff",
                  whiteSpace: "pre-line",
                  marginBottom: "1.4rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {ch.headline}
              </h3>

              {/* Body */}
              <p
                className="ch-body"
                style={{
                  fontFamily: "var(--font-saira)",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.5)",
                  maxWidth: "400px",
                }}
              >
                {ch.body}
              </p>

            </div>
          </div>
        ))}

        {/* Trailing buffer — keeps image sticky through final chapter + transition */}
        <div style={{ height: "30vh" }} />
      </div>
    </div>
  );
}
