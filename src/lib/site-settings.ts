import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

/** All SiteSetting rows, fetched once per request. */
export const getSettings = cache(async () => {
  const rows = await prisma.siteSetting.findMany();
  const map = new Map(rows.map(r => [r.key, r.value]));
  return (key: string): string | null => map.get(key) || null;
});

/* ── Page images (editable in Admin → Settings → Page Images) ─────────────── */

export const PAGE_IMAGE_DEFAULTS = {
  hero_image_about:    "/projects/villa-tn/01.jpg",
  about_story_image:   "/projects/al-arabiya-studios/02.jpg",
  hero_image_services: "/projects/villa-hm/03.jpg",
  hero_image_projects: "/projects/villa-zw/01.jpg",
  hero_image_partners: "/projects/sphinx-cancer-centre/01.jpg",
  hero_image_blog:     "/projects/maquette-civilization-museum/01.jpg",
  hero_image_contact:  "/projects/villa-hm/01.jpg",
} as const;

export type PageImageKey = keyof typeof PAGE_IMAGE_DEFAULTS;

export async function getPageImage(key: PageImageKey): Promise<string> {
  const get = await getSettings();
  return get(key) || PAGE_IMAGE_DEFAULTS[key];
}

/* ── Contact details (editable in Admin → Settings → Contact Information) ──── */

export const CONTACT_DEFAULTS = {
  phone:      "+20 106 424 5471",
  email:      "Info@EmaraCo.com",
  address_en: "5 Al-Hariry St, beside Tivoli Dome\nHeliopolis, Cairo, Egypt",
  address_ar: "٥ شارع الحريري، بجوار تيفولي دوم\nمصر الجديدة، القاهرة، مصر",
  hours_en:   "Our studio is open *Saturday to Thursday*, 9am – 6pm.",
  hours_ar:   "استوديونا مفتوح من *السبت إلى الخميس*، من ٩ص حتى ٦م.",
  instagram:  "https://www.instagram.com/emaraconstruction/",
  facebook:   "https://www.facebook.com/emaraconstruction/",
};

export async function getContactInfo(lang: "en" | "ar") {
  const get = await getSettings();
  const socials = [
    { label: "Instagram", href: get("instagram_url") || CONTACT_DEFAULTS.instagram },
    { label: "Facebook",  href: get("facebook_url")  || CONTACT_DEFAULTS.facebook },
    { label: "LinkedIn",  href: get("linkedin_url") },
    { label: "X",         href: get("twitter_url") },
  ].filter((s): s is { label: string; href: string } => !!s.href);

  return {
    phone:   get("phone") || CONTACT_DEFAULTS.phone,
    email:   get("email_contact") || CONTACT_DEFAULTS.email,
    address: (lang === "ar" ? get("address_ar") : get("address_en")) || (lang === "ar" ? CONTACT_DEFAULTS.address_ar : CONTACT_DEFAULTS.address_en),
    hours:   (lang === "ar" ? get("hours_ar") : get("hours_en")) || (lang === "ar" ? CONTACT_DEFAULTS.hours_ar : CONTACT_DEFAULTS.hours_en),
    socials,
  };
}
