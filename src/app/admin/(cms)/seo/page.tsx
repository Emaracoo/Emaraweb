import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import { saveSEO } from "./actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "SEO" };

const PAGES = [
  { key: "home",     label: "Homepage"    },
  { key: "projects", label: "Projects"    },
  { key: "blog",     label: "Blog"        },
  { key: "about",    label: "About"       },
  { key: "contact",  label: "Contact"     },
];

export default async function SEOPage() {
  const rows = await prisma.siteSetting.findMany({ where: { group: "seo" } });
  const get = (key: string) => rows.find(r => r.key === key)?.value ?? "";

  return (
    <>
      <style>{S}</style>
      <div className="aph">
        <h1 className="apt">SEO Settings</h1>
      </div>
      <form action={saveSEO}>
        {PAGES.map(pg => (
          <div key={pg.key} className="frm" style={{ marginBottom: "1.25rem" }}>
            <p className="fsec">{pg.label}</p>
            <div className="g2">
              <div className="frow">
                <label className="flbl">Title (EN)</label>
                <input name={`${pg.key}_title_en`} className="finp" defaultValue={get(`${pg.key}_title_en`)} placeholder={`${pg.label} — Emara Co.`} />
                <p className="fhint">Recommended: 50–60 characters</p>
              </div>
              <div className="frow">
                <label className="flbl">Title (AR)</label>
                <input name={`${pg.key}_title_ar`} className="finp" dir="rtl" defaultValue={get(`${pg.key}_title_ar`)} />
              </div>
            </div>
            <div className="g2">
              <div className="frow">
                <label className="flbl">Description (EN)</label>
                <textarea name={`${pg.key}_desc_en`} className="ftxta" style={{ minHeight: 72 }} defaultValue={get(`${pg.key}_desc_en`)} placeholder="Meta description, 120–160 characters…" />
              </div>
              <div className="frow">
                <label className="flbl">Description (AR)</label>
                <textarea name={`${pg.key}_desc_ar`} className="ftxta" dir="rtl" style={{ minHeight: 72 }} defaultValue={get(`${pg.key}_desc_ar`)} />
              </div>
            </div>
          </div>
        ))}
        <div className="fbar">
          <button type="submit" className="ab ab-p">Save SEO Settings</button>
        </div>
      </form>
    </>
  );
}
