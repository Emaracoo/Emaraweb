"use client";

import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/home/ContactCTA";

const projectTypes = [
  "Residential",
  "Commercial",
  "Administrative",
  "Industrial",
  "Interior",
  "Landscape",
  "Other",
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/emaraconstruction/" },
  { label: "Facebook",  href: "https://www.facebook.com/emaraconstruction/" },
];

const contactDetails = [
  {
    icon: MapPin,
    label: "Studio",
    value: "5 Al-Hariry St, beside Tivoli Dome\nHeliopolis, Cairo, Egypt",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+20 116 424 5471",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Info@EmaraCo.com",
  },
];

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Get in Touch"
          title="Let's Build"
          titleAccent="Something Great"
          subtitle="Whether you have a clear brief or an early idea, we'd love to hear from you."
        />

        {/* Contact section */}
        <section style={{ background: "var(--em-bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* LEFT: Studio info */}
              <div>
                <h2
                  className="font-light leading-snug mb-10"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    color: "var(--em-text)",
                  }}
                >
                  Our studio is open<br />
                  <em style={{ color: "#E85830" }}>Monday to Friday</em>, 9am – 6pm.
                </h2>

                {/* Contact details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                  {contactDetails.map(({ icon: Icon, label, value }) => (
                    <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      {/* Icon box */}
                      <div
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          border: "1px solid #E85830",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "0.125rem",
                        }}
                      >
                        <Icon size={14} color="#E85830" />
                      </div>
                      <div>
                        <p
                          className="text-xs tracking-[0.2em] uppercase mb-1"
                          style={{ fontFamily: "var(--font-inter)", color: "var(--em-muted)" }}
                        >
                          {label}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontWeight: 300,
                            fontSize: "0.9rem",
                            color: "var(--em-text)",
                            whiteSpace: "pre-line",
                            lineHeight: 1.6,
                          }}
                        >
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Horizontal rule */}
                <hr style={{ border: "none", borderTop: "1px solid var(--em-border)", marginBottom: "2rem" }} />

                {/* Social links */}
                <div>
                  <p
                    className="text-xs tracking-[0.25em] uppercase mb-4"
                    style={{ fontFamily: "var(--font-inter)", color: "var(--em-muted)" }}
                  >
                    Follow our work
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300"
                        style={{
                          fontFamily: "var(--font-inter)",
                          color: "var(--em-text)",
                          border: "1px solid var(--em-border)",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#E85830";
                          e.currentTarget.style.borderColor = "#E85830";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--em-text)";
                          e.currentTarget.style.borderColor = "var(--em-border)";
                        }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: Contact form */}
              <div>
                {submitted ? (
                  <div
                    style={{
                      background: "var(--em-surface)",
                      border: "1px solid var(--em-border)",
                      padding: "3rem 2.5rem",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        background: "#E85830",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3
                      className="font-light mb-3"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "2rem",
                        color: "var(--em-text)",
                      }}
                    >
                      Thank you for reaching out.
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontWeight: 300,
                        fontSize: "0.875rem",
                        color: "var(--em-muted)",
                        lineHeight: 1.7,
                      }}
                    >
                      Your enquiry has been received. A member of our studio team will be in touch within two business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

                    {/* Name + Email row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                      {[
                        { id: "name", label: "Your Name", type: "text", key: "name" as const },
                        { id: "email", label: "Email Address", type: "email", key: "email" as const },
                      ].map(({ id, label, type, key }) => (
                        <div key={id} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <label
                            htmlFor={id}
                            className="text-xs tracking-[0.2em] uppercase"
                            style={{ fontFamily: "var(--font-inter)", color: "var(--em-muted)" }}
                          >
                            {label}
                          </label>
                          <input
                            id={id}
                            type={type}
                            required
                            value={form[key]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            style={{
                              fontFamily: "var(--font-inter)",
                              fontWeight: 300,
                              fontSize: "0.9rem",
                              color: "var(--em-text)",
                              background: "transparent",
                              border: "none",
                              borderBottom: "1px solid var(--em-border)",
                              padding: "0.625rem 0",
                              outline: "none",
                              transition: "border-color 0.2s",
                            }}
                            onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#E85830")}
                            onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "var(--em-border)")}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Project type selector */}
                    <div>
                      <p
                        className="text-xs tracking-[0.2em] uppercase mb-3"
                        style={{ fontFamily: "var(--font-inter)", color: "var(--em-muted)" }}
                      >
                        Project Type
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {projectTypes.map((type) => {
                          const isActive = selectedType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setSelectedType(isActive ? null : type)}
                              className="px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200"
                              style={{
                                fontFamily: "var(--font-inter)",
                                background: isActive ? "#E85830" : "transparent",
                                color: isActive ? "#FFFFFF" : "var(--em-muted)",
                                border: isActive ? "1px solid #E85830" : `1px solid var(--em-border)`,
                                borderRadius: "9999px",
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#E85830";
                                  (e.currentTarget as HTMLButtonElement).style.color = "#E85830";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--em-border)";
                                  (e.currentTarget as HTMLButtonElement).style.color = "var(--em-muted)";
                                }
                              }}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label
                        htmlFor="message"
                        className="text-xs tracking-[0.2em] uppercase"
                        style={{ fontFamily: "var(--font-inter)", color: "var(--em-muted)" }}
                      >
                        Tell us about your project
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Describe your vision, brief, or simply say hello…"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 300,
                          fontSize: "0.9rem",
                          color: "var(--em-text)",
                          background: "var(--em-surface)",
                          border: "1px solid var(--em-border)",
                          padding: "1rem",
                          outline: "none",
                          resize: "vertical",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "#E85830")}
                        onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "var(--em-border)")}
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full py-4 text-xs tracking-[0.25em] uppercase text-white transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-inter)",
                        background: "#E85830",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#C44422")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#E85830")}
                    >
                      Send Enquiry →
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
