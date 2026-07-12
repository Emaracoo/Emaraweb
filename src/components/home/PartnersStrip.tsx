const LOGOS = [
  { name: "Al-Arabiya",              src: "/clients/al-arabiya.png"       },
  { name: "MBC Group",               src: "/clients/mbc.png"              },
  { name: "Oriental Weavers",        src: "/clients/oriental-weavers.png" },
  { name: "InterContinental",        src: "/clients/intercontinental.png" },
  { name: "Nokia",                   src: "/clients/nokia.png"            },
  { name: "United Colors of Benetton", src: "/clients/benetton.png"       },
  { name: "Moulinex",                src: "/clients/moulinex.png"         },
  { name: "Sphinx Cure",             src: "/clients/sphinx.png"           },
  { name: "MUP",                     src: "/clients/mup.png"              },
  { name: "Mac Mocket",              src: "/clients/mac-mocket.png"       },
];

const LABELS = {
  en: "Trusted By",
  ar: "يثق بنا",
};

interface Props { lang: "en" | "ar" }

export default function PartnersStrip({ lang }: Props) {
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
