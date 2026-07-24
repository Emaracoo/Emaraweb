"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";

function str(fd: FormData, name: string): string | null {
  return (fd.get(name) as string) || null;
}

function revalidateAbout() {
  revalidatePath("/admin/about");
  revalidatePath("/[lang]/about", "page");
}

export async function saveAboutHero(fd: FormData) {
  const data = {
    eyebrowEn: str(fd, "eyebrowEn"),
    eyebrowAr: str(fd, "eyebrowAr"),
    accentEn:  str(fd, "accentEn"),
    accentAr:  str(fd, "accentAr"),
  } as unknown as Prisma.InputJsonValue;

  const fields = {
    titleEn: str(fd, "titleEn"),
    titleAr: str(fd, "titleAr"),
    bodyEn:  str(fd, "bodyEn"),
    bodyAr:  str(fd, "bodyAr"),
  };

  await prisma.homepageSection.upsert({
    where:  { key: "about_hero" },
    create: { key: "about_hero", ...fields, data },
    update: { ...fields, data },
  });
  revalidateAbout();
}

export async function saveAboutStory(fd: FormData) {
  const stats = [];
  for (let i = 0; i < 3; i++) {
    const value   = (fd.get(`stat${i}_value`) as string) || "";
    const labelEn = (fd.get(`stat${i}_labelEn`) as string) || "";
    const labelAr = (fd.get(`stat${i}_labelAr`) as string) || "";
    if (!value && !labelEn && !labelAr) continue;
    stats.push({ value, labelEn, labelAr });
  }

  const data = {
    eyebrowEn: str(fd, "eyebrowEn"),
    eyebrowAr: str(fd, "eyebrowAr"),
    body2En:   str(fd, "body2En"),
    body2Ar:   str(fd, "body2Ar"),
    stats,
  } as unknown as Prisma.InputJsonValue;

  const fields = {
    titleEn: str(fd, "titleEn"),
    titleAr: str(fd, "titleAr"),
    bodyEn:  str(fd, "bodyEn"),
    bodyAr:  str(fd, "bodyAr"),
  };

  await prisma.homepageSection.upsert({
    where:  { key: "about_story" },
    create: { key: "about_story", ...fields, data },
    update: { ...fields, data },
  });
  revalidateAbout();
}

export async function saveAboutVision(fd: FormData) {
  const values = [];
  for (let i = 0; i < 3; i++) {
    const titleEn = (fd.get(`value${i}_titleEn`) as string) || "";
    const titleAr = (fd.get(`value${i}_titleAr`) as string) || "";
    const descEn  = (fd.get(`value${i}_descEn`) as string) || "";
    const descAr  = (fd.get(`value${i}_descAr`) as string) || "";
    if (!titleEn && !titleAr && !descEn && !descAr) continue;
    values.push({ titleEn, titleAr, descEn, descAr });
  }

  const data = { values } as unknown as Prisma.InputJsonValue;

  const fields = {
    titleEn: str(fd, "titleEn"),
    titleAr: str(fd, "titleAr"),
  };

  await prisma.homepageSection.upsert({
    where:  { key: "about_vision" },
    create: { key: "about_vision", ...fields, data },
    update: { ...fields, data },
  });
  revalidateAbout();
}

export async function saveAboutTeam(fd: FormData) {
  const data = {
    eyebrowEn: str(fd, "eyebrowEn"),
    eyebrowAr: str(fd, "eyebrowAr"),
    p2En:      str(fd, "p2En"),
    p2Ar:      str(fd, "p2Ar"),
    p3En:      str(fd, "p3En"),
    p3Ar:      str(fd, "p3Ar"),
  } as unknown as Prisma.InputJsonValue;

  const fields = {
    titleEn: str(fd, "titleEn"),
    titleAr: str(fd, "titleAr"),
    bodyEn:  str(fd, "bodyEn"),
    bodyAr:  str(fd, "bodyAr"),
  };

  await prisma.homepageSection.upsert({
    where:  { key: "about_team" },
    create: { key: "about_team", ...fields, data },
    update: { ...fields, data },
  });
  revalidateAbout();
}
