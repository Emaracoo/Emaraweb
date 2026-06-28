import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextProjectLink from "@/components/NextProjectLink";
import { PROJECTS, getProjectLocale } from "@/data/projects";
import { hasLocale } from "../../dictionaries";

const LABELS = {
  en: {
    client: "Client", location: "Location", area: "Area", year: "Year",
    category: "Category", status: "Status", completed: "Completed",
    next: "Next Project", viewProject: "View Project",
    catLabels: { Residential: "Residential", Administrative: "Administrative", Industrial: "Industrial", Commercial: "Commercial" } as Record<string, string>,
  },
  ar: {
    client: "العميل", location: "الموقع", area: "المساحة", year: "السنة",
    category: "التصنيف", status: "الحالة", completed: "مكتمل",
    next: "المشروع التالي", viewProject: "عرض المشروع",
    catLabels: { Residential: "سكني", Administrative: "إداري", Industrial: "صناعي", Commercial: "تجاري" } as Record<string, string>,
  },
};

export function generateStaticParams() {
  const locales = ["en", "ar"];
  return PROJECTS.flatMap((p) => locales.map((lang) => ({ lang, slug: p.slug })));
}

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const l   = lang as "en" | "ar";
  const lbl = LABELS[l];
  const f   = l === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs  = l === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();

  const project     = getProjectLocale(PROJECTS[idx], l);
  const nextProject = getProjectLocale(PROJECTS[(idx + 1) % PROJECTS.length], l);

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
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,25,22,0.85) 0%, rgba(26,25,22,0.3) 50%, rgba(26,25,22,0.15) 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <div style={{ maxWidth: "72rem", marginLeft: "auto", marginRight: "auto", padding: "0 1.5rem 2.5rem" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: f, color: "#993434" }}>
                  {lbl.catLabels[project.category] ?? project.category}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>·</span>
                <span className="text-xs tracking-[0.15em]" style={{ fontFamily: f, color: "rgba(255,255,255,0.6)" }}>
                  {project.location}
                </span>
              </div>
              <h1 className="font-light leading-[1.05] text-white" style={{ fontFamily: fs, fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
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
                <p className="leading-relaxed" style={{ fontFamily: fs, fontSize: "clamp(1.2rem, 2vw, 1.55rem)", fontWeight: 300, color: "var(--em-text)", lineHeight: 1.65 }}>
                  {project.description}
                </p>
              </div>

              {/* Right: facts panel */}
              <div style={{ borderInlineStart: "1px solid var(--em-border)", paddingInlineStart: "3rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  {[
                    { label: lbl.client,   value: project.client   },
                    { label: lbl.location, value: project.location },
                    { label: lbl.area,     value: project.area     },
                    { label: lbl.year,     value: project.year     },
                    { label: lbl.category, value: lbl.catLabels[project.category] ?? project.category },
                    { label: lbl.status,   value: lbl.completed    },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ fontFamily: f, color: "#993434" }}>
                        {label}
                      </p>
                      <p className="text-base" style={{ fontFamily: f, fontWeight: 300, color: "var(--em-text)" }}>
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
                <div key={i} className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${project.title} — view ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next project */}
        <section style={{ background: "#441919", paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: f, color: "rgba(255,255,255,0.4)" }}>
                  {lbl.next}
                </p>
                <p className="font-light text-white leading-tight" style={{ fontFamily: fs, fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                  {nextProject.title}
                </p>
                <p className="text-xs tracking-[0.15em] mt-2" style={{ fontFamily: f, color: "rgba(255,255,255,0.4)" }}>
                  {nextProject.location}
                </p>
              </div>
              <NextProjectLink href={`/${l}/projects/${nextProject.slug}`} label={lbl.viewProject} lang={l} />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
