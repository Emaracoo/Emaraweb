import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import type { Metadata } from "next";
import { saveAboutHero, saveAboutStory, saveAboutVision, saveAboutTeam } from "./actions";

export const metadata: Metadata = { title: "About Page" };

const KEYS = ["about_hero", "about_story", "about_vision", "about_team"] as const;

interface HeroData { eyebrowEn?: string; eyebrowAr?: string; accentEn?: string; accentAr?: string }
interface StoryData { eyebrowEn?: string; eyebrowAr?: string; body2En?: string; body2Ar?: string; stats?: { value: string; labelEn: string; labelAr: string }[] }
interface VisionData { values?: { titleEn: string; titleAr: string; descEn: string; descAr: string }[] }
interface TeamData { eyebrowEn?: string; eyebrowAr?: string; p2En?: string; p2Ar?: string; p3En?: string; p3Ar?: string }

export default async function AboutPage() {
  const sections = await prisma.homepageSection.findMany({ where: { key: { in: [...KEYS] } } });
  const get = (key: string) => sections.find(s => s.key === key);

  const hero   = get("about_hero");
  const heroD  = (hero?.data as HeroData | null) ?? {};
  const story  = get("about_story");
  const storyD = (story?.data as StoryData | null) ?? {};
  const storyStats = storyD.stats ?? [];
  const vision  = get("about_vision");
  const visionD = (vision?.data as VisionData | null) ?? {};
  const visionValues = visionD.values ?? [];
  const team   = get("about_team");
  const teamD  = (team?.data as TeamData | null) ?? {};

  return (
    <>
      <style>{S}</style>
      <div className="aph"><h1 className="apt">About Page Editor</h1></div>

      {/* ── Hero / Mission Statement ─────────────────────────────── */}
      <div className="frm" style={{ marginBottom: "1.25rem" }}>
        <p className="fsec">Hero / Mission Statement</p>
        <form action={saveAboutHero}>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Eyebrow (EN)</label>
              <input name="eyebrowEn" className="finp" defaultValue={heroD.eyebrowEn ?? ""} placeholder="Our Story" />
            </div>
            <div className="frow">
              <label className="flbl">Eyebrow (AR)</label>
              <input name="eyebrowAr" className="finp" dir="rtl" defaultValue={heroD.eyebrowAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Title (EN)</label>
              <input name="titleEn" className="finp" defaultValue={hero?.titleEn ?? ""} placeholder="Four Decades of" />
            </div>
            <div className="frow">
              <label className="flbl">Title (AR)</label>
              <input name="titleAr" className="finp" dir="rtl" defaultValue={hero?.titleAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Title Accent (EN)</label>
              <input name="accentEn" className="finp" defaultValue={heroD.accentEn ?? ""} placeholder="Design & Construction" />
            </div>
            <div className="frow">
              <label className="flbl">Title Accent (AR)</label>
              <input name="accentAr" className="finp" dir="rtl" defaultValue={heroD.accentAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Subtitle (EN)</label>
              <textarea name="bodyEn" className="ftxta" style={{ minHeight: 70 }} defaultValue={hero?.bodyEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Subtitle (AR)</label>
              <textarea name="bodyAr" className="ftxta" dir="rtl" style={{ minHeight: 70 }} defaultValue={hero?.bodyAr ?? ""} />
            </div>
          </div>
          <button type="submit" className="ab ab-s">Save Hero</button>
        </form>
      </div>

      {/* ── Our Story ────────────────────────────────────────────── */}
      <div className="frm" style={{ marginBottom: "1.25rem" }}>
        <p className="fsec">Our Story</p>
        <form action={saveAboutStory}>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Eyebrow (EN)</label>
              <input name="eyebrowEn" className="finp" defaultValue={storyD.eyebrowEn ?? ""} placeholder="Who we are" />
            </div>
            <div className="frow">
              <label className="flbl">Eyebrow (AR)</label>
              <input name="eyebrowAr" className="finp" dir="rtl" defaultValue={storyD.eyebrowAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Heading (EN)</label>
              <input name="titleEn" className="finp" defaultValue={story?.titleEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Heading (AR)</label>
              <input name="titleAr" className="finp" dir="rtl" defaultValue={story?.titleAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Body Paragraph 1 (EN)</label>
              <textarea name="bodyEn" className="ftxta" style={{ minHeight: 100 }} defaultValue={story?.bodyEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Body Paragraph 1 (AR)</label>
              <textarea name="bodyAr" className="ftxta" dir="rtl" style={{ minHeight: 100 }} defaultValue={story?.bodyAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Body Paragraph 2 (EN)</label>
              <textarea name="body2En" className="ftxta" style={{ minHeight: 100 }} defaultValue={storyD.body2En ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Body Paragraph 2 (AR)</label>
              <textarea name="body2Ar" className="ftxta" dir="rtl" style={{ minHeight: 100 }} defaultValue={storyD.body2Ar ?? ""} />
            </div>
          </div>

          <p className="fsec">Stats</p>
          {Array.from({ length: 3 }).map((_, i) => {
            const stat = storyStats[i];
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr", gap: "1rem", marginBottom: "0.75rem" }}>
                <div className="frow" style={{ marginBottom: 0 }}>
                  <label className="flbl">Value</label>
                  <input name={`stat${i}_value`} className="finp" defaultValue={stat?.value ?? ""} placeholder="40" />
                </div>
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

          <div style={{ paddingTop: ".75rem" }}>
            <button type="submit" className="ab ab-s">Save Our Story</button>
          </div>
        </form>
      </div>

      {/* ── Vision & Values ──────────────────────────────────────── */}
      <div className="frm" style={{ marginBottom: "1.25rem" }}>
        <p className="fsec">Vision & Values</p>
        <form action={saveAboutVision}>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Eyebrow (EN)</label>
              <input name="titleEn" className="finp" defaultValue={vision?.titleEn ?? ""} placeholder="Our Values" />
            </div>
            <div className="frow">
              <label className="flbl">Eyebrow (AR)</label>
              <input name="titleAr" className="finp" dir="rtl" defaultValue={vision?.titleAr ?? ""} />
            </div>
          </div>

          <p className="fsec">Value Cards</p>
          {Array.from({ length: 3 }).map((_, i) => {
            const v = visionValues[i];
            return (
              <div key={i} style={{ borderTop: i > 0 ? "1px solid #F0EEEA" : "none", paddingTop: i > 0 ? "1rem" : 0, marginTop: i > 0 ? "1rem" : 0 }}>
                <div className="g2">
                  <div className="frow">
                    <label className="flbl">Card {i + 1} Title (EN)</label>
                    <input name={`value${i}_titleEn`} className="finp" defaultValue={v?.titleEn ?? ""} />
                  </div>
                  <div className="frow">
                    <label className="flbl">Card {i + 1} Title (AR)</label>
                    <input name={`value${i}_titleAr`} className="finp" dir="rtl" defaultValue={v?.titleAr ?? ""} />
                  </div>
                </div>
                <div className="g2">
                  <div className="frow">
                    <label className="flbl">Card {i + 1} Description (EN)</label>
                    <textarea name={`value${i}_descEn`} className="ftxta" style={{ minHeight: 80 }} defaultValue={v?.descEn ?? ""} />
                  </div>
                  <div className="frow">
                    <label className="flbl">Card {i + 1} Description (AR)</label>
                    <textarea name={`value${i}_descAr`} className="ftxta" dir="rtl" style={{ minHeight: 80 }} defaultValue={v?.descAr ?? ""} />
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ paddingTop: ".75rem" }}>
            <button type="submit" className="ab ab-s">Save Vision & Values</button>
          </div>
        </form>
      </div>

      {/* ── Studio / Expertise ───────────────────────────────────── */}
      <div className="frm" style={{ marginBottom: "1.25rem" }}>
        <p className="fsec">Studio / Expertise</p>
        <form action={saveAboutTeam}>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Eyebrow (EN)</label>
              <input name="eyebrowEn" className="finp" defaultValue={teamD.eyebrowEn ?? ""} placeholder="The Studio" />
            </div>
            <div className="frow">
              <label className="flbl">Eyebrow (AR)</label>
              <input name="eyebrowAr" className="finp" dir="rtl" defaultValue={teamD.eyebrowAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Heading (EN)</label>
              <input name="titleEn" className="finp" defaultValue={team?.titleEn ?? ""} placeholder="Built on Expertise" />
            </div>
            <div className="frow">
              <label className="flbl">Heading (AR)</label>
              <input name="titleAr" className="finp" dir="rtl" defaultValue={team?.titleAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Paragraph 1 (EN)</label>
              <textarea name="bodyEn" className="ftxta" style={{ minHeight: 90 }} defaultValue={team?.bodyEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Paragraph 1 (AR)</label>
              <textarea name="bodyAr" className="ftxta" dir="rtl" style={{ minHeight: 90 }} defaultValue={team?.bodyAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Paragraph 2 (EN)</label>
              <textarea name="p2En" className="ftxta" style={{ minHeight: 90 }} defaultValue={teamD.p2En ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Paragraph 2 (AR)</label>
              <textarea name="p2Ar" className="ftxta" dir="rtl" style={{ minHeight: 90 }} defaultValue={teamD.p2Ar ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Paragraph 3 (EN)</label>
              <textarea name="p3En" className="ftxta" style={{ minHeight: 90 }} defaultValue={teamD.p3En ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Paragraph 3 (AR)</label>
              <textarea name="p3Ar" className="ftxta" dir="rtl" style={{ minHeight: 90 }} defaultValue={teamD.p3Ar ?? ""} />
            </div>
          </div>
          <button type="submit" className="ab ab-s">Save Studio / Expertise</button>
        </form>
      </div>
    </>
  );
}
