"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";

const FOOTER_T = {
  en: {
    tagline: "Four decades of experience in design and construction. From industrial structures to villas and palaces — based in Heliopolis, Cairo.",
    address: "5 Al-Hariry St, beside Tivoli Dome\nHeliopolis, Cairo, Egypt · Info@EmaraCo.com",
    studio: "Studio", services: "Services", work: "Work",
    about: "About Us", story: "Our Story", contact: "Contact",
    structural: "Structural Design", architecture: "Architecture",
    interior: "Interior Design", landscape: "Landscape", maquettes: "Maquettes",
    residential: "Residential", commercial: "Commercial",
    industrial: "Industrial", administrative: "Administrative",
    privacy: "Privacy Policy", terms: "Terms of Use", rights: "All rights reserved.",
  },
  ar: {
    tagline: "أربعة عقود من الخبرة في التصميم والبناء. من المنشآت الصناعية إلى الفيلات والقصور — مقرنا في مصر الجديدة، القاهرة.",
    address: "٥ شارع الحريري، بجوار تيفولي دوم\nمصر الجديدة، القاهرة، مصر · Info@EmaraCo.com",
    studio: "الاستوديو", services: "الخدمات", work: "الأعمال",
    about: "من نحن", story: "قصتنا", contact: "تواصل معنا",
    structural: "التصميم الإنشائي", architecture: "العمارة",
    interior: "التصميم الداخلي", landscape: "المناظر الطبيعية", maquettes: "المجسمات",
    residential: "سكني", commercial: "تجاري",
    industrial: "صناعي", administrative: "إداري",
    privacy: "سياسة الخصوصية", terms: "شروط الاستخدام", rights: "جميع الحقوق محفوظة.",
  },
};

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/emaraconstruction/" },
  { label: "Facebook",  href: "https://www.facebook.com/emaraconstruction/" },
];

export default function Footer() {
  const lang = useLang();
  const t    = FOOTER_T[lang];
  const f    = "var(--font-saira)";
  const fa   = lang === "ar" ? "var(--font-cairo)" : f;

  const nav = {
    [t.studio]: [
      { label: t.about,   href: `/${lang}/about` },
      { label: t.story,   href: `/${lang}/about` },
      { label: t.contact, href: `/${lang}/contact` },
    ],
    [t.services]: [
      { label: t.structural,   href: `/${lang}/services` },
      { label: t.architecture, href: `/${lang}/services` },
      { label: t.interior,     href: `/${lang}/services` },
      { label: t.landscape,    href: `/${lang}/services` },
      { label: t.maquettes,    href: `/${lang}/services` },
    ],
    [t.work]: [
      { label: t.residential,   href: `/${lang}/projects` },
      { label: t.commercial,    href: `/${lang}/projects` },
      { label: t.industrial,    href: `/${lang}/projects` },
      { label: t.administrative, href: `/${lang}/projects` },
    ],
  };

  return (
    <footer style={{ background: "#441919", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 lg:pr-12">
            <Link href={`/${lang}`} className="flex items-center mb-8 w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Emara Co."
                style={{ height: "42px", width: "auto", filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-8" style={{ fontFamily: fa, fontWeight: 300, color: "rgba(255,255,255,0.4)", maxWidth: "280px" }}>
              {t.tagline}
            </p>
            <div className="text-xs leading-relaxed mb-10" style={{ fontFamily: fa, color: "rgba(255,255,255,0.2)", whiteSpace: "pre-line" }}>
              {t.address}
            </div>
            <div className="flex items-center gap-5 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] uppercase transition-colors duration-300"
                  style={{ fontFamily: f, color: "rgba(255,255,255,0.25)" }}
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
              <div className="text-xs tracking-[0.25em] uppercase mb-6 text-white" style={{ fontFamily: fa }}>
                {section}
              </div>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors duration-300"
                      style={{ fontFamily: fa, fontWeight: 300, color: "rgba(255,255,255,0.4)" }}
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
          <div className="text-xs" style={{ fontFamily: fa, color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} Emara Construction. {t.rights}
          </div>
          <div className="flex items-center gap-6">
            {[t.privacy, t.terms].map((item) => (
              <button
                key={item}
                className="text-xs transition-colors duration-300"
                style={{ fontFamily: fa, color: "rgba(255,255,255,0.2)" }}
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
