import Link from "next/link";
import { Building2, Layers, PenLine, TreePine, Wrench, HardHat, Box } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service { icon: LucideIcon; title: string; desc: string; badge: string | null }

const SERVICES_EN: Service[] = [
  { icon: Building2, title: "Structural Design",        desc: "Concrete & steel facilities per Egyptian, American, European and British codes.", badge: null },
  { icon: Layers,    title: "Architectural Design",     desc: "Exterior and interior designs for villas, palaces, factories, restaurants, and more.", badge: null },
  { icon: PenLine,   title: "Interior Architecture",    desc: "Planning interiors to meet functional requirements while maximising spatial utilisation.", badge: null },
  { icon: TreePine,  title: "Landscape Design",         desc: "Softscape planting and hardscape — pergolas, pools, walkways, fountains, and lighting.", badge: null },
  { icon: Wrench,    title: "Restoration & Strengthening", desc: "Repair of structural elements, treatment of cracks and fissures.", badge: null },
  { icon: HardHat,   title: "Construction Supervision", desc: "Full review of specs, drawings, schedules, on-site inspection and soil reports.", badge: null },
  { icon: Box,       title: "Model Making",             desc: "Scaled architectural maquettes — the craft that started Emara in 1989.", badge: "Gallery" },
];

const SERVICES_AR: Service[] = [
  { icon: Building2, title: "التصميم الإنشائي",         desc: "منشآت خرسانية وفولاذية وفق المعايير المصرية والأمريكية والأوروبية والبريطانية.", badge: null },
  { icon: Layers,    title: "التصميم المعماري",          desc: "تصاميم خارجية وداخلية للفيلات والقصور والمصانع والمطاعم وما سواها.", badge: null },
  { icon: PenLine,   title: "العمارة الداخلية",          desc: "تخطيط الفراغات الداخلية لتلبية المتطلبات الوظيفية مع تعظيم الاستفادة المكانية.", badge: null },
  { icon: TreePine,  title: "تصميم المناظر الطبيعية",   desc: "الزراعة الناعمة والعناصر الصلبة — البيرغولا والمسابح والممشى والنوافير والإضاءة.", badge: null },
  { icon: Wrench,    title: "الترميم والتقوية",          desc: "إصلاح العناصر الإنشائية ومعالجة الشقوق والصدوع.", badge: null },
  { icon: HardHat,   title: "الإشراف على التنفيذ",      desc: "مراجعة شاملة للمواصفات والرسومات والجداول الزمنية والتفتيش الميداني وتقارير التربة.", badge: null },
  { icon: Box,       title: "صناعة المجسمات",            desc: "نماذج معمارية مصغّرة — الحرفة التي أسست إعمار عام ١٩٨٩.", badge: "معرض" },
];

const LABELS = {
  en: { eyebrow: "07 Services", heading: "Every discipline,\nin one studio.", cta: "View all services →" },
  ar: { eyebrow: "٠٧ خدمات",   heading: "كل التخصصات،\nفي استوديو واحد.", cta: "عرض جميع الخدمات ←" },
};

interface Props { lang: "en" | "ar" }

export default function ServicesGrid({ lang }: Props) {
  const services = lang === "ar" ? SERVICES_AR : SERVICES_EN;
  const lbl      = LABELS[lang];
  const f        = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs       = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";

  return (
    <section style={{ background: "var(--em-surface)", padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 8vw, 5rem)" }}>
      <div className="mx-auto" style={{ maxWidth: "80rem" }}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6" style={{ marginBottom: "3rem" }}>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ fontFamily: f, color: "#993434" }}>
              {lbl.eyebrow}
            </p>
            <h2 className="font-light leading-[1.15]" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)", whiteSpace: "pre-line" }}>
              {lbl.heading}
            </h2>
          </div>
          <Link
            href={`/${lang}/services`}
            className="text-xs tracking-[0.2em] uppercase shrink-0"
            style={{ fontFamily: f, color: "#993434", borderBottom: "1px solid #993434", paddingBottom: "2px", alignSelf: "flex-end" }}
          >
            {lbl.cta}
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="transition-colors duration-300 hover:[background:var(--em-card-hover)]"
                style={{ background: "var(--em-card)", border: "1px solid var(--em-border)", padding: "1.5rem" }}
              >
                <Icon size={28} color="#993434" strokeWidth={1.5} />
                <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontFamily: f, fontSize: "0.8rem", fontWeight: 500, color: "var(--em-text)", letterSpacing: "0.05em" }}>
                    {service.title}
                  </span>
                  {service.badge && (
                    <span style={{ display: "inline-block", marginInlineStart: "0.5rem", fontSize: "0.6rem", padding: "2px 8px", background: "rgba(153,52,52,0.1)", color: "#993434", borderRadius: "9999px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {service.badge}
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: f, fontWeight: 300, fontSize: "0.8rem", color: "var(--em-muted)", lineHeight: 1.7 }}>
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
