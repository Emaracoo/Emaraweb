"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

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
// Studio Story
// ---------------------------------------------------------------------------

function StudioStory() {
  const { ref, visible } = useFadeIn();

  const stats = [
    { value: "40+", label: "Team members" },
    { value: "12", label: "Countries" },
    { value: "18", label: "Years" },
  ];

  return (
    <section className="py-24" style={{ background: "var(--em-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Image — tall aspect ratio */}
          <div
            className="overflow-hidden"
            style={{
              aspectRatio: "3/4",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80"
              alt="Emara studio interior"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text side */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-px" style={{ background: "#E85830" }} />
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}
              >
                Who we are
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-light leading-[1.1] mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "var(--em-text)",
              }}
            >
              Architecture that serves both the individual and the city.
            </h2>

            {/* Body */}
            <p
              className="leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: "0.9rem", color: "var(--em-muted)" }}
            >
              Since our founding in Dubai in 2006, Emara has built its reputation on the belief that
              great architecture is neither about spectacle nor mere utility — it is the disciplined
              pursuit of both. Every project begins with a question: what does this place truly need?
              That inquiry guides every decision from the first sketch to the final handover.
            </p>
            <p
              className="leading-relaxed mb-12"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: "0.9rem", color: "var(--em-muted)" }}
            >
              Across residential towers, cultural institutions, master-planned communities, and
              intimate private residences, we bring the same rigour and curiosity to each brief.
              Our interdisciplinary team of architects, interior designers, and urban strategists
              works as one — ensuring a coherence of vision from the broadest urban gesture to the
              smallest material detail.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-0 border-t" style={{ borderColor: "var(--em-border)" }}>
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="pt-8 pr-6"
                  style={{
                    borderRight: i < stats.length - 1 ? `1px solid var(--em-border)` : "none",
                    paddingLeft: i > 0 ? "1.5rem" : 0,
                  }}
                >
                  <div
                    className="font-light leading-none mb-1"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", color: "#E85830" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ fontFamily: "var(--font-inter)", color: "var(--em-muted)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------

const values = [
  {
    num: "01",
    title: "Craft & Detail",
    desc: "We believe the quality of a building is expressed in its details. Every joint, threshold, and surface is an opportunity to demonstrate care — and care is what endures.",
  },
  {
    num: "02",
    title: "Contextual Sensitivity",
    desc: "Architecture that ignores its surroundings impoverishes them. We listen to place — its climate, culture, and memory — before proposing anything new.",
  },
  {
    num: "03",
    title: "Sustainable Thinking",
    desc: "True sustainability is not a checklist but a disposition. We design for longevity: buildings that consume less, age gracefully, and remain relevant across generations.",
  },
];

function Values() {
  const { ref, visible } = useFadeIn();

  return (
    <section className="py-24" style={{ background: "var(--em-surface)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Eyebrow */}
        <div
          ref={ref}
          className="flex items-center gap-3 mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="w-10 h-px" style={{ background: "#E85830" }} />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}
          >
            Our Values
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {values.map((v, i) => (
            <div
              key={v.num}
              className="relative p-10 border-t-2"
              style={{
                borderTopColor: "var(--em-border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
              }}
            >
              {/* Large faded number */}
              <div
                className="font-light leading-none select-none mb-6"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "5rem",
                  color: "var(--em-border)",
                }}
              >
                {v.num}
              </div>
              <h3
                className="mb-4 font-light"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.6rem",
                  color: "var(--em-text)",
                }}
              >
                {v.title}
              </h3>
              <p
                className="leading-relaxed text-sm"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--em-muted)" }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

const timeline = [
  { year: "2006", title: "Studio Founded", desc: "Emara opens its first studio in the DIFC, Dubai, with a founding team of seven architects." },
  { year: "2009", title: "First Cultural Commission", desc: "Selected to design the Al Barari Cultural Pavilion — our first major public commission." },
  { year: "2012", title: "Regional Expansion", desc: "Offices established in Riyadh and Abu Dhabi, extending our reach across the Gulf." },
  { year: "2016", title: "Aga Khan Award Shortlist", desc: "The Wadi Residential Quarter is shortlisted for the Aga Khan Award for Architecture." },
  { year: "2020", title: "Sustainability Charter", desc: "Launch of Emara's own Sustainability Charter, pledging net-zero operations by 2035." },
  { year: "2024", title: "MENA Architecture Award", desc: "Named Studio of the Year at the MENA Architecture Awards for the Diriyah Cultural Gate." },
];

function Timeline() {
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
              Recognition
            </span>
          </div>
          <h2
            className="font-light leading-[1.1] mb-16"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "var(--em-text)",
              maxWidth: "32rem",
            }}
          >
            Eighteen Years of Achievement
          </h2>
        </div>

        {/* List */}
        <div className="space-y-0">
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] lg:grid-cols-[10rem_1fr] gap-4 sm:gap-8 lg:gap-16 py-8 border-t"
              style={{
                borderColor: "var(--em-border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
              }}
            >
              <div
                className="font-light pt-0.5 shrink-0"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.5rem",
                  color: "#E85830",
                }}
              >
                {item.year}
              </div>
              <div>
                <h3
                  className="font-light mb-1"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.25rem",
                    color: "var(--em-text)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--em-muted)" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

const team = [
  {
    name: "Karim Al-Rashid",
    role: "Founding Partner",
    bio: "Twenty years shaping the built environment across the Gulf and beyond.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Layla Mansour",
    role: "Design Director",
    bio: "Harvard GSD graduate with a specialism in cultural and civic architecture.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    name: "Omar Haddad",
    role: "Principal Architect",
    bio: "Led over thirty award-winning residential and hospitality projects.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
  {
    name: "Nour El-Sayed",
    role: "Interior Design Lead",
    bio: "Transforms spatial concepts into tactile, atmosphere-rich environments.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  },
  {
    name: "Tariq Yousef",
    role: "Sustainability Director",
    bio: "Chartered engineer and LEED AP with a focus on passive design strategies.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
  },
  {
    name: "Rana Khalil",
    role: "Urban Planning Lead",
    bio: "Specialises in master-planning and large-scale mixed-use urban quarters.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
  },
  {
    name: "Sami Boutros",
    role: "Associate Architect",
    bio: "Detail-obsessed designer with a background in parametric and fabrication workflows.",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=80",
  },
  {
    name: "Dina Al-Farsi",
    role: "Project Director",
    bio: "Expert in client relations and complex, multi-phase delivery programmes.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
  },
];

function TeamCard({ member, delay }: { member: typeof team[0]; delay: number }) {
  const { ref, visible } = useFadeIn(0.05);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {/* Image */}
      <div
        className="overflow-hidden mb-4"
        style={{ aspectRatio: "1/1" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-all duration-500"
          style={{
            filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>

      {/* Info */}
      <h3
        className="font-light mb-0.5"
        style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", color: "var(--em-text)" }}
      >
        {member.name}
      </h3>
      <div
        className="text-xs tracking-[0.15em] uppercase mb-2"
        style={{ fontFamily: "var(--font-inter)", color: "#E85830" }}
      >
        {member.role}
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--em-muted)" }}
      >
        {member.bio}
      </p>
    </div>
  );
}

function Team() {
  const { ref, visible } = useFadeIn();

  return (
    <section className="py-24" style={{ background: "var(--em-surface)" }}>
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
              The Studio
            </span>
          </div>
          <h2
            className="font-light leading-[1.1] mb-16"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "var(--em-text)",
              maxWidth: "32rem",
            }}
          >
            Meet the People Behind the Work
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Our Story"
          title="Making Architecture"
          titleAccent="with Intention"
          subtitle="Founded in 2006, Emara has grown into one of the MENA region's most celebrated studios."
          image="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=1200&q=80"
        />
        <StudioStory />
        <Values />
        <Timeline />
        <Team />
      </main>
      <Footer />
    </>
  );
}
