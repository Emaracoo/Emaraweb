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

  const [heroSlides, heroSection, servicesSection, services, ctaSection] = await Promise.all([
    prisma.homeSlide.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homepageSection.findUnique({ where: { key: "hero" } }),
    prisma.homepageSection.findUnique({ where: { key: "services" } }),
    prisma.service.findMany({
      where:   { status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.homepageSection.findUnique({ where: { key: "cta" } }),
  ]);

  const heroStats = (heroSection?.data as { stats?: HeroStat[] } | null)?.stats;
  const heroData  = (heroSection?.data as { cta2LabelEn?: string; cta2LabelAr?: string; cta2Href?: string } | null) ?? {};
  const servicesData = (servicesSection?.data as { learnMoreEn?: string; learnMoreAr?: string; scrollHintEn?: string; scrollHintAr?: string } | null) ?? {};
  const ctaData      = (ctaSection?.data as { bgImage?: string } | null) ?? {};

  return (
    <>
      <Header />
      <main>
        <HomeHero
          slides={heroSlides}
          stats={heroStats}
          eyebrowEn={heroSection?.titleEn}
          eyebrowAr={heroSection?.titleAr}
          cta1LabelEn={heroSection?.ctaLabelEn}
          cta1LabelAr={heroSection?.ctaLabelAr}
          cta1Href={heroSection?.ctaHref}
          cta2LabelEn={heroData.cta2LabelEn}
          cta2LabelAr={heroData.cta2LabelAr}
          cta2Href={heroData.cta2Href}
        />
        <AboutSnapshot lang={l} />
        <ServicesGrid
          lang={l}
          services={services}
          eyebrowEn={servicesSection?.bodyEn}
          eyebrowAr={servicesSection?.bodyAr}
          headingEn={servicesSection?.titleEn}
          headingAr={servicesSection?.titleAr}
          ctaEn={servicesSection?.ctaLabelEn}
          ctaAr={servicesSection?.ctaLabelAr}
          learnMoreEn={servicesData.learnMoreEn}
          learnMoreAr={servicesData.learnMoreAr}
          scrollHintEn={servicesData.scrollHintEn}
          scrollHintAr={servicesData.scrollHintAr}
        />
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
          bgImage={ctaData.bgImage}
        />
      </main>
      <Footer />
    </>
  );
}
