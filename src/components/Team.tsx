"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Mail } from "lucide-react";

const team = [
  {
    name: "Omar Al-Emara",
    role: "Founding Principal",
    bio: "18 years of practice across the Gulf. Former Studio Director at Zaha Hadid Architects.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Nadia Farouk",
    role: "Design Director",
    bio: "Champion of sustainable architecture and material innovation. Harvard GSD graduate.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "James Chen",
    role: "Technical Director",
    bio: "Structural engineer turned architect. Specialist in complex façade engineering.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Reem Al-Sayed",
    role: "Interior Architecture Lead",
    bio: "Crafts interiors that feel inevitable — where material, light and function converge.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "Lucas Moreau",
    role: "Landscape Director",
    bio: "Trained at ETH Zürich. Leads our landscape architecture and urban ecology practice.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Sara Khalil",
    role: "Sustainability Lead",
    bio: "LEED AP and BREEAM assessor. Guides our environmental performance strategy.",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80",
  },
  {
    name: "Ahmed Hassan",
    role: "Project Director",
    bio: "Delivery specialist — 50+ projects delivered across the UAE, KSA and Egypt.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
  {
    name: "Yuki Tanaka",
    role: "Research & Innovation Lead",
    bio: "Explores the intersection of computation, fabrication and architectural form.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
];

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" className="bg-[#F5F3F0] py-28 lg:py-36" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-[#B89155]" />
            <span
              className="text-[#B89155] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-saira)" }}
            >
              The Studio
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-20 items-end mb-14">
            <h2
              className="text-[#111] text-5xl lg:text-6xl font-light leading-[1.1]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Meet the<br />
              <em>People Behind the Work</em>
            </h2>
            <p
              className="text-[#8A8A8A] text-sm leading-relaxed lg:pb-2"
              style={{ fontFamily: "var(--font-saira)", fontWeight: 300 }}
            >
              A diverse team of forty architects, engineers, landscape designers, and researchers — united by curiosity and a commitment to excellence.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="group cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.6s ease ${i * 60}ms, transform 0.6s ease ${i * 60}ms`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Photo */}
              <div className="relative overflow-hidden aspect-[3/4] mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 flex items-end p-4 transition-all duration-500"
                  style={{
                    background: "linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 60%)",
                    opacity: hovered === i ? 1 : 0,
                  }}
                >
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-[#B89155] hover:border-[#B89155] transition-all duration-300">
                      <ExternalLink size={12} />
                    </button>
                    <button className="w-8 h-8 bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-[#B89155] hover:border-[#B89155] transition-all duration-300">
                      <Mail size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3
                  className="text-[#111] font-light text-lg group-hover:text-[#B89155] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {member.name}
                </h3>
                <div
                  className="text-[#B89155] text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ fontFamily: "var(--font-saira)" }}
                >
                  {member.role}
                </div>
                <p
                  className="text-[#8A8A8A] text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-saira)", fontWeight: 300 }}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
