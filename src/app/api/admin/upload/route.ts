import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const folder = (form.get("folder") as string) || "general";

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const media = await prisma.media.create({
    data: {
      filename:     file.name,
      originalName: file.name,
      url:          "",         // filled below after we have the id
      data:         buffer,
      mimeType:     file.type || "image/jpeg",
      size:         file.size,
      folder,
    },
  });

  // Self-referencing URL that the serve route reads
  await prisma.media.update({
    where: { id: media.id },
    data:  { url: `/api/images/${media.id}` },
  });

  return NextResponse.json({ url: `/api/images/${media.id}` });
}
