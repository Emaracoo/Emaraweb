"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createService(fd: FormData) {
  await prisma.service.create({
    data: {
      slug:          fd.get("slug") as string,
      titleEn:       fd.get("titleEn") as string,
      titleAr:       (fd.get("titleAr") as string) || null,
      descriptionEn: (fd.get("descriptionEn") as string) || null,
      descriptionAr: (fd.get("descriptionAr") as string) || null,
      longDescEn:    (fd.get("longDescEn") as string) || null,
      longDescAr:    (fd.get("longDescAr") as string) || null,
      icon:          (fd.get("icon") as string) || null,
      coverImage:    (fd.get("coverImage") as string) || null,
      badgeEn:       (fd.get("badgeEn") as string) || null,
      badgeAr:       (fd.get("badgeAr") as string) || null,
      status:        (fd.get("status") as never) ?? "PUBLISHED",
      sortOrder:     parseInt(fd.get("sortOrder") as string) || 0,
    },
  });
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(id: string, fd: FormData) {
  await prisma.service.update({
    where: { id },
    data: {
      slug:          fd.get("slug") as string,
      titleEn:       fd.get("titleEn") as string,
      titleAr:       (fd.get("titleAr") as string) || null,
      descriptionEn: (fd.get("descriptionEn") as string) || null,
      descriptionAr: (fd.get("descriptionAr") as string) || null,
      longDescEn:    (fd.get("longDescEn") as string) || null,
      longDescAr:    (fd.get("longDescAr") as string) || null,
      icon:          (fd.get("icon") as string) || null,
      coverImage:    (fd.get("coverImage") as string) || null,
      badgeEn:       (fd.get("badgeEn") as string) || null,
      badgeAr:       (fd.get("badgeAr") as string) || null,
      status:        fd.get("status") as never,
      sortOrder:     parseInt(fd.get("sortOrder") as string) || 0,
    },
  });
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function toggleServiceStatus(id: string) {
  const row = await prisma.service.findUnique({ where: { id } });
  if (!row) return;
  await prisma.service.update({ where: { id }, data: { status: row.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" } });
  revalidatePath("/admin/services");
  revalidatePath("/admin/homepage");
  revalidatePath("/[lang]", "page");
}

export async function updateServiceCoverImage(id: string, fd: FormData) {
  const coverImage = fd.get("coverImage") as string;
  await prisma.service.update({ where: { id }, data: { coverImage: coverImage || null } });
  revalidatePath("/admin/services");
  revalidatePath("/admin/homepage");
  revalidatePath("/[lang]", "page");
}

export async function moveServiceOrder(id: string, direction: "up" | "down") {
  const rows = await prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  const idx = rows.findIndex(r => r.id === id);
  if (idx === -1) return;
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= rows.length) return;
  const a = rows[idx];
  const b = rows[swapWith];
  await prisma.$transaction([
    prisma.service.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
    prisma.service.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
  ]);
  revalidatePath("/admin/services");
  revalidatePath("/admin/homepage");
  revalidatePath("/[lang]", "page");
}
