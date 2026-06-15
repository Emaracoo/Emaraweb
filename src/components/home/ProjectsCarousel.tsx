"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const projects = [
  {
    slug: "meridian-residences",
    title: "The Meridian Residences",
    category: "Residential",
    year: "2024",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80",
  },
  {
    slug: "wadi-cultural-centre",
    title: "Wadi Cultural Centre",
    category: "Cultural",
    year: "2023",
    location: "Riyadh, KSA",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80",
  },
  {
    slug: "skyline-commerce-tower",
    title: "Skyline Commerce Tower",
    category: "Commercial",
    year: "2023",
    location: "Abu Dhabi, UAE",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
  },
  {
    slug: "salam-villa-estate",
    title: "Salam Villa Estate",
    category: "Residential",
    year: "2022",
    location: "Muscat, Oman",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
  },
  {
    slug: "al-noor-urban-plaza",
    title: "Al Noor Urban Plaza",
    category: "Urban",
    year: "2022",
    location: "Sharjah, UAE",
    image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=900&q=80",
  },
  {
    slug: "the-archive-library",
    title: "The Archive Library",
    category: "Cultural",
    year: "2021",
    location: "Cairo, Egypt",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80",
  },
];

export default function ProjectsCarousel() {
  const ref        = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [offset,  setOffset]  = useState(0);
  const CARD_W = 420;
  const GAP    = 24;
  const STEP   = CARD_W + GAP;
  const maxOffset = (projects.length - 2) * STEP;

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  const prev = () => setOffset((o) => Math.max(0, o - STEP));
  const next = () => setOffset((o) => Math.min(maxOffset, o + STEP));

  return (
    <section className="py-32 lg:py-44 overflow-hidden" style={{ background: "#1A1916" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className="flex items-end justify-between mb-12 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px" style={{ background: "#E85830" }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}>
                Selected Work
              </span>
            </div>
            <h2
              className="text-white font-light leading-[1.08]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 4vw, 3.75rem)" }}
            >
              Featured<br /><em style={{ color: "#E85830" }}>Projects</em>
            </h2>
          </div>

          {/* Arrow controls */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={prev}
              disabled={!canPrev}
              className="w-12 h-12 border flex items-center justify-center transition-all duration-300"
              style={{
                borderColor: canPrev ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                color: canPrev ? "#fff" : "rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => canPrev && (e.currentTarget.style.borderColor = "#E85830", e.currentTarget.style.color = "#E85830")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = canPrev ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)", e.currentTarget.style.color = canPrev ? "#fff" : "rgba(255,255,255,0.2)")}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              className="w-12 h-12 border flex items-center justify-center transition-all duration-300"
              style={{
                borderColor: canNext ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                color: canNext ? "#fff" : "rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => canNext && (e.currentTarget.style.borderColor = "#E85830", e.currentTarget.style.color = "#E85830")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = canNext ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)", e.currentTarget.style.color = canNext ? "#fff" : "rgba(255,255,255,0.2)")}
            >
              <ArrowRight size={16} />
            </button>
            <Link
              href="/projects"
              className="ml-4 text-xs tracking-[0.2em] uppercase border-b pb-0.5 transition-colors duration-300"
              style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#E85830"; e.currentTarget.style.borderColor = "#E85830"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
            >
              All Projects
            </Link>
          </div>
        </div>

        {/* Track */}
        <div className="overflow-visible">
          <div
            ref={trackRef}
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ gap: `${GAP}px`, transform: `translateX(-${offset}px)` }}
          >
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group shrink-0 block overflow-hidden"
                style={{
                  width: `${CARD_W}px`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
                }}
              >
                {/* Image */}
                <div className="overflow-hidden" style={{ height: "300px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="pt-5 pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs tracking-[0.15em] uppercase"
                      style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}
                    >
                      {p.category}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.65rem" }}>·</span>
                    <span className="text-xs" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.35)" }}>
                      {p.location}
                    </span>
                  </div>
                  <h3
                    className="font-light group-hover:text-[#E85830] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "#fff" }}
                  >
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile link */}
        <div className="flex justify-center mt-10 lg:hidden">
          <Link href="/projects" className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase border-b pb-1" style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}>
            All Projects <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
