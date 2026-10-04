"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { localizeDigits, projectCategoryLabel } from "@/lib/labels";

type Project = {
  slug: string;
  titleEn: string;
  titleAr: string | null;
  categoryEn: string;
  categoryAr: string | null;
  locationEn: string | null;
  locationAr: string | null;
  year: string;
  coverImage: string;
};

interface Props {
  projects: Project[];
  lang: "en" | "ar";
  initialCategory?: string;
}

export default function ProjectsGrid({ projects, lang, initialCategory }: Props) {
  const categories = new Set(projects.map(p => p.categoryEn));
  const [activeCategory, setActiveCategory] = useState(
    initialCategory && categories.has(initialCategory) ? initialCategory : "All"
  );

  useEffect(() => {
    if (initialCategory && categories.has(initialCategory)) setActiveCategory(initialCategory);
  }, [initialCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const f   = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs  = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";
  const t   = lang === "ar"
    ? { all: "الكل", viewProject: "عرض المشروع ←" }
    : { all: "All",  viewProject: "View project →" };
  const catLabel  = (cat: string) => cat === "All" ? t.all : projectCategoryLabel(cat, lang, projects);

  const uniqueCategories = Array.from(new Set(projects.map(p => p.categoryEn)));
  const allCategories = ["All", ...uniqueCategories];

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter(p => p.categoryEn === activeCategory);

  return (
    <section style={{ background: "var(--em-bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex items-center gap-2 mb-14 overflow-x-auto pb-2">
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0"
                style={{
                  fontFamily: f,
                  background: isActive ? "#993434" : "transparent",
                  color: isActive ? "#FFFFFF" : "var(--em-muted)",
                  border: isActive ? "1px solid #993434" : "1px solid var(--em-border)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#993434";
                    (e.currentTarget as HTMLButtonElement).style.color = "#993434";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--em-border)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--em-muted)";
                  }
                }}
              >
                {catLabel(cat)}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((p) => {
            const title    = lang === "ar" && p.titleAr    ? p.titleAr    : p.titleEn;
            const location = lang === "ar" && p.locationAr ? p.locationAr : (p.locationEn ?? "");
            const category = catLabel(p.categoryEn);

            return (
              <Link key={p.slug} href={`/${lang}/projects/${p.slug}`} className="group block">
                <div className="overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.coverImage}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 65%)" }}
                  >
                    <span className="text-white text-xs tracking-[0.2em] uppercase" style={{ fontFamily: f }}>
                      {t.viewProject}
                    </span>
                  </div>
                </div>
                <div style={{ paddingTop: "1.25rem" }}>
                  <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ fontFamily: f, color: "#993434" }}>
                    {category}
                  </p>
                  <p className="font-light" style={{ fontFamily: fs, fontSize: "1.25rem", color: "var(--em-text)", marginTop: "0.3rem" }}>
                    {title}
                  </p>
                  <div className="flex justify-between items-center" style={{ marginTop: "0.5rem" }}>
                    <span style={{ fontFamily: f, fontWeight: 300, fontSize: "0.75rem", color: "var(--em-muted)" }}>
                      {location}
                    </span>
                    <span style={{ fontFamily: f, fontWeight: 300, fontSize: "0.75rem", color: "var(--em-muted)" }}>
                      {localizeDigits(p.year, lang)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
