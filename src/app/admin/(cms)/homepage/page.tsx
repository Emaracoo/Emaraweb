import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { saveSection, addSlide, updateSlide, deleteSlide, moveSlide } from "./actions";

export const metadata: Metadata = { title: "Homepage" };

const SECTIONS = [
  { key: "hero",     label: "Hero Banner",    statCount: 4, withSuffix: true,  titleHint: "Eyebrow tagline shown above the hero heading", hasHeading: false, hasCta2: true,  fieldsHint: undefined },
  { key: "about",    label: "About Teaser",   statCount: 3, withSuffix: false, titleHint: "Eyebrow (Heading is below)", hasHeading: true, hasCta2: false, fieldsHint: undefined },
  { key: "services", label: "Services Teaser", statCount: 0, withSuffix: false, titleHint: "Heading (Body field is the small eyebrow line above it)", hasHeading: false, hasCta2: false, fieldsHint: undefined },
  { key: "projects", label: "Projects Teaser", statCount: 0, withSuffix: false, titleHint: "Heading (Body field is the small eyebrow line above it)", hasHeading: false, hasCta2: false, fieldsHint: undefined },
  { key: "partners", label: "Partners Strip", statCount: 0, withSuffix: false, titleHint: undefined, hasHeading: false, hasCta2: false, fieldsHint: "Only Title is shown on the homepage (the small 'Trusted By' label) — Body/CTA fields are unused here." },
  { key: "blog",     label: "Blog Row",       statCount: 0, withSuffix: false, titleHint: "Heading (Body field is the small eyebrow line above it)", hasHeading: false, hasCta2: false, fieldsHint: undefined },
  { key: "cta",      label: "Call to Action", statCount: 0, withSuffix: false, titleHint: "Headline (Body field is the small eyebrow line above it)", hasHeading: false, hasCta2: false, fieldsHint: undefined },
];

export default async function HomepagePage() {
  const [sections, slides] = await Promise.all([
    prisma.homepageSection.findMany(),
    prisma.homeSlide.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  const get = (key: string) => sections.find(s => s.key === key);

  return (
    <>
      <style>{S}</style>
      <div className="aph"><h1 className="apt">Homepage Editor</h1></div>

      {SECTIONS.map(sec => {
        const data = get(sec.key);
        const d = (data?.data as { stats?: { value: string; suffix?: string; labelEn: string; labelAr: string }[]; headingEn?: string; headingAr?: string; cta2LabelEn?: string; cta2LabelAr?: string; cta2Href?: string } | null) ?? {};
        const stats = d.stats ?? [];
        const action = saveSection.bind(null, sec.key, sec.statCount, sec.withSuffix);
        return (
          <div key={sec.key} className="frm" style={{ marginBottom: "1.25rem" }}>
            <p className="fsec">{sec.label}</p>
            {sec.fieldsHint && <p style={{ fontSize: 11, color: "#9A9A9A", marginTop: -8, marginBottom: 12 }}>{sec.fieldsHint}</p>}
            <form action={action}>
              <div className="g2">
                <div className="frow">
                  <label className="flbl">Title (EN)</label>
                  <input name="titleEn" className="finp" defaultValue={data?.titleEn ?? ""} />
                  {sec.titleHint && <p style={{ fontSize: 11, color: "#9A9A9A", marginTop: 4 }}>{sec.titleHint}</p>}
                </div>
                <div className="frow">
                  <label className="flbl">Title (AR)</label>
                  <input name="titleAr" className="finp" dir="rtl" defaultValue={data?.titleAr ?? ""} />
                </div>
              </div>

              {sec.hasHeading && (
                <div className="g2">
                  <div className="frow">
                    <label className="flbl">Heading (EN)</label>
                    <input name="headingEn" className="finp" defaultValue={d.headingEn ?? ""} />
                  </div>
                  <div className="frow">
                    <label className="flbl">Heading (AR)</label>
                    <input name="headingAr" className="finp" dir="rtl" defaultValue={d.headingAr ?? ""} />
                  </div>
                </div>
              )}

              <div className="g2">
                <div className="frow">
                  <label className="flbl">Body (EN)</label>
                  <textarea name="bodyEn" className="ftxta" style={{ minHeight: 80 }} defaultValue={data?.bodyEn ?? ""} />
                </div>
                <div className="frow">
                  <label className="flbl">Body (AR)</label>
                  <textarea name="bodyAr" className="ftxta" dir="rtl" style={{ minHeight: 80 }} defaultValue={data?.bodyAr ?? ""} />
                </div>
              </div>
              <div className="g3">
                <div className="frow">
                  <label className="flbl">CTA Label (EN)</label>
                  <input name="ctaLabelEn" className="finp" defaultValue={data?.ctaLabelEn ?? ""} placeholder="View our work" />
                </div>
                <div className="frow">
                  <label className="flbl">CTA Label (AR)</label>
                  <input name="ctaLabelAr" className="finp" dir="rtl" defaultValue={data?.ctaLabelAr ?? ""} />
                </div>
                <div className="frow">
                  <label className="flbl">CTA Link</label>
                  <input name="ctaHref" className="finp" defaultValue={data?.ctaHref ?? ""} placeholder="/en/projects" />
                </div>
              </div>

              {sec.hasCta2 && (
                <>
                  <p className="fsec">Secondary Button</p>
                  <div className="g3">
                    <div className="frow">
                      <label className="flbl">Label (EN)</label>
                      <input name="cta2LabelEn" className="finp" defaultValue={d.cta2LabelEn ?? ""} placeholder="About Emara" />
                    </div>
                    <div className="frow">
                      <label className="flbl">Label (AR)</label>
                      <input name="cta2LabelAr" className="finp" dir="rtl" defaultValue={d.cta2LabelAr ?? ""} />
                    </div>
                    <div className="frow">
                      <label className="flbl">Link</label>
                      <input name="cta2Href" className="finp" defaultValue={d.cta2Href ?? ""} placeholder="/en/about" />
                    </div>
                  </div>
                </>
              )}

              {sec.statCount > 0 && (
                <>
                  <p className="fsec">Stats</p>
                  {Array.from({ length: sec.statCount }).map((_, i) => {
                    const stat = stats[i];
                    return (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: sec.withSuffix ? "1fr 1fr 2fr 2fr" : "1fr 2fr 2fr", gap: "1rem", marginBottom: "0.75rem" }}>
                        <div className="frow" style={{ marginBottom: 0 }}>
                          <label className="flbl">Value</label>
                          <input name={`stat${i}_value`} className="finp" defaultValue={stat?.value ?? ""} placeholder="40" />
                        </div>
                        {sec.withSuffix && (
                          <div className="frow" style={{ marginBottom: 0 }}>
                            <label className="flbl">Suffix</label>
                            <input name={`stat${i}_suffix`} className="finp" defaultValue={stat?.suffix ?? ""} placeholder="+" />
                          </div>
                        )}
                        <div className="frow" style={{ marginBottom: 0 }}>
                          <label className="flbl">Label (EN)</label>
                          <input name={`stat${i}_labelEn`} className="finp" defaultValue={stat?.labelEn ?? ""} placeholder="Years of Experience" />
                        </div>
                        <div className="frow" style={{ marginBottom: 0 }}>
                          <label className="flbl">Label (AR)</label>
                          <input name={`stat${i}_labelAr`} className="finp" dir="rtl" defaultValue={stat?.labelAr ?? ""} />
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              <div style={{ paddingTop: ".75rem" }}>
                <button type="submit" className="ab ab-s">Save {sec.label}</button>
              </div>
            </form>
          </div>
        );
      })}

      <div className="frm" style={{ marginBottom: "1.25rem" }}>
        <div className="aph" style={{ marginBottom: "0.75rem" }}>
          <p className="fsec" style={{ margin: 0, border: "none", padding: 0 }}>Hero Slides <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: "12px" }}>({slides.length})</span></p>
          <form action={addSlide}>
            <button type="submit" className="ab ab-p"><Plus size={13} strokeWidth={2} />Add Slide</button>
          </form>
        </div>

        {slides.length === 0 && <p style={{ fontSize: 13, color: "#9A9A9A" }}>No slides yet — add one above.</p>}

        {slides.map((slide, i) => (
          <div key={slide.id} style={{ borderTop: "1px solid #F0EEEA", paddingTop: "1rem", marginTop: "1rem" }}>
            <form action={updateSlide.bind(null, slide.id)}>
              <ImageUploadField name="image" label={`Slide ${i + 1} Image`} defaultValue={slide.image} folder="homepage" />
              <div className="g2">
                <div className="frow">
                  <label className="flbl">Title (EN)</label>
                  <textarea name="titleEn" className="ftxta" style={{ minHeight: 60 }} defaultValue={slide.titleEn} />
                </div>
                <div className="frow">
                  <label className="flbl">Title (AR)</label>
                  <textarea name="titleAr" className="ftxta" dir="rtl" style={{ minHeight: 60 }} defaultValue={slide.titleAr ?? ""} />
                </div>
              </div>
              <button type="submit" className="ab ab-s">Save Slide</button>
            </form>
            <div className="aact" style={{ marginTop: "0.6rem" }}>
              <form action={moveSlide.bind(null, slide.id, "up")}>
                <button type="submit" className="ab ab-s" disabled={i === 0}>↑ Move up</button>
              </form>
              <form action={moveSlide.bind(null, slide.id, "down")}>
                <button type="submit" className="ab ab-s" disabled={i === slides.length - 1}>↓ Move down</button>
              </form>
              <DeleteButton action={deleteSlide.bind(null, slide.id)} label="Delete slide" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
