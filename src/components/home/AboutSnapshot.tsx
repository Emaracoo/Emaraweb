import Link from "next/link";

const T = {
  en: {
    eyebrow: "About Emara",
    heading: "Four decades of design,\nconstruction & craft.",
    body: "With over four decades of experience, our journey began with miniature architectural models — combining functionality and aesthetics with fastidious attention to detail. From industrial buildings to palaces and villas, we have shaped spaces across Egypt.",
    cta: "Read more →",
    stats: [
      { value: "40+", label: "Years of Practice" },
      { value: "100+", label: "Projects Delivered" },
      { value: "50+", label: "Clients Served" },
    ],
  },
  ar: {
    eyebrow: "عن إعمار",
    heading: "أربعة عقود من التصميم\nوالبناء والحرفية.",
    body: "بخبرة تمتد لأكثر من أربعة عقود، بدأت رحلتنا بصناعة النماذج المعمارية المصغّرة — نجمع بين الوظيفية والجماليات بعناية فائقة بالتفاصيل. من المنشآت الصناعية إلى القصور والفيلات، رسمنا ملامح المكان في أرجاء مصر.",
    cta: "اقرأ المزيد →",
    stats: [
      { value: "+٤٠", label: "عاماً من الممارسة" },
      { value: "+١٠٠", label: "مشروع منجز" },
      { value: "+٥٠", label: "عميل نخدمه" },
    ],
  },
};

interface Props { lang: "en" | "ar" }

export default function AboutSnapshot({ lang }: Props) {
  const t   = T[lang];
  const f   = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs  = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";

  return (
    <section style={{ background: "var(--em-bg)", padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 8vw, 5rem)" }}>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start" style={{ maxWidth: "80rem" }}>

        {/* Left: text */}
        <div>
          <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ fontFamily: f, color: "#993434" }}>
            {t.eyebrow}
          </p>
          <h2
            className="font-light leading-[1.15] mb-6"
            style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)", whiteSpace: "pre-line" }}
          >
            {t.heading}
          </h2>
          <p className="mb-8" style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "var(--em-muted)", lineHeight: 1.8, maxWidth: "460px" }}>
            {t.body}
          </p>
          <Link
            href={`/${lang}/about`}
            className="text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: f, color: "#993434", borderBottom: "1px solid #993434", paddingBottom: "2px" }}
          >
            {t.cta}
          </Link>
        </div>

        {/* Right: stats */}
        <div className="flex flex-col divide-y" style={{ borderColor: "var(--em-border)" }}>
          {t.stats.map((stat) => (
            <div key={stat.label} className="py-8 first:pt-0 last:pb-0" style={{ borderColor: "var(--em-border)" }}>
              <p className="font-light leading-none mb-2" style={{ fontFamily: fs, fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "#993434" }}>
                {stat.value}
              </p>
              <p className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: f, color: "var(--em-muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
