"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { PROJECTS, CATEGORIES } from "@/data/projects";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Our Portfolio"
          title="Featured"
          titleAccent="Projects"
          subtitle="Four decades of work across residential, administrative, industrial, and commercial typologies throughout Egypt."
        />

        {/* Filter + Grid */}
        <section style={{ background: "var(--em-bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            {/* Category filter tabs — horizontally scrollable on mobile */}
            <div className="flex items-center gap-2 mb-14 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-saira)",
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
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Project grid */}
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p
                  className="text-lg"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--em-muted)" }}
                >
                  No projects found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group block"
                    style={{ textDecoration: "none" }}
                  >
                    {/* Image */}
                    <div style={{ height: "260px", overflow: "hidden", position: "relative" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                        className="group-hover:scale-105"
                      />
                    </div>

                    {/* Card info */}
                    <div style={{ paddingTop: "1rem" }}>
                      <div
                        className="flex items-center gap-3 mb-2"
                        style={{ fontFamily: "var(--font-saira)" }}
                      >
                        <span
                          className="text-xs tracking-[0.2em] uppercase"
                          style={{ color: "#993434" }}
                        >
                          {project.category}
                        </span>
                        <span
                          className="text-xs tracking-[0.15em]"
                          style={{ color: "var(--em-border)" }}
                        >
                          ·
                        </span>
                        <span
                          className="text-xs tracking-[0.15em]"
                          style={{ color: "var(--em-muted)" }}
                        >
                          {project.year}
                        </span>
                      </div>

                      <h3
                        className="mb-1 leading-snug transition-colors duration-300 group-hover:text-[#993434]"
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontWeight: 400,
                          fontSize: "1.35rem",
                          color: "var(--em-text)",
                        }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-xs tracking-[0.1em]"
                        style={{ fontFamily: "var(--font-saira)", color: "var(--em-muted)" }}
                      >
                        {project.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
