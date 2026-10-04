import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SiteCTA from "@/components/SiteCTA";
import { hasLocale } from "../dictionaries";
import { prisma } from "@/lib/prisma";
import { getPageImage } from "@/lib/site-settings";
import { localizeDigits } from "@/lib/labels";

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
    ctaEyebrow: "Our Clients",
    ctaHeading: "Ready to join our client list?",
    ctaBtn:     "Start a Conversation",
  },
  ar: {
    eyebrow: "عملاؤنا",
    title:   "مبني على",
    accent:  "الثقة",
    subtitle: "العملاء والشركاء الذين شكّلوا أربعة عقود من الممارسة.",
    ctaEyebrow: "عملاؤنا",
    ctaHeading: "هل أنت مستعد للانضمام إلى قائمة عملائنا؟",
    ctaBtn:     "ابدأ محادثة",
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

  const [partners, statsSection, heroImage] = await Promise.all([
    prisma.partner.findMany({
      where:   { status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.homepageSection.findUnique({ where: { key: "partners_stats" } }),
    getPageImage("hero_image_partners"),
  ]);

  const SECTORS: Sector[] = [];
  for (const p of partners) {
    let sector = SECTORS.find(s => s.labelEn === p.sector);
    if (!sector) {
      sector = { labelEn: p.sector, labelAr: p.sectorAr || p.sector, clients: [] };
      SECTORS.push(sector);
    } else if (p.sectorAr && sector.labelAr === sector.labelEn) {
      sector.labelAr = p.sectorAr;
    }
    sector.clients.push({ name: p.nameEn, nameAr: p.nameAr ?? p.nameEn, logo: p.logo });
  }

  const rawStats = (statsSection?.data as { stats?: Stat[] } | null)?.stats;
  const stats = (rawStats && rawStats.length > 0 ? rawStats : FALLBACK_STATS)
    .map((s, i) => ({ value: localizeDigits(s.value, l), label: (l === "ar" ? s.labelAr : s.labelEn) || (l === "ar" ? FALLBACK_STATS[i]?.labelAr : FALLBACK_STATS[i]?.labelEn) || "" }));

  return (
    <>
      <Header />
      <main>
        <PageHero lang={l} eyebrow={t.eyebrow} title={t.title} titleAccent={t.accent} subtitle={t.subtitle} image={heroImage} />

        {/* ── Stats strip ──────────────────────────────────────────────── */}
        <div style={{ background: "var(--em-surface)", borderBottom: "1px solid var(--em-border)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderColor: "var(--em-border)" }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  // Dividers between columns: 2 per row on mobile, 4 on desktop
                  className={`py-8 px-4 sm:px-6 lg:px-10 min-w-0 border-[var(--em-border)] ${
                    i < stats.length - 1 ? (i % 2 === 0 ? "border-e" : "lg:border-e") : ""
                  }`}
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
                  className="grid grid-cols-1 sm:grid-cols-[repeat(var(--cols-sm),minmax(0,1fr))] lg:grid-cols-[repeat(var(--cols-lg),minmax(0,1fr))]"
                  style={{
                    "--cols-sm": Math.min(sector.clients.length, 2),
                    "--cols-lg": Math.min(sector.clients.length, 4),
                    gap: "1px",
                    background: "var(--em-border)",
                  } as React.CSSProperties}
                >
                  {sector.clients.map((client) => (
                    <div
                      key={client.name}
                      className="group relative flex flex-col items-center justify-center overflow-hidden"
                      style={{ height: "260px", background: "var(--em-card)" }}
                    >
                      {/* Red reveal line */}
                      <div
                        className="absolute inset-x-0 top-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        style={{ height: "2px", background: "#993434" }}
                      />

                      {/* White logo mount — ensures all logos read cleanly in any mode */}
                      <div
                        className="flex items-center justify-center rounded-sm transition-transform duration-300 group-hover:scale-95"
                        style={{ width: "88%", height: "200px", background: "#fff", padding: "1rem" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={client.logo}
                          alt={client.name}
                          loading="lazy"
                          decoding="async"
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

        <SiteCTA
          eyebrowEn={T.en.ctaEyebrow} eyebrowAr={T.ar.ctaEyebrow}
          headlineEn={T.en.ctaHeading} headlineAr={T.ar.ctaHeading}
          ctaEn={T.en.ctaBtn} ctaAr={T.ar.ctaBtn}
        />

      </main>
      <Footer />
    </>
  );
}
