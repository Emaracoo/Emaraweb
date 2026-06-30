import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";

export default async function CMSLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#0D0D0D" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <TopBar userName={session.user?.name} userEmail={session.user?.email} />
        <main style={{ flex: 1, overflowY: "auto", background: "#F5F4F2", padding: "1.75rem 2rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
