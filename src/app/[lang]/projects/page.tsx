"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { PROJECTS, CATEGORIES, getProjectLocale } from "@/data/projects";
import { useLang } from "@/components/LangProvider";

const T = {
  en: {
    eyebrow: "Our Portfolio",
    title: "Featured",
    accent: "Projects",
    subtitle: "Four decades of work across residential, administrative, industrial, and commercial typologies throughout Egypt.",
    all: "All",
    viewProject: "View project →",
    catLabels: {
      All: "All",
      Residential: "Residential",
      Administrative: "Administrative",
      Industrial: "Industrial",
      Commercial: "Commercial",
    } as Record<string, string>,
  },
  ar: {
    eyebrow: "أعمالنا",
    title: "أبرز",
    accent: "المشاريع",
    subtitle: "أربعة عقود من العمل في مشاريع سكنية وإدارية وصناعية وتجارية عبر مصر.",
    all: "الكل",
    viewProject: "عرض المشروع ←",
    catLabels: {
      All: "الكل",
      Residential: "سكني",
      Administrative: "إداري",
      Industrial: "صناعي",
      Commercial: "تجاري",
    } as Record<string, string>,
  },
};

export default function ProjectsPage() {
  const lang = useLang();
  const t    = T[lang];
  const f    = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs   = lang === "ar" ? "var(--font-arabic-display)" : "var(--font-cormorant)";

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        <PageHero lang={lang} eyebrow={t.eyebrow} title={t.title} titleAccent={t.accent} subtitle={t.subtitle} />

        <section style={{ background: "var(--em-bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            {/* Filter tabs */}
            <div className="flex items-center gap-2 mb-14 overflow-x-auto pb-2">
              {CATEGORIES.map((cat) => {
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
                    {t.catLabels[cat] ?? cat}
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {filtered.map((raw) => {
                const project = getProjectLocale(raw, lang);
                return (
                  <Link
                    key={raw.slug}
                    href={`/${lang}/projects/${raw.slug}`}
                    className="group block"
                  >
                    <div className="overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
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
                        {t.catLabels[raw.category] ?? raw.category}
                      </p>
                      <p className="font-light" style={{ fontFamily: fs, fontSize: "1.25rem", color: "var(--em-text)", marginTop: "0.3rem" }}>
                        {project.title}
                      </p>
                      <div className="flex justify-between items-center" style={{ marginTop: "0.5rem" }}>
                        <span style={{ fontFamily: f, fontWeight: 300, fontSize: "0.75rem", color: "var(--em-muted)" }}>
                          {project.location}
                        </span>
                        <span style={{ fontFamily: f, fontWeight: 300, fontSize: "0.75rem", color: "var(--em-muted)" }}>
                          {raw.year}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
