import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { S } from "@/lib/admin-styles";
import { deleteProject } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects" };

const SC: Record<string, string> = { PUBLISHED: "p", DRAFT: "d", ARCHIVED: "a" };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <style>{S}</style>
      <div className="aph">
        <h1 className="apt">Projects <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: "14px" }}>({projects.length})</span></h1>
        <Link href="/admin/projects/new" className="ab ab-p"><Plus size={13} strokeWidth={2} />New Project</Link>
      </div>
      <div className="aw">
        {projects.length === 0 ? (
          <div className="aempty">No projects yet. <Link href="/admin/projects/new" className="alink">Create the first →</Link></div>
        ) : (
          <table className="tb">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Year</th>
                <th>Status</th>
                <th>Featured</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="tr">
                  <td style={{ width: 60, padding: "6px 8px 6px 16px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.coverImage} alt="" style={{ width: 52, height: 38, objectFit: "cover", display: "block", border: "1px solid #E5E3DF" }} />
                  </td>
                  <td>
                    <Link href={`/admin/projects/${p.id}/edit`} style={{ color: "#1A1A1A", textDecoration: "none", fontWeight: 500 }}>{p.titleEn}</Link>
                    <div className="atag">/{p.slug}</div>
                  </td>
                  <td>{p.categoryEn}</td>
                  <td>{p.year}</td>
                  <td><span className={`bdg ${SC[p.status] ?? "d"}`}>{p.status.toLowerCase()}</span></td>
                  <td>{p.featured ? "✓" : <span style={{ color: "#D0CECC" }}>—</span>}</td>
                  <td>
                    <div className="aact">
                      <Link href={`/admin/projects/${p.id}/edit`} className="ab ab-s">Edit</Link>
                      <DeleteButton action={deleteProject.bind(null, p.id)} />
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
