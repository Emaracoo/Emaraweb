import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { prisma } from "@/lib/prisma";
import { hasLocale } from "../dictionaries";

const T = {
  en: {
    eyebrow: "Journal",
    title: "A World of",
    accent: "Art and Engineering",
    subtitle: "Thinking, process, and lessons from four decades of design and construction.",
    coming: "Posts coming soon.",
    read: "Read article →",
  },
  ar: {
    eyebrow: "المدونة",
    title: "عالم من",
    accent: "الفن والهندسة",
    subtitle: "أفكار وعمليات ودروس من أربعة عقود من التصميم والبناء.",
    coming: "المقالات قريباً.",
    read: "اقرأ المقال ←",
  },
};

function formatDate(d: Date, lang: "en" | "ar") {
  return d.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", { month: "long", year: "numeric" });
}

interface Props { params: Promise<{ lang: string }> }

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l  = lang as "en" | "ar";
  const t  = T[l];
  const f  = l === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs = l === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";

  const posts = await prisma.blogPost.findMany({
    where:   { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      slug: true, titleEn: true, titleAr: true, excerptEn: true, excerptAr: true,
      coverImage: true, category: true, publishedAt: true, createdAt: true,
    },
  });

  return (
    <>
      <Header />
      <main>
        <PageHero lang={l} eyebrow={t.eyebrow} title={t.title} titleAccent={t.accent} subtitle={t.subtitle} />

        {posts.length === 0 ? (
          <p style={{ textAlign: "center", padding: "8rem 2rem", color: "var(--em-muted)", fontFamily: f, fontSize: "0.875rem" }}>
            {t.coming}
          </p>
        ) : (
          <section style={{ background: "var(--em-bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 8vw, 5rem)" }}>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14" style={{ maxWidth: "80rem" }}>
              {posts.map((post) => {
                const title   = l === "ar" && post.titleAr   ? post.titleAr   : post.titleEn;
                const excerpt = l === "ar" && post.excerptAr ? post.excerptAr : (post.excerptEn ?? "");
                return (
                  <Link key={post.slug} href={`/${l}/blog/${post.slug}`} className="group block" style={{ textDecoration: "none" }}>
                    <div className="overflow-hidden" style={{ aspectRatio: "16 / 10", background: "var(--em-surface-2)" }}>
                      {post.coverImage && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={post.coverImage} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                    </div>
                    <div className="flex gap-3" style={{ marginTop: "1.25rem" }}>
                      <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: f, color: "var(--em-muted)" }}>
                        {formatDate(post.publishedAt ?? post.createdAt, l)}
                      </span>
                      {post.category && (
                        <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{post.category}</span>
                      )}
                    </div>
                    <h2 className="font-light" style={{ fontFamily: fs, fontSize: "1.35rem", color: "var(--em-text)", lineHeight: 1.3, marginTop: "0.5rem" }}>
                      {title}
                    </h2>
                    <p style={{ fontFamily: f, fontWeight: 300, fontSize: "0.85rem", color: "var(--em-muted)", lineHeight: 1.7, marginTop: "0.6rem" }}>
                      {excerpt}
                    </p>
                    <span className="inline-block text-xs tracking-[0.2em] uppercase" style={{ fontFamily: f, color: "#993434", marginTop: "1rem" }}>
                      {t.read}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
