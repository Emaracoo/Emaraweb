import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeHero, { type HeroStat } from "@/components/home/HomeHero";
import AboutSnapshot from "@/components/home/AboutSnapshot";
import ServicesGrid from "@/components/home/ServicesGrid";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import PartnersStrip from "@/components/home/PartnersStrip";
import BlogRow from "@/components/home/BlogRow";
import ContactCTA from "@/components/home/ContactCTA";
import { hasLocale } from "./dictionaries";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l = lang as "en" | "ar";

  const [heroSlides, heroSection, services, ctaSection] = await Promise.all([
    prisma.homeSlide.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homepageSection.findUnique({ where: { key: "hero" } }),
    prisma.service.findMany({
      where:   { status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.homepageSection.findUnique({ where: { key: "cta" } }),
  ]);

  const heroStats = (heroSection?.data as { stats?: HeroStat[] } | null)?.stats;

  return (
    <>
      <Header />
      <main>
        <HomeHero
          slides={heroSlides}
          stats={heroStats}
          eyebrowEn={heroSection?.titleEn}
          eyebrowAr={heroSection?.titleAr}
        />
        <AboutSnapshot lang={l} />
        <ServicesGrid lang={l} services={services} />
        <FeaturedProjects lang={l} />
        <PartnersStrip lang={l} />
        <BlogRow lang={l} />
        <ContactCTA
          eyebrowEn={ctaSection?.bodyEn}
          eyebrowAr={ctaSection?.bodyAr}
          headlineEn={ctaSection?.titleEn}
          headlineAr={ctaSection?.titleAr}
          ctaEn={ctaSection?.ctaLabelEn}
          ctaAr={ctaSection?.ctaLabelAr}
        />
      </main>
      <Footer />
    </>
  );
}
