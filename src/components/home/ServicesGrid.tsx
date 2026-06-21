import Link from "next/link";
import {
  Building2,
  Layers,
  PenLine,
  TreePine,
  Wrench,
  HardHat,
  Box,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  badge: string | null;
}

const SERVICES: Service[] = [
  {
    icon: Building2,
    title: "Structural Design",
    desc: "Concrete & steel facilities per Egyptian, American, European and British codes.",
    badge: null,
  },
  {
    icon: Layers,
    title: "Architectural Design",
    desc: "Exterior and interior designs for villas, palaces, factories, restaurants, and more.",
    badge: null,
  },
  {
    icon: PenLine,
    title: "Interior Architecture",
    desc: "Planning interiors to meet functional requirements while maximising spatial utilisation.",
    badge: null,
  },
  {
    icon: TreePine,
    title: "Landscape Design",
    desc: "Softscape planting and hardscape — pergolas, pools, walkways, fountains, and lighting.",
    badge: null,
  },
  {
    icon: Wrench,
    title: "Restoration & Strengthening",
    desc: "Repair of structural elements, treatment of cracks and fissures.",
    badge: null,
  },
  {
    icon: HardHat,
    title: "Construction Supervision",
    desc: "Full review of specs, drawings, schedules, on-site inspection and soil reports.",
    badge: null,
  },
  {
    icon: Box,
    title: "Model Making",
    desc: "Scaled architectural maquettes — the craft that started Emara in 1989.",
    badge: "Gallery",
  },
];

export default function ServicesGrid() {
  return (
    <section
      style={{
        background: "var(--em-surface)",
        padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 8vw, 5rem)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "80rem" }}>
        {/* Section header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          style={{ marginBottom: "3rem" }}
        >
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-saira)", color: "#993434" }}
            >
              07 Services
            </p>
            <h2
              className="font-light leading-[1.15]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "var(--em-text)",
                whiteSpace: "pre-line",
              }}
            >
              {"Every discipline,\nin one studio."}
            </h2>
          </div>

          <Link
            href="/services"
            className="text-xs tracking-[0.2em] uppercase shrink-0"
            style={{
              fontFamily: "var(--font-saira)",
              color: "#993434",
              borderBottom: "1px solid #993434",
              paddingBottom: "2px",
              alignSelf: "flex-end",
            }}
          >
            View all services →
          </Link>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="transition-colors duration-300 hover:[background:var(--em-card-hover)]"
                style={{
                  background: "var(--em-card)",
                  border: "1px solid var(--em-border)",
                  padding: "1.5rem",
                }}
              >
                <Icon size={28} color="#993434" strokeWidth={1.5} />

                <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-saira)",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "var(--em-text)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {service.title}
                  </span>
                  {service.badge && (
                    <span
                      style={{
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        fontSize: "0.6rem",
                        padding: "2px 8px",
                        background: "rgba(153,52,52,0.1)",
                        color: "#993434",
                        borderRadius: "9999px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-saira)",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: "var(--em-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
