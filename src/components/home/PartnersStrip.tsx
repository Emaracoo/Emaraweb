import { prisma } from "@/lib/prisma";

const LABELS = {
  en: "Trusted By",
  ar: "يثق بنا",
};

interface Props { lang: "en" | "ar" }

export default async function PartnersStrip({ lang }: Props) {
  const partners = await prisma.partner.findMany({
    where:   { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  if (partners.length === 0) return null;

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
        {LABELS[lang]}
      </p>

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
              borderInlineEnd: "1px solid var(--em-border)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              style={{ maxHeight: "72px", maxWidth: "160px", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
