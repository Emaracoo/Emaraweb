import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextProjectLink from "@/components/NextProjectLink";

const projects = [
  {
    slug: "meridian-residences",
    title: "The Meridian Residences",
    category: "Residential",
    year: "2024",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    description:
      "The Meridian Residences redefines luxury living on the Dubai waterfront through a language of layered terraces and sun-filtered loggias. Each apartment is conceived as a private villa in the sky, blurring the boundary between interior comfort and panoramic landscape. The project is a meditation on light, shadow, and the rhythm of coastal living.",
    client: "Meridian Developments LLC",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?w=800&q=80",
    ],
  },
  {
    slug: "wadi-cultural-centre",
    title: "Wadi Cultural Centre",
    category: "Cultural",
    year: "2023",
    location: "Riyadh, KSA",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    description:
      "The Wadi Cultural Centre draws inspiration from the ancient wadis of the Arabian Peninsula — carved geological formations that have shaped both landscape and culture for millennia. Its terraced facade shelters a sequence of galleries, performance halls, and civic gardens. A canopy of perforated bronze panels filters the desert light into ever-shifting interior patterns.",
    client: "Kingdom Cultural Authority",
    galleryImages: [
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    ],
  },
  {
    slug: "skyline-commerce-tower",
    title: "Skyline Commerce Tower",
    category: "Commercial",
    year: "2023",
    location: "Abu Dhabi, UAE",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    description:
      "Skyline Commerce Tower establishes a bold new presence on Abu Dhabi's expanding business district through a twisting form that optimises solar shading while maximising views to the Gulf. The podium engages the street with retail arcades and a landscaped forecourt, grounding the tower in its urban context. Interior office floors are column-free, offering tenants maximum spatial flexibility.",
    client: "Capital Skyline Real Estate",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    ],
  },
  {
    slug: "salam-villa-estate",
    title: "Salam Villa Estate",
    category: "Residential",
    year: "2022",
    location: "Muscat, Oman",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    description:
      "Salam Villa Estate is a collection of twelve private residences nestled against Muscat's rugged Hajar mountains. The architecture responds directly to the terrain — each villa cascades down the hillside in a series of interlocking platforms, framing curated views of the sea below. Traditional Omani craftsmanship in carved plaster and hand-laid stone grounds the contemporary spatial language in regional heritage.",
    client: "Private Client",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    ],
  },
  {
    slug: "al-noor-urban-plaza",
    title: "Al Noor Urban Plaza",
    category: "Urban",
    year: "2022",
    location: "Sharjah, UAE",
    image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80",
    description:
      "Al Noor Urban Plaza transforms a former industrial site in central Sharjah into a vibrant civic space for culture, commerce, and community. The masterplan arranges a series of pavilions, market halls, and water features around a central open lawn, creating a sequence of varied urban rooms. Shade trees and misters ensure the space remains active throughout the intense summer months.",
    client: "Sharjah Urban Development",
    galleryImages: [
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    ],
  },
  {
    slug: "the-archive-library",
    title: "The Archive Library",
    category: "Cultural",
    year: "2021",
    location: "Cairo, Egypt",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    description:
      "The Archive Library preserves and displays Egypt's extraordinary literary heritage within a new civic institution on the banks of the Nile. The building's monumental reading room rises through seven storeys of stacked stacks and mezzanines, flooded with diffused northern light through a vast translucent roof. Public galleries, a rare books vault, and a rooftop terrace complete the programme.",
    client: "Ministry of Culture, Egypt",
    galleryImages: [
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=80",
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
