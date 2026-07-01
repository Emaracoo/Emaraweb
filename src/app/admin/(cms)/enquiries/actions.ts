"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateEnquiryStatus(id: string, status: string) {
  await prisma.enquiry.update({ where: { id }, data: { status: status as never } });
  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
}

export async function saveEnquiryNote(id: string, notes: string) {
  await prisma.enquiry.update({ where: { id }, data: { notes } });
  revalidatePath(`/admin/enquiries/${id}`);
}

export async function deleteEnquiry(id: string) {
  await prisma.enquiry.delete({ where: { id } });
  redirect("/admin/enquiries");
}
