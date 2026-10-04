import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { S } from "@/lib/admin-styles";
import { updateProject, deleteProject } from "../../actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { GalleryUploadField } from "@/components/admin/GalleryUploadField";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) notFound();

  const action = updateProject.bind(null, id);

  return (
    <>
      <style>{S}</style>
      <Link href="/admin/projects" className="aback">← Projects</Link>
      <div className="aph">
        <h1 className="apt">Edit: {p.titleEn}</h1>
        <DeleteButton action={deleteProject.bind(null, id)} label="Delete project" />
      </div>
      <form action={action}>
        <div className="frm">
          <p className="fsec">Identity</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Title (English) *</label>
              <input name="titleEn" required className="finp" defaultValue={p.titleEn} />
            </div>
            <div className="frow">
              <label className="flbl">Title (Arabic)</label>
              <input name="titleAr" className="finp" dir="rtl" defaultValue={p.titleAr ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Slug *</label>
              <input name="slug" required className="finp" defaultValue={p.slug} />
            </div>
          </div>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Category (EN) *</label>
              <input name="categoryEn" required className="finp" defaultValue={p.categoryEn} />
            </div>
            <div className="frow">
              <label className="flbl">Category (AR)</label>
              <input name="categoryAr" className="finp" dir="rtl" defaultValue={p.categoryAr ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Year *</label>
              <input name="year" required className="finp" defaultValue={p.year} />
            </div>
          </div>

          <p className="fsec">Details</p>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Location (EN)</label>
              <input name="locationEn" className="finp" defaultValue={p.locationEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Location (AR)</label>
              <input name="locationAr" className="finp" dir="rtl" defaultValue={p.locationAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Area (EN)</label>
              <input name="area" className="finp" defaultValue={p.area ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Area (AR)</label>
              <input name="areaAr" className="finp" dir="rtl" defaultValue={p.areaAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Client (EN)</label>
              <input name="clientEn" className="finp" defaultValue={p.clientEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Client (AR)</label>
              <input name="clientAr" className="finp" dir="rtl" defaultValue={p.clientAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Description (EN)</label>
              <textarea name="descriptionEn" className="ftxta" defaultValue={p.descriptionEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Description (AR)</label>
              <textarea name="descriptionAr" className="ftxta" dir="rtl" defaultValue={p.descriptionAr ?? ""} />
            </div>
          </div>

          <p className="fsec">Media</p>
          <ImageUploadField name="coverImage" label="Cover Image" required defaultValue={p.coverImage} folder="projects" />
          <GalleryUploadField name="galleryImages" defaultValue={p.galleryImages} folder="projects" />

          <p className="fsec">Settings</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Status</label>
              <select name="status" className="fsel" defaultValue={p.status}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="frow">
              <label className="flbl">Sort Order</label>
              <input name="sortOrder" type="number" className="finp" defaultValue={p.sortOrder} />
            </div>
            <div className="frow" style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingTop: "1.5rem" }}>
              <input type="checkbox" name="featured" id="featured" defaultChecked={p.featured} style={{ accentColor: "#993434", width: 16, height: 16 }} />
              <label htmlFor="featured" className="flbl" style={{ margin: 0, textTransform: "none", letterSpacing: 0, fontSize: "13px" }}>Featured project</label>
            </div>
          </div>
        </div>
        <div className="fbar">
          <button type="submit" className="ab ab-p">Save Changes</button>
          <Link href="/admin/projects" className="ab ab-s">Cancel</Link>
        </div>
      </form>
    </>
  );
}
