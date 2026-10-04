type Lang = "en" | "ar";

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** Swap Western digits for Arabic-Indic ones (and "," thousands separators for "٬"). */
export function toArabicDigits(value: string | number): string {
  return String(value)
    .replace(/[0-9]/g, d => ARABIC_DIGITS[Number(d)])
    .replace(/([٠-٩]),([٠-٩])/g, "$1٬$2");
}

/** Numbers are shown with Arabic-Indic digits on the Arabic site. */
export function localizeDigits(value: string | number, lang: Lang): string {
  return lang === "ar" ? toArabicDigits(value) : String(value);
}

/* ── Project categories ─────────────────────────────────────────────────────
   One canonical label per English category, so the filter bar, the cards,
   the project page and the footer never disagree. Categories not listed here
   fall back to whatever Arabic label the admin typed most often. */
const PROJECT_CATEGORY_AR: Record<string, string> = {
  all:            "الكل",
  residential:    "سكني",
  administrative: "إداري",
  industrial:     "صناعي",
  commercial:     "تجاري",
  maquettes:      "مجسمات",
  medical:        "طبي",
};

interface CategorySource { categoryEn: string; categoryAr: string | null }

export function projectCategoryLabel(categoryEn: string, lang: Lang, projects: CategorySource[] = []): string {
  if (lang === "en") return categoryEn;
  const known = PROJECT_CATEGORY_AR[categoryEn.trim().toLowerCase()];
  if (known) return known;

  const counts = new Map<string, number>();
  for (const p of projects) {
    const ar = p.categoryAr?.trim();
    if (p.categoryEn === categoryEn && ar) counts.set(ar, (counts.get(ar) ?? 0) + 1);
  }
  const best = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  return best?.[0] ?? categoryEn;
}

/* ── Blog categories ───────────────────────────────────────────────────────
   Used when a post has no Arabic category filled in. */
const BLOG_CATEGORY_AR: Record<string, string> = {
  craft:        "حرفة",
  materials:    "مواد",
  legacy:       "إرث",
  architecture: "عمارة",
  design:       "تصميم",
  engineering:  "هندسة",
  construction: "إنشاءات",
  news:         "أخبار",
};

export function blogCategoryLabel(category: string | null, categoryAr: string | null, lang: Lang): string | null {
  if (!category && !categoryAr) return null;
  if (lang === "en") return category || categoryAr;
  return categoryAr || BLOG_CATEGORY_AR[(category ?? "").trim().toLowerCase()] || category;
}
