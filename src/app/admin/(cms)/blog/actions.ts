"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  return raw.split(",").map(s => s.trim()).filter(Boolean);
}

export async function createBlogPost(fd: FormData) {
  const session = await auth();
  const statusVal = fd.get("status") as string ?? "DRAFT";
  await prisma.blogPost.create({
    data: {
      slug:        fd.get("slug") as string,
      titleEn:     fd.get("titleEn") as string,
      titleAr:     (fd.get("titleAr") as string) || null,
      excerptEn:   (fd.get("excerptEn") as string) || null,
      excerptAr:   (fd.get("excerptAr") as string) || null,
      bodyEn:      (fd.get("bodyEn") as string) || null,
      bodyAr:      (fd.get("bodyAr") as string) || null,
      coverImage:  (fd.get("coverImage") as string) || null,
      tags:        parseTags(fd.get("tags") as string),
      category:    (fd.get("category") as string) || null,
      status:      statusVal as never,
      publishedAt: statusVal === "PUBLISHED" ? new Date() : null,
      authorId:    session?.user?.id ?? null,
    },
  });
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, fd: FormData) {
  const statusVal = fd.get("status") as string;
  const existing = await prisma.blogPost.findUnique({ where: { id }, select: { publishedAt: true } });
  await prisma.blogPost.update({
    where: { id },
    data: {
      slug:        fd.get("slug") as string,
      titleEn:     fd.get("titleEn") as string,
      titleAr:     (fd.get("titleAr") as string) || null,
      excerptEn:   (fd.get("excerptEn") as string) || null,
      excerptAr:   (fd.get("excerptAr") as string) || null,
      bodyEn:      (fd.get("bodyEn") as string) || null,
      bodyAr:      (fd.get("bodyAr") as string) || null,
      coverImage:  (fd.get("coverImage") as string) || null,
      tags:        parseTags(fd.get("tags") as string),
      category:    (fd.get("category") as string) || null,
      status:      statusVal as never,
      publishedAt: statusVal === "PUBLISHED" && !existing?.publishedAt ? new Date() : existing?.publishedAt,
    },
  });
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
