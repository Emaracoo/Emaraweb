import { prisma } from "@/lib/prisma";
import { S } from "@/lib/admin-styles";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Activity Log" };

function fmt(d: Date) {
  return d.toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function ActivityPage() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <>
      <style>{S}</style>
      <div className="aph"><h1 className="apt">Activity Log</h1></div>
      <div className="aw">
        {logs.length === 0 ? (
          <div className="aempty">No activity recorded yet.</div>
        ) : (
          <table className="tb">
            <thead>
              <tr>
                <th>Action</th>
                <th>Entity</th>
                <th>User</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="tr">
                  <td style={{ fontWeight: 500 }}>{log.action}</td>
                  <td className="atag">{log.entity ?? "—"}{log.entityId ? ` #${log.entityId.slice(0, 8)}` : ""}</td>
                  <td className="atag">{log.user?.name ?? "System"}</td>
                  <td className="atag">{fmt(log.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
