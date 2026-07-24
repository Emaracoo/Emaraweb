"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveSettings(fd: FormData) {
  const pairs: { key: string; value: string; group: string }[] = [
    { key: "phone",           value: fd.get("phone") as string ?? "",          group: "contact" },
    { key: "email_contact",   value: fd.get("email_contact") as string ?? "",  group: "contact" },
    { key: "email_enquiry",   value: fd.get("email_enquiry") as string ?? "",  group: "contact" },
    { key: "address_en",      value: fd.get("address_en") as string ?? "",     group: "contact" },
    { key: "address_ar",      value: fd.get("address_ar") as string ?? "",     group: "contact" },
    { key: "instagram_url",   value: fd.get("instagram_url") as string ?? "",  group: "social"  },
    { key: "facebook_url",    value: fd.get("facebook_url") as string ?? "",   group: "social"  },
    { key: "linkedin_url",    value: fd.get("linkedin_url") as string ?? "",   group: "social"  },
    { key: "twitter_url",     value: fd.get("twitter_url") as string ?? "",    group: "social"  },
    { key: "whatsapp_number", value: fd.get("whatsapp_number") as string ?? "", group: "social" },
    { key: "logo_url",          value: fd.get("logo_url") as string ?? "",          group: "branding" },
    { key: "company_name",      value: fd.get("company_name") as string ?? "",      group: "branding" },
    { key: "footer_tagline_en", value: fd.get("footer_tagline_en") as string ?? "", group: "branding" },
    { key: "footer_tagline_ar", value: fd.get("footer_tagline_ar") as string ?? "", group: "branding" },
    { key: "privacy_url",     value: fd.get("privacy_url") as string ?? "",    group: "legal"   },
    { key: "terms_url",       value: fd.get("terms_url") as string ?? "",      group: "legal"   },
  ];

  await Promise.all(
    pairs.map(({ key, value, group }) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value, group },
        update: { value },
      }),
    ),
  );
  revalidatePath("/admin/settings");
  revalidatePath("/[lang]", "layout");
}
