import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email    = process.env.ADMIN_EMAIL    ?? "admin@emaraco.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { email, name: "Admin", passwordHash, role: UserRole.SUPER_ADMIN },
    });
    console.log(`✓ Admin user created: ${email}`);
    console.log(`  Password: ${password}  ← change this immediately`);
  } else {
    console.log(`· Admin user already exists: ${email}`);
  }

  // Default site settings
  const settings = [
    { key: "site_phone",     value: "+20 2 XXXX XXXX",       group: "contact" },
    { key: "site_email",     value: "Info@EmaraCo.com",       group: "contact" },
    { key: "site_address_en", value: "5 Al-Hariry St, Heliopolis, Cairo", group: "contact" },
    { key: "site_address_ar", value: "٥ شارع الحريري، مصر الجديدة، القاهرة", group: "contact" },
    { key: "site_instagram", value: "https://www.instagram.com/emaraconstruction/", group: "social" },
    { key: "site_facebook",  value: "https://www.facebook.com/emaraconstruction/", group: "social" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where:  { key: s.key },
      create: s,
      update: {},
    });
  }
  console.log(`✓ Default site settings seeded`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
