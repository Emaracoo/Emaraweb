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

export async function updatePartnerLogo(id: string, fd: FormData) {
  const logo = fd.get("logo") as string;
  if (!logo) return;
  await prisma.partner.update({ where: { id }, data: { logo } });
  revalidatePath("/admin/partners");
  revalidatePath("/admin/homepage");
  revalidatePath("/[lang]", "page");
}

export async function togglePartnerStatus(id: string) {
  const row = await prisma.partner.findUnique({ where: { id } });
  if (!row) return;
  await prisma.partner.update({ where: { id }, data: { status: row.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" } });
  revalidatePath("/admin/partners");
  revalidatePath("/admin/homepage");
  revalidatePath("/[lang]", "page");
}

export async function movePartnerOrder(id: string, direction: "up" | "down") {
  const rows = await prisma.partner.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  const idx = rows.findIndex(r => r.id === id);
  if (idx === -1) return;
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= rows.length) return;
  const a = rows[idx];
  const b = rows[swapWith];
  await prisma.$transaction([
    prisma.partner.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
    prisma.partner.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
  ]);
  revalidatePath("/admin/partners");
  revalidatePath("/admin/homepage");
  revalidatePath("/[lang]", "page");
}
