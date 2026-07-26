"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";

const FOOTER_T = {
  en: {
    tagline: "Four decades of experience in design and construction. From industrial structures to villas and palaces — based in Heliopolis, Cairo.",
    address: "5 Al-Hariry St, beside Tivoli Dome\nHeliopolis, Cairo, Egypt · Info@EmaraCo.com",
    studio: "Studio", services: "Services", work: "Work",
    about: "About Us", story: "Our Story", contact: "Contact",
    structural: "Structural Design", architecture: "Architectural Design",
    interior: "Interior Architecture", landscape: "Landscape Design",
    restoration: "Restoration & Strengthening", supervision: "Construction Supervision",
    maquettes: "Model Making (Maquettes)",
    residential: "Residential", commercial: "Commercial",
    industrial: "Industrial", administrative: "Administrative",
    privacy: "Privacy Policy", terms: "Terms of Use", rights: "All rights reserved.",
  },
  ar: {
    tagline: "أربعة عقود من الخبرة في التصميم والبناء. من المنشآت الصناعية إلى الفيلات والقصور — مقرنا في مصر الجديدة، القاهرة.",
    address: "٥ شارع الحريري، بجوار تيفولي دوم\nمصر الجديدة، القاهرة، مصر · Info@EmaraCo.com",
    studio: "الاستوديو", services: "الخدمات", work: "الأعمال",
    about: "من نحن", story: "قصتنا", contact: "تواصل معنا",
    structural: "التصميم الإنشائي", architecture: "التصميم المعماري",
    interior: "العمارة الداخلية", landscape: "تصميم المناظر الطبيعية",
    restoration: "الترميم والتقوية", supervision: "الإشراف على التنفيذ",
    maquettes: "صناعة المجسمات",
    residential: "سكني", commercial: "تجاري",
    industrial: "صناعي", administrative: "إداري",
    privacy: "سياسة الخصوصية", terms: "شروط الاستخدام", rights: "جميع الحقوق محفوظة.",
  },
};

interface Social { label: string; href: string }
interface WorkCategory { categoryEn: string; categoryAr: string | null }

interface Props {
  logoUrl?: string | null;
  companyName?: string | null;
  taglineEn?: string | null;
  taglineAr?: string | null;
  addressEn?: string | null;
  addressAr?: string | null;
  socials: Social[];
  privacyUrl?: string | null;
  termsUrl?: string | null;
  workCategories: WorkCategory[];
}

export default function FooterClient({ logoUrl, companyName, taglineEn, taglineAr, addressEn, addressAr, socials, privacyUrl, termsUrl, workCategories }: Props) {
  const lang = useLang();
  const t    = FOOTER_T[lang];
  const f    = "var(--font-saira)";
  const fa   = lang === "ar" ? "var(--font-cairo)" : f;

  const logo    = logoUrl || "/logo.png";
  const company = companyName || "Emara Construction";
  const tagline = (lang === "ar" ? taglineAr : taglineEn) || t.tagline;
  const address = (lang === "ar" ? addressAr : addressEn) || t.address;

  const nav = {
    [t.studio]: [
      { label: t.about,   href: `/${lang}/about` },
      { label: t.story,   href: `/${lang}/about#story` },
      { label: t.contact, href: `/${lang}/contact` },
    ],
    [t.services]: [
      { label: t.structural,   href: `/${lang}/services#structural-design` },
      { label: t.architecture, href: `/${lang}/services#architectural-design` },
      { label: t.interior,     href: `/${lang}/services#interior-architecture` },
      { label: t.landscape,    href: `/${lang}/services#landscape-design` },
      { label: t.restoration,  href: `/${lang}/services#restoration-strengthening` },
      { label: t.supervision,  href: `/${lang}/services#construction-supervision` },
      { label: t.maquettes,    href: `/${lang}/services#model-making` },
    ],
    [t.work]: workCategories.length > 0
      ? workCategories.map(c => ({
          label: (lang === "ar" && c.categoryAr) || c.categoryEn,
          href: `/${lang}/projects?cat=${encodeURIComponent(c.categoryEn)}`,
        }))
      : [
          { label: t.residential,    href: `/${lang}/projects?cat=Residential` },
          { label: t.commercial,     href: `/${lang}/projects?cat=Commercial` },
          { label: t.industrial,     href: `/${lang}/projects?cat=Industrial` },
          { label: t.administrative, href: `/${lang}/projects?cat=Administrative` },
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
                src={logo}
                alt={company}
                style={{ height: "64px", width: "auto", filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-8" style={{ fontFamily: fa, fontWeight: 300, color: "rgba(255,255,255,0.4)", maxWidth: "280px" }}>
              {tagline}
            </p>
            <div className="text-xs leading-relaxed mb-10" style={{ fontFamily: fa, color: "rgba(255,255,255,0.2)", whiteSpace: "pre-line" }}>
              {address}
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
            © {new Date().getFullYear()} {company}. {t.rights}
          </div>
          <div className="flex items-center gap-6">
            {([[t.privacy, privacyUrl], [t.terms, termsUrl]] as const).map(([label, href]) => (
              href ? (
                <Link
                  key={label}
                  href={href}
                  className="text-xs transition-colors duration-300"
                  style={{ fontFamily: fa, color: "rgba(255,255,255,0.2)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
                >
                  {label}
                </Link>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
