"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  Lightbulb,
  Layers,
  Sofa,
  Map,
  Trees,
  RefreshCw,
  Leaf,
  ClipboardList,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ProcessSteps from "@/components/home/ProcessSteps";
import ContactCTA from "@/components/home/ContactCTA";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ---------------------------------------------------------------------------
// Services data
// ---------------------------------------------------------------------------

const services = [
  {
    icon: Search,
    title: "Feasibility Studies",
    desc: "Rigorous analysis of site, programme, and market conditions to validate the opportunity before a line is drawn.",
  },
  {
    icon: Lightbulb,
    title: "Conceptual Design",
    desc: "Bold architectural ideas translated into spatial narratives — defining character, massing, and the organisational logic of a project.",
  },
  {
    icon: Layers,
    title: "Architectural Design",
    desc: "Full RIBA-stage design from schematic through technical documentation, coordinated with structure and MEP.",
  },
  {
    icon: Sofa,
    title: "Interior Architecture",
    desc: "Interiors conceived as extensions of the architecture — material palettes, bespoke joinery, and spatial sequences aligned with the building's identity.",
  },
  {
    icon: Map,
    title: "Urban Planning",
    desc: "Master-planning and strategic frameworks for mixed-use districts, new towns, and cultural quarters at every scale.",
  },
  {
    icon: Trees,
    title: "Landscape Design",
    desc: "Outdoor environments that respond to climate, ecology, and cultural context — from intimate courtyards to large public realms.",
  },
  {
    icon: RefreshCw,
    title: "Renovation & Adaptive Reuse",
    desc: "Breathing new purpose into existing structures while preserving the embodied value, memory, and craft of the original.",
  },
  {
    icon: Leaf,
    title: "Sustainability Consulting",
    desc: "Passive design strategies, environmental modelling, and pathway-to-certification support across LEED, BREEAM, and Estidama.",
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    desc: "End-to-end programme and cost management ensuring projects are delivered on time, on budget, and true to design intent.",
  },
];

// ---------------------------------------------------------------------------
// Service card
// ---------------------------------------------------------------------------

function ServiceCard({
  service,
  delay,
  visible,
}: {
  service: typeof services[0];
  delay: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className="relative flex flex-col p-8 border overflow-hidden cursor-default"
      style={{
        background: hovered ? "#1A1916" : "var(--em-card)",
        borderColor: hovered ? "#1A1916" : "var(--em-border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, background 0.35s ease, border-color 0.35s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated orange top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "3px",
          background: "#E85830",
          width: hovered ? "100%" : "0%",
          transition: "width 0.45s ease",
        }}
      />

      {/* Icon */}
      <div
        className="mb-6"
        style={{ color: hovered ? "#E85830" : "#E85830", transition: "color 0.3s ease" }}
      >
        <Icon size={22} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3
        className="font-light mb-3"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.4rem",
          color: hovered ? "#FFFFFF" : "var(--em-text)",
          transition: "color 0.3s ease",
        }}
      >
        {service.title}
      </h3>

      {/* Desc */}
      <p
        className="text-sm leading-relaxed flex-1 mb-6"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 300,
          color: hovered ? "rgba(255,255,255,0.55)" : "var(--em-muted)",
          transition: "color 0.3s ease",
        }}
      >
        {service.desc}
      </p>

      {/* Learn more */}
      <Link
        href="/contact"
        className="text-xs tracking-[0.2em] uppercase flex items-center gap-2 transition-colors duration-300"
        style={{
          fontFamily: "var(--font-inter)",
          color: hovered ? "#E85830" : "var(--em-muted)",
        }}
      >
        Learn more
        <span style={{ fontSize: "0.7rem" }}>→</span>
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Services grid section
// ---------------------------------------------------------------------------

function ServicesGrid() {
  const { ref, visible } = useFadeIn();

  return (
    <section className="py-24" style={{ background: "var(--em-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px" style={{ background: "#E85830" }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}
            >
              Our Services
            </span>
          </div>
          <h2
            className="font-light leading-[1.1] mb-16"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "var(--em-text)",
              maxWidth: "36rem",
            }}
          >
            Everything a Project Needs, Under One Roof
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t" style={{ borderColor: "var(--em-border)" }}>
          {services.map((service, i) => (
            <div key={service.title} className="border-r border-b" style={{ borderColor: "var(--em-border)" }}>
              <ServiceCard service={service} delay={i * 80} visible={visible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="What We Do"
          title="A Full Spectrum"
          titleAccent="of Expertise"
          subtitle="From the first sketch to final handover — architecture, interiors, landscape, and strategy."
        />
        <ServicesGrid />
        <ProcessSteps />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
