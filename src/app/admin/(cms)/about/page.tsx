import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import { revalidatePath } from "next/cache";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Page" };

async function saveSection(key: string, fd: FormData) {
  "use server";
  await prisma.homepageSection.upsert({
    where: { key },
    create: {
      key,
      titleEn: (fd.get("titleEn") as string) || null,
      titleAr: (fd.get("titleAr") as string) || null,
      bodyEn:  (fd.get("bodyEn") as string) || null,
      bodyAr:  (fd.get("bodyAr") as string) || null,
    },
    update: {
      titleEn: (fd.get("titleEn") as string) || null,
      titleAr: (fd.get("titleAr") as string) || null,
      bodyEn:  (fd.get("bodyEn") as string) || null,
      bodyAr:  (fd.get("bodyAr") as string) || null,
    },
  });
  revalidatePath("/admin/about");
}

const SECTIONS = [
  { key: "about_hero",    label: "Hero / Mission Statement" },
  { key: "about_story",   label: "Our Story"                },
  { key: "about_vision",  label: "Vision & Values"          },
  { key: "about_team",    label: "Team Introduction"        },
];

export default async function AboutPage() {
  const sections = await prisma.homepageSection.findMany({
    where: { key: { in: SECTIONS.map(s => s.key) } },
  });
  const get = (key: string) => sections.find(s => s.key === key);

  return (
    <>
      <style>{S}</style>
      <div className="aph"><h1 className="apt">About Page Editor</h1></div>

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
                  <textarea name="bodyEn" className="ftxta" style={{ minHeight: 100 }} defaultValue={data?.bodyEn ?? ""} />
                </div>
                <div className="frow">
                  <label className="flbl">Body (AR)</label>
                  <textarea name="bodyAr" className="ftxta" dir="rtl" style={{ minHeight: 100 }} defaultValue={data?.bodyAr ?? ""} />
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
