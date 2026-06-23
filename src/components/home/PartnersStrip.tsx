const PARTNERS = [
  { name: "Al Arabiya Network" },
  { name: "MBC Group"          },
  { name: "Sphinx Medical"     },
  { name: "Manar Tex"          },
  { name: "Medical Union Pharma" },
];

const LABELS = {
  en: "Trusted By",
  ar: "يثق بنا",
};

interface Props { lang: "en" | "ar" }

export default function PartnersStrip({ lang }: Props) {
  const f = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";

  return (
    <section style={{ background: "var(--em-surface)", padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 8vw, 5rem)" }}>
      <p className="text-xs tracking-[0.35em] uppercase text-center" style={{ fontFamily: f, color: "var(--em-muted)", marginBottom: "2.5rem" }}>
        {LABELS[lang]}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
        {PARTNERS.map((partner) => (
          <div key={partner.name} style={{ textAlign: "center" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--em-border)", margin: "0 auto 0.75rem" }} />
            <p style={{ fontFamily: f, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--em-muted)" }}>
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
