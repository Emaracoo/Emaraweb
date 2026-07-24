import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import { saveSettings } from "./actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const rows = await prisma.siteSetting.findMany();
  const get = (key: string) => rows.find(r => r.key === key)?.value ?? "";

  return (
    <>
      <style>{S}</style>
      <div className="aph"><h1 className="apt">Site Settings</h1></div>
      <form action={saveSettings}>
        <div className="frm">
          <p className="fsec">Contact Information</p>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Phone Number</label>
              <input name="phone" className="finp" defaultValue={get("phone")} placeholder="+966 11 000 0000" />
            </div>
            <div className="frow">
              <label className="flbl">WhatsApp Number</label>
              <input name="whatsapp_number" className="finp" defaultValue={get("whatsapp_number")} placeholder="+966 5X XXX XXXX" />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Contact Email</label>
              <input name="email_contact" type="email" className="finp" defaultValue={get("email_contact")} placeholder="hello@emaraco.com" />
            </div>
            <div className="frow">
              <label className="flbl">Enquiries Email</label>
              <input name="email_enquiry" type="email" className="finp" defaultValue={get("email_enquiry")} placeholder="enquiries@emaraco.com" />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Address (EN)</label>
              <textarea name="address_en" className="ftxta" style={{ minHeight: 72 }} defaultValue={get("address_en")} placeholder="King Fahd Road, Riyadh 12211" />
            </div>
            <div className="frow">
              <label className="flbl">Address (AR)</label>
              <textarea name="address_ar" className="ftxta" dir="rtl" style={{ minHeight: 72 }} defaultValue={get("address_ar")} />
            </div>
          </div>

          <p className="fsec">Social Media</p>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Instagram URL</label>
              <input name="instagram_url" className="finp" defaultValue={get("instagram_url")} placeholder="https://instagram.com/emaraco" />
            </div>
            <div className="frow">
              <label className="flbl">Facebook URL</label>
              <input name="facebook_url" className="finp" defaultValue={get("facebook_url")} placeholder="https://facebook.com/emaraco" />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">LinkedIn URL</label>
              <input name="linkedin_url" className="finp" defaultValue={get("linkedin_url")} />
            </div>
            <div className="frow">
              <label className="flbl">X / Twitter URL</label>
              <input name="twitter_url" className="finp" defaultValue={get("twitter_url")} />
            </div>
          </div>

          <p className="fsec">Branding</p>
          <div className="frow">
            <ImageUploadField name="logo_url" label="Site Logo" defaultValue={get("logo_url")} folder="branding" />
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Company Name</label>
              <input name="company_name" className="finp" defaultValue={get("company_name")} placeholder="Emara Construction" />
            </div>
            <div className="frow" />
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Footer Tagline (EN)</label>
              <input name="footer_tagline_en" className="finp" defaultValue={get("footer_tagline_en")} placeholder="Architecture that stands the test of time." />
            </div>
            <div className="frow">
              <label className="flbl">Footer Tagline (AR)</label>
              <input name="footer_tagline_ar" className="finp" dir="rtl" defaultValue={get("footer_tagline_ar")} />
            </div>
          </div>

          <p className="fsec">Legal</p>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Privacy Policy URL</label>
              <input name="privacy_url" className="finp" defaultValue={get("privacy_url")} placeholder="/en/privacy" />
            </div>
            <div className="frow">
              <label className="flbl">Terms of Use URL</label>
              <input name="terms_url" className="finp" defaultValue={get("terms_url")} placeholder="/en/terms" />
            </div>
          </div>
        </div>
        <div className="fbar">
          <button type="submit" className="ab ab-p">Save Settings</button>
        </div>
      </form>
    </>
  );
}
