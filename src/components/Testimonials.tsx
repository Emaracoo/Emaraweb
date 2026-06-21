"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Working with Emara was transformative. They didn't just design our headquarters — they understood our culture and translated it into architecture. The result exceeded every expectation.",
    author: "Khalid Al-Mansouri",
    role: "CEO, Al-Mansouri Group",
    location: "Dubai, UAE",
  },
  {
    quote:
      "The Emara team brought an extraordinary level of sensitivity to our project. They listened deeply, challenged our assumptions constructively, and delivered a building that feels both timeless and uniquely ours.",
    author: "Sara Al-Rashid",
    role: "Director, National Arts Foundation",
    location: "Riyadh, KSA",
  },
  {
    quote:
      "From feasibility through to final handover, every stage was handled with professionalism and genuine care. Emara is the only practice we will work with for future development projects.",
    author: "James Whitfield",
    role: "Principal, Whitfield Property Group",
    location: "Abu Dhabi, UAE",
  },
  {
    quote:
      "Their approach to sustainable design is not a checkbox — it is deeply embedded in their thinking. We are proud to have a building that achieves LEED Platinum and genuinely delights the people who use it every day.",
    author: "Dr. Leila Haddad",
    role: "Vice Chancellor, Gulf University",
    location: "Muscat, Oman",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const go = (dir: 1 | -1) => {
    setFading(true);
    setTimeout(() => {
      setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
      setFading(false);
    }, 300);
  };

  const t = testimonials[active];

  return (
    <section className="bg-[#F5F3F0] py-28 lg:py-36" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        {/* Header */}
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-px bg-[#B89155]" />
            <span
              className="text-[#B89155] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-saira)" }}
            >
              Client Stories
            </span>
            <span className="w-12 h-px bg-[#B89155]" />
          </div>
          <h2
            className="text-[#111] text-5xl lg:text-6xl font-light leading-tight mb-20"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            They Love Us
          </h2>
        </div>

        {/* Quote */}
        <div
          className="relative transition-all duration-500"
          style={{
            opacity: visible && !fading ? 1 : 0,
            transform: visible && !fading ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <Quote
            size={48}
            className="mx-auto mb-8 text-[#B89155]/30"
            strokeWidth={1}
          />
          <blockquote
            className="text-[#111] text-2xl lg:text-3xl font-light leading-relaxed mb-10 italic"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            "{t.quote}"
          </blockquote>
          <div
            className="text-[#8A8A8A] text-xs tracking-[0.2em] uppercase mb-1"
            style={{ fontFamily: "var(--font-saira)" }}
          >
            {t.author}
          </div>
          <div
            className="text-[#B89155] text-xs tracking-[0.15em]"
            style={{ fontFamily: "var(--font-saira)" }}
          >
            {t.role} — {t.location}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <button
            onClick={() => go(-1)}
            className="w-12 h-12 border border-[#E5E3E0] hover:border-[#B89155] flex items-center justify-center transition-colors duration-300 text-[#8A8A8A] hover:text-[#B89155]"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setFading(true);
                  setTimeout(() => { setActive(i); setFading(false); }, 300);
                }}
                className="transition-all duration-300"
                aria-label={`Testimonial ${i + 1}`}
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? "24px" : "8px",
                    height: "8px",
                    background: i === active ? "#B89155" : "#E5E3E0",
                  }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-12 h-12 border border-[#E5E3E0] hover:border-[#B89155] flex items-center justify-center transition-colors duration-300 text-[#8A8A8A] hover:text-[#B89155]"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
