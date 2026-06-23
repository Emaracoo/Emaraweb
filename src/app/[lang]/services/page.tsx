"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Building2, Layers, PenLine, TreePine, Wrench, HardHat, Box } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/home/ContactCTA";
import { useLang } from "@/components/LangProvider";

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface ServiceDef { icon: LucideIcon; title: string; desc: string }

const SERVICES_EN: ServiceDef[] = [
  { icon: Building2, title: "Structural Designs for Concrete & Steel",    desc: "Design of steel and concrete facilities in compliance with Egyptian and international codes (American, European, British). Safe and cost-effective sections, construction drawings and section tables using specialized design software." },
  { icon: Layers,    title: "Architectural Design",                        desc: "Exterior and interior designs for homes, restaurants, villas, palaces, chalets, cafes, food courts, building facades, factories, and stores. Emphasis on the correlation between a building's function, form, and surrounding environment." },
  { icon: PenLine,   title: "Interior Architecture & Decoration",          desc: "Planning and designing interior spaces to meet functional requirements while adhering to building standards. Both technical and artistic aspects, maximizing spatial utilization across all environments." },
  { icon: TreePine,  title: "Landscape Design",                           desc: "Softscape: cultivation of trees, flowers, vines, green areas, palms, and irrigation systems. Hardscape: pergolas, fountains, swimming pools, walkways, sculptures, and lighting." },
  { icon: Wrench,    title: "Restoration & Strengthening",                 desc: "Strengthening and repair of structural elements, treatment of cracks and fissures — preserving and reinforcing the built fabric for generations to come." },
  { icon: HardHat,   title: "Construction Supervision",                    desc: "Comprehensive review of project specs, examination of drawings, quantity schedules, on-site inspections, soil reports, and preparation of architectural and construction drawings." },
  { icon: Box,       title: "Model Making (Maquettes)",                   desc: "Architectural models drawn to scale, illuminating all essential details. Used for client presentations, real estate conferences, and exhibitions — the craft that founded our practice." },
];

const SERVICES_AR: ServiceDef[] = [
  { icon: Building2, title: "التصميم الإنشائي للخرسانة والفولاذ",      desc: "تصميم منشآت خرسانية وفولاذية وفق المواصفات المصرية والدولية (الأمريكية والأوروبية والبريطانية). مقاطع آمنة واقتصادية، ورسومات إنشائية، وجداول مقاطع بواسطة برامج تصميم متخصصة." },
  { icon: Layers,    title: "التصميم المعماري",                          desc: "تصاميم خارجية وداخلية للمنازل والمطاعم والفيلات والقصور والشاليهات والمقاهي وصالات الطعام وواجهات المباني والمصانع والمحلات. مع التأكيد على الترابط بين وظيفة المبنى وشكله وبيئته المحيطة." },
  { icon: PenLine,   title: "العمارة الداخلية والديكور",                 desc: "تخطيط وتصميم الفراغات الداخلية لتلبية المتطلبات الوظيفية والامتثال للمعايير الإنشائية. الجوانب التقنية والفنية معاً، مع تعظيم الاستفادة المكانية في جميع البيئات." },
  { icon: TreePine,  title: "تصميم المناظر الطبيعية",                   desc: "النباتات الرخوة: أشجار وزهور وكروم ومسطحات خضراء ونخيل وأنظمة ري. العناصر الصلبة: بيرغولا ونوافير ومسابح وممشى ومنحوتات وإضاءة." },
  { icon: Wrench,    title: "الترميم والتقوية",                          desc: "تقوية وإصلاح العناصر الإنشائية، ومعالجة الشقوق والصدوع — للحفاظ على الموروث العمراني وتعزيزه للأجيال القادمة." },
  { icon: HardHat,   title: "الإشراف على التنفيذ",                      desc: "مراجعة شاملة لمواصفات المشروع، وفحص الرسومات وجداول الكميات، وزيارات ميدانية، وتقارير التربة، وإعداد الرسومات المعمارية والإنشائية." },
  { icon: Box,       title: "صناعة المجسمات",                            desc: "نماذج معمارية مصغّرة مرسومة بمقاييس دقيقة تكشف كل التفاصيل الجوهرية. تُستخدم في عروض العملاء ومؤتمرات العقارات والمعارض — الحرفة التي أسست ممارستنا." },
];

const HERO = {
  en: { eyebrow: "What We Do", title: "From Structural Engineering", accent: "to Architectural Models", subtitle: "Seven disciplines, one studio." },
  ar: { eyebrow: "ما نقدمه",  title: "من الهندسة الإنشائية",       accent: "إلى النماذج المعمارية",    subtitle: "سبعة تخصصات، استوديو واحد." },
};

const GRID_LABELS = {
  en: { eyebrow: "Our Services", heading: "Everything a Project Needs, Under One Roof", learnMore: "Learn more →" },
  ar: { eyebrow: "خدماتنا",     heading: "كل ما يحتاجه المشروع، تحت سقف واحد",        learnMore: "اعرف أكثر ←" },
};

function ServiceCard({ service, delay, visible, learnMore, href }: { service: ServiceDef; delay: number; visible: boolean; learnMore: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;
  return (
    <div
      className="relative flex flex-col p-8 border overflow-hidden cursor-default"
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

export default function ServicesPage() {
  const lang     = useLang();
  const f        = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs       = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";
  const h        = HERO[lang];
  const lbl      = GRID_LABELS[lang];
  const services = lang === "ar" ? SERVICES_AR : SERVICES_EN;
  const { ref, visible } = useFadeIn();

  return (
    <>
      <Header />
      <main>
        <PageHero lang={lang} eyebrow={h.eyebrow} title={h.title} titleAccent={h.accent} subtitle={h.subtitle} />

        <section className="py-24" style={{ background: "var(--em-bg)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-px" style={{ background: "#993434" }} />
                <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{lbl.eyebrow}</span>
              </div>
              <h2 className="font-light leading-[1.1] mb-16" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)", maxWidth: "36rem" }}>
                {lbl.heading}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t" style={{ borderColor: "var(--em-border)" }}>
              {services.map((service, i) => (
                <div key={service.title} className="border-r border-b" style={{ borderColor: "var(--em-border)" }}>
                  <ServiceCard service={service} delay={i * 80} visible={visible} learnMore={lbl.learnMore} href={`/${lang}/contact`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
