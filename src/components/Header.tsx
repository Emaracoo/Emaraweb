import { prisma } from "@/lib/prisma";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const rows = await prisma.siteSetting.findMany({ where: { key: { in: ["logo_url", "company_name"] } } });
  const get = (key: string) => rows.find(r => r.key === key)?.value;
  return <HeaderClient logoUrl={get("logo_url")} companyName={get("company_name")} />;
}
