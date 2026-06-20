interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  image?: string;
}

export default function PageHero({ eyebrow, title, titleAccent, subtitle, image }: PageHeroProps) {
  return (
    <section className="pt-32 pb-0 overflow-hidden" style={{ background: "#441919" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end pb-0">
          <div className="pb-16 lg:pb-24">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-px" style={{ background: "#993434" }} />
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-inter)", color: "#993434" }}
              >
                {eyebrow}
              </span>
            </div>
            <h1
              className="text-white font-light leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {title}
              {titleAccent && (
                <><br /><em style={{ color: "#993434" }}>{titleAccent}</em></>
              )}
            </h1>
            {subtitle && (
              <p
                className="leading-relaxed max-w-md"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {image && (
            <div className="hidden lg:block h-80 overflow-hidden self-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Orange bottom rule */}
      <div className="h-1 w-full" style={{ background: "#993434" }} />
    </section>
  );
}
