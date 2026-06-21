const PARTNERS = [
  { name: "Al Arabiya Network", note: "Media" },
  { name: "MBC Group",          note: "Media" },
  { name: "Sphinx Medical",     note: "Healthcare" },
  { name: "Manar Tex",          note: "Industrial" },
  { name: "Medical Union Pharma", note: "Pharma" },
];

export default function PartnersStrip() {
  return (
    <section
      style={{
        background: "var(--em-surface)",
        padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 8vw, 5rem)",
      }}
    >
      <p
        className="text-xs tracking-[0.35em] uppercase text-center"
        style={{
          fontFamily: "var(--font-inter)",
          color: "var(--em-muted)",
          marginBottom: "2.5rem",
        }}
      >
        Trusted By
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {PARTNERS.map((partner) => (
          <div key={partner.name} style={{ textAlign: "center" }}>
            <div
              style={{
                width: "24px",
                height: "1px",
                background: "var(--em-border)",
                margin: "0 auto 0.75rem",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--em-muted)",
              }}
            >
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
