"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseGallery(raw: string | null): string[] {
  if (!raw) return [];
  return raw.split(",").map(s => s.trim()).filter(Boolean);
}

export async function createProject(fd: FormData) {
  await prisma.project.create({
    data: {
      slug:          fd.get("slug") as string,
      titleEn:       fd.get("titleEn") as string,
      titleAr:       (fd.get("titleAr") as string) || null,
      categoryEn:    fd.get("categoryEn") as string,
      categoryAr:    (fd.get("categoryAr") as string) || null,
      year:          fd.get("year") as string,
      locationEn:    (fd.get("locationEn") as string) || null,
      locationAr:    (fd.get("locationAr") as string) || null,
      area:          (fd.get("area") as string) || null,
      clientEn:      (fd.get("clientEn") as string) || null,
      clientAr:      (fd.get("clientAr") as string) || null,
      descriptionEn: (fd.get("descriptionEn") as string) || null,
      descriptionAr: (fd.get("descriptionAr") as string) || null,
      coverImage:    fd.get("coverImage") as string,
      galleryImages: parseGallery(fd.get("galleryImages") as string),
      featured:      fd.get("featured") === "on",
      status:        (fd.get("status") as never) ?? "DRAFT",
      sortOrder:     parseInt(fd.get("sortOrder") as string) || 0,
    },
  });
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, fd: FormData) {
  await prisma.project.update({
    where: { id },
    data: {
      slug:          fd.get("slug") as string,
      titleEn:       fd.get("titleEn") as string,
      titleAr:       (fd.get("titleAr") as string) || null,
      categoryEn:    fd.get("categoryEn") as string,
      categoryAr:    (fd.get("categoryAr") as string) || null,
      year:          fd.get("year") as string,
      locationEn:    (fd.get("locationEn") as string) || null,
      locationAr:    (fd.get("locationAr") as string) || null,
      area:          (fd.get("area") as string) || null,
      clientEn:      (fd.get("clientEn") as string) || null,
      clientAr:      (fd.get("clientAr") as string) || null,
      descriptionEn: (fd.get("descriptionEn") as string) || null,
      descriptionAr: (fd.get("descriptionAr") as string) || null,
      coverImage:    fd.get("coverImage") as string,
      galleryImages: parseGallery(fd.get("galleryImages") as string),
      featured:      fd.get("featured") === "on",
      status:        fd.get("status") as never,
      sortOrder:     parseInt(fd.get("sortOrder") as string) || 0,
    },
  });
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}
