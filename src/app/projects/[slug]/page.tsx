import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextProjectLink from "@/components/NextProjectLink";
import { PROJECTS } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();

  const project = PROJECTS[idx];
  const nextProject = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      <Header />
      <main>

        {/* Full-width hero image */}
        <section style={{ position: "relative", height: "70vh", minHeight: "520px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(26,25,22,0.85) 0%, rgba(26,25,22,0.3) 50%, rgba(26,25,22,0.15) 100%)",
            }}
          />
          {/* Text overlay — bottom left */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <div style={{ maxWidth: "72rem", marginLeft: "auto", marginRight: "auto", padding: "0 1.5rem 2.5rem" }}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-saira)", color: "#993434" }}
                >
                  {project.category}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>·</span>
                <span
                  className="text-xs tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-saira)", color: "rgba(255,255,255,0.6)" }}
                >
                  {project.location}
                </span>
              </div>
              <h1
                className="font-light leading-[1.05] text-white"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                }}
              >
                {project.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Project details — two columns */}
        <section style={{ background: "var(--em-bg)", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Left: description */}
              <div>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
                    fontWeight: 300,
                    color: "var(--em-text)",
                    lineHeight: 1.65,
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Right: facts panel */}
              <div style={{ borderLeft: "1px solid var(--em-border)", paddingLeft: "3rem" }} className="border-l-0 lg:border-l pl-0 lg:pl-12">
                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  {[
                    { label: "Client", value: project.client },
                    { label: "Location", value: project.location },
                    { label: "Area", value: project.area },
                    { label: "Year", value: project.year },
                    { label: "Category", value: project.category },
                    { label: "Status", value: "Completed" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p
                        className="text-xs tracking-[0.25em] uppercase mb-1"
                        style={{ fontFamily: "var(--font-saira)", color: "#993434" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-base"
                        style={{ fontFamily: "var(--font-saira)", fontWeight: 300, color: "var(--em-text)" }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image gallery */}
        <section style={{ background: "var(--em-surface)", paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.galleryImages.map((src, i) => (
                <div key={i} style={{ height: "280px", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.title} — view ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next project — intentionally always dark */}
        <section style={{ background: "#441919", paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-saira)", color: "rgba(255,255,255,0.4)" }}
                >
                  Next Project
                </p>
                <p
                  className="font-light text-white leading-tight"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  }}
                >
                  {nextProject.title}
                </p>
                <p
                  className="text-xs tracking-[0.15em] mt-2"
                  style={{ fontFamily: "var(--font-saira)", color: "rgba(255,255,255,0.4)" }}
                >
                  {nextProject.location}
                </p>
              </div>
              <NextProjectLink
                href={`/projects/${nextProject.slug}`}
                label="View Project"
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
