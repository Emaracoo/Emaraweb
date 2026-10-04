import { prisma } from "@/lib/prisma";

const FALLBACK_LABEL = {
  en: "Trusted By",
  ar: "يثق بنا",
};

interface Props { lang: "en" | "ar" }

export default async function PartnersStrip({ lang }: Props) {
  const [partners, section] = await Promise.all([
    prisma.partner.findMany({
      where:   { status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.homepageSection.findUnique({ where: { key: "partners" } }),
  ]);
  if (partners.length === 0) return null;

  const label = (lang === "ar" ? section?.titleAr : section?.titleEn) || FALLBACK_LABEL[lang];
  const LOGOS = partners.map(p => ({ name: lang === "ar" && p.nameAr ? p.nameAr : p.nameEn, src: p.logo }));

  const f = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  // Duplicate the list so the marquee loops seamlessly
  const track = [...LOGOS, ...LOGOS];

  return (
    <section style={{ background: "var(--em-surface)", padding: "clamp(2.5rem, 5vh, 4rem) 0", overflow: "hidden" }}>
      <p
        className="text-xs text-center"
        style={{ fontFamily: f, color: "var(--em-muted)", marginBottom: "2rem" }}
      >
        {label}
      </p>

      {/* The marquee always runs left-to-right: under an RTL parent the track is anchored to the
          right edge and animates further off-screen, leaving the strip empty */}
      <div dir="ltr">
      <div className="ticker-track" style={{ display: "flex", alignItems: "center", gap: "0", width: "max-content" }}>
        {track.map((logo, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "220px",
              height: "110px",
              padding: "0 2rem",
              flexShrink: 0,
              borderRight: "1px solid var(--em-border)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              decoding="async"
              style={{ maxHeight: "72px", maxWidth: "160px", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
