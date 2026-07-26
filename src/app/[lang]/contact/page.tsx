import { notFound } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/home/ContactCTA";
import ContactForm from "@/components/ContactForm";
import { hasLocale } from "../dictionaries";

interface Props { params: Promise<{ lang: string }> }

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/emaraconstruction/" },
  { label: "Facebook",  href: "https://www.facebook.com/emaraconstruction/" },
];

const T = {
  en: {
    hero: { eyebrow: "Get in Touch", title: "Let's Build", accent: "Something Great", subtitle: "Whether you have a clear brief or an early idea, we'd love to hear from you." },
    hours: "Our studio is open Saturday to Thursday, 9am – 6pm.",
    hoursAccent: "Saturday to Thursday",
    contactDetails: [
      { icon: MapPin, label: "Studio", value: "5 Al-Hariry St, beside Tivoli Dome\nHeliopolis, Cairo, Egypt" },
      { icon: Phone,  label: "Phone",  value: "+20 116 424 5471" },
      { icon: Mail,   label: "Email",  value: "Info@EmaraCo.com" },
    ],
    followWork: "Follow our work",
  },
  ar: {
    hero: { eyebrow: "تواصل معنا", title: "لنبنِ", accent: "شيئاً رائعاً", subtitle: "سواء كان لديك موجز واضح أو فكرة مبكرة، يسعدنا سماعك." },
    hours: "استوديونا مفتوح من السبت إلى الخميس، من ٩ص حتى ٦م.",
    hoursAccent: "السبت إلى الخميس",
    contactDetails: [
      { icon: MapPin, label: "الاستوديو", value: "٥ شارع الحريري، بجوار تيفولي دوم\nمصر الجديدة، القاهرة، مصر" },
      { icon: Phone,  label: "الهاتف",    value: "+20 116 424 5471" },
      { icon: Mail,   label: "البريد",    value: "Info@EmaraCo.com" },
    ],
    followWork: "تابع أعمالنا",
  },
};

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l  = lang as "en" | "ar";
  const t  = T[l];
  const f  = l === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs = l === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";
  const h  = t.hero;

  return (
    <>
      <Header />
      <main>
        <PageHero lang={l} eyebrow={h.eyebrow} title={h.title} titleAccent={h.accent} subtitle={h.subtitle} />

        <section style={{ background: "var(--em-bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* LEFT: Studio info */}
              <div>
                <h2 className="font-light leading-snug mb-10" style={{ fontFamily: fs, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--em-text)" }}>
                  {t.hours.split(t.hoursAccent)[0]}
                  <em style={{ color: "#993434" }}>{t.hoursAccent}</em>
                  {t.hours.split(t.hoursAccent)[1]}
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                  {t.contactDetails.map(({ icon: Icon, label, value }) => (
                    <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      <div style={{ width: "2.5rem", height: "2.5rem", border: "1px solid #993434", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.125rem" }}>
                        <Icon size={14} color="#993434" />
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ fontFamily: f, color: "var(--em-muted)" }}>{label}</p>
                        <p style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "var(--em-text)", whiteSpace: "pre-line", lineHeight: 1.6 }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--em-border)", marginBottom: "2rem" }} />

                <div>
                  <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ fontFamily: f, color: "var(--em-muted)" }}>{t.followWork}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {socials.map((s) => (
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

              {/* RIGHT: Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
