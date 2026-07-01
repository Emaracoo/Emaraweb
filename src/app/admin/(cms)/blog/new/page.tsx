import Link from "next/link";
import { S } from "@/lib/admin-styles";
import { createBlogPost } from "../actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Post" };

export default function NewBlogPostPage() {
  return (
    <>
      <style>{S}</style>
      <Link href="/admin/blog" className="aback">← Blog</Link>
      <div className="aph"><h1 className="apt">New Blog Post</h1></div>
      <form action={createBlogPost}>
        <div className="frm">
          <p className="fsec">Identity</p>
          <div className="g3">
            <div className="frow">
              <label className="flbl">Title (EN) *</label>
              <input name="titleEn" required className="finp" placeholder="Post title" />
            </div>
            <div className="frow">
              <label className="flbl">Title (AR)</label>
              <input name="titleAr" className="finp" dir="rtl" placeholder="عنوان المقالة" />
            </div>
            <div className="frow">
              <label className="flbl">Slug *</label>
              <input name="slug" required className="finp" placeholder="post-title" />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Category</label>
              <input name="category" className="finp" placeholder="Architecture, Design…" />
            </div>
            <div className="frow">
              <label className="flbl">Tags</label>
              <input name="tags" className="finp" placeholder="tag1, tag2, tag3" />
              <p className="fhint">Comma-separated</p>
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Excerpt (EN)</label>
              <textarea name="excerptEn" className="ftxta" style={{ minHeight: 80 }} placeholder="Short summary…" />
            </div>
            <div className="frow">
              <label className="flbl">Excerpt (AR)</label>
              <textarea name="excerptAr" className="ftxta" dir="rtl" style={{ minHeight: 80 }} />
            </div>
          </div>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Body (EN)</label>
              <textarea name="bodyEn" className="ftxta" style={{ minHeight: 200 }} placeholder="Full article content…" />
            </div>
            <div className="frow">
              <label className="flbl">Body (AR)</label>
              <textarea name="bodyAr" className="ftxta" dir="rtl" style={{ minHeight: 200 }} />
            </div>
          </div>

          <p className="fsec">Media & Settings</p>
          <div className="g2">
            <div className="frow">
              <label className="flbl">Cover Image URL</label>
              <input name="coverImage" className="finp" placeholder="https://…" />
            </div>
            <div className="frow">
              <label className="flbl">Status</label>
              <select name="status" className="fsel">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
        </div>
        <div className="fbar">
          <button type="submit" className="ab ab-p">Create Post</button>
          <Link href="/admin/blog" className="ab ab-s">Cancel</Link>
        </div>
      </form>
    </>
  );
}
