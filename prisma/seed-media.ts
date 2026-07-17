import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

function mimeType(ext: string) {
  const m: Record<string, string> = {
    jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
    webp: "image/webp", gif: "image/gif", svg: "image/svg+xml",
  };
  return m[ext.toLowerCase()] ?? "image/jpeg";
}

function allImages(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return allImages(full);
    return /\.(jpe?g|png|webp|gif|svg)$/i.test(e.name) ? [full] : [];
  });
}

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  const sources = [
    { dir: path.join(publicDir, "projects"), folder: "projects" },
    { dir: path.join(publicDir, "clients"),  folder: "clients"  },
  ];

  let created = 0, skipped = 0;

  for (const { dir, folder } of sources) {
    for (const filePath of allImages(dir)) {
      const url = "/" + path.relative(publicDir, filePath).replace(/\\/g, "/");

      const exists = await prisma.media.findFirst({ where: { url } });
      if (exists) { skipped++; continue; }

      const stat = fs.statSync(filePath);
      await prisma.media.create({
        data: {
          filename:     path.basename(filePath),
          originalName: path.basename(filePath),
          url,
          mimeType:     mimeType(path.extname(filePath).slice(1)),
          size:         stat.size,
          folder,
        },
      });
      created++;
    }
  }

  console.log(`✓ Media: ${created} created, ${skipped} already existed`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
