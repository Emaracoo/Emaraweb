import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeHero from "@/components/home/HomeHero";
import Ticker from "@/components/home/Ticker";
import ProcessSteps from "@/components/home/ProcessSteps";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import ProjectsCarousel from "@/components/home/ProjectsCarousel";
import StoryScroll from "@/components/home/StoryScroll";
import HomeQuote from "@/components/home/HomeQuote";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <Ticker />
        <ProcessSteps />
        <ServicesTeaser />
        <ProjectsCarousel />
        <StoryScroll />
        <HomeQuote />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
