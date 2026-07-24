import { prisma } from "@/lib/prisma";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const logo = await prisma.siteSetting.findUnique({ where: { key: "logo_url" } });
  return <HeaderClient logoUrl={logo?.value} />;
}
