"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const projectTypes = ["Residential", "Commercial", "Cultural / Civic", "Urban Planning", "Interior", "Other"];

  return (
    <section id="contact" className="bg-[#0D0D0D] py-28 lg:py-36" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-start">

          {/* Left — info */}
          <div
            className="transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-32px)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-[#B89155]" />
              <span
                className="text-[#B89155] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Get in Touch
              </span>
            </div>

            <h2
              className="text-white text-5xl lg:text-6xl font-light leading-tight mb-8"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Let's Build<br />
              <em>Something Great</em>
            </h2>

            <p
              className="text-white/50 text-sm leading-relaxed mb-14 max-w-md"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Whether you have a clear brief or an early idea, we'd love to hear from you. Every great project begins with a conversation.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#B89155]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-[#B89155]" strokeWidth={1.5} />
                </div>
                <div>
                  <div
                    className="text-white text-sm mb-1 tracking-[0.1em] uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Studio
                  </div>
                  <div
                    className="text-white/50 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    Level 22, DIFC Gate Building<br />
                    Dubai International Financial Centre<br />
                    Dubai, UAE
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#B89155]/30 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-[#B89155]" strokeWidth={1.5} />
                </div>
                <div>
                  <div
                    className="text-white text-sm mb-1 tracking-[0.1em] uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Phone
                  </div>
                  <div
                    className="text-white/50 text-sm"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    +971 4 000 0000
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#B89155]/30 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-[#B89155]" strokeWidth={1.5} />
                </div>
                <div>
                  <div
                    className="text-white text-sm mb-1 tracking-[0.1em] uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Email
                  </div>
                  <div
                    className="text-white/50 text-sm"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    studio@emara.ae
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10 my-12" />

            {/* Social */}
            <div className="flex items-center gap-6">
              {["Instagram", "Behance", "LinkedIn", "Pinterest"].map((s) => (
                <button
                  key={s}
                  className="text-white/30 hover:text-[#B89155] text-xs tracking-[0.15em] uppercase transition-colors duration-300"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            className="transition-all duration-700 delay-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(32px)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full gap-6">
                <div className="w-16 h-16 border border-[#B89155] flex items-center justify-center">
                  <span className="text-[#B89155] text-2xl" style={{ fontFamily: "var(--font-cormorant)" }}>✓</span>
                </div>
                <h3
                  className="text-white text-4xl font-light"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Message Received
                </h3>
                <p
                  className="text-white/50 text-sm leading-relaxed max-w-sm"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  Thank you for reaching out. A member of the Emara team will be in touch within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    type="text"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                  />
                  <FormInput
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    required
                  />
                </div>

                {/* Project type */}
                <div>
                  <label
                    className="block text-white/40 text-xs tracking-[0.2em] uppercase mb-3"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Project Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, type: t })}
                        className="px-4 py-2 text-xs tracking-[0.1em] uppercase transition-all duration-200"
                        style={{
                          fontFamily: "var(--font-inter)",
                          border: "1px solid",
                          borderColor: form.type === t ? "#B89155" : "rgba(255,255,255,0.1)",
                          color: form.type === t ? "#B89155" : "rgba(255,255,255,0.4)",
                          background: form.type === t ? "rgba(184,145,85,0.08)" : "transparent",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-white/40 text-xs tracking-[0.2em] uppercase mb-3"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Tell Us About Your Project
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full bg-transparent border border-white/10 focus:border-[#B89155] outline-none text-white/70 text-sm px-4 py-3 resize-none transition-colors duration-300 placeholder:text-white/20"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                    placeholder="Briefly describe your project, timeline, and location..."
                  />
                </div>

                <button
                  type="submit"
                  className="self-start flex items-center gap-3 bg-[#B89155] hover:bg-[#D4AD7A] text-white transition-colors duration-300 px-10 py-4 text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Send Enquiry
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormInput({
  label, type, value, onChange, required,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label
        className="block text-white/40 text-xs tracking-[0.2em] uppercase mb-3"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b border-white/10 focus:border-[#B89155] outline-none text-white text-sm py-3 transition-colors duration-300 placeholder:text-white/20"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
        placeholder={label}
      />
    </div>
  );
}
