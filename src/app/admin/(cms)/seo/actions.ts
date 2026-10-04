"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveSEO(fd: FormData) {
  const keys = [
    "home_title_en",    "home_desc_en",
    "home_title_ar",    "home_desc_ar",
    "projects_title_en","projects_desc_en",
    "projects_title_ar","projects_desc_ar",
    "blog_title_en",    "blog_desc_en",
    "blog_title_ar",    "blog_desc_ar",
    "about_title_en",   "about_desc_en",
    "about_title_ar",   "about_desc_ar",
    "contact_title_en", "contact_desc_en",
    "contact_title_ar", "contact_desc_ar",
  ];

  await Promise.all(
    keys.map(key =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value: fd.get(key) as string ?? "", group: "seo" },
        update: { value: fd.get(key) as string ?? "" },
      }),
    ),
  );
  revalidatePath("/admin/seo");
  revalidatePath("/", "layout");
}
