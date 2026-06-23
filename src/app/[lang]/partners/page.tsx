import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { hasLocale } from "../dictionaries";

const T = {
  en: {
    eyebrow: "Partners",
    title: "Built on",
    accent: "Trust",
    subtitle: "The clients and collaborators who have shaped four decades of practice.",
    coming: "Partner profiles coming soon.",
  },
  ar: {
    eyebrow: "شركاؤنا",
    title: "مبني على",
    accent: "الثقة",
    subtitle: "العملاء والشركاء الذين شكّلوا أربعة عقود من الممارسة.",
    coming: "ملفات الشركاء قريباً.",
  },
};

interface Props { params: Promise<{ lang: string }> }

export default async function PartnersPage({ params }: Props) {
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
        <div style={{ textAlign: "center", padding: "8rem 2rem", color: "var(--em-muted)", fontFamily: f, fontSize: "0.875rem", fontWeight: 300 }}>
          {t.coming}
        </div>
      </main>
      <Footer />
    </>
  );
}
