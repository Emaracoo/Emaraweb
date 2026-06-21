import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Partners"
          title="Built on"
          titleAccent="Trust"
          subtitle="The clients and collaborators who have shaped four decades of practice."
        />
        <div style={{ textAlign:"center", padding:"8rem 2rem", color:"var(--em-muted)", fontFamily:"var(--font-saira)", fontSize:"0.875rem", fontWeight:300 }}>
          Partner profiles coming soon.
        </div>
      </main>
      <Footer />
    </>
  );
}
