"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(fd: FormData) {
  const password = fd.get("password") as string;
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      name:         fd.get("name") as string,
      email:        fd.get("email") as string,
      passwordHash,
      role:         (fd.get("role") as never) ?? "EDITOR",
    },
  });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}
