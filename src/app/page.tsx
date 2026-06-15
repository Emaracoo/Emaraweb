import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeHero from "@/components/home/HomeHero";
import ProcessSteps from "@/components/home/ProcessSteps";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import ProjectsCarousel from "@/components/home/ProjectsCarousel";
import HomeQuote from "@/components/home/HomeQuote";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <ProcessSteps />
        <ServicesTeaser />
        <ProjectsCarousel />
        <HomeQuote />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
