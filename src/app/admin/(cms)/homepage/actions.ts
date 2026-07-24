"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";

interface Stat { value: string; suffix?: string; labelEn: string; labelAr: string }

function readStats(fd: FormData, count: number, withSuffix: boolean): Stat[] {
  const stats: Stat[] = [];
  for (let i = 0; i < count; i++) {
    const value   = (fd.get(`stat${i}_value`) as string) || "";
    const labelEn = (fd.get(`stat${i}_labelEn`) as string) || "";
    const labelAr = (fd.get(`stat${i}_labelAr`) as string) || "";
    if (!value && !labelEn && !labelAr) continue;
    const stat: Stat = { value, labelEn, labelAr };
    if (withSuffix) stat.suffix = (fd.get(`stat${i}_suffix`) as string) || "";
    stats.push(stat);
  }
  return stats;
}

export async function saveSection(key: string, statCount: number, withSuffix: boolean, fd: FormData) {
  const stats = statCount > 0 ? readStats(fd, statCount, withSuffix) : undefined;

  const extra: Record<string, string> = {};
  for (const name of ["headingEn", "headingAr", "cta2LabelEn", "cta2LabelAr", "cta2Href", "bgImage", "learnMoreEn", "learnMoreAr", "scrollHintEn", "scrollHintAr"]) {
    const v = fd.get(name) as string | null;
    if (v) extra[name] = v;
  }

  const hasData = !!stats || Object.keys(extra).length > 0;
  const data = hasData ? ({ ...(stats ? { stats } : {}), ...extra } as unknown as Prisma.InputJsonValue) : undefined;

  const fields = {
    titleEn:    (fd.get("titleEn") as string) || null,
    titleAr:    (fd.get("titleAr") as string) || null,
    bodyEn:     (fd.get("bodyEn") as string) || null,
    bodyAr:     (fd.get("bodyAr") as string) || null,
    ctaLabelEn: (fd.get("ctaLabelEn") as string) || null,
    ctaLabelAr: (fd.get("ctaLabelAr") as string) || null,
    ctaHref:    (fd.get("ctaHref") as string) || null,
  };

  await prisma.homepageSection.upsert({
    where:  { key },
    create: { key, ...fields, ...(data ? { data } : {}) },
    update: { ...fields, ...(data ? { data } : {}) },
  });
  revalidatePath("/admin/homepage");
  revalidatePath("/[lang]", "page");
}

export async function addSlide() {
  const last = await prisma.homeSlide.findFirst({ orderBy: { sortOrder: "desc" } });
  await prisma.homeSlide.create({
    data: { image: "", titleEn: "New Slide", titleAr: null, sortOrder: (last?.sortOrder ?? -1) + 1 },
  });
  revalidatePath("/admin/homepage");
}

export async function updateSlide(id: string, fd: FormData) {
  await prisma.homeSlide.update({
    where: { id },
    data: {
      image:   (fd.get("image") as string) || "",
      titleEn: (fd.get("titleEn") as string) || "",
      titleAr: (fd.get("titleAr") as string) || null,
    },
  });
  revalidatePath("/admin/homepage");
  revalidatePath("/[lang]", "page");
}

export async function deleteSlide(id: string) {
  await prisma.homeSlide.delete({ where: { id } });
  revalidatePath("/admin/homepage");
  revalidatePath("/[lang]", "page");
}

export async function moveSlide(id: string, direction: "up" | "down") {
  const slides = await prisma.homeSlide.findMany({ orderBy: { sortOrder: "asc" } });
  const idx = slides.findIndex(s => s.id === id);
  if (idx === -1) return;
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= slides.length) return;

  const a = slides[idx];
  const b = slides[swapWith];
  await prisma.$transaction([
    prisma.homeSlide.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
    prisma.homeSlide.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
  ]);
  revalidatePath("/admin/homepage");
}
