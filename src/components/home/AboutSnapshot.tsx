import Link from "next/link";

const STATS = [
  { value: "40+", label: "Years of Practice" },
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Clients Served" },
];

export default function AboutSnapshot() {
  return (
    <section
      style={{
        background: "var(--em-bg)",
        padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 8vw, 5rem)",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        style={{ maxWidth: "80rem" }}
      >
        {/* Left: text */}
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: "var(--font-inter)", color: "#993434" }}
          >
            About Emara
          </p>

          <h2
            className="font-light leading-[1.15] mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "var(--em-text)",
              whiteSpace: "pre-line",
            }}
          >
            {"Four decades of design,\nconstruction & craft."}
          </h2>

          <p
            className="mb-8"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
              fontSize: "0.9rem",
              color: "var(--em-muted)",
              lineHeight: 1.8,
              maxWidth: "460px",
            }}
          >
            With over four decades of experience, our journey began with miniature
            architectural models — combining functionality and aesthetics with
            fastidious attention to detail. From industrial buildings to palaces and
            villas, we have shaped spaces across Egypt.
          </p>

          <Link
            href="/about"
            className="text-xs tracking-[0.2em] uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              color: "#993434",
              borderBottom: "1px solid #993434",
              paddingBottom: "2px",
            }}
          >
            Read more →
          </Link>
        </div>

        {/* Right: stats */}
        <div className="flex flex-col divide-y" style={{ borderColor: "var(--em-border)" }}>
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="py-8 first:pt-0 last:pb-0"
              style={{ borderColor: "var(--em-border)" }}
            >
              <p
                className="font-light leading-none mb-2"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(3rem, 5vw, 4.5rem)",
                  color: "#993434",
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-inter)", color: "var(--em-muted)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
