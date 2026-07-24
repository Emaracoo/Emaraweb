"use client";

import { useState } from "react";
import Link from "next/link";
import { useFadeIn } from "@/hooks/useFadeIn";
import { SERVICE_ICONS, DEFAULT_SERVICE_ICON } from "@/lib/service-icons";

export interface ServiceItem { slug: string; icon: string | null; title: string; desc: string }

interface Props {
  lang: "en" | "ar";
  services: ServiceItem[];
  eyebrow: string;
  heading: string;
  learnMore: string;
  contactHref: string;
}

function ServiceCard({ service, delay, visible, learnMore, href }: { service: ServiceItem; delay: number; visible: boolean; learnMore: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = (service.icon && SERVICE_ICONS[service.icon]) || DEFAULT_SERVICE_ICON;
  return (
    <div
      className="relative flex flex-col p-8 border overflow-hidden cursor-default h-full"
      style={{ background: hovered ? "#441919" : "var(--em-card)", borderColor: hovered ? "#441919" : "var(--em-border)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, background 0.35s ease, border-color 0.35s ease` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "absolute", top: 0, left: 0, height: "3px", background: "#993434", width: hovered ? "100%" : "0%", transition: "width 0.45s ease" }} />
      <div className="mb-6" style={{ color: "#993434" }}><Icon size={22} strokeWidth={1.5} /></div>
      <h3 className="font-light mb-3" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: hovered ? "#FFFFFF" : "var(--em-text)", transition: "color 0.3s ease" }}>
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed flex-1 mb-6" style={{ fontFamily: "var(--font-saira)", fontWeight: 300, color: hovered ? "rgba(255,255,255,0.55)" : "var(--em-muted)", transition: "color 0.3s ease" }}>
        {service.desc}
      </p>
      <Link href={href} className="text-xs tracking-[0.2em] uppercase flex items-center gap-2 transition-colors duration-300" style={{ fontFamily: "var(--font-saira)", color: hovered ? "#993434" : "var(--em-muted)" }}>
        {learnMore}
      </Link>
    </div>
  );
}

export default function ServicesList({ lang, services, eyebrow, heading, learnMore, contactHref }: Props) {
  const f   = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs  = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";
  const { ref, visible } = useFadeIn();

  return (
    <section className="py-24" style={{ background: "var(--em-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px" style={{ background: "#993434" }} />
            <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{eyebrow}</span>
          </div>
          <h2 className="font-light leading-[1.1] mb-16" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)", maxWidth: "36rem" }}>
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t" style={{ borderColor: "var(--em-border)" }}>
          {services.map((service, i) => (
            <div key={service.slug} id={service.slug} className="border-r border-b flex flex-col" style={{ borderColor: "var(--em-border)", scrollMarginTop: "7rem" }}>
              <ServiceCard service={service} delay={i * 80} visible={visible} learnMore={learnMore} href={contactHref} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
