import Link from "next/link";
import { S } from "@/lib/admin-styles";
import { createUser } from "../actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New User" };

export default function NewUserPage() {
  return (
    <>
      <style>{S}</style>
      <Link href="/admin/users" className="aback">← Users</Link>
      <div className="aph"><h1 className="apt">New User</h1></div>
      <form action={createUser}>
        <div className="frm" style={{ maxWidth: 520 }}>
          <div className="frow">
            <label className="flbl">Full Name *</label>
            <input name="name" required className="finp" placeholder="Sarah Al-Mansouri" />
          </div>
          <div className="frow">
            <label className="flbl">Email Address *</label>
            <input name="email" type="email" required className="finp" placeholder="sarah@emaraco.com" />
          </div>
          <div className="frow">
            <label className="flbl">Password *</label>
            <input name="password" type="password" required minLength={8} className="finp" placeholder="Min 8 characters" />
          </div>
          <div className="frow">
            <label className="flbl">Role</label>
            <select name="role" className="fsel">
              <option value="EDITOR">Editor — can edit content, cannot manage users</option>
              <option value="ADMIN">Admin — full access except user deletion</option>
              <option value="SUPER_ADMIN">Super Admin — unrestricted access</option>
            </select>
          </div>
        </div>
        <div className="fbar">
          <button type="submit" className="ab ab-p">Create User</button>
          <Link href="/admin/users" className="ab ab-s">Cancel</Link>
        </div>
      </form>
    </>
  );
}
