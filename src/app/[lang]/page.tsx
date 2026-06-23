import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeHero from "@/components/home/HomeHero";
import AboutSnapshot from "@/components/home/AboutSnapshot";
import ServicesGrid from "@/components/home/ServicesGrid";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import PartnersStrip from "@/components/home/PartnersStrip";
import BlogRow from "@/components/home/BlogRow";
import ContactCTA from "@/components/home/ContactCTA";
import { hasLocale } from "./dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l = lang as "en" | "ar";

  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <AboutSnapshot lang={l} />
        <ServicesGrid lang={l} />
        <FeaturedProjects lang={l} />
        <PartnersStrip lang={l} />
        <BlogRow lang={l} />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
