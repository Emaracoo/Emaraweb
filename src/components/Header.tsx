"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

const links = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [dark,        setDark]        = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

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

  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background:    solid ? "var(--em-header-bg)"     : "transparent",
          backdropFilter: solid ? "blur(12px)"              : "none",
          borderBottom:  solid ? "1px solid var(--em-header-border)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="w-8 h-8 flex items-center justify-center" style={{ background: "#E85830" }}>
              <span className="w-3 h-3 bg-white" />
            </span>
            <span
              className="tracking-[0.25em] uppercase text-sm font-medium transition-colors duration-300"
              style={{ fontFamily: "var(--font-inter)", color: solid ? "var(--em-header-text)" : "#fff" }}
            >
              Emara
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    color: solid
                      ? active ? "#E85830" : "var(--em-header-text)"
                      : active ? "#E85830" : "rgba(255,255,255,0.85)",
                  }}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px" style={{ background: "#E85830" }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: theme toggle + enquire + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center transition-colors duration-300"
              style={{ color: solid ? "var(--em-header-text)" : "rgba(255,255,255,0.65)" }}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
            </button>

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-6 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{ fontFamily: "var(--font-inter)", background: "#E85830", color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#C44422")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#E85830")}
            >
              Enquire
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
              className="text-3xl tracking-[0.1em] uppercase transition-colors"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                color: pathname === link.href ? "#E85830" : "var(--em-text)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-10 py-3 text-sm tracking-[0.2em] uppercase text-white"
            style={{ fontFamily: "var(--font-inter)", background: "#E85830" }}
          >
            Enquire
          </Link>
        </div>
      </div>
    </>
  );
}
