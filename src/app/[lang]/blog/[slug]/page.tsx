import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { blogCategoryLabel } from "@/lib/labels";
import { hasLocale } from "../../dictionaries";

const T = {
  en: { back: "← All articles", journal: "Journal" },
  ar: { back: "جميع المقالات ←", journal: "المدونة" },
};

function formatDate(d: Date, lang: "en" | "ar") {
  return d.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
}

interface Props { params: Promise<{ lang: string; slug: string }> }

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const l  = lang as "en" | "ar";
  const t  = T[l];
  const f  = l === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs = l === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";

  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || post.status !== "PUBLISHED") notFound();

  const title = l === "ar" && post.titleAr ? post.titleAr : post.titleEn;
  const body  = l === "ar" && post.bodyAr  ? post.bodyAr  : (post.bodyEn ?? "");

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex items-end" style={{ minHeight: "56vh", background: "#441919", paddingTop: "8rem" }}>
          {post.coverImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.45 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,10,10,0.9) 0%, rgba(26,10,10,0.3) 60%)" }} />
            </>
          )}
          <div className="relative z-10 max-w-4xl mx-auto w-full px-6 lg:px-12 pb-16">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#B34040" }}>{t.journal}</span>
              {blogCategoryLabel(post.category, post.categoryAr, l) && (
                <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "rgba(255,255,255,0.5)" }}>· {blogCategoryLabel(post.category, post.categoryAr, l)}</span>
              )}
              <span className="text-xs" style={{ fontFamily: f, color: "rgba(255,255,255,0.4)" }}>
                {formatDate(post.publishedAt ?? post.createdAt, l)}
              </span>
            </div>
            <h1 className="font-light text-white" style={{ fontFamily: fs, fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.1 }}>
              {title}
            </h1>
          </div>
        </section>

        {/* Body */}
        <section style={{ background: "var(--em-bg)", padding: "clamp(4rem, 8vh, 6rem) 1.5rem" }}>
          <article className="max-w-3xl mx-auto">
            {body.split(/\n\s*\n/).map((para, i) => (
              <p
                key={i}
                style={{ fontFamily: f, fontWeight: 300, fontSize: "1rem", color: "var(--em-text)", lineHeight: 1.9, marginBottom: "1.5rem" }}
              >
                {para}
              </p>
            ))}
            <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--em-border)" }}>
              <Link
                href={`/${l}/blog`}
                className="text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: f, color: "#993434", borderBottom: "1px solid #993434", paddingBottom: "2px" }}
              >
                {t.back}
              </Link>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
