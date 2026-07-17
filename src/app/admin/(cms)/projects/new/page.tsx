import Link from "next/link";
import { S } from "@/lib/admin-styles";
import { createProject } from "../actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { GalleryUploadField } from "@/components/admin/GalleryUploadField";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Project" };

export default function NewProjectPage() {
  return (
    <>
      <style>{S}</style>
      <Link href="/admin/projects" className="aback">← Projects</Link>
      <div className="aph"><h1 className="apt">New Project</h1></div>
      <form action={createProject}>
        <div className="frm">
          <p className="fsec">Identity</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Title (English) *</label>
              <input name="titleEn" required className="finp" placeholder="e.g. Villa Al-Noor" />
            </div>
            <div className="frow">
              <label className="flbl">Title (Arabic)</label>
              <input name="titleAr" className="finp" dir="rtl" placeholder="عنوان المشروع" />
            </div>
            <div className="frow">
              <label className="flbl">Slug *</label>
              <input name="slug" required className="finp" placeholder="villa-al-noor" />
              <p className="fhint">URL-safe, e.g. villa-al-noor</p>
            </div>
          </div>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Category (EN) *</label>
              <input name="categoryEn" required className="finp" placeholder="Residential" />
            </div>
            <div className="frow">
              <label className="flbl">Category (AR)</label>
              <input name="categoryAr" className="finp" dir="rtl" placeholder="سكني" />
            </div>
            <div className="frow">
              <label className="flbl">Year *</label>
              <input name="year" required className="finp" placeholder="2024" />
            </div>
          </div>

          <p className="fsec">Details</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Location (EN)</label>
              <input name="locationEn" className="finp" placeholder="Cairo, Egypt" />
            </div>
            <div className="frow">
              <label className="flbl">Location (AR)</label>
              <input name="locationAr" className="finp" dir="rtl" />
            </div>
            <div className="frow">
              <label className="flbl">Area</label>
              <input name="area" className="finp" placeholder="450 m²" />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Client (EN)</label>
              <input name="clientEn" className="finp" />
            </div>
            <div className="frow">
              <label className="flbl">Client (AR)</label>
              <input name="clientAr" className="finp" dir="rtl" />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Description (EN)</label>
              <textarea name="descriptionEn" className="ftxta" placeholder="Project description in English…" />
            </div>
            <div className="frow">
              <label className="flbl">Description (AR)</label>
              <textarea name="descriptionAr" className="ftxta" dir="rtl" placeholder="وصف المشروع…" />
            </div>
          </div>

          <p className="fsec">Media</p>
          <ImageUploadField name="coverImage" label="Cover Image" required folder="projects" />
          <GalleryUploadField name="galleryImages" folder="projects" />

          <p className="fsec">Settings</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Status</label>
              <select name="status" className="fsel">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="frow">
              <label className="flbl">Sort Order</label>
              <input name="sortOrder" type="number" className="finp" defaultValue="0" />
            </div>
            <div className="frow" style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: "1.5rem" }}>
              <input type="checkbox" name="featured" id="featured" style={{ accentColor: "#993434", width: 16, height: 16 }} />
              <label htmlFor="featured" className="flbl" style={{ margin: 0, textTransform: "none", letterSpacing: 0, fontSize: "13px" }}>Featured project</label>
            </div>
          </div>
        </div>
        <div className="fbar">
          <button type="submit" className="ab ab-p">Create Project</button>
          <Link href="/admin/projects" className="ab ab-s">Cancel</Link>
        </div>
      </form>
    </>
  );
}
