"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeQuote() {
  return (
    <section className="py-32 lg:py-44" style={{ background: "var(--em-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-center">

          {/* Quote */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-px" style={{ background: "#993434" }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-saira)", color: "#993434" }}>
                Client Stories
              </span>
            </div>
            <blockquote
              className="font-light leading-relaxed mb-8 italic"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: "var(--em-text)" }}
            >
              "Working with Emara was transformative. They didn't just design our headquarters — they understood our culture and translated it into architecture."
            </blockquote>
            <div>
              <div className="text-sm font-medium mb-0.5" style={{ fontFamily: "var(--font-saira)", color: "var(--em-text)" }}>
                Khalid Al-Mansouri
              </div>
              <div className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-saira)", color: "#993434" }}>
                CEO, Al-Mansouri Group · Dubai
              </div>
            </div>
          </div>

          {/* Image + CTA */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden" style={{ height: "320px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                alt="Client"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <Link
              href="/about"
              className="flex items-center justify-between px-6 py-4 group"
              style={{ background: "var(--em-surface)", borderLeft: "3px solid #993434" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--em-surface-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--em-surface)")}
            >
              <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-saira)", color: "var(--em-text)" }}>
                Read our story
              </span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" style={{ color: "#993434" }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
