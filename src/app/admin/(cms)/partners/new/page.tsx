import Link from "next/link";
import { S } from "@/lib/admin-styles";
import { createPartner } from "../actions";
import type { Metadata } from "next";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export const metadata: Metadata = { title: "Add Partner" };

export default function NewPartnerPage() {
  return (
    <>
      <style>{S}</style>
      <Link href="/admin/partners" className="aback">← Partners</Link>
      <div className="aph"><h1 className="apt">Add Partner / Client</h1></div>
      <form action={createPartner}>
        <div className="frm">
          <div className="g2">
            <div className="frow">
              <label className="flbl">Name (EN) *</label>
              <input name="nameEn" required className="finp" placeholder="Acme Corp" />
            </div>
            <div className="frow">
              <label className="flbl">Name (AR)</label>
              <input name="nameAr" className="finp" dir="rtl" placeholder="اسم الشركة" />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Sector (EN) *</label>
              <input name="sector" required className="finp" placeholder="Real Estate" />
            </div>
            <div className="frow">
              <label className="flbl">Sector (AR)</label>
              <input name="sectorAr" className="finp" dir="rtl" placeholder="العقارات" />
            </div>
          </div>
          <p className="fhint" style={{ marginTop: -6, marginBottom: 12 }}>
            The sector is the heading partners are grouped under on the Partners page (e.g. &quot;Retail &amp; Fashion&quot;).
            Partners with the same Sector (EN) share one heading — changing the Arabic sector here renames it for all of them.
          </p>
          <div className="frow">
            <ImageUploadField name="logo" label="Logo" required folder="partners" />
            <p className="fhint" style={{ marginTop: -8 }}>Click &quot;Upload file&quot; to pick the logo from your computer. PNG with a transparent background works best — crop it close to the logo, as empty margins make it look small.</p>
          </div>
          <div className="frow">
            <label className="flbl">Website URL</label>
            <input name="website" type="url" className="finp" placeholder="https://example.com" />
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Status</label>
              <select name="status" className="fsel" defaultValue="PUBLISHED">
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="frow">
              <label className="flbl">Sort Order</label>
              <input name="sortOrder" type="number" className="finp" defaultValue="0" />
            </div>
          </div>
        </div>
        <div className="fbar">
          <button type="submit" className="ab ab-p">Add Partner</button>
          <Link href="/admin/partners" className="ab ab-s">Cancel</Link>
        </div>
      </form>
    </>
  );
}
