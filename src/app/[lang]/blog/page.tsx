import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { hasLocale } from "../dictionaries";

const T = {
  en: {
    eyebrow: "Journal",
    title: "From Our",
    accent: "Practice",
    subtitle: "Thinking, process, and lessons from four decades of design and construction.",
    coming: "Posts coming soon.",
  },
  ar: {
    eyebrow: "المدونة",
    title: "من",
    accent: "ممارستنا",
    subtitle: "أفكار وعمليات ودروس من أربعة عقود من التصميم والبناء.",
    coming: "المقالات قريباً.",
  },
};

interface Props { params: Promise<{ lang: string }> }

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l = lang as "en" | "ar";
  const t = T[l];
  const f = l === "ar" ? "var(--font-cairo)" : "var(--font-saira)";

  return (
    <>
      <Header />
      <main>
        <PageHero lang={l} eyebrow={t.eyebrow} title={t.title} titleAccent={t.accent} subtitle={t.subtitle} />
        <p style={{ textAlign: "center", padding: "8rem 2rem", color: "var(--em-muted)", fontFamily: f, fontSize: "0.875rem" }}>
          {t.coming}
        </p>
      </main>
      <Footer />
    </>
  );
}
