import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Journal"
          title="From Our"
          titleAccent="Practice"
          subtitle="Thinking, process, and lessons from four decades of design and construction."
        />
        <p
          style={{
            textAlign: "center",
            padding: "8rem 2rem",
            color: "var(--em-muted)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.875rem",
          }}
        >
          Posts coming soon.
        </p>
      </main>
      <Footer />
    </>
  );
}
