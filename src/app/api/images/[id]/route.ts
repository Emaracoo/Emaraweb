import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const media = await prisma.media.findUnique({
    where: { id },
    select: { data: true, mimeType: true },
  });

  if (!media?.data) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(media.data as unknown as BodyInit, {
    headers: {
      "Content-Type": media.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
