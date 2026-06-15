"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section style={{ background: "#E85830" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 text-white/70" style={{ fontFamily: "var(--font-inter)" }}>
              Ready to start?
            </p>
            <h2
              className="text-white font-light leading-tight"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Let's build something<br />extraordinary together.
            </h2>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 group"
              style={{ background: "#1A1916", color: "#fff", fontFamily: "var(--font-inter)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1916")}
            >
              Start a Project
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 border"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", fontFamily: "var(--font-inter)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
            >
              View Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
