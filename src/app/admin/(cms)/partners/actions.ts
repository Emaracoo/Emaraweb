"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
