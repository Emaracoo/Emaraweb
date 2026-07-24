import Link from "next/link";
import { prisma } from "@/lib/prisma";

const LABELS = {
  en: {
    eyebrow: "Our Portfolio", heading: "Project\nhighlights.", cta: "View all projects →",
    catLabels: { Residential: "Residential", Administrative: "Administrative", Industrial: "Industrial", Commercial: "Commercial" } as Record<string, string>,
  },
  ar: {
    eyebrow: "أعمالنا",        heading: "أبرز\nالمشاريع.",     cta: "عرض جميع المشاريع ←",
    catLabels: { Residential: "سكني", Administrative: "إداري", Industrial: "صناعي", Commercial: "تجاري" } as Record<string, string>,
  },
};

interface Props { lang: "en" | "ar" }

export default async function FeaturedProjects({ lang }: Props) {
  const FEATURED = await prisma.project.findMany({
    where:   { featured: true, status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 3,
  });
  if (FEATURED.length === 0) return null;

  const lbl = LABELS[lang];
  const f   = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs  = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";

  return (
    <section style={{ background: "var(--em-bg)", padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 8vw, 5rem)" }}>
      <div className="mx-auto" style={{ maxWidth: "80rem" }}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6" style={{ marginBottom: "3rem" }}>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ fontFamily: f, color: "#993434" }}>
              {lbl.eyebrow}
            </p>
            <h2 className="font-light leading-[1.15]" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)", whiteSpace: "pre-line" }}>
              {lbl.heading}
            </h2>
          </div>
          <Link
            href={`/${lang}/projects`}
            className="text-xs tracking-[0.2em] uppercase shrink-0"
            style={{ fontFamily: f, color: "#993434", borderBottom: "1px solid #993434", paddingBottom: "2px", alignSelf: "flex-end" }}
          >
            {lbl.cta}
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEATURED.map((raw) => {
            const title    = lang === "ar" && raw.titleAr    ? raw.titleAr    : raw.titleEn;
            const category = lang === "ar" && raw.categoryAr ? raw.categoryAr : raw.categoryEn;
            const location = lang === "ar" && raw.locationAr ? raw.locationAr : (raw.locationEn ?? "");
            return (
              <Link key={raw.slug} href={`/${lang}/projects/${raw.slug}`} className="group block" style={{ textDecoration: "none" }}>
                <div className="overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={raw.coverImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div style={{ paddingTop: "1.25rem" }}>
                  <p className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: f, color: "#993434" }}>
                    {lbl.catLabels[category] ?? category}
                  </p>
                  <p className="font-light" style={{ fontFamily: fs, fontSize: "1.25rem", color: "var(--em-text)", marginTop: "0.4rem" }}>
                    {title}
                  </p>
                  <div className="flex justify-between" style={{ marginTop: "0.5rem" }}>
                    <span style={{ fontFamily: f, fontWeight: 300, fontSize: "0.75rem", color: "var(--em-muted)" }}>{location}</span>
                    <span style={{ fontFamily: f, fontWeight: 300, fontSize: "0.75rem", color: "var(--em-muted)" }}>{raw.year}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center" style={{ marginTop: "3rem" }}>
          <Link href={`/${lang}/projects`} className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: f, color: "#993434", borderBottom: "1px solid #993434", paddingBottom: "2px" }}>
            {lbl.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
