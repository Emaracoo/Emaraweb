import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";

export default async function CMSLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "#E4E4E6",
      padding: "14px",
      gap: "14px",
      boxSizing: "border-box",
    }}>
      <Sidebar />
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: 0,
        background: "#F7F7F8",
        borderRadius: "28px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
      }}>
        <TopBar userName={session.user?.name} userEmail={session.user?.email} />
        <main style={{ flex: 1, overflowY: "auto", padding: "0.5rem 2rem 2rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
