import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeHero from "@/components/home/HomeHero";
import AboutSnapshot from "@/components/home/AboutSnapshot";
import ServicesGrid from "@/components/home/ServicesGrid";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import PartnersStrip from "@/components/home/PartnersStrip";
import BlogRow from "@/components/home/BlogRow";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <AboutSnapshot />
        <ServicesGrid />
        <FeaturedProjects />
        <PartnersStrip />
        <BlogRow />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
