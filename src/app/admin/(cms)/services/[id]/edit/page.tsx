import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { S } from "@/lib/admin-styles";
import { updateService, deleteService } from "../../actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Service" };

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await prisma.service.findUnique({ where: { id } });
  if (!s) notFound();
  const action = updateService.bind(null, id);

  return (
    <>
      <style>{S}</style>
      <Link href="/admin/services" className="aback">← Services</Link>
      <div className="aph">
        <h1 className="apt">Edit: {s.titleEn}</h1>
        <DeleteButton action={deleteService.bind(null, id)} label="Delete service" />
      </div>
      <form action={action}>
        <div className="frm">
          <p className="fsec">Identity</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Title (EN) *</label>
              <input name="titleEn" required className="finp" defaultValue={s.titleEn} />
            </div>
            <div className="frow">
              <label className="flbl">Title (AR)</label>
              <input name="titleAr" className="finp" dir="rtl" defaultValue={s.titleAr ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Slug *</label>
              <input name="slug" required className="finp" defaultValue={s.slug} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Short Description (EN)</label>
              <textarea name="descriptionEn" className="ftxta" style={{ minHeight: 80 }} defaultValue={s.descriptionEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Short Description (AR)</label>
              <textarea name="descriptionAr" className="ftxta" dir="rtl" style={{ minHeight: 80 }} defaultValue={s.descriptionAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Long Description (EN)</label>
              <textarea name="longDescEn" className="ftxta" defaultValue={s.longDescEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Long Description (AR)</label>
              <textarea name="longDescAr" className="ftxta" dir="rtl" defaultValue={s.longDescAr ?? ""} />
            </div>
          </div>

          <p className="fsec">Media & Settings</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Icon name</label>
              <input name="icon" className="finp" defaultValue={s.icon ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Cover Image URL</label>
              <input name="coverImage" className="finp" defaultValue={s.coverImage ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Status</label>
              <select name="status" className="fsel" defaultValue={s.status}>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
          <div className="frow" style={{ maxWidth: 200 }}>
            <label className="flbl">Sort Order</label>
            <input name="sortOrder" type="number" className="finp" defaultValue={s.sortOrder} />
          </div>
        </div>
        <div className="fbar">
          <button type="submit" className="ab ab-p">Save Changes</button>
          <Link href="/admin/services" className="ab ab-s">Cancel</Link>
        </div>
      </form>
    </>
  );
}
