interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  image?: string;
  lang?: "en" | "ar";
}

export default function PageHero({ eyebrow, title, titleAccent, subtitle, image, lang = "en" }: PageHeroProps) {
  const isAr = lang === "ar";
  const f  = isAr ? "var(--font-cairo)" : "var(--font-saira)";
  const fs = isAr ? "var(--font-cairo)" : "var(--font-cormorant)";

  return (
    <section className="relative pt-32 pb-0 overflow-hidden" style={{ background: "#441919" }}>
      {/* Photo — fills the full height of the far half of the hero on desktop */}
      {image && (
        <div className="hidden lg:block absolute top-0 bottom-1 end-0 w-1/2 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to ${isAr ? "left" : "right"}, rgba(68,25,25,0.55) 0%, rgba(68,25,25,0) 35%)` }}
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:w-1/2 lg:pe-12 pb-12 lg:pb-24 lg:min-h-[26rem] flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px shrink-0" style={{ background: "#993434" }} />
            <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#993434" }}>
              {eyebrow}
            </span>
          </div>
          <h1
            className="text-white font-light mb-6"
            style={{
              fontFamily: fs,
              fontSize: isAr ? "clamp(2.25rem, 5vw, 4.25rem)" : "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: isAr ? 1.35 : 1.05,
              overflowWrap: "break-word",
            }}
          >
            {title}
            {titleAccent && (
              <>
                <br />
                {/* Arabic has no true italic — a synthetic slant only distorts the letterforms */}
                <em style={{ color: "#993434", fontStyle: isAr ? "normal" : "italic" }}>{titleAccent}</em>
              </>
            )}
          </h1>
          {subtitle && (
            <p className="leading-relaxed max-w-md" style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Photo — full-width band under the text on mobile/tablet */}
      {image && (
        <div className="lg:hidden relative h-56 sm:h-72 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="relative h-1 w-full" style={{ background: "#993434" }} />
    </section>
  );
}
