"use client";

import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/home/ContactCTA";
import { useLang } from "@/components/LangProvider";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/emaraconstruction/" },
  { label: "Facebook",  href: "https://www.facebook.com/emaraconstruction/" },
];

const T = {
  en: {
    hero: { eyebrow: "Get in Touch", title: "Let's Build", accent: "Something Great", subtitle: "Whether you have a clear brief or an early idea, we'd love to hear from you." },
    hours: "Our studio is open Monday to Friday, 9am – 6pm.",
    hoursAccent: "Monday to Friday",
    contactDetails: [
      { icon: MapPin, label: "Studio", value: "5 Al-Hariry St, beside Tivoli Dome\nHeliopolis, Cairo, Egypt" },
      { icon: Phone,  label: "Phone",  value: "+20 116 424 5471" },
      { icon: Mail,   label: "Email",  value: "Info@EmaraCo.com" },
    ],
    followWork: "Follow our work",
    projectTypes: ["Residential", "Commercial", "Administrative", "Industrial", "Interior", "Landscape", "Other"],
    form: { name: "Your Name", email: "Email Address", projectType: "Project Type", message: "Tell us about your project", placeholder: "Describe your vision, brief, or simply say hello…", submit: "Send Enquiry →" },
    thanks: { heading: "Thank you for reaching out.", body: "Your enquiry has been received. A member of our studio team will be in touch within two business days." },
  },
  ar: {
    hero: { eyebrow: "تواصل معنا", title: "لنبنِ", accent: "شيئاً رائعاً", subtitle: "سواء كان لديك موجز واضح أو فكرة مبكرة، يسعدنا سماعك." },
    hours: "استوديونا مفتوح من الاثنين إلى الجمعة، من ٩ص حتى ٦م.",
    hoursAccent: "الاثنين إلى الجمعة",
    contactDetails: [
      { icon: MapPin, label: "الاستوديو", value: "٥ شارع الحريري، بجوار تيفولي دوم\nمصر الجديدة، القاهرة، مصر" },
      { icon: Phone,  label: "الهاتف",    value: "+20 116 424 5471" },
      { icon: Mail,   label: "البريد",    value: "Info@EmaraCo.com" },
    ],
    followWork: "تابع أعمالنا",
    projectTypes: ["سكني", "تجاري", "إداري", "صناعي", "داخلي", "مناظر طبيعية", "أخرى"],
    form: { name: "اسمك", email: "عنوان البريد الإلكتروني", projectType: "نوع المشروع", message: "أخبرنا عن مشروعك", placeholder: "صف رؤيتك أو موجزك أو تواصل معنا بكل بساطة…", submit: "← إرسال الاستفسار" },
    thanks: { heading: "شكراً على تواصلك معنا.", body: "تم استلام استفسارك. سيتواصل معك أحد أعضاء فريق الاستوديو في غضون يومي عمل." },
  },
};

export default function ContactPage() {
  const lang = useLang();
  const t    = T[lang];
  const f    = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs   = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";
  const h    = t.hero;

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Header />
      <main>
        <PageHero lang={lang} eyebrow={h.eyebrow} title={h.title} titleAccent={h.accent} subtitle={h.subtitle} />

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
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#993434"; e.currentTarget.style.borderColor = "#993434"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--em-text)"; e.currentTarget.style.borderColor = "var(--em-border)"; }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: Form */}
              <div>
                {submitted ? (
                  <div style={{ background: "var(--em-surface)", border: "1px solid var(--em-border)", padding: "3rem 2.5rem", textAlign: "center" }}>
                    <div style={{ width: "3rem", height: "3rem", background: "#993434", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="font-light mb-3" style={{ fontFamily: fs, fontSize: "2rem", color: "var(--em-text)" }}>{t.thanks.heading}</h3>
                    <p style={{ fontFamily: f, fontWeight: 300, fontSize: "0.875rem", color: "var(--em-muted)", lineHeight: 1.7 }}>{t.thanks.body}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                      {[
                        { id: "name",  label: t.form.name,  type: "text",  key: "name"  as const },
                        { id: "email", label: t.form.email, type: "email", key: "email" as const },
                      ].map(({ id, label, type, key }) => (
                        <div key={id} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <label htmlFor={id} className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: f, color: "var(--em-muted)" }}>{label}</label>
                          <input
                            id={id} type={type} required
                            value={form[key]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "var(--em-text)", background: "transparent", border: "none", borderBottom: "1px solid var(--em-border)", padding: "0.625rem 0", outline: "none", transition: "border-color 0.2s" }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "#993434")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--em-border)")}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: f, color: "var(--em-muted)" }}>{t.form.projectType}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {t.projectTypes.map((type) => {
                          const isActive = selectedType === type;
                          return (
                            <button key={type} type="button" onClick={() => setSelectedType(isActive ? null : type)}
                              className="px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200"
                              style={{ fontFamily: f, background: isActive ? "#993434" : "transparent", color: isActive ? "#FFFFFF" : "var(--em-muted)", border: isActive ? "1px solid #993434" : "1px solid var(--em-border)", borderRadius: "9999px" }}
                              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = "#993434"; e.currentTarget.style.color = "#993434"; } }}
                              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = "var(--em-border)"; e.currentTarget.style.color = "var(--em-muted)"; } }}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label htmlFor="message" className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: f, color: "var(--em-muted)" }}>{t.form.message}</label>
                      <textarea id="message" rows={5} required value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t.form.placeholder}
                        style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "var(--em-text)", background: "var(--em-surface)", border: "1px solid var(--em-border)", padding: "1rem", outline: "none", resize: "vertical", transition: "border-color 0.2s" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#993434")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--em-border)")}
                      />
                    </div>

                    <button type="submit" className="w-full py-4 text-xs tracking-[0.25em] uppercase text-white transition-all duration-300"
                      style={{ fontFamily: f, background: "#993434" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#682A2A")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#993434")}
                    >
                      {t.form.submit}
                    </button>
                  </form>
                )}
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
