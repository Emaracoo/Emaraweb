import Link from "next/link";
import { prisma } from "@/lib/prisma";

const LABELS = {
  en: { eyebrow: "Journal", heading: "A world of\nArt and Engineering.", cta: "Visit the blog →" },
  ar: { eyebrow: "المدونة", heading: "عالم من\nالفن والهندسة.", cta: "زيارة المدونة ←" },
};

function formatDate(d: Date, lang: "en" | "ar") {
  return d.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", { month: "long", year: "numeric" });
}

interface Props { lang: "en" | "ar" }

export default async function BlogRow({ lang }: Props) {
  const posts = await prisma.blogPost.findMany({
    where:   { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 3,
    select: {
      slug: true, titleEn: true, titleAr: true, excerptEn: true, excerptAr: true,
      coverImage: true, category: true, publishedAt: true, createdAt: true,
    },
  });

  if (posts.length === 0) return null;

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
            href={`/${lang}/blog`}
            className="text-xs tracking-[0.2em] uppercase shrink-0"
            style={{ fontFamily: f, color: "#993434", borderBottom: "1px solid #993434", paddingBottom: "2px", alignSelf: "flex-end" }}
          >
            {lbl.cta}
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const title   = lang === "ar" && post.titleAr   ? post.titleAr   : post.titleEn;
            const excerpt = lang === "ar" && post.excerptAr ? post.excerptAr : (post.excerptEn ?? "");
            return (
              <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="group block" style={{ textDecoration: "none" }}>
                <div className="overflow-hidden" style={{ aspectRatio: "16 / 9", background: "var(--em-surface-2)" }}>
                  {post.coverImage && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={post.coverImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <div className="flex gap-3" style={{ marginTop: "1.25rem" }}>
                  <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: f, color: "var(--em-muted)" }}>
                    {formatDate(post.publishedAt ?? post.createdAt, lang)}
                  </span>
                  {post.category && (
                    <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{post.category}</span>
                  )}
                </div>
                <p className="font-light" style={{ fontFamily: fs, fontSize: "1.15rem", color: "var(--em-text)", lineHeight: 1.3, marginTop: "0.5rem" }}>
                  {title}
                </p>
                <p style={{ fontFamily: f, fontWeight: 300, fontSize: "0.8rem", color: "var(--em-muted)", lineHeight: 1.7, marginTop: "0.5rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {excerpt}
                </p>
              </Link>
            );
          })}
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
