import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { S } from "@/lib/admin-styles";
import { updatePartner, deletePartner } from "../../actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Partner" };

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await prisma.partner.findUnique({ where: { id } });
  if (!p) notFound();
  const action = updatePartner.bind(null, id);

  return (
    <>
      <style>{S}</style>
      <Link href="/admin/partners" className="aback">← Partners</Link>
      <div className="aph">
        <h1 className="apt">Edit: {p.nameEn}</h1>
        <DeleteButton action={deletePartner.bind(null, id)} label="Delete partner" />
      </div>
      <form action={action}>
        <div className="frm">
          <div className="g2">
            <div className="frow">
              <label className="flbl">Name (EN) *</label>
              <input name="nameEn" required className="finp" defaultValue={p.nameEn} />
            </div>
            <div className="frow">
              <label className="flbl">Name (AR)</label>
              <input name="nameAr" className="finp" dir="rtl" defaultValue={p.nameAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Sector (EN) *</label>
              <input name="sector" required className="finp" defaultValue={p.sector} />
            </div>
            <div className="frow">
              <label className="flbl">Sector (AR)</label>
              <input name="sectorAr" className="finp" dir="rtl" defaultValue={p.sectorAr ?? ""} />
            </div>
          </div>
          <div className="frow">
            <label className="flbl">Logo URL *</label>
            <input name="logo" required className="finp" defaultValue={p.logo} />
          </div>
          <div className="frow">
            <label className="flbl">Website URL</label>
            <input name="website" type="url" className="finp" defaultValue={p.website ?? ""} />
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Status</label>
              <select name="status" className="fsel" defaultValue={p.status}>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="frow">
              <label className="flbl">Sort Order</label>
              <input name="sortOrder" type="number" className="finp" defaultValue={p.sortOrder} />
            </div>
          </div>
        </div>
        <div className="fbar">
          <button type="submit" className="ab ab-p">Save Changes</button>
          <Link href="/admin/partners" className="ab ab-s">Cancel</Link>
        </div>
      </form>
    </>
  );
}
