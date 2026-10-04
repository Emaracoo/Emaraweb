import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import SiteCTA from "@/components/SiteCTA";
import { getPageImage } from "@/lib/site-settings";
import { prisma } from "@/lib/prisma";
import { hasLocale } from "../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ cat?: string }>;
}

const T = {
  en: { eyebrow: "Our Portfolio", title: "Project", accent: "Highlights", subtitle: "Four decades of work across residential, administrative, industrial, and commercial typologies throughout Egypt." },
  ar: { eyebrow: "أعمالنا",       title: "أبرز",    accent: "المشاريع",   subtitle: "أربعة عقود من العمل في مشاريع سكنية وإدارية وصناعية وتجارية عبر مصر." },
};

export default async function ProjectsPage({ params, searchParams }: Props) {
  const [{ lang }, { cat }] = await Promise.all([params, searchParams]);
  if (!hasLocale(lang)) notFound();
  const l = lang as "en" | "ar";
  const t = T[l];

  const heroImage = await getPageImage("hero_image_projects");
  const projects = await prisma.project.findMany({
    where:   { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: {
      slug: true, titleEn: true, titleAr: true,
      categoryEn: true, categoryAr: true,
      locationEn: true, locationAr: true,
      year: true, coverImage: true, featured: true,
    },
  });

  return (
    <>
      <Header />
      <main>
        <PageHero lang={l} eyebrow={t.eyebrow} title={t.title} titleAccent={t.accent} subtitle={t.subtitle} image={heroImage} />
        <ProjectsGrid projects={projects} lang={l} initialCategory={cat} />
        <SiteCTA />
      </main>
      <Footer />
    </>
  );
}
