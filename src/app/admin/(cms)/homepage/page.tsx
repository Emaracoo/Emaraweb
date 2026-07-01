import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import { revalidatePath } from "next/cache";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Homepage" };

async function saveSection(key: string, fd: FormData) {
  "use server";
  await prisma.homepageSection.upsert({
    where: { key },
    create: {
      key,
      titleEn:    (fd.get("titleEn") as string) || null,
      titleAr:    (fd.get("titleAr") as string) || null,
      bodyEn:     (fd.get("bodyEn") as string) || null,
      bodyAr:     (fd.get("bodyAr") as string) || null,
      ctaLabelEn: (fd.get("ctaLabelEn") as string) || null,
      ctaLabelAr: (fd.get("ctaLabelAr") as string) || null,
      ctaHref:    (fd.get("ctaHref") as string) || null,
    },
    update: {
      titleEn:    (fd.get("titleEn") as string) || null,
      titleAr:    (fd.get("titleAr") as string) || null,
      bodyEn:     (fd.get("bodyEn") as string) || null,
      bodyAr:     (fd.get("bodyAr") as string) || null,
      ctaLabelEn: (fd.get("ctaLabelEn") as string) || null,
      ctaLabelAr: (fd.get("ctaLabelAr") as string) || null,
      ctaHref:    (fd.get("ctaHref") as string) || null,
    },
  });
  revalidatePath("/admin/homepage");
}

const SECTIONS = [
  { key: "hero",     label: "Hero Banner"   },
  { key: "about",    label: "About Teaser"  },
  { key: "services", label: "Services Teaser" },
  { key: "projects", label: "Projects Teaser" },
  { key: "cta",      label: "Call to Action" },
];

export default async function HomepagePage() {
  const sections = await prisma.homepageSection.findMany();
  const get = (key: string) => sections.find(s => s.key === key);

  return (
    <>
      <style>{S}</style>
      <div className="aph"><h1 className="apt">Homepage Editor</h1></div>

      {SECTIONS.map(sec => {
        const data = get(sec.key);
        const action = saveSection.bind(null, sec.key);
        return (
          <div key={sec.key} className="frm" style={{ marginBottom: "1.25rem" }}>
            <p className="fsec">{sec.label}</p>
            <form action={action}>
              <div className="g2">
                <div className="frow">
                  <label className="flbl">Title (EN)</label>
                  <input name="titleEn" className="finp" defaultValue={data?.titleEn ?? ""} />
                </div>
                <div className="frow">
                  <label className="flbl">Title (AR)</label>
                  <input name="titleAr" className="finp" dir="rtl" defaultValue={data?.titleAr ?? ""} />
                </div>
              </div>
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
              <div style={{ paddingTop: ".75rem" }}>
                <button type="submit" className="ab ab-s">Save {sec.label}</button>
              </div>
            </form>
          </div>
        );
      })}
    </>
  );
}
