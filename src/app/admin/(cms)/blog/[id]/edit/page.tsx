import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { S } from "@/lib/admin-styles";
import { updateBlogPost, deleteBlogPost } from "../../actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Post" };

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();
  const action = updateBlogPost.bind(null, id);

  return (
    <>
      <style>{S}</style>
      <Link href="/admin/blog" className="aback">← Blog</Link>
      <div className="aph">
        <h1 className="apt">Edit: {post.titleEn}</h1>
        <DeleteButton action={deleteBlogPost.bind(null, id)} label="Delete post" />
      </div>
      <form action={action}>
        <div className="frm">
          <p className="fsec">Identity</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Title (EN) *</label>
              <input name="titleEn" required className="finp" defaultValue={post.titleEn} />
            </div>
            <div className="frow">
              <label className="flbl">Title (AR)</label>
              <input name="titleAr" className="finp" dir="rtl" defaultValue={post.titleAr ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Slug *</label>
              <input name="slug" required className="finp" defaultValue={post.slug} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Category</label>
              <input name="category" className="finp" defaultValue={post.category ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Tags</label>
              <input name="tags" className="finp" defaultValue={post.tags.join(", ")} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Excerpt (EN)</label>
              <textarea name="excerptEn" className="ftxta" style={{ minHeight: 80 }} defaultValue={post.excerptEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Excerpt (AR)</label>
              <textarea name="excerptAr" className="ftxta" dir="rtl" style={{ minHeight: 80 }} defaultValue={post.excerptAr ?? ""} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Body (EN)</label>
              <textarea name="bodyEn" className="ftxta" style={{ minHeight: 200 }} defaultValue={post.bodyEn ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Body (AR)</label>
              <textarea name="bodyAr" className="ftxta" dir="rtl" style={{ minHeight: 200 }} defaultValue={post.bodyAr ?? ""} />
            </div>
          </div>

          <p className="fsec">Media & Settings</p>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Cover Image URL</label>
              <input name="coverImage" className="finp" defaultValue={post.coverImage ?? ""} />
            </div>
            <div className="frow">
              <label className="flbl">Status</label>
              <select name="status" className="fsel" defaultValue={post.status}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
        </div>
        <div className="fbar">
          <button type="submit" className="ab ab-p">Save Changes</button>
          <Link href="/admin/blog" className="ab ab-s">Cancel</Link>
        </div>
      </form>
    </>
  );
}
