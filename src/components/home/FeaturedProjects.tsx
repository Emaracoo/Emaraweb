import Link from "next/link";
import { getFeaturedProjects } from "@/data/projects";

const FEATURED = getFeaturedProjects();

export default function FeaturedProjects() {
  return (
    <section
      style={{
        background: "var(--em-bg)",
        padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 8vw, 5rem)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "80rem" }}>
        {/* Section header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          style={{ marginBottom: "3rem" }}
        >
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-saira)", color: "#993434" }}
            >
              Featured Work
            </p>
            <h2
              className="font-light leading-[1.15]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "var(--em-text)",
                whiteSpace: "pre-line",
              }}
            >
              {"Selected\nprojects."}
            </h2>
          </div>

          <Link
            href="/projects"
            className="text-xs tracking-[0.2em] uppercase shrink-0"
            style={{
              fontFamily: "var(--font-saira)",
              color: "#993434",
              borderBottom: "1px solid #993434",
              paddingBottom: "2px",
              alignSelf: "flex-end",
            }}
          >
            View all projects →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEATURED.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block"
              style={{ textDecoration: "none" }}
            >
              {/* Image */}
              <div
                className="overflow-hidden"
                style={{ aspectRatio: "4 / 3" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Meta */}
              <div style={{ paddingTop: "1.25rem" }}>
                <p
                  className="text-xs tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-saira)", color: "#993434" }}
                >
                  {project.category}
                </p>

                <p
                  className="font-light"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.25rem",
                    color: "var(--em-text)",
                    marginTop: "0.4rem",
                  }}
                >
                  {project.title}
                </p>

                <div
                  className="flex justify-between"
                  style={{ marginTop: "0.5rem" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-saira)",
                      fontWeight: 300,
                      fontSize: "0.75rem",
                      color: "var(--em-muted)",
                    }}
                  >
                    {project.location}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-saira)",
                      fontWeight: 300,
                      fontSize: "0.75rem",
                      color: "var(--em-muted)",
                    }}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center" style={{ marginTop: "3rem" }}>
          <Link
            href="/projects"
            className="text-xs tracking-[0.2em] uppercase"
            style={{
              fontFamily: "var(--font-saira)",
              color: "#993434",
              borderBottom: "1px solid #993434",
              paddingBottom: "2px",
            }}
          >
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
