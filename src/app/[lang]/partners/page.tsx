import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { hasLocale } from "../dictionaries";
import { prisma } from "@/lib/prisma";

interface Client { name: string; nameAr: string; logo: string }
interface Sector { labelEn: string; labelAr: string; clients: Client[] }

interface Stat { value: string; labelEn: string; labelAr: string }

const FALLBACK_STATS: Stat[] = [
  { value: "237",     labelEn: "Clients Served",      labelAr: "عميل"            },
  { value: "40",      labelEn: "Years of Experience", labelAr: "عاماً من الخبرة" },
  { value: "423",     labelEn: "Projects Delivered",  labelAr: "مشروع منجز"      },
  { value: "397,587", labelEn: "Sq Feet",             labelAr: "قدم مربع"        },
];

const T = {
  en: {
    eyebrow: "Our Clients",
    title: "Built on",
    accent: "Trust",
    subtitle: "The clients and collaborators who have shaped four decades of practice.",
    allClients: "All Clients",
    ctaHeading: "Ready to join our client list?",
    ctaBtn:     "Start a Conversation →",
  },
  ar: {
    eyebrow: "عملاؤنا",
    title:   "مبني على",
    accent:  "الثقة",
    subtitle: "العملاء والشركاء الذين شكّلوا أربعة عقود من الممارسة.",
    allClients: "جميع العملاء",
    ctaHeading: "هل أنت مستعد للانضمام إلى قائمة عملائنا؟",
    ctaBtn:     "ابدأ محادثة ←",
  },
};

interface Props { params: Promise<{ lang: string }> }

export default async function PartnersPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l  = lang as "en" | "ar";
  const t  = T[l];
  const f  = l === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs = l === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";

  const [partners, statsSection] = await Promise.all([
    prisma.partner.findMany({
      where:   { status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.homepageSection.findUnique({ where: { key: "partners_stats" } }),
  ]);

  const SECTORS: Sector[] = [];
  for (const p of partners) {
    let sector = SECTORS.find(s => s.labelEn === p.sector);
    if (!sector) {
      sector = { labelEn: p.sector, labelAr: p.sectorAr ?? p.sector, clients: [] };
      SECTORS.push(sector);
    }
    sector.clients.push({ name: p.nameEn, nameAr: p.nameAr ?? p.nameEn, logo: p.logo });
  }

  const rawStats = (statsSection?.data as { stats?: Stat[] } | null)?.stats;
  const stats = (rawStats && rawStats.length > 0 ? rawStats : FALLBACK_STATS)
    .map(s => ({ value: s.value, label: (l === "ar" ? s.labelAr : s.labelEn) || "" }));

  return (
    <>
      <Header />
      <main>
        <PageHero lang={l} eyebrow={t.eyebrow} title={t.title} titleAccent={t.accent} subtitle={t.subtitle} />

        {/* ── Stats strip ──────────────────────────────────────────────── */}
        <div style={{ background: "var(--em-surface)", borderBottom: "1px solid var(--em-border)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderColor: "var(--em-border)" }}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="py-8 px-6 lg:px-10"
                  style={{ borderInlineEnd: i < stats.length - 1 ? "1px solid var(--em-border)" : "none" }}
                >
                  <p className="font-light mb-1" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "#993434" }}>
                    {s.value}
                  </p>
                  <p className="text-xs" style={{ fontFamily: f, fontWeight: 300, color: "var(--em-muted)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Client grid ──────────────────────────────────────────────── */}
        <section style={{ background: "var(--em-bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 8vw, 5rem)" }}>
          <div className="max-w-7xl mx-auto">

            {SECTORS.map((sector) => (
              <div key={sector.labelEn} style={{ marginBottom: "4rem" }}>

                {/* Sector divider */}
                <div className="flex items-center gap-4" style={{ marginBottom: "1.5rem" }}>
                  <span style={{ width: "1.5rem", height: "1px", background: "#993434", flexShrink: 0 }} />
                  <span className="text-xs uppercase" style={{ fontFamily: f, color: "#993434", flexShrink: 0 }}>
                    {l === "ar" ? sector.labelAr : sector.labelEn}
                  </span>
                  <span style={{ flex: 1, height: "1px", background: "var(--em-border)" }} />
                </div>

                {/* Logo grid — columns capped to client count so no empty grey cells */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${Math.min(sector.clients.length, 4)}, minmax(0, 1fr))`,
                    gap: "1px",
                    background: "var(--em-border)",
                  }}
                >
                  {sector.clients.map((client) => (
                    <div
                      key={client.name}
                      className="group relative flex flex-col items-center justify-center overflow-hidden"
                      style={{ height: "190px", background: "var(--em-card)" }}
                    >
                      {/* Red reveal line */}
                      <div
                        className="absolute inset-x-0 top-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        style={{ height: "2px", background: "#993434" }}
                      />

                      {/* White logo mount — ensures all logos read cleanly in any mode */}
                      <div
                        className="flex items-center justify-center rounded-sm transition-transform duration-300 group-hover:scale-95"
                        style={{ width: "80%", height: "110px", background: "#fff", padding: "1rem" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="grayscale group-hover:grayscale-0 transition-all duration-500"
                          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                        />
                      </div>

                      {/* Name — fades in on hover */}
                      <p
                        className="absolute bottom-3 left-0 right-0 text-center px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0"
                        style={{ fontFamily: f, fontWeight: 300, color: "var(--em-muted)", fontSize: "0.7rem" }}
                      >
                        {l === "ar" ? client.nameAr : client.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section style={{ background: "#441919", padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 8vw, 5rem)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs mb-6" style={{ fontFamily: f, color: "rgba(255,255,255,0.4)" }}>
              {t.allClients}
            </p>
            <h2 className="font-light leading-snug mb-10" style={{ fontFamily: fs, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#fff" }}>
              {t.ctaHeading}
            </h2>
            <Link
              href={`/${l}/contact`}
              className="inline-flex items-center gap-3 px-10 py-4 text-sm text-white transition-all duration-300 hover:bg-white hover:text-[#441919]"
              style={{ fontFamily: f, border: "1px solid rgba(255,255,255,0.4)", borderRadius: "9999px" }}
            >
              {t.ctaBtn}
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
