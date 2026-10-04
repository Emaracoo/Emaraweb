import { Fragment } from "react";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SiteCTA from "@/components/SiteCTA";
import ContactForm from "@/components/ContactForm";
import { hasLocale } from "../dictionaries";
import { prisma } from "@/lib/prisma";
import { getContactInfo, getPageImage } from "@/lib/site-settings";
import { projectCategoryLabel } from "@/lib/labels";

interface Props { params: Promise<{ lang: string }> }

const T = {
  en: {
    hero: { eyebrow: "Get in Touch", title: "Let's Build", accent: "Something Great", subtitle: "Whether you have a clear brief or an early idea, we'd love to hear from you." },
    labels: { studio: "Studio", phone: "Phone", email: "Email" },
    followWork: "Follow our work",
    // Enquiry types that aren't project categories
    extraTypes: ["Interior", "Landscape", "Other"],
  },
  ar: {
    hero: { eyebrow: "تواصل معنا", title: "لنبنِ", accent: "شيئاً رائعاً", subtitle: "سواء كان لديك موجز واضح أو فكرة مبكرة، يسعدنا سماعك." },
    labels: { studio: "الاستوديو", phone: "الهاتف", email: "البريد" },
    followWork: "تابع أعمالنا",
    extraTypes: ["تصميم داخلي", "تنسيق مواقع", "أخرى"],
  },
};

/** "Open *Saturday to Thursday*, 9am" → the starred part is set in the accent style. */
function renderAccented(text: string, isAr: boolean) {
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 === 1
      // Arabic has no true italic — a synthetic slant only distorts the letterforms
      ? <em key={i} style={{ color: "#993434", fontStyle: isAr ? "normal" : "italic" }}>{part}</em>
      : <Fragment key={i}>{part}</Fragment>
  );
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l  = lang as "en" | "ar";
  const t  = T[l];
  const f  = l === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs = l === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";
  const h  = t.hero;

  const [contact, heroImage, categories] = await Promise.all([
    getContactInfo(l),
    getPageImage("hero_image_contact"),
    prisma.project.findMany({
      where:   { status: "PUBLISHED" },
      select:  { categoryEn: true, categoryAr: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  // Project types follow the project categories in the dashboard, so a new category (e.g. Medical)
  // shows up here automatically
  const categoryTypes = [...new Set(categories.map(c => c.categoryEn))]
    .map(cat => projectCategoryLabel(cat, l, categories));
  const projectTypes = [...new Set([...categoryTypes, ...t.extraTypes])];

  const details = [
    { icon: MapPin, label: t.labels.studio, value: contact.address, href: null,                                        ltr: false },
    { icon: Phone,  label: t.labels.phone,  value: contact.phone,   href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`, ltr: true  },
    { icon: Mail,   label: t.labels.email,  value: contact.email,   href: `mailto:${contact.email}`,                    ltr: true  },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHero lang={l} eyebrow={h.eyebrow} title={h.title} titleAccent={h.accent} subtitle={h.subtitle} image={heroImage} />

        <section style={{ background: "var(--em-bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Studio info */}
              <div className="min-w-0">
                <h2 className="font-light mb-10" style={{ fontFamily: fs, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--em-text)", lineHeight: l === "ar" ? 1.6 : 1.35 }}>
                  {renderAccented(contact.hours, l === "ar")}
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                  {details.map(({ icon: Icon, label, value, href, ltr }) => (
                    <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      <div style={{ width: "2.5rem", height: "2.5rem", border: "1px solid #993434", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.125rem" }}>
                        <Icon size={14} color="#993434" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ fontFamily: f, color: "var(--em-muted)" }}>{label}</p>
                        {href ? (
                          <a
                            href={href}
                            dir={ltr ? "ltr" : undefined}
                            className="inline-block transition-colors duration-200 hover:text-[#993434]"
                            style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "var(--em-text)", lineHeight: 1.6, unicodeBidi: "isolate", overflowWrap: "anywhere" }}
                          >
                            {value}
                          </a>
                        ) : (
                          <p style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "var(--em-text)", whiteSpace: "pre-line", lineHeight: 1.6 }}>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--em-border)", marginBottom: "2rem" }} />

                <div>
                  <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ fontFamily: f, color: "var(--em-muted)" }}>{t.followWork}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {contact.socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300"
                        style={{ fontFamily: f, color: "var(--em-text)", border: "1px solid var(--em-border)", display: "inline-block" }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="min-w-0">
                <ContactForm projectTypes={projectTypes} />
              </div>
            </div>
          </div>
        </section>

        <SiteCTA />
      </main>
      <Footer />
    </>
  );
}
