"use client";

import { useEffect, useRef, useState } from "react";

const tabs = [
  {
    id: "history",
    label: "Our History",
    content:
      "Founded in 2006, Emara began as a small practice in Dubai with a singular conviction: that architecture should serve both the individual and the city. Over eighteen years, we have grown into a studio of forty designers, engineers, and researchers — united by curiosity and a commitment to craft. Our first project, a modest private residence in Jumeirah, set the tone: meticulous attention to detail, deep respect for context, and an unwavering belief that good design improves lives.",
  },
  {
    id: "mission",
    label: "Our Mission",
    content:
      "Our mission is to create architecture that is both deeply considered and enduringly beautiful. We believe the best buildings emerge from genuine dialogue — between client and architect, between structure and landscape, between the present and the future. Every project is an opportunity to redefine what a space can be, and we approach each one with the same rigour and passion regardless of scale or budget.",
  },
  {
    id: "vision",
    label: "Our Vision",
    content:
      "We envision a built environment that is equitable, sustainable, and deeply human. As the Gulf region undergoes rapid transformation, we see architecture as a powerful instrument for shaping culture and identity. Our vision is to lead practices that are not only design-excellent but also socially and environmentally responsible — buildings that give back to their communities and tread lightly on the earth.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("history");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="about" className="bg-[#0D0D0D] py-28 lg:py-36" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — image */}
          <div
            className="relative transition-all duration-1000"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-40px)" }}
          >
            <div className="aspect-[3/4] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=900&q=80"
                alt="Emara Architecture Studio"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gold accent frame */}
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border border-[#B89155]/30 pointer-events-none" />
            {/* Year badge */}
            <div
              className="absolute top-8 -right-6 bg-[#B89155] text-white px-6 py-4 text-center"
            >
              <div
                className="text-3xl font-light"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                18+
              </div>
              <div
                className="text-xs tracking-[0.15em] uppercase mt-1"
                style={{ fontFamily: "var(--font-saira)" }}
              >
                Years
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div
            className="transition-all duration-1000 delay-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(40px)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-[#B89155]" />
              <span
                className="text-[#B89155] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-saira)" }}
              >
                About Emara
              </span>
            </div>

            <h2
              className="text-white text-5xl lg:text-6xl font-light leading-tight mb-12"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Making Architecture<br />
              <em>with Intention</em>
            </h2>

            {/* Tab buttons */}
            <div className="flex gap-0 border-b border-white/10 mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="pb-4 mr-8 text-xs tracking-[0.15em] uppercase relative transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-saira)",
                    color: activeTab === tab.id ? "#B89155" : "#8A8A8A",
                  }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-[#B89155]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div
              key={activeTab}
              className="fade-up"
            >
              <p
                className="text-white/60 text-base leading-relaxed mb-10"
                style={{ fontFamily: "var(--font-saira)", fontWeight: 300 }}
              >
                {current.content}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-[#B89155] text-[#B89155] hover:bg-[#B89155] hover:text-white transition-all duration-300 px-10 py-4 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-saira)" }}
            >
              Work With Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
