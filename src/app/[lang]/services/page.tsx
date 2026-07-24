import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/home/ContactCTA";
import ServicesList from "@/components/services/ServicesList";
import { hasLocale } from "../dictionaries";
import { prisma } from "@/lib/prisma";

const HERO = {
  en: { eyebrow: "What We Do", title: "From Structural Engineering", accent: "to Architectural Models", subtitle: "Seven disciplines, one studio." },
  ar: { eyebrow: "ما نقدمه",  title: "من الهندسة الإنشائية",       accent: "إلى النماذج المعمارية",    subtitle: "سبعة تخصصات، استوديو واحد." },
};

const GRID_LABELS = {
  en: { eyebrow: "Our Services", heading: "Everything a Project Needs, Under One Roof", learnMore: "Learn more →" },
  ar: { eyebrow: "خدماتنا",     heading: "كل ما يحتاجه المشروع، تحت سقف واحد",        learnMore: "اعرف أكثر ←" },
};

interface Props { params: Promise<{ lang: string }> }

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l   = lang as "en" | "ar";
  const h   = HERO[l];
  const lbl = GRID_LABELS[l];

  const rows = await prisma.service.findMany({
    where:   { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  const services = rows.map(s => ({
    slug:  s.slug,
    icon:  s.icon,
    title: (l === "ar" && s.titleAr) || s.titleEn,
    desc:  (l === "ar" ? s.descriptionAr : s.descriptionEn) || "",
  }));

  return (
    <>
      <Header />
      <main>
        <PageHero lang={l} eyebrow={h.eyebrow} title={h.title} titleAccent={h.accent} subtitle={h.subtitle} />
        <ServicesList
          lang={l}
          services={services}
          eyebrow={lbl.eyebrow}
          heading={lbl.heading}
          learnMore={lbl.learnMore}
          contactHref={`/${l}/contact`}
        />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
