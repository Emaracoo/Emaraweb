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
