import Link from "next/link";

const POSTS = [
  {
    date: "March 2025",
    category: "Craft",
    title: "The Art of the Maquette: Why Physical Models Still Matter in Architecture",
    excerpt:
      "In an age of BIM and renders, the hand-built architectural model remains our most honest tool for communicating space.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    href: "/blog/art-of-the-maquette",
  },
  {
    date: "January 2025",
    category: "Materials",
    title: "Concrete, Steel & Glass: Choosing the Right Structure for Egypt's Climate",
    excerpt:
      "Thermal mass, humidity, and seismic codes — how material choice shapes every building we design in Cairo.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    href: "/blog/structure-egypt-climate",
  },
  {
    date: "October 2024",
    category: "Legacy",
    title: "40 Years in Cairo: How the City's Architecture Has Shaped Our Practice",
    excerpt:
      "From Heliopolis to 10th of Ramadan City — the buildings we grew up with and the ones we built.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    href: "/blog/40-years-cairo",
  },
];

export default function BlogRow() {
  return (
    <section
      style={{
        background: "var(--em-bg)",
        padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 8vw, 5rem)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "80rem" }}>
        {/* Section header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          style={{ marginBottom: "3rem" }}
        >
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-saira)", color: "#993434" }}
            >
              Journal
            </p>
            <h2
              className="font-light leading-[1.15]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "var(--em-text)",
                whiteSpace: "pre-line",
              }}
            >
              {"From our\npractice."}
            </h2>
          </div>

          <Link
            href="/blog"
            className="text-xs tracking-[0.2em] uppercase shrink-0"
            style={{
              fontFamily: "var(--font-saira)",
              color: "#993434",
              borderBottom: "1px solid #993434",
              paddingBottom: "2px",
              alignSelf: "flex-end",
            }}
          >
            Visit the blog →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group block"
              style={{ textDecoration: "none" }}
            >
              {/* Image */}
              <div
                className="overflow-hidden"
                style={{ aspectRatio: "16 / 9" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Meta */}
              <div className="flex gap-3" style={{ marginTop: "1.25rem" }}>
                <span
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ fontFamily: "var(--font-saira)", color: "var(--em-muted)" }}
                >
                  {post.date}
                </span>
                <span
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ fontFamily: "var(--font-saira)", color: "#993434" }}
                >
                  {post.category}
                </span>
              </div>

              <p
                className="font-light"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.15rem",
                  color: "var(--em-text)",
                  lineHeight: 1.3,
                  marginTop: "0.5rem",
                }}
              >
                {post.title}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-saira)",
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  color: "var(--em-muted)",
                  lineHeight: 1.7,
                  marginTop: "0.5rem",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center" style={{ marginTop: "3rem" }}>
          <Link
            href="/blog"
            className="text-xs tracking-[0.2em] uppercase"
            style={{
              fontFamily: "var(--font-saira)",
              color: "#993434",
              borderBottom: "1px solid #993434",
              paddingBottom: "2px",
            }}
          >
            Visit the blog →
          </Link>
        </div>
      </div>
    </section>
  );
}
