import { prisma } from "@/lib/prisma";
import { getContactInfo, getSettings } from "@/lib/site-settings";
import FooterClient from "./FooterClient";

export default async function Footer() {
  const [get, contactEn, contactAr, categories, services] = await Promise.all([
    getSettings(),
    getContactInfo("en"),
    getContactInfo("ar"),
    prisma.project.findMany({
      where:   { status: "PUBLISHED" },
      select:  { categoryEn: true, categoryAr: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.service.findMany({
      where:   { status: "PUBLISHED" },
      select:  { slug: true, titleEn: true, titleAr: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  return (
    <FooterClient
      logoUrl={get("footer_logo_url")}
      companyName={get("company_name")}
      taglineEn={get("footer_tagline_en")}
      taglineAr={get("footer_tagline_ar")}
      addressEn={contactEn.address}
      addressAr={contactAr.address}
      phone={contactEn.phone}
      email={contactEn.email}
      socials={contactEn.socials}
      privacyUrl={get("privacy_url")}
      termsUrl={get("terms_url")}
      categories={categories}
      services={services}
    />
  );
}
