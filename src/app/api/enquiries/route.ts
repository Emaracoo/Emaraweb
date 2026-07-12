import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, phone, subject, message } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  await prisma.enquiry.create({
    data: {
      name:    name.trim().slice(0, 200),
      email:   email.trim().slice(0, 200),
      phone:   typeof phone   === "string" && phone.trim()   ? phone.trim().slice(0, 50)    : null,
      subject: typeof subject === "string" && subject.trim() ? subject.trim().slice(0, 200) : null,
      message: message.trim().slice(0, 5000),
    },
  });

  return NextResponse.json({ ok: true });
}
