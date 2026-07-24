"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";

export async function savePartnersStats(fd: FormData) {
  const stats = [];
  for (let i = 0; i < 4; i++) {
    const value   = (fd.get(`stat${i}_value`) as string) || "";
    const labelEn = (fd.get(`stat${i}_labelEn`) as string) || "";
    const labelAr = (fd.get(`stat${i}_labelAr`) as string) || "";
    if (!value && !labelEn && !labelAr) continue;
    stats.push({ value, labelEn, labelAr });
  }
  const data = { stats } as unknown as Prisma.InputJsonValue;
  await prisma.homepageSection.upsert({
    where:  { key: "partners_stats" },
    create: { key: "partners_stats", data },
    update: { data },
  });
  revalidatePath("/admin/partners");
  revalidatePath("/[lang]/partners", "page");
}

export async function createPartner(fd: FormData) {
  await prisma.partner.create({
    data: {
      nameEn:    fd.get("nameEn") as string,
      nameAr:    (fd.get("nameAr") as string) || null,
      sector:    fd.get("sector") as string,
      sectorAr:  (fd.get("sectorAr") as string) || null,
      logo:      fd.get("logo") as string,
      website:   (fd.get("website") as string) || null,
      status:    (fd.get("status") as never) ?? "PUBLISHED",
      sortOrder: parseInt(fd.get("sortOrder") as string) || 0,
    },
  });
  revalidatePath("/admin/partners");
  redirect("/admin/partners");
}

export async function updatePartner(id: string, fd: FormData) {
  await prisma.partner.update({
    where: { id },
    data: {
      nameEn:    fd.get("nameEn") as string,
      nameAr:    (fd.get("nameAr") as string) || null,
      sector:    fd.get("sector") as string,
      sectorAr:  (fd.get("sectorAr") as string) || null,
      logo:      fd.get("logo") as string,
      website:   (fd.get("website") as string) || null,
      status:    fd.get("status") as never,
      sortOrder: parseInt(fd.get("sortOrder") as string) || 0,
    },
  });
  revalidatePath("/admin/partners");
  redirect("/admin/partners");
}

export async function deletePartner(id: string) {
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/admin/partners");
  redirect("/admin/partners");
}
