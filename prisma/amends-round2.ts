/**
 * One-off content fixes from the client's "Round 2 Amends" deck.
 *
 *   npx tsx prisma/amends-round2.ts           → dry run, prints what would change
 *   npx tsx prisma/amends-round2.ts --apply   → writes the changes
 *
 * Every change is a targeted find-and-replace or a fill-in of an empty field,
 * so edits the client has already made in the dashboard are left alone.
 * Safe to run more than once.
 */
import { PrismaClient, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();
const APPLY  = process.argv.includes("--apply");

const PHONE = "+20 106 424 5471";

/* Official Arabic service names (client's "Emara's Website FINAL" doc) */
const SERVICE_TITLES_AR: Record<string, string> = {
  "structural-design":         "تصميمات إنشائية للهياكل الخرسانية والمعدنية",
  "architectural-design":      "تصميمات معمارية",
  "interior-architecture":     "تصميم العمارة الداخلية والديكور",
  "landscape-design":          "تصميمات تنسيق المواقع (لاند سكيب)",
  "restoration-strengthening": "تنكيس وتدعيم",
  "construction-supervision":  "إشراف على التنفيذ",
  "model-making":              "عمل نماذج (ماكيتات)",
};

const PROJECT_TITLES_AR: Record<string, string> = {
  "medical-unions-pharmaceuticals": "المقر الإداري لشركة المهن الطبية للأدوية",
  "comprehensive-cancer-centre":    "مركز طبي لعلاج الأورام",
  "sphinx-cancer-centre":           "مركز سفنكس الطبي لعلاج الأورام",
};

/* Arabic area text, keyed by the English area — only filled where Area (AR) is empty */
const AREA_AR: Record<string, string> = {
  "180 m² × 3 floors on 660 m² land":     "١٨٠ م² × ٣ طوابق على أرض ٦٦٠ م²",
  "450 m² × 5 floors":                    "٤٥٠ م² × ٥ طوابق",
  "400 m² × 4 floors":                    "٤٠٠ م² × ٤ طوابق",
  "150 m² × 3 floors on 750 m² land":     "١٥٠ م² × ٣ طوابق على أرض ٧٥٠ م²",
  "150 m²":                               "١٥٠ م²",
  "250 m² × 4 floors":                    "٢٥٠ م² × ٤ طوابق",
  "600 m²":                               "٦٠٠ م²",
  "200 m²":                               "٢٠٠ م²",
  "300 m² × 6 floors":                    "٣٠٠ م² × ٦ طوابق",
  "4,200 m² × 3 floors + 6 storage rooms": "٤٬٢٠٠ م² × ٣ طوابق + ٦ غرف تخزين",
  "11,000 m²":                            "١١٬٠٠٠ م²",
  "400 m²":                               "٤٠٠ م²",
  "37 branches":                          "٣٧ فرعاً",
  "700 m²":                               "٧٠٠ م²",
  "Private clinic":                       "عيادة خاصة",
};

/** Arabic text fixes applied to every Arabic field we touch. */
function fixArabic(text: string): string {
  return text
    // Brand name: عمارة, not إعمار — but "إعادة الإعمار" (reconstruction) is a different word
    .replace(/(?<!ا)لإعمار/g, "لعمارة")
    .replace(/(?<!ل)إعمار/g, "عمارة")
    .replace(/مدينة مينا الحديقة/g, "مينا جاردن سيتي")
    .replace(/مينا الحديقة/g, "مينا جاردن سيتي")
    .replace(/تصميم المناظر الطبيعية/g, "تنسيق المواقع")
    .replace(/مناظر طبيعية/g, "تنسيق مواقع");
}

function fixJson(value: Prisma.JsonValue): Prisma.JsonValue {
  if (typeof value === "string") return fixArabic(value);
  if (Array.isArray(value)) return value.map(fixJson);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fixJson(v as Prisma.JsonValue)]));
  }
  return value;
}

let changes = 0;
function report(where: string, field: string, from: unknown, to: unknown) {
  changes++;
  const show = (v: unknown) => (typeof v === "string" ? v : JSON.stringify(v)).replace(/\n/g, "⏎").slice(0, 110);
  console.log(`• ${where} → ${field}\n    - ${show(from)}\n    + ${show(to)}`);
}

/** Compare a row's fields to their fixed values and return only the ones that changed. */
function diff<N extends Record<string, unknown>>(where: string, row: Record<string, unknown>, next: N): Partial<N> {
  const out: Partial<N> = {};
  for (const [k, v] of Object.entries(next) as [keyof N & string, N[keyof N & string]][]) {
    if (v === undefined) continue;
    if (JSON.stringify(row[k]) !== JSON.stringify(v)) {
      report(where, String(k), row[k], v);
      out[k] = v;
    }
  }
  return out;
}

async function main() {
  console.log(APPLY ? "Applying changes…\n" : "Dry run — nothing is written. Re-run with --apply to save.\n");

  // ── Services ────────────────────────────────────────────────────────────
  for (const s of await prisma.service.findMany()) {
    const data = diff(`Service ${s.slug}`, s, {
      titleAr:       SERVICE_TITLES_AR[s.slug] ?? (s.titleAr ? fixArabic(s.titleAr) : s.titleAr),
      descriptionAr: s.descriptionAr ? fixArabic(s.descriptionAr) : s.descriptionAr,
      longDescAr:    s.longDescAr ? fixArabic(s.longDescAr) : s.longDescAr,
    });
    if (APPLY && Object.keys(data).length) await prisma.service.update({ where: { id: s.id }, data });
  }

  // ── Projects ────────────────────────────────────────────────────────────
  for (const p of await prisma.project.findMany()) {
    const isMedical = p.categoryEn.trim().toLowerCase() === "medical";
    const data = diff(`Project ${p.slug}`, p, {
      titleAr:       PROJECT_TITLES_AR[p.slug] ?? (p.titleAr ? fixArabic(p.titleAr) : p.titleAr),
      locationAr:    p.locationAr ? fixArabic(p.locationAr) : p.locationAr,
      descriptionAr: p.descriptionAr ? fixArabic(p.descriptionAr) : p.descriptionAr,
      clientAr:      p.clientAr ? fixArabic(p.clientAr) : p.clientAr,
      areaAr:        p.areaAr || (p.area ? AREA_AR[p.area.trim()] ?? null : null),
      categoryEn:    isMedical ? "Medical" : p.categoryEn,
      categoryAr:    isMedical ? "طبي" : p.categoryAr,
    });
    if (APPLY && Object.keys(data).length) await prisma.project.update({ where: { id: p.id }, data });
  }

  // ── Homepage / About page sections ──────────────────────────────────────
  for (const s of await prisma.homepageSection.findMany()) {
    const data = diff(`Section ${s.key}`, s, {
      titleAr:    s.titleAr ? fixArabic(s.titleAr) : s.titleAr,
      bodyAr:     s.bodyAr ? fixArabic(s.bodyAr) : s.bodyAr,
      ctaLabelAr: s.ctaLabelAr ? fixArabic(s.ctaLabelAr) : s.ctaLabelAr,
      data:       s.data === null ? s.data : fixJson(s.data),
    });
    if (APPLY && Object.keys(data).length) {
      const { data: json, ...rest } = data;
      await prisma.homepageSection.update({
        where: { id: s.id },
        data:  { ...rest, ...(json !== undefined ? { data: json as Prisma.InputJsonValue } : {}) },
      });
    }
  }

  // ── Hero slides ─────────────────────────────────────────────────────────
  for (const s of await prisma.homeSlide.findMany()) {
    const data = diff(`Hero slide ${s.sortOrder + 1}`, s, { titleAr: s.titleAr ? fixArabic(s.titleAr) : s.titleAr });
    if (APPLY && Object.keys(data).length) await prisma.homeSlide.update({ where: { id: s.id }, data });
  }

  // ── Blog posts ──────────────────────────────────────────────────────────
  for (const b of await prisma.blogPost.findMany()) {
    const data = diff(`Blog ${b.slug}`, b, {
      titleAr:   b.titleAr ? fixArabic(b.titleAr) : b.titleAr,
      excerptAr: b.excerptAr ? fixArabic(b.excerptAr) : b.excerptAr,
      bodyAr:    b.bodyAr ? fixArabic(b.bodyAr) : b.bodyAr,
    });
    if (APPLY && Object.keys(data).length) await prisma.blogPost.update({ where: { id: b.id }, data });
  }

  // ── Site settings ───────────────────────────────────────────────────────
  for (const s of await prisma.siteSetting.findMany()) {
    let value = s.value;
    if (s.key === "phone" && (/X{2,}/i.test(value) || /116\s*424\s*5471/.test(value.replace(/^\+?20\s*/, "")))) value = PHONE;
    if (s.key === "address_en" && value === "5 Al-Hariry St, Heliopolis, Cairo") value = "5 Al-Hariry St, beside Tivoli Dome\nHeliopolis, Cairo, Egypt";
    if (s.key === "address_ar" && value === "٥ شارع الحريري، مصر الجديدة، القاهرة") value = "٥ شارع الحريري، بجوار تيفولي دوم\nمصر الجديدة، القاهرة، مصر";
    if (s.key.endsWith("_ar")) value = fixArabic(value);
    const data = diff(`Setting ${s.key}`, s, { value });
    if (APPLY && Object.keys(data).length) await prisma.siteSetting.update({ where: { key: s.key }, data });
  }

  console.log(`\n${changes} field(s) ${APPLY ? "updated" : "would change"}.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
