import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { S } from "@/lib/admin-styles";
import { deleteUser } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Users" };

const RC: Record<string, string> = { SUPER_ADMIN: "n", ADMIN: "i", EDITOR: "d" };

function fmt(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function UsersPage() {
  const session = await auth();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <>
      <style>{S}</style>
      <div className="aph">
        <h1 className="apt">Users <span style={{ fontWeight: 400, color: "#9A9A9A", fontSize: "14px" }}>({users.length})</span></h1>
        <Link href="/admin/users/new" className="ab ab-p"><Plus size={13} strokeWidth={2} />New User</Link>
      </div>
      <div className="aw">
        <table className="tb">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => {
              const isMe = u.email === session?.user?.email;
              return (
                <tr key={u.id} className="tr">
                  <td style={{ fontWeight: 500 }}>
                    {u.name}
                    {isMe && <span className="atag" style={{ marginLeft: 6 }}>(you)</span>}
                  </td>
                  <td className="atag">{u.email}</td>
                  <td><span className={`bdg ${RC[u.role] ?? "d"}`}>{u.role.replace("_", " ")}</span></td>
                  <td className="atag">{fmt(u.createdAt)}</td>
                  <td>
                    {!isMe && (
                      <DeleteButton action={deleteUser.bind(null, u.id)} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
