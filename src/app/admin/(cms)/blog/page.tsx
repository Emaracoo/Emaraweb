import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { S } from "@/lib/admin-styles";
import { deleteBlogPost } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

const SC: Record<string, string> = { PUBLISHED: "p", DRAFT: "d", ARCHIVED: "a" };

function fmt(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <>
      <style>{S}</style>
      <div className="aph">
        <h1 className="apt">Blog <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: "14px" }}>({posts.length})</span></h1>
        <Link href="/admin/blog/new" className="ab ab-p"><Plus size={13} strokeWidth={2} />New Post</Link>
      </div>
      <div className="aw">
        {posts.length === 0 ? (
          <div className="aempty">No blog posts yet. <Link href="/admin/blog/new" className="alink">Write the first →</Link></div>
        ) : (
          <table className="tb">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Published</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="tr">
                  <td>
                    <Link href={`/admin/blog/${post.id}/edit`} style={{ color: "#1A1A1A", textDecoration: "none", fontWeight: 500 }}>{post.titleEn}</Link>
                    <div className="atag">/{post.slug}</div>
                  </td>
                  <td className="atag">{post.category ?? "—"}</td>
                  <td className="atag">{post.author?.name ?? "—"}</td>
                  <td><span className={`bdg ${SC[post.status] ?? "d"}`}>{post.status.toLowerCase()}</span></td>
                  <td className="atag">{fmt(post.publishedAt)}</td>
                  <td>
                    <div className="aact">
                      <Link href={`/admin/blog/${post.id}/edit`} className="ab ab-s">Edit</Link>
                      <DeleteButton action={deleteBlogPost.bind(null, post.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
