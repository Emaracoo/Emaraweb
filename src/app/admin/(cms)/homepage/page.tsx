import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { saveSection, addSlide, updateSlide, deleteSlide, moveSlide, moveSection, toggleSection } from "./actions";
import { toggleServiceStatus, moveServiceOrder } from "../services/actions";
import { toggleProjectFeatured, moveProjectOrder } from "../projects/actions";
import { togglePartnerStatus, movePartnerOrder } from "../partners/actions";
import { toggleBlogStatus } from "../blog/actions";

export const metadata: Metadata = { title: "Homepage" };

const SECTIONS = [
  { key: "hero",     label: "Hero Banner",    statCount: 4, withSuffix: true,  titleHint: "Eyebrow tagline shown above the hero heading", hasHeading: false, hasCta2: true,  fieldsHint: undefined },
  { key: "about",    label: "About Teaser",   statCount: 3, withSuffix: false, titleHint: "Eyebrow (Heading is below)", hasHeading: true, hasCta2: false, fieldsHint: undefined },
  { key: "services", label: "Services Teaser", statCount: 0, withSuffix: false, titleHint: "Heading (Body field is the small eyebrow line above it)", hasHeading: false, hasCta2: false, fieldsHint: undefined, hasMicrocopy: true },
  { key: "projects", label: "Projects Teaser", statCount: 0, withSuffix: false, titleHint: "Heading (Body field is the small eyebrow line above it)", hasHeading: false, hasCta2: false, fieldsHint: undefined },
  { key: "partners", label: "Partners Strip", statCount: 0, withSuffix: false, titleHint: undefined, hasHeading: false, hasCta2: false, fieldsHint: "Only Title is shown on the homepage (the small 'Trusted By' label) — Body/CTA fields are unused here." },
  { key: "blog",     label: "Blog Row",       statCount: 0, withSuffix: false, titleHint: "Heading (Body field is the small eyebrow line above it)", hasHeading: false, hasCta2: false, fieldsHint: undefined },
  { key: "cta",      label: "Call to Action", statCount: 0, withSuffix: false, titleHint: "Headline (Body field is the small eyebrow line above it)", hasHeading: false, hasCta2: false, fieldsHint: undefined, hasBgImage: true },
];

export default async function HomepagePage() {
  const [sections, slides, services, projects, partners, blogPosts] = await Promise.all([
    prisma.homepageSection.findMany(),
    prisma.homeSlide.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    prisma.partner.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    prisma.blogPost.findMany({ orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }], take: 10 }),
  ]);
  const sectionByKey = new Map(SECTIONS.map(s => [s.key, s]));
  const orderedRows = [...sections]
    .filter(row => sectionByKey.has(row.key))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <style>{S}</style>
      <div className="aph"><h1 className="apt">Homepage Editor</h1></div>
      <p style={{ fontSize: 12, color: "#9A9A9A", marginTop: -8, marginBottom: 16 }}>Use ↑ / ↓ to reorder sections on the homepage, and Hide / Show to toggle a section off entirely.</p>

      {orderedRows.map((data, i) => {
        const sec = sectionByKey.get(data.key)!;
        const d = (data?.data as { stats?: { value: string; suffix?: string; labelEn: string; labelAr: string }[]; headingEn?: string; headingAr?: string; cta2LabelEn?: string; cta2LabelAr?: string; cta2Href?: string; bgImage?: string; learnMoreEn?: string; learnMoreAr?: string; scrollHintEn?: string; scrollHintAr?: string } | null) ?? {};
        const stats = d.stats ?? [];
        const action = saveSection.bind(null, sec.key, sec.statCount, sec.withSuffix);
        return (
          <div key={sec.key} className="frm" style={{ marginBottom: "1.25rem", opacity: data.enabled ? 1 : 0.55 }}>
            <div className="aph" style={{ marginBottom: "0.5rem" }}>
              <p className="fsec" style={{ margin: 0, border: "none", padding: 0 }}>
                {sec.label}
                {!data.enabled && <span style={{ fontWeight: 400, fontSize: 11, color: "#9A9A9A" }}> (hidden on homepage)</span>}
              </p>
              <div className="aact">
                <form action={moveSection.bind(null, sec.key, "up")}>
                  <button type="submit" className="ab ab-s" disabled={i === 0}>↑ Move up</button>
                </form>
                <form action={moveSection.bind(null, sec.key, "down")}>
                  <button type="submit" className="ab ab-s" disabled={i === orderedRows.length - 1}>↓ Move down</button>
                </form>
                <form action={toggleSection.bind(null, sec.key)}>
                  <button type="submit" className="ab ab-s">{data.enabled ? "Hide" : "Show"}</button>
                </form>
              </div>
            </div>
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

              {"hasBgImage" in sec && sec.hasBgImage && (
                <div className="frow">
                  <ImageUploadField name="bgImage" label="Background Image" defaultValue={d.bgImage ?? ""} folder="homepage" />
                </div>
              )}

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

              {"hasMicrocopy" in sec && sec.hasMicrocopy && (
                <>
                  <p className="fsec">Card Microcopy</p>
                  <div className="g2">
                    <div className="frow">
                      <label className="flbl">"Learn More" Label (EN)</label>
                      <input name="learnMoreEn" className="finp" defaultValue={d.learnMoreEn ?? ""} placeholder="Learn more →" />
                    </div>
                    <div className="frow">
                      <label className="flbl">"Learn More" Label (AR)</label>
                      <input name="learnMoreAr" className="finp" dir="rtl" defaultValue={d.learnMoreAr ?? ""} placeholder="اعرف أكثر ←" />
                    </div>
                  </div>
                  <div className="g2">
                    <div className="frow">
                      <label className="flbl">Scroll Hint (EN)</label>
                      <input name="scrollHintEn" className="finp" defaultValue={d.scrollHintEn ?? ""} placeholder="scroll or tap" />
                    </div>
                    <div className="frow">
                      <label className="flbl">Scroll Hint (AR)</label>
                      <input name="scrollHintAr" className="finp" dir="rtl" defaultValue={d.scrollHintAr ?? ""} placeholder="اسحب أو اضغط" />
                    </div>
                  </div>
                </>
              )}

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

            {sec.key === "hero" && (
              <div style={{ borderTop: "1px solid #F0EEEA", marginTop: "1.25rem", paddingTop: "1rem" }}>
                <div className="aph" style={{ marginBottom: "0.75rem" }}>
                  <p className="fsec" style={{ margin: 0, border: "none", padding: 0 }}>Hero Slides <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: "12px" }}>({slides.length}) — the rotating images and headlines behind the hero</span></p>
                  <form action={addSlide}>
                    <button type="submit" className="ab ab-p"><Plus size={13} strokeWidth={2} />Add Slide</button>
                  </form>
                </div>

                {slides.length === 0 && <p style={{ fontSize: 13, color: "#9A9A9A" }}>No slides yet — add one above.</p>}

                {slides.map((slide, si) => (
                  <div key={slide.id} style={{ borderTop: "1px solid #F0EEEA", paddingTop: "1rem", marginTop: "1rem" }}>
                    <form action={updateSlide.bind(null, slide.id)}>
                      <ImageUploadField name="image" label={`Slide ${si + 1} Image`} defaultValue={slide.image} folder="homepage" />
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
                        <button type="submit" className="ab ab-s" disabled={si === 0}>↑ Move up</button>
                      </form>
                      <form action={moveSlide.bind(null, slide.id, "down")}>
                        <button type="submit" className="ab ab-s" disabled={si === slides.length - 1}>↓ Move down</button>
                      </form>
                      <DeleteButton action={deleteSlide.bind(null, slide.id)} label="Delete slide" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sec.key === "services" && (
              <div style={{ borderTop: "1px solid #F0EEEA", marginTop: "1.25rem", paddingTop: "1rem" }}>
                <p className="fsec" style={{ marginTop: 0 }}>Service Cards <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: 12 }}>({services.length}) — shown on the homepage in this order, published only</span></p>
                {services.length === 0 && <p style={{ fontSize: 13, color: "#9A9A9A" }}>No services yet.</p>}
                {services.map((svc, si) => (
                  <div key={svc.id} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0", borderBottom: "1px solid #F5F4F2", opacity: svc.status === "PUBLISHED" ? 1 : 0.5 }}>
                    <span style={{ flex: 1, fontSize: 13 }}>{svc.titleEn}{svc.status !== "PUBLISHED" && " (draft — hidden)"}</span>
                    <form action={moveServiceOrder.bind(null, svc.id, "up")}><button type="submit" className="ab ab-s" disabled={si === 0}>↑</button></form>
                    <form action={moveServiceOrder.bind(null, svc.id, "down")}><button type="submit" className="ab ab-s" disabled={si === services.length - 1}>↓</button></form>
                    <form action={toggleServiceStatus.bind(null, svc.id)}><button type="submit" className="ab ab-s">{svc.status === "PUBLISHED" ? "Unpublish" : "Publish"}</button></form>
                    <Link href={`/admin/services/${svc.id}/edit`} className="ab ab-s">Edit →</Link>
                  </div>
                ))}
              </div>
            )}

            {sec.key === "projects" && (
              <div style={{ borderTop: "1px solid #F0EEEA", marginTop: "1.25rem", paddingTop: "1rem" }}>
                <p className="fsec" style={{ marginTop: 0 }}>Project Cards <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: 12 }}>({projects.length}) — the top 3 Featured &amp; Published projects, in this order, show on the homepage</span></p>
                {projects.length === 0 && <p style={{ fontSize: 13, color: "#9A9A9A" }}>No projects yet.</p>}
                {projects.map((p, pi) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0", borderBottom: "1px solid #F5F4F2", opacity: p.featured && p.status === "PUBLISHED" ? 1 : 0.5 }}>
                    <span style={{ flex: 1, fontSize: 13 }}>{p.titleEn}{p.status !== "PUBLISHED" && " (draft — hidden)"}{!p.featured && " (not featured)"}</span>
                    <form action={moveProjectOrder.bind(null, p.id, "up")}><button type="submit" className="ab ab-s" disabled={pi === 0}>↑</button></form>
                    <form action={moveProjectOrder.bind(null, p.id, "down")}><button type="submit" className="ab ab-s" disabled={pi === projects.length - 1}>↓</button></form>
                    <form action={toggleProjectFeatured.bind(null, p.id)}><button type="submit" className="ab ab-s">{p.featured ? "Unfeature" : "Feature"}</button></form>
                    <Link href={`/admin/projects/${p.id}/edit`} className="ab ab-s">Edit →</Link>
                  </div>
                ))}
              </div>
            )}

            {sec.key === "partners" && (
              <div style={{ borderTop: "1px solid #F0EEEA", marginTop: "1.25rem", paddingTop: "1rem" }}>
                <p className="fsec" style={{ marginTop: 0 }}>Partner Logos <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: 12 }}>({partners.length}) — all Published partners show in the "Trusted By" strip, in this order</span></p>
                {partners.length === 0 && <p style={{ fontSize: 13, color: "#9A9A9A" }}>No partners yet.</p>}
                {partners.map((p, pi) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0", borderBottom: "1px solid #F5F4F2", opacity: p.status === "PUBLISHED" ? 1 : 0.5 }}>
                    <span style={{ flex: 1, fontSize: 13 }}>{p.nameEn}{p.status !== "PUBLISHED" && " (draft — hidden)"}</span>
                    <form action={movePartnerOrder.bind(null, p.id, "up")}><button type="submit" className="ab ab-s" disabled={pi === 0}>↑</button></form>
                    <form action={movePartnerOrder.bind(null, p.id, "down")}><button type="submit" className="ab ab-s" disabled={pi === partners.length - 1}>↓</button></form>
                    <form action={togglePartnerStatus.bind(null, p.id)}><button type="submit" className="ab ab-s">{p.status === "PUBLISHED" ? "Unpublish" : "Publish"}</button></form>
                    <Link href={`/admin/partners/${p.id}/edit`} className="ab ab-s">Edit →</Link>
                  </div>
                ))}
              </div>
            )}

            {sec.key === "blog" && (
              <div style={{ borderTop: "1px solid #F0EEEA", marginTop: "1.25rem", paddingTop: "1rem" }}>
                <p className="fsec" style={{ marginTop: 0 }}>Blog Posts <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: 12 }}>— the latest 3 Published posts show on the homepage</span></p>
                {blogPosts.length === 0 && <p style={{ fontSize: 13, color: "#9A9A9A" }}>No posts yet.</p>}
                {blogPosts.map((post) => (
                  <div key={post.id} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0", borderBottom: "1px solid #F5F4F2", opacity: post.status === "PUBLISHED" ? 1 : 0.5 }}>
                    <span style={{ flex: 1, fontSize: 13 }}>{post.titleEn}{post.status !== "PUBLISHED" && " (draft — hidden)"}</span>
                    <form action={toggleBlogStatus.bind(null, post.id)}><button type="submit" className="ab ab-s">{post.status === "PUBLISHED" ? "Unpublish" : "Publish"}</button></form>
                    <Link href={`/admin/blog/${post.id}/edit`} className="ab ab-s">Edit →</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
