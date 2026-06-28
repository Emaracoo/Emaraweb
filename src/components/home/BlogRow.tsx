import Link from "next/link";

const POSTS_EN = [
  {
    date: "March 2025",
    category: "Craft",
    title: "The Art of the Maquette: Why Physical Models Still Matter in Architecture",
    excerpt: "In an age of BIM and renders, the hand-built architectural model remains our most honest tool for communicating space.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    href: "/blog/art-of-the-maquette",
  },
  {
    date: "January 2025",
    category: "Materials",
    title: "Concrete, Steel & Glass: Choosing the Right Structure for Egypt's Climate",
    excerpt: "Thermal mass, humidity, and seismic codes — how material choice shapes every building we design in Cairo.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    href: "/blog/structure-egypt-climate",
  },
  {
    date: "October 2024",
    category: "Legacy",
    title: "40 Years in Cairo: How the City's Architecture Has Shaped Our Practice",
    excerpt: "From Heliopolis to 10th of Ramadan City — the buildings we grew up with and the ones we built.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    href: "/blog/40-years-cairo",
  },
];

const POSTS_AR = [
  {
    date: "مارس ٢٠٢٥",
    category: "حرفة",
    title: "فن المجسّم: لماذا تظل النماذج الفيزيائية ضرورية في العمارة؟",
    excerpt: "في عصر نمذجة المعلومات والتصورات المجسّمة، يبقى النموذج المعماري المصنوع يدوياً أصدق أدواتنا في إيصال الفضاء.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    href: "/blog/art-of-the-maquette",
  },
  {
    date: "يناير ٢٠٢٥",
    category: "مواد",
    title: "الخرسانة والفولاذ والزجاج: اختيار الهيكل الصحيح لمناخ مصر",
    excerpt: "الكتلة الحرارية والرطوبة ومعايير الزلازل — كيف تُشكّل المادة كل مبنى نصممه في القاهرة.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    href: "/blog/structure-egypt-climate",
  },
  {
    date: "أكتوبر ٢٠٢٤",
    category: "إرث",
    title: "٤٠ عاماً في القاهرة: كيف شكّلت عمارة المدينة ممارستنا؟",
    excerpt: "من مصر الجديدة إلى مدينة العاشر من رمضان — المباني التي كبرنا بينها والمباني التي بنيناها.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    href: "/blog/40-years-cairo",
  },
];

const LABELS = {
  en: { eyebrow: "Journal", heading: "From our\npractice.", cta: "Visit the blog →" },
  ar: { eyebrow: "المدونة", heading: "من\nممارستنا.", cta: "زيارة المدونة ←" },
};

interface Props { lang: "en" | "ar" }

export default function BlogRow({ lang }: Props) {
  const posts = lang === "ar" ? POSTS_AR : POSTS_EN;
  const lbl   = LABELS[lang];
  const f     = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs    = lang === "ar" ? "var(--font-arabic-display)" : "var(--font-cormorant)";

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
            href={`/${lang}/blog`}
            className="text-xs tracking-[0.2em] uppercase shrink-0"
            style={{ fontFamily: f, color: "#993434", borderBottom: "1px solid #993434", paddingBottom: "2px", alignSelf: "flex-end" }}
          >
            {lbl.cta}
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.href} href={`/${lang}${post.href}`} className="group block" style={{ textDecoration: "none" }}>
              <div className="overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex gap-3" style={{ marginTop: "1.25rem" }}>
                <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: f, color: "var(--em-muted)" }}>{post.date}</span>
                <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{post.category}</span>
              </div>
              <p className="font-light" style={{ fontFamily: fs, fontSize: "1.15rem", color: "var(--em-text)", lineHeight: 1.3, marginTop: "0.5rem" }}>
                {post.title}
              </p>
              <p style={{ fontFamily: f, fontWeight: 300, fontSize: "0.8rem", color: "var(--em-muted)", lineHeight: 1.7, marginTop: "0.5rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: "3rem" }}>
          <Link href={`/${lang}/blog`} className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: f, color: "#993434", borderBottom: "1px solid #993434", paddingBottom: "2px" }}>
            {lbl.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
