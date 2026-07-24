import Link from "next/link";
import { S } from "@/lib/admin-styles";
import { createService } from "../actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Service" };

export default function NewServicePage() {
  return (
    <>
      <style>{S}</style>
      <Link href="/admin/services" className="aback">← Services</Link>
      <div className="aph"><h1 className="apt">New Service</h1></div>
      <form action={createService}>
        <div className="frm">
          <p className="fsec">Identity</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Title (EN) *</label>
              <input name="titleEn" required className="finp" placeholder="Architecture Design" />
            </div>
            <div className="frow">
              <label className="flbl">Title (AR)</label>
              <input name="titleAr" className="finp" dir="rtl" placeholder="التصميم المعماري" />
            </div>
            <div className="frow">
              <label className="flbl">Slug *</label>
              <input name="slug" required className="finp" placeholder="architecture-design" />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Short Description (EN)</label>
              <textarea name="descriptionEn" className="ftxta" style={{ minHeight: 80 }} />
            </div>
            <div className="frow">
              <label className="flbl">Short Description (AR)</label>
              <textarea name="descriptionAr" className="ftxta" dir="rtl" style={{ minHeight: 80 }} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Long Description (EN)</label>
              <textarea name="longDescEn" className="ftxta" />
            </div>
            <div className="frow">
              <label className="flbl">Long Description (AR)</label>
              <textarea name="longDescAr" className="ftxta" dir="rtl" />
            </div>
          </div>

          <p className="fsec">Media & Settings</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Icon name</label>
              <input name="icon" className="finp" placeholder="Building2" />
              <p className="fhint">Lucide icon name</p>
            </div>
            <div className="frow">
              <label className="flbl">Cover Image URL</label>
              <input name="coverImage" className="finp" placeholder="https://…" />
            </div>
            <div className="frow">
              <label className="flbl">Status</label>
              <select name="status" className="fsel" defaultValue="PUBLISHED">
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Badge (EN)</label>
              <input name="badgeEn" className="finp" placeholder="Gallery" />
              <p className="fhint">Optional small badge shown on the homepage services teaser</p>
            </div>
            <div className="frow">
              <label className="flbl">Badge (AR)</label>
              <input name="badgeAr" className="finp" dir="rtl" placeholder="معرض" />
            </div>
            <div className="frow">
              <label className="flbl">Sort Order</label>
              <input name="sortOrder" type="number" className="finp" defaultValue="0" />
            </div>
          </div>
        </div>
        <div className="fbar">
          <button type="submit" className="ab ab-p">Create Service</button>
          <Link href="/admin/services" className="ab ab-s">Cancel</Link>
        </div>
      </form>
    </>
  );
}
