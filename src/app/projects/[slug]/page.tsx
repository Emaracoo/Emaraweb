import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextProjectLink from "@/components/NextProjectLink";

const projects = [
  {
    slug: "al-arabiya-studios",
    title: "Al Arabiya News Studios",
    category: "Administrative",
    year: "2011",
    location: "Maspero, Cairo",
    area: "600 m²",
    client: "Al Arabiya News / MBC Group",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description:
      "Interior design, décor, and construction supervision for Al Arabiya News studios and administrative offices spanning 600m² in the historic Maspero broadcasting district of Cairo. The project encompasses broadcast studios, editorial suites, and administrative offices — each space calibrated for both technical function and visual authority.",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    ],
  },
  {
    slug: "mbc-group-office",
    title: "MBC Group Administrative Office",
    category: "Administrative",
    year: "2007",
    location: "El Mohandeseen, Cairo",
    area: "200 m²",
    client: "MBC Group",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    description:
      "Interior design, décor, and construction supervision for MBC Group's administrative office in the elite El Mohandeseen district of Cairo. A premium 200m² workspace designed to reflect the network's international stature while remaining warm and functional for its Cairo team.",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    ],
  },
  {
    slug: "sphinx-cancer-centre",
    title: "Sphinx Comprehensive Cancer Centre",
    category: "Medical",
    year: "2015",
    location: "El Mohandeseen, Cairo",
    area: "700 m²",
    client: "Sphinx Medical Group",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
    description:
      "Interior design and construction supervision for the Sphinx Comprehensive Cancer Centre — a 700m² medical environment designed with exceptional care for the psychological and functional wellbeing of patients and staff. Calm finishes, clear wayfinding, and spaces that balance clinical precision with human warmth.",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?w=800&q=80",
    ],
  },
  {
    slug: "villa-mina-garden-city",
    title: "Villa TN, Mina Garden City",
    category: "Residential",
    year: "2022",
    location: "Mina Garden City, Cairo",
    area: "180 m² × 3 floors on 660 m² land",
    client: "Private Client",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    description:
      "Full construction, interior design, and supervision of a private residential villa in Mina Garden City. Built across three floors on a 660m² plot, the project draws on four decades of villa expertise — blending contemporary form with the detailed craftsmanship that has defined Emara's residential work since its founding.",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    ],
  },
  {
    slug: "villa-al-badrashin",
    title: "Villa WM, Al-Badrashin",
    category: "Residential",
    year: "2001",
    location: "Al-Badrashin, Giza",
    area: "250 m² × 4 floors",
    client: "Private Client",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    description:
      "Full construction, interior and exterior design, general site design including landscaping and an indoor swimming pool. A landmark private residence in Al-Badrashin demonstrating Emara's integrated approach — from structural engineering through to softscape, hardscape, and pool design — delivered as a single cohesive vision.",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    ],
  },
  {
    slug: "manar-tex-factory",
    title: "Manar Tex Factory",
    category: "Industrial",
    year: "1989",
    location: "10th of Ramadan City",
    area: "11,000 m²",
    client: "Manar Tex / Al Ashraf Company",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description:
      "Construction of the Manar Tex factory across an 11,000m² site — one of Emara's earliest landmark projects, establishing the firm's capability in large-scale industrial construction. Completed alongside a mosque on the same site, the project set the foundational standard for the technical rigour and site discipline maintained for over four decades.",
    galleryImages: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1565610222536-ef125173c1b8?w=800&q=80",
    ],
  },
];

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();

  const project = projects[idx];
  const nextProject = projects[(idx + 1) % projects.length];

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
              padding: "2.5rem 3rem",
            }}
            className="max-w-7xl mx-auto"
          >
            <div style={{ maxWidth: "72rem", marginLeft: "auto", marginRight: "auto", padding: "0 1.5rem 2.5rem" }}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}
                >
                  {project.category}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>·</span>
                <span
                  className="text-xs tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.6)" }}
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
                        style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-base"
                        style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--em-text)" }}
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
        <section style={{ background: "#1A1916", paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.4)" }}
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
                  style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.4)" }}
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
