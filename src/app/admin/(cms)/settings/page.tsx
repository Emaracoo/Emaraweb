import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import { saveSettings } from "./actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { Metadata } from "next";
import { CONTACT_DEFAULTS, PAGE_IMAGE_DEFAULTS } from "@/lib/site-settings";

export const metadata: Metadata = { title: "Settings" };

const PAGE_IMAGES: { key: keyof typeof PAGE_IMAGE_DEFAULTS; label: string }[] = [
  { key: "hero_image_about",    label: "About — Hero Photo" },
  { key: "about_story_image",   label: "About — \"Who We Are\" Photo" },
  { key: "hero_image_services", label: "Services — Hero Photo" },
  { key: "hero_image_projects", label: "Projects — Hero Photo" },
  { key: "hero_image_partners", label: "Partners — Hero Photo" },
  { key: "hero_image_blog",     label: "Blog — Hero Photo" },
  { key: "hero_image_contact",  label: "Contact — Hero Photo" },
];

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
              <input name="phone" className="finp" dir="ltr" defaultValue={get("phone")} placeholder={CONTACT_DEFAULTS.phone} />
              <p style={{ fontSize: 11, color: "#9A9A9A", marginTop: 4 }}>Shown on the Contact page and in the footer.</p>
            </div>
            <div className="frow">
              <label className="flbl">WhatsApp Number</label>
              <input name="whatsapp_number" className="finp" dir="ltr" defaultValue={get("whatsapp_number")} placeholder="+20 1X XXXX XXXX" />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Contact Email</label>
              <input name="email_contact" type="email" className="finp" defaultValue={get("email_contact")} placeholder={CONTACT_DEFAULTS.email} />
            </div>
            <div className="frow">
              <label className="flbl">Enquiries Email</label>
              <input name="email_enquiry" type="email" className="finp" defaultValue={get("email_enquiry")} placeholder="enquiries@emaraco.com" />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Address (EN)</label>
              <textarea name="address_en" className="ftxta" style={{ minHeight: 72 }} defaultValue={get("address_en")} placeholder={CONTACT_DEFAULTS.address_en} />
            </div>
            <div className="frow">
              <label className="flbl">Address (AR)</label>
              <textarea name="address_ar" className="ftxta" dir="rtl" style={{ minHeight: 72 }} defaultValue={get("address_ar")} placeholder={CONTACT_DEFAULTS.address_ar} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Studio Hours (EN)</label>
              <input name="hours_en" className="finp" defaultValue={get("hours_en")} placeholder={CONTACT_DEFAULTS.hours_en} />
              <p style={{ fontSize: 11, color: "#9A9A9A", marginTop: 4 }}>Wrap words in *asterisks* to show them in the red accent style.</p>
            </div>
            <div className="frow">
              <label className="flbl">Studio Hours (AR)</label>
              <input name="hours_ar" className="finp" dir="rtl" defaultValue={get("hours_ar")} placeholder={CONTACT_DEFAULTS.hours_ar} />
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
            <ImageUploadField name="logo_url" label="Site Logo (header)" defaultValue={get("logo_url")} folder="branding" />
          </div>
          <div className="frow">
            <ImageUploadField name="footer_logo_url" label="Footer Logo (optional)" defaultValue={get("footer_logo_url")} folder="branding" />
            <p style={{ fontSize: 11, color: "#9A9A9A", marginTop: -8 }}>Leave empty to use the built-in logo. Upload a version cropped tight to the artwork (no empty margins) — it is shown in white.</p>
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

          <p className="fsec">Page Images</p>
          <p style={{ fontSize: 11, color: "#9A9A9A", marginTop: -8, marginBottom: 12 }}>The photos at the top of each page (they fill the right half of the banner on desktop). Leave a field empty to use the default photo.</p>
          <div className="g2">
            {PAGE_IMAGES.map(({ key, label }) => (
              <div key={key} className="frow">
                <ImageUploadField name={key} label={label} defaultValue={get(key)} folder="pages" />
                {!get(key) && <p style={{ fontSize: 11, color: "#9A9A9A", marginTop: -8 }}>Currently using the default photo ({PAGE_IMAGE_DEFAULTS[key]})</p>}
              </div>
            ))}
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
