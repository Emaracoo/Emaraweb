"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", "Residential", "Commercial", "Cultural", "Urban"];

const projects = [
  {
    title: "The Meridian Residences",
    category: "Residential",
    year: "2024",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    tall: true,
  },
  {
    title: "Wadi Cultural Centre",
    category: "Cultural",
    year: "2023",
    location: "Riyadh, KSA",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    tall: false,
  },
  {
    title: "Skyline Commerce Tower",
    category: "Commercial",
    year: "2023",
    location: "Abu Dhabi, UAE",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    tall: false,
  },
  {
    title: "Salam Villa Estate",
    category: "Residential",
    year: "2022",
    location: "Muscat, Oman",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    tall: true,
  },
  {
    title: "Al Noor Urban Plaza",
    category: "Urban",
    year: "2022",
    location: "Sharjah, UAE",
    image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80",
    tall: false,
  },
  {
    title: "The Archive Library",
    category: "Cultural",
    year: "2021",
    location: "Cairo, Egypt",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    tall: false,
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="bg-[#F5F3F0] py-28 lg:py-36" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-[#B89155]" />
            <span
              className="text-[#B89155] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-saira)" }}
            >
              Our Work
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-20 items-end mb-12">
            <h2
              className="text-[#111] text-5xl lg:text-6xl font-light leading-[1.1]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Featured<br />
              <em>Projects</em>
            </h2>
            <p
              className="text-[#8A8A8A] text-sm leading-relaxed lg:pb-2"
              style={{ fontFamily: "var(--font-saira)", fontWeight: 300 }}
            >
              A selection of recent work across residential, commercial, and cultural typologies spanning the Gulf region and beyond.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 mb-16 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-saira)",
                  background: activeFilter === cat ? "#111" : "transparent",
                  color: activeFilter === cat ? "#fff" : "#8A8A8A",
                  border: "1px solid",
                  borderColor: activeFilter === cat ? "#111" : "#E5E3E0",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className="break-inside-avoid relative overflow-hidden group cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div
                className="overflow-hidden"
                style={{ height: project.tall ? "480px" : "320px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500"
                style={{
                  background: hovered === i
                    ? "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.4) 60%, transparent 100%)"
                    : "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 60%)",
                }}
              >
                <div
                  className="transition-all duration-500"
                  style={{
                    transform: hovered === i ? "translateY(0)" : "translateY(8px)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[#B89155] text-xs tracking-[0.2em] uppercase"
                      style={{ fontFamily: "var(--font-saira)" }}
                    >
                      {project.category} · {project.year}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-white transition-all duration-300"
                      style={{ opacity: hovered === i ? 1 : 0 }}
                    />
                  </div>
                  <h3
                    className="text-white text-xl font-light"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-white/50 text-xs mt-1 transition-all duration-500"
                    style={{
                      fontFamily: "var(--font-saira)",
                      opacity: hovered === i ? 1 : 0,
                      maxHeight: hovered === i ? "20px" : "0",
                    }}
                  >
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="flex justify-center mt-16">
          <button
            className="border border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-all duration-300 px-14 py-4 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-saira)" }}
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
