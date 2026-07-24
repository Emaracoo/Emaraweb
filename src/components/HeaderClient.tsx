"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLang } from "./LangProvider";

const NAV_LABELS = {
  en: {
    home: "Home", about: "About", services: "Services",
    projects: "Projects", partners: "Partners", blog: "Blog", contact: "Contact",
    enquire: "Enquire", langSwitch: "ع",
  },
  ar: {
    home: "الرئيسية", about: "من نحن", services: "خدماتنا",
    projects: "مشاريعنا", partners: "شركاؤنا", blog: "المدونة", contact: "اتصل بنا",
    enquire: "استفسر", langSwitch: "EN",
  },
};

interface Props {
  logoUrl?: string | null;
}

export default function HeaderClient({ logoUrl }: Props) {
  const logo      = logoUrl || "/logo.png";
  const lang      = useLang();
  const t         = NAV_LABELS[lang];
  const pathname  = usePathname();
  const router    = useRouter();

  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark,       setDark]       = useState(false);

  const prefix   = `/${lang}`;
  const isHome   = pathname === prefix || pathname === `${prefix}/`;

  const links = [
    { label: t.home,     href: `/${lang}` },
    { label: t.about,    href: `/${lang}/about` },
    { label: t.services, href: `/${lang}/services` },
    { label: t.projects, href: `/${lang}/projects` },
    { label: t.partners, href: `/${lang}/partners` },
    { label: t.blog,     href: `/${lang}/blog` },
    { label: t.contact,  href: `/${lang}/contact` },
  ];

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("emara-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("emara-theme", "light");
    }
  };

  const switchLang = () => {
    const other = lang === "en" ? "ar" : "en";
    // swap /en/ → /ar/ keeping the rest of the path
    const newPath = pathname.replace(`/${lang}`, `/${other}`);
    router.push(newPath);
  };

  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background:     solid ? "var(--em-header-bg)"     : "transparent",
          backdropFilter: solid ? "blur(12px)"               : "none",
          borderBottom:   solid ? "1px solid var(--em-header-border)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-24">

          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt="Emara Co."
              style={{
                height: "88px",
                width: "auto",
                filter: (!solid || dark) ? "brightness(0) invert(1)" : "none",
                transition: "filter 0.4s ease",
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs transition-colors duration-300 ${lang !== "ar" ? "tracking-[0.2em] uppercase" : ""}`}
                  style={{
                    fontFamily: lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)",
                    letterSpacing: lang === "ar" ? "0" : undefined,
                    fontWeight: 400,
                    color: solid
                      ? active ? "#993434" : "var(--em-header-text)"
                      : active ? "#993434" : "rgba(255,255,255,0.85)",
                  }}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px" style={{ background: "#993434" }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: theme + lang switch + enquire + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center transition-colors duration-300"
              style={{ color: solid ? "var(--em-header-text)" : "rgba(255,255,255,0.65)" }}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
            </button>

            <button
              onClick={switchLang}
              className="hidden lg:inline-flex items-center px-3 py-1 text-xs tracking-[0.1em] transition-colors duration-300"
              style={{
                fontFamily: "var(--font-saira)",
                color: solid ? "var(--em-header-text)" : "rgba(255,255,255,0.85)",
              }}
              aria-label="Switch language"
            >
              {t.langSwitch}
            </button>

            <Link
              href={`/${lang}/contact`}
              className="hidden lg:inline-flex items-center px-6 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{
                fontFamily: lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)",
                background: "#993434",
                color: "#fff",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#682A2A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#993434")}
            >
              {t.enquire}
            </Link>

            <button
              className="lg:hidden p-1 transition-colors"
              style={{ color: solid ? "var(--em-header-text)" : "#fff" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-500"
        style={{
          background:    "var(--em-bg)",
          opacity:       mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "all" : "none",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-3xl transition-colors ${lang !== "ar" ? "tracking-[0.1em] uppercase" : ""}`}
              style={{
                fontFamily: lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)",
                letterSpacing: lang === "ar" ? "0" : undefined,
                fontWeight: 400,
                color: pathname === link.href ? "#993434" : "var(--em-text)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { switchLang(); setMobileOpen(false); }}
            className="mt-2 text-sm tracking-[0.15em]"
            style={{ fontFamily: "var(--font-saira)", color: "var(--em-muted)" }}
          >
            {t.langSwitch}
          </button>
          <Link
            href={`/${lang}/contact`}
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-10 py-3 text-sm tracking-[0.2em] uppercase text-white"
            style={{
              fontFamily: lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)",
              background: "#993434",
            }}
          >
            {t.enquire}
          </Link>
        </div>
      </div>
    </>
  );
}
