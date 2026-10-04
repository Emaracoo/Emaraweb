import { Fragment } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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

const SEO_FALLBACK = {
  en: { title: "Emara — Architecture Studio", description: "Award-winning architecture and design studio crafting spaces that endure." },
  ar: { title: "عمارة — استوديو معماري", description: "استوديو تصميم وعمارة حائز على جوائز، يصنع مساحات تدوم." },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const l = lang as "en" | "ar";
  const fb = SEO_FALLBACK[l];

  const rows = await prisma.siteSetting.findMany({ where: { group: "seo" } });
  const get = (key: string) => rows.find(r => r.key === key)?.value || undefined;

  return {
    title: get(`home_title_${l}`) ?? fb.title,
    description: get(`home_desc_${l}`) ?? fb.description,
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l = lang as "en" | "ar";

  const [heroSlides, allSections, services] = await Promise.all([
    prisma.homeSlide.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homepageSection.findMany(),
    prisma.service.findMany({
      where:   { status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  const byKey = new Map(allSections.map(s => [s.key, s]));
  const heroSection     = byKey.get("hero");
  const servicesSection = byKey.get("services");
  const ctaSection      = byKey.get("cta");

  const heroStats = (heroSection?.data as { stats?: HeroStat[] } | null)?.stats;
  const heroData  = (heroSection?.data as { cta2LabelEn?: string; cta2LabelAr?: string; cta2Href?: string } | null) ?? {};
  const servicesData = (servicesSection?.data as { learnMoreEn?: string; learnMoreAr?: string; scrollHintEn?: string; scrollHintAr?: string } | null) ?? {};
  const ctaData      = (ctaSection?.data as { bgImage?: string } | null) ?? {};

  const sectionNodes: Record<string, React.ReactNode> = {
    hero: (
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
    ),
    about: <AboutSnapshot lang={l} />,
    services: (
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
    ),
    projects: <FeaturedProjects lang={l} />,
    partners: <PartnersStrip lang={l} />,
    blog: <BlogRow lang={l} />,
    cta: (
      <ContactCTA
        eyebrowEn={ctaSection?.bodyEn}
        eyebrowAr={ctaSection?.bodyAr}
        headlineEn={ctaSection?.titleEn}
        headlineAr={ctaSection?.titleAr}
        ctaEn={ctaSection?.ctaLabelEn}
        ctaAr={ctaSection?.ctaLabelAr}
        bgImage={ctaData.bgImage}
      />
    ),
  };

  const orderedKeys = [...allSections]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .filter(s => s.enabled && sectionNodes[s.key])
    .map(s => s.key);

  return (
    <>
      <Header />
      <main>
        {orderedKeys.map(key => (
          <Fragment key={key}>{sectionNodes[key]}</Fragment>
        ))}
      </main>
      <Footer />
    </>
  );
}
