"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useLang } from "@/components/LangProvider";

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const STORY = {
  en: {
    eyebrow: "Who we are",
    heading: "Four decades of design, built on the smallest details.",
    body1: "With over four decades of experience in design and construction, our journey began with miniature architectural models (maquettes), with attention paid to the smallest details, combining functionality and aesthetics. Our construction journey began with industrial buildings, then gradually extended to commercial and residential projects, including many villas and palaces.",
    body2: "Our experience is diverse, spanning distinguished architectural projects, interior architecture, and site landscaping, incorporating design and execution of concrete and steel structures, utilization of materials such as concrete, steel, and glass, coupled with proficiency in restoration and strengthening.",
    stats: [
      { value: "40+",  label: "Years of Practice"   },
      { value: "100+", label: "Projects Completed"  },
      { value: "50+",  label: "Clients Served"      },
    ],
  },
  ar: {
    eyebrow: "من نحن",
    heading: "أربعة عقود من التصميم، مبنية على أدق التفاصيل.",
    body1: "بخبرة تمتد لأكثر من أربعة عقود في التصميم والبناء، بدأت رحلتنا بصناعة النماذج المعمارية المصغّرة (المجسّمات)، مع اهتمام دقيق بأصغر التفاصيل، وجمع بين الوظيفية والجماليات. انطلق مسيرنا الإنشائي بالمباني الصناعية، ثم تطوّر تدريجياً ليشمل المشاريع التجارية والسكنية، بما فيها كثير من الفيلات والقصور.",
    body2: "تجربتنا متنوعة، تمتد عبر مشاريع معمارية مميزة، وعمارة داخلية، وتنسيق مواقع، وتشمل تصميم وتنفيذ الهياكل الخرسانية والفولاذية، واستخدام مواد كالخرسانة والفولاذ والزجاج، مع كفاءة في الترميم والتقوية.",
    stats: [
      { value: "+٤٠",  label: "عاماً من الممارسة" },
      { value: "+١٠٠", label: "مشروع مكتمل"       },
      { value: "+٥٠",  label: "عميل نخدمه"         },
    ],
  },
};

const VALUES_DATA = {
  en: [
    { num: "01", title: "Mission", desc: "We set new industry standards in design and construction by crafting distinctive structures using concrete, steel, and glass. With fastidious attention to details, we ensure harmonious outcomes across diverse architectural ventures, drawing from our expertise in both industrial and residential sectors." },
    { num: "02", title: "Vision", desc: "To transcend boundaries in the expansive realm of design and construction, leaving an indelible mark on a global scale. We aim to lead the industry by driving innovation, setting international benchmarks, and contributing to the creation of iconic structures worldwide." },
    { num: "03", title: "Our Approach", desc: "Every project begins with maquette-level attention to detail — the same craft that defined our origins in architectural model making. From industrial facilities to intimate residences, we bring structural rigour and aesthetic sensibility to every discipline we practise." },
  ],
  ar: [
    { num: "٠١", title: "رسالتنا", desc: "نضع معايير جديدة في التصميم والبناء من خلال صياغة هياكل مميزة بالخرسانة والفولاذ والزجاج. بعناية فائقة بالتفاصيل، نضمن نتائج متناسقة في مختلف المشاريع المعمارية، مستندين إلى خبرتنا في القطاعين الصناعي والسكني." },
    { num: "٠٢", title: "رؤيتنا", desc: "تجاوز الحدود في عالم التصميم والبناء الرحيب، وترك أثر لا يُمحى على مستوى عالمي. نسعى لريادة الصناعة بدفع الابتكار وإرساء المعايير الدولية والمساهمة في إنشاء أيقونات معمارية حول العالم." },
    { num: "٠٣", title: "نهجنا", desc: "كل مشروع يبدأ باهتمام بالتفاصيل على مستوى النماذج المصغّرة — ذات الحرفة التي حددت أصولنا في صناعة النماذج المعمارية. من المنشآت الصناعية إلى المساكن الراقية، نُضفي الصرامة الإنشائية والحساسية الجمالية على كل تخصص نمارسه." },
  ],
};

const TIMELINE_DATA = {
  en: [
    { year: "1989", title: "Founded", desc: "Emara is established in Heliopolis, Cairo. The Manar Tex Factory (11,000 m²) in 10th of Ramadan City marks our first major industrial commission." },
    { year: "1992", title: "Abu Simbel Factory", desc: "Construction of the Abu Simbel Factory in Qalyub (4,200 m²) — deepening our capability in large-scale industrial construction." },
    { year: "2001", title: "Villa WM, Al-Badrashin", desc: "Our first landmark private residential villa — four floors, integrated landscaping, and an indoor swimming pool in Al-Badrashin, Giza." },
    { year: "2004", title: "Medical Union Pharmaceuticals HQ", desc: "Design and construction of a six-floor, 300 m² headquarters in Masr El Gadeda, Cairo — expanding our footprint into corporate architecture." },
    { year: "2007", title: "MBC Group Office, El Mohandeseen", desc: "Interior design, décor, and construction supervision for MBC Group's 200 m² administrative office in Cairo's elite El Mohandeseen district." },
    { year: "2011", title: "Al Arabiya News Studios, Maspero", desc: "Interior design and construction supervision for Al Arabiya News studios and offices (600 m²) in the historic Maspero broadcasting district." },
    { year: "2015", title: "Sphinx Comprehensive Cancer Centre", desc: "A 700 m² medical environment in El Mohandeseen designed with exceptional care for the wellbeing of patients and clinical staff alike." },
    { year: "2022", title: "Villa TN, Mina Garden City", desc: "Three-floor private villa on a 660 m² plot — a synthesis of four decades of residential expertise and contemporary architectural craft." },
  ],
  ar: [
    { year: "١٩٨٩", title: "التأسيس", desc: "تأسست إعمار في مصر الجديدة بالقاهرة. مصنع منار تكس (١١,٠٠٠ م²) في مدينة العاشر من رمضان يمثل أول عمولة صناعية كبرى لنا." },
    { year: "١٩٩٢", title: "مصنع أبو سمبل", desc: "إنشاء مصنع أبو سمبل في القليوب (٤,٢٠٠ م²) — ترسيخ قدرتنا في البناء الصناعي الضخم." },
    { year: "٢٠٠١", title: "فيلا WM، البدرشين", desc: "أول فيلا سكنية خاصة بارزة لنا — أربعة طوابق، تنسيق حدائق متكامل، ومسبح داخلي في البدرشين بالجيزة." },
    { year: "٢٠٠٤", title: "مقر Medical Union Pharmaceuticals", desc: "تصميم وبناء مقر رئيسي بستة طوابق و٣٠٠ م² في مصر الجديدة، القاهرة — توسيع حضورنا في العمارة المؤسسية." },
    { year: "٢٠٠٧", title: "مكتب MBC Group، المهندسين", desc: "التصميم الداخلي والديكور والإشراف على تنفيذ المكتب الإداري لمجموعة MBC (٢٠٠ م²) في حي المهندسين بالقاهرة." },
    { year: "٢٠١١", title: "استوديوهات العربية، ماسبيرو", desc: "تصميم داخلي وإشراف على تنفيذ استوديوهات ومكاتب قناة العربية (٦٠٠ م²) في منطقة ماسبيرو التاريخية للإذاعة." },
    { year: "٢٠١٥", title: "مركز سفنكس الشامل للأورام", desc: "بيئة طبية بمساحة ٧٠٠ م² في المهندسين، صُمّمت بعناية استثنائية لراحة المرضى والكوادر الطبية." },
    { year: "٢٠٢٢", title: "فيلا TN، مدينة مينا الحديقة", desc: "فيلا سكنية خاصة بثلاثة طوابق على قطعة أرض ٦٦٠ م² — تجميع لأربعة عقود من الخبرة السكنية والحرفة المعمارية المعاصرة." },
  ],
};

const STUDIO_DATA = {
  en: {
    eyebrow: "The Studio",
    heading: "Built on Expertise",
    p1: "Emara was founded in Heliopolis, Cairo — and that is where we remain. Our work is rooted in the Egyptian built environment: its codes, its climate, its materials, and the clients who call it home. Over four decades, we have accumulated a depth of local knowledge that no single project could teach.",
    p2: "Our practice spans structural engineering, architectural design, interior architecture, landscape, restoration, construction supervision, and the architectural model making that started it all. That breadth is not incidental — it means every discipline informs every other, and every project benefits from the whole.",
    p3: "We are committed to pushing the boundaries of innovation and excellence — drawing from Egyptian and international codes alike, and delivering results that stand as a testament to rigorous craft.",
  },
  ar: {
    eyebrow: "الاستوديو",
    heading: "مبني على الخبرة",
    p1: "تأسست إعمار في مصر الجديدة بالقاهرة — ولا يزال هذا موطننا. يتجذّر عملنا في البيئة العمرانية المصرية: مواصفاتها ومناخها ومواد بنائها وعملاؤها. على مدى أربعة عقود، راكمنا عمقاً من المعرفة المحلية لا يُكتسب من مشروع بعينه.",
    p2: "تمتد ممارستنا لتشمل الهندسة الإنشائية والتصميم المعماري والعمارة الداخلية وتنسيق الحدائق والترميم والإشراف على التنفيذ وصناعة النماذج المعمارية التي كانت البداية. هذا الاتساع ليس عرضياً — فكل تخصص يُغذّي الآخر، وكل مشروع يستفيد من المنظومة كلها.",
    p3: "نحن ملتزمون بدفع حدود الابتكار والتميز — مستلهمين المعايير المصرية والدولية على حدٍّ سواء، ومقدِّمين نتائج تشهد على صرامة الحرفة.",
  },
};

const HERO = {
  en: { eyebrow: "Our Story", title: "Four Decades of", accent: "Design & Construction", subtitle: "Based in Heliopolis, Cairo — building with concrete, steel, and glass since 1989." },
  ar: { eyebrow: "قصتنا",    title: "أربعة عقود من",  accent: "التصميم والبناء",       subtitle: "مقرنا في مصر الجديدة، القاهرة — نبني بالخرسانة والفولاذ والزجاج منذ ١٩٨٩." },
};

export default function AboutPage() {
  const lang = useLang();
  const f    = lang === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs   = lang === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";
  const h    = HERO[lang];

  return (
    <>
      <Header />
      <main>
        <PageHero lang={lang} eyebrow={h.eyebrow} title={h.title} titleAccent={h.accent} subtitle={h.subtitle}
          image="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=1200&q=80"
        />
        <StudioStory f={f} fs={fs} lang={lang} />
        <Values f={f} fs={fs} lang={lang} />
        <Timeline f={f} fs={fs} lang={lang} />
        <BuiltOnExpertise f={f} fs={fs} lang={lang} />
      </main>
      <Footer />
    </>
  );
}

function StudioStory({ f, fs, lang }: { f: string; fs: string; lang: "en" | "ar" }) {
  const { ref, visible } = useFadeIn();
  const t = STORY[lang];

  return (
    <section className="py-24" style={{ background: "var(--em-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="overflow-hidden" style={{ aspectRatio: "3/4", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-32px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(32px)", transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s" }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-px" style={{ background: "#993434" }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{t.eyebrow}</span>
            </div>
            <h2 className="font-light leading-[1.1] mb-8" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)" }}>
              {t.heading}
            </h2>
            <p className="leading-relaxed mb-5" style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "var(--em-muted)" }}>{t.body1}</p>
            <p className="leading-relaxed mb-12" style={{ fontFamily: f, fontWeight: 300, fontSize: "0.9rem", color: "var(--em-muted)" }}>{t.body2}</p>
            <div className="grid grid-cols-3 gap-0 border-t" style={{ borderColor: "var(--em-border)" }}>
              {t.stats.map((stat, i) => (
                <div key={stat.label} className="pt-8 pr-6" style={{ borderRight: i < t.stats.length - 1 ? "1px solid var(--em-border)" : "none", paddingLeft: i > 0 ? "1.5rem" : 0 }}>
                  <div className="font-light leading-none mb-1" style={{ fontFamily: fs, fontSize: "2.5rem", color: "#993434" }}>{stat.value}</div>
                  <div className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: f, color: "var(--em-muted)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values({ f, fs, lang }: { f: string; fs: string; lang: "en" | "ar" }) {
  const { ref, visible } = useFadeIn();
  const values = VALUES_DATA[lang];
  const eyebrow = lang === "ar" ? "قيمنا" : "Our Values";

  return (
    <section className="py-24" style={{ background: "var(--em-surface)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="flex items-center gap-3 mb-16" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <span className="w-10 h-px" style={{ background: "#993434" }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{eyebrow}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {values.map((v, i) => (
            <div key={v.num} className="relative p-10 border-t-2" style={{ borderTopColor: "var(--em-border)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms` }}>
              <div className="font-light leading-none select-none mb-6" style={{ fontFamily: fs, fontSize: "5rem", color: "var(--em-border)" }}>{v.num}</div>
              <h3 className="mb-4 font-light" style={{ fontFamily: fs, fontSize: "1.6rem", color: "var(--em-text)" }}>{v.title}</h3>
              <p className="leading-relaxed text-sm" style={{ fontFamily: f, fontWeight: 300, color: "var(--em-muted)" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline({ f, fs, lang }: { f: string; fs: string; lang: "en" | "ar" }) {
  const { ref, visible } = useFadeIn();
  const timeline = TIMELINE_DATA[lang];
  const eyebrow  = lang === "ar" ? "المحطات" : "Milestones";
  const heading  = lang === "ar" ? "أربعة عقود من الممارسة المتواصلة" : "Four Decades of Continuous Practice";

  return (
    <section className="py-24" style={{ background: "var(--em-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px" style={{ background: "#993434" }} />
            <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{eyebrow}</span>
          </div>
          <h2 className="font-light leading-[1.1] mb-16" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)", maxWidth: "32rem" }}>{heading}</h2>
        </div>
        <div className="space-y-0">
          {timeline.map((item, i) => (
            <div key={item.year} className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] lg:grid-cols-[10rem_1fr] gap-4 sm:gap-8 lg:gap-16 py-8 border-t" style={{ borderColor: "var(--em-border)", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms` }}>
              <div className="font-light pt-0.5 shrink-0" style={{ fontFamily: fs, fontSize: "1.5rem", color: "#993434" }}>{item.year}</div>
              <div>
                <h3 className="font-light mb-1" style={{ fontFamily: fs, fontSize: "1.25rem", color: "var(--em-text)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: f, fontWeight: 300, color: "var(--em-muted)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuiltOnExpertise({ f, fs, lang }: { f: string; fs: string; lang: "en" | "ar" }) {
  const { ref, visible } = useFadeIn();
  const t = STUDIO_DATA[lang];

  return (
    <section className="py-24" style={{ background: "var(--em-surface)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="max-w-3xl" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px" style={{ background: "#993434" }} />
            <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: f, color: "#993434" }}>{t.eyebrow}</span>
          </div>
          <h2 className="font-light leading-[1.1] mb-8" style={{ fontFamily: fs, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--em-text)" }}>{t.heading}</h2>
          <p className="leading-relaxed mb-5" style={{ fontFamily: f, fontWeight: 300, fontSize: "0.95rem", color: "var(--em-muted)" }}>{t.p1}</p>
          <p className="leading-relaxed mb-5" style={{ fontFamily: f, fontWeight: 300, fontSize: "0.95rem", color: "var(--em-muted)" }}>{t.p2}</p>
          <p className="leading-relaxed"     style={{ fontFamily: f, fontWeight: 300, fontSize: "0.95rem", color: "var(--em-muted)" }}>{t.p3}</p>
        </div>
      </div>
    </section>
  );
}
