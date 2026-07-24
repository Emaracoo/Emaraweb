import { prisma } from "@/lib/prisma";
import FooterClient from "./FooterClient";

export default async function Footer() {
  const rows = await prisma.siteSetting.findMany();
  const get = (key: string) => rows.find(r => r.key === key)?.value || null;

  const socials = [
    { label: "Instagram", href: get("instagram_url") || "https://www.instagram.com/emaraconstruction/" },
    { label: "Facebook",  href: get("facebook_url")  || "https://www.facebook.com/emaraconstruction/" },
    { label: "LinkedIn",  href: get("linkedin_url") },
    { label: "X",         href: get("twitter_url") },
  ].filter((s): s is { label: string; href: string } => !!s.href);

  return (
    <FooterClient
      logoUrl={get("logo_url")}
      companyName={get("company_name")}
      taglineEn={get("footer_tagline_en")}
      taglineAr={get("footer_tagline_ar")}
      addressEn={get("address_en")}
      addressAr={get("address_ar")}
      socials={socials}
      privacyUrl={get("privacy_url")}
      termsUrl={get("terms_url")}
    />
  );
}
