"use client";

import { useState, FormEvent } from "react";
import { useLang } from "@/components/LangProvider";

const T = {
  en: {
    projectTypes: ["Residential", "Commercial", "Administrative", "Industrial", "Interior", "Landscape", "Other"],
    form: { name: "Your Name", email: "Email Address", phone: "Phone Number", projectType: "Project Type", message: "Tell us about your project", placeholder: "Describe your vision, brief, or simply say hello…", submit: "Send Enquiry →", error: "Something went wrong — please try again." },
    thanks: { heading: "Thank you for reaching out.", body: "Your enquiry has been received. A member of our studio team will be in touch within two business days." },
  },
  ar: {
    projectTypes: ["سكني", "تجاري", "إداري", "صناعي", "داخلي", "مناظر طبيعية", "أخرى"],
    form: { name: "اسمك", email: "عنوان البريد الإلكتروني", phone: "رقم الهاتف", projectType: "نوع المشروع", message: "أخبرنا عن مشروعك", placeholder: "صف رؤيتك أو موجزك أو تواصل معنا بكل بساطة…", submit: "← إرسال الاستفسار", error: "حدث خطأ ما — يرجى المحاولة مرة أخرى." },
    thanks: { heading: "شكراً على تواصلك معنا.", body: "تم استلام استفسارك. سيتواصل معك أحد أعضاء فريق الاستوديو في غضون يومي عمل." },
  },
};

export default function ContactForm() {
  const lang = useLang();
  const t    = T[lang];
  const f    = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs   = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: selectedType,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ background: "var(--em-surface)", border: "1px solid var(--em-border)", padding: "3rem 2.5rem", textAlign: "center" }}>
        <div style={{ width: "3rem", height: "3rem", background: "#993434", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-light mb-3" style={{ fontFamily: fs, fontSize: "2rem", color: "var(--em-text)" }}>{t.thanks.heading}</h3>
        <p style={{ fontFamily: f, fontWeight: 300, fontSize: "0.875rem", color: "var(--em-muted)", lineHeight: 1.7 }}>{t.thanks.body}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {[
          { id: "name",  label: t.form.name,  type: "text",  key: "name"  as const },
          { id: "email", label: t.form.email, type: "email", key: "email" as const },
          { id: "phone", label: t.form.phone, type: "tel",   key: "phone" as const },
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
                style={{ fontFamily: f, background: isActive ? "#993434" : "transparent", color: isActive ? "#FFFFFF" : "var(--em-muted)", border: isActive ? "1px solid #993434" : "1px solid var(--em-border)" }}
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

      {error && (
        <p style={{ fontFamily: f, fontSize: "0.8rem", color: "#993434" }}>{t.form.error}</p>
      )}

      <button type="submit" disabled={sending} className="w-full py-4 text-xs tracking-[0.25em] uppercase text-white transition-all duration-300"
        style={{ fontFamily: f, background: "#993434", opacity: sending ? 0.6 : 1, cursor: sending ? "wait" : "pointer" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#682A2A")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#993434")}
      >
        {t.form.submit}
      </button>
    </form>
  );
}
