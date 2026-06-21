"use client";

import Link from "next/link";

const nav = {
  Studio: [
    { label: "About Us",   href: "/about" },
    { label: "Our Story",  href: "/about" },
    { label: "Contact",    href: "/contact" },
  ],
  Services: [
    { label: "Structural Design",  href: "/services" },
    { label: "Architecture",       href: "/services" },
    { label: "Interior Design",    href: "/services" },
    { label: "Landscape",          href: "/services" },
    { label: "Maquettes",          href: "/services" },
  ],
  Work: [
    { label: "Residential", href: "/projects" },
    { label: "Commercial",  href: "/projects" },
    { label: "Industrial",  href: "/projects" },
    { label: "Administrative", href: "/projects" },
  ],
};

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/emaraconstruction/" },
  { label: "Facebook",  href: "https://www.facebook.com/emaraconstruction/" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#441919", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 lg:pr-12">
            <Link href="/" className="flex items-center gap-3 mb-8 w-fit">
              <span className="w-8 h-8 flex items-center justify-center" style={{ background: "#993434" }}>
                <span className="w-3 h-3 bg-white" />
              </span>
              <span className="text-white tracking-[0.25em] uppercase text-sm font-light" style={{ fontFamily: "var(--font-saira)" }}>
                Emara
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-saira)", fontWeight: 300, color: "rgba(255,255,255,0.4)", maxWidth: "280px" }}>
              Four decades of experience in design and construction. From industrial structures to villas and palaces — based in Heliopolis, Cairo.
            </p>
            <div className="text-xs leading-relaxed mb-10" style={{ fontFamily: "var(--font-saira)", color: "rgba(255,255,255,0.2)" }}>
              5 Al-Hariry St, beside Tivoli Dome<br />
              Heliopolis, Cairo, Egypt · Info@EmaraCo.com
            </div>
            <div className="flex items-center gap-5 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] uppercase transition-colors duration-300"
                  style={{ fontFamily: "var(--font-saira)", color: "rgba(255,255,255,0.25)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#993434")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([section, items]) => (
            <div key={section}>
              <div className="text-xs tracking-[0.25em] uppercase mb-6 text-white" style={{ fontFamily: "var(--font-saira)" }}>
                {section}
              </div>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors duration-300"
                      style={{ fontFamily: "var(--font-saira)", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#993434")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-xs" style={{ fontFamily: "var(--font-saira)", color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} Emara Construction. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <button
                key={item}
                className="text-xs transition-colors duration-300"
                style={{ fontFamily: "var(--font-saira)", color: "rgba(255,255,255,0.2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
