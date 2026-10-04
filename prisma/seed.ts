import { PrismaClient, UserRole, PublishStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ── Admin user ─────────────────────────────────────────────────────────────
  const email    = process.env.ADMIN_EMAIL    ?? "admin@emaraco.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { email, name: "Admin", passwordHash, role: UserRole.SUPER_ADMIN },
    });
    console.log(`✓ Admin user created: ${email}`);
  } else {
    console.log(`· Admin user already exists: ${email}`);
  }

  // ── Site settings ──────────────────────────────────────────────────────────
  const settings = [
    { key: "phone",           value: "+20 106 424 5471",                      group: "contact"  },
    { key: "email_contact",   value: "Info@EmaraCo.com",                       group: "contact"  },
    { key: "email_enquiry",   value: "Info@EmaraCo.com",                       group: "contact"  },
    { key: "address_en",      value: "5 Al-Hariry St, beside Tivoli Dome\nHeliopolis, Cairo, Egypt", group: "contact" },
    { key: "address_ar",      value: "٥ شارع الحريري، بجوار تيفولي دوم\nمصر الجديدة، القاهرة، مصر", group: "contact" },
    { key: "instagram_url",   value: "https://www.instagram.com/emaraconstruction/", group: "social" },
    { key: "footer_tagline_en", value: "Four decades of architecture, craft, and trust.", group: "branding" },
    { key: "footer_tagline_ar", value: "أربعة عقود من العمارة والحرفة والثقة.",           group: "branding" },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, create: s, update: {} });
  }
  console.log("✓ Site settings seeded");

  // ── Projects ───────────────────────────────────────────────────────────────
  const projects: Array<Parameters<typeof prisma.project.create>[0]["data"]> = [
    // Residential
    {
      slug:          "villa-tn",
      titleEn:       "Villa TN, Mina Garden City",
      titleAr:       "فيلا TN، مينا جاردن سيتي",
      categoryEn:    "Residential",
      categoryAr:    "سكني",
      year:          "2022",
      locationEn:    "Mina Garden City, October",
      locationAr:    "مينا جاردن سيتي، أكتوبر",
      area:          "180 m² × 3 floors on 660 m² land",
      areaAr:        "١٨٠ م² × ٣ طوابق على أرض ٦٦٠ م²",
      clientEn:      "Private Client",
      clientAr:      "عميل خاص",
      descriptionEn: "Villa design, interior design, and construction supervision of a private residential villa in Mina Garden City — built across three floors on a 660m² plot. Completed in October 2022, the project reflects Emara's integrated design approach: from structural engineering through to interior finishes and external landscaping, delivered as a single cohesive vision.",
      descriptionAr: "تصميم الفيلا والتصميم الداخلي والإشراف على التنفيذ لفيلا سكنية خاصة في مينا جاردن سيتي — مبنية على ثلاثة طوابق على قطعة أرض ٦٦٠ م². اكتملت في أكتوبر ٢٠٢٢، ويعكس المشروع المقاربة التصميمية المتكاملة لعمارة: من الهندسة الإنشائية حتى التشطيبات الداخلية والتنسيق الخارجي، مُقدَّماً كرؤية واحدة متجانسة.",
      coverImage:    "/projects/villa-tn/01.jpg",
      galleryImages: ["/projects/villa-tn/02.jpg","/projects/villa-tn/03.jpg","/projects/villa-tn/04.jpg","/projects/villa-tn/05.jpg","/projects/villa-tn/06.jpg","/projects/villa-tn/07.jpg","/projects/villa-tn/08.jpg","/projects/villa-tn/09.jpg","/projects/villa-tn/10.jpg","/projects/villa-tn/11.jpg","/projects/villa-tn/12.jpg","/projects/villa-tn/13.jpg","/projects/villa-tn/14.jpg","/projects/villa-tn/15.jpg","/projects/villa-tn/16.jpg","/projects/villa-tn/17.jpg","/projects/villa-tn/18.jpg","/projects/villa-tn/19.jpg","/projects/villa-tn/20.jpg","/projects/villa-tn/21.jpg","/projects/villa-tn/22.jpg"],
      featured:      true,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     1,
    },
    {
      slug:          "villa-zw",
      titleEn:       "Villa ZW, New Cairo",
      titleAr:       "فيلا ZW، القاهرة الجديدة",
      categoryEn:    "Residential",
      categoryAr:    "سكني",
      year:          "2014",
      locationEn:    "New Cairo",
      locationAr:    "القاهرة الجديدة",
      area:          "450 m² × 5 floors",
      areaAr:        "٤٥٠ م² × ٥ طوابق",
      clientEn:      "Private Client",
      clientAr:      "عميل خاص",
      descriptionEn: "Exterior design, interior design, and construction supervision of a large private villa in New Cairo, spanning five floors with 450m² per level. Completed in 2014, the project represents Emara's command of large-scale residential architecture — blending contemporary proportions with refined detailing across more than 2,000m² of built area.",
      descriptionAr: "التصميم الخارجي والتصميم الداخلي والإشراف على التنفيذ لفيلا خاصة كبيرة في القاهرة الجديدة، تمتد على خمسة طوابق بمساحة ٤٥٠ م² لكل طابق. اكتمل المشروع عام ٢٠١٤، ويُجسّد قدرة عمارة على التعامل مع العمارة السكنية في مقاييسها الكبيرة.",
      coverImage:    "/projects/villa-zw/01.jpg",
      galleryImages: ["/projects/villa-zw/02.jpg","/projects/villa-zw/03.jpg","/projects/villa-zw/04.jpg","/projects/villa-zw/05.jpg","/projects/villa-zw/06.jpg","/projects/villa-zw/07.jpg","/projects/villa-zw/08.jpg","/projects/villa-zw/09.jpg","/projects/villa-zw/10.jpg","/projects/villa-zw/11.jpg","/projects/villa-zw/12.jpg","/projects/villa-zw/13.jpg","/projects/villa-zw/14.jpg"],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     2,
    },
    {
      slug:          "villa-mw",
      titleEn:       "Villa MW, Shorouk City",
      titleAr:       "فيلا MW، مدينة الشروق",
      categoryEn:    "Residential",
      categoryAr:    "سكني",
      year:          "2017",
      locationEn:    "Shorouk City, Cairo",
      locationAr:    "مدينة الشروق، القاهرة",
      area:          "400 m² × 4 floors",
      areaAr:        "٤٠٠ م² × ٤ طوابق",
      clientEn:      "Private Client",
      clientAr:      "عميل خاص",
      descriptionEn: "Full villa design, interior design, and construction supervision for a private residence in Shorouk City, distributed across four floors with 400m² per level. Completed in 2017, the project exemplifies Emara's disciplined approach to residential design.",
      descriptionAr: "تصميم كامل للفيلا والتصميم الداخلي والإشراف على التنفيذ لمسكن خاص في مدينة الشروق، موزّع على أربعة طوابق بمساحة ٤٠٠ م² لكل طابق. اكتمل المشروع عام ٢٠١٧.",
      coverImage:    "/projects/villa-mw/01.jpg",
      galleryImages: ["/projects/villa-mw/02.jpg","/projects/villa-mw/03.jpg","/projects/villa-mw/04.jpg","/projects/villa-mw/05.jpg","/projects/villa-mw/06.jpg","/projects/villa-mw/07.jpg","/projects/villa-mw/08.jpg","/projects/villa-mw/09.jpg","/projects/villa-mw/10.jpg","/projects/villa-mw/11.jpg","/projects/villa-mw/12.jpg","/projects/villa-mw/13.jpg","/projects/villa-mw/14.jpg","/projects/villa-mw/15.jpg","/projects/villa-mw/16.jpg","/projects/villa-mw/17.jpg","/projects/villa-mw/18.jpg","/projects/villa-mw/19.jpg","/projects/villa-mw/20.jpg","/projects/villa-mw/21.jpg","/projects/villa-mw/22.jpg","/projects/villa-mw/23.jpg","/projects/villa-mw/24.jpg"],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     3,
    },
    {
      slug:          "villa-hm",
      titleEn:       "Villa HM, Mina Garden City",
      titleAr:       "فيلا HM، مينا جاردن سيتي",
      categoryEn:    "Residential",
      categoryAr:    "سكني",
      year:          "2013",
      locationEn:    "Mina Garden City, October",
      locationAr:    "مينا جاردن سيتي، أكتوبر",
      area:          "150 m² × 3 floors on 750 m² land",
      areaAr:        "١٥٠ م² × ٣ طوابق على أرض ٧٥٠ م²",
      clientEn:      "Private Client",
      clientAr:      "عميل خاص",
      descriptionEn: "Villa design, interior design, and construction supervision — including landscaping and a swimming pool — for a private family residence in Mina Garden City. Spread across three floors on a 750m² plot, this 2013 project is one of Emara's most complete residential commissions.",
      descriptionAr: "تصميم الفيلا والتصميم الداخلي والإشراف على التنفيذ — بما يشمل التنسيق ومسبحاً — لمسكن عائلي خاص في مينا جاردن سيتي. يمتد على ثلاثة طوابق على قطعة أرض ٧٥٠ م²، وهو من أكمل عمولات عمارة السكنية عام ٢٠١٣.",
      coverImage:    "/projects/villa-hm/01.jpg",
      galleryImages: ["/projects/villa-hm/02.jpg","/projects/villa-hm/03.jpg","/projects/villa-hm/04.jpg","/projects/villa-hm/05.jpg","/projects/villa-hm/06.jpg","/projects/villa-hm/07.jpg","/projects/villa-hm/08.jpg","/projects/villa-hm/09.jpg","/projects/villa-hm/10.jpg","/projects/villa-hm/11.jpg","/projects/villa-hm/12.jpg","/projects/villa-hm/13.jpg","/projects/villa-hm/14.jpg","/projects/villa-hm/15.jpg","/projects/villa-hm/16.jpg","/projects/villa-hm/17.jpg","/projects/villa-hm/18.jpg","/projects/villa-hm/19.jpg"],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     4,
    },
    {
      slug:          "apartment-ms",
      titleEn:       "Apartment MS, New Cairo",
      titleAr:       "شقة MS، القاهرة الجديدة",
      categoryEn:    "Residential",
      categoryAr:    "سكني",
      year:          "2022",
      locationEn:    "New Cairo",
      locationAr:    "القاهرة الجديدة",
      area:          "150 m²",
      areaAr:        "١٥٠ م²",
      clientEn:      "Private Client",
      clientAr:      "عميل خاص",
      descriptionEn: "Interior design, décor, and construction supervision of a private 150m² apartment in New Cairo. Completed in 2022, the project demonstrates Emara's ability to work at every scale.",
      descriptionAr: "التصميم الداخلي والديكور والإشراف على التنفيذ لشقة خاصة بمساحة ١٥٠ م² في القاهرة الجديدة. اكتمل المشروع عام ٢٠٢٢.",
      coverImage:    "/projects/apartment-ms/01.jpg",
      galleryImages: ["/projects/apartment-ms/02.jpg","/projects/apartment-ms/03.jpg","/projects/apartment-ms/04.jpg","/projects/apartment-ms/05.jpg","/projects/apartment-ms/06.jpg"],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     5,
    },
    {
      slug:          "villa-wm",
      titleEn:       "Villa WM, Al-Badrashin",
      titleAr:       "فيلا WM، البدرشين",
      categoryEn:    "Residential",
      categoryAr:    "سكني",
      year:          "2001",
      locationEn:    "Al-Badrashin, Giza",
      locationAr:    "البدرشين، الجيزة",
      area:          "250 m² × 4 floors",
      areaAr:        "٢٥٠ م² × ٤ طوابق",
      clientEn:      "Private Client",
      clientAr:      "عميل خاص",
      descriptionEn: "Full villa design, interior design, and construction supervision including landscaping and an indoor swimming pool for a private residence in Al-Badrashin, Giza. Completed in 2001.",
      descriptionAr: "التصميم الكامل للفيلا والتصميم الداخلي والإشراف على التنفيذ، بما يشمل التنسيق ومسبحاً داخلياً، لمسكن خاص في البدرشين بالجيزة. اكتمل المشروع عام ٢٠٠١.",
      coverImage:    "/projects/villa-wm/01.jpg",
      galleryImages: ["/projects/villa-wm/02.jpg","/projects/villa-wm/03.jpg","/projects/villa-wm/04.jpg","/projects/villa-wm/05.jpg","/projects/villa-wm/06.jpg","/projects/villa-wm/07.jpg"],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     6,
    },
    // Administrative
    {
      slug:          "al-arabiya-studios",
      titleEn:       "Al Arabiya News Studios",
      titleAr:       "استوديوهات قناة العربية",
      categoryEn:    "Administrative",
      categoryAr:    "إداري",
      year:          "2011",
      locationEn:    "Maspero, Cairo",
      locationAr:    "ماسبيرو، القاهرة",
      area:          "600 m²",
      areaAr:        "٦٠٠ م²",
      clientEn:      "Al Arabiya News / MBC Group",
      clientAr:      "قناة العربية / مجموعة MBC",
      descriptionEn: "Interior design, décor, and construction supervision for Al Arabiya News studios and administrative offices spanning 600m² in the historic Maspero broadcasting district of Cairo.",
      descriptionAr: "التصميم الداخلي والديكور والإشراف على التنفيذ لاستوديوهات ومكاتب إدارية لقناة العربية تمتد على ٦٠٠ م² في منطقة ماسبيرو التاريخية للإذاعة في القاهرة.",
      coverImage:    "/projects/al-arabiya-studios/01.jpg",
      galleryImages: ["/projects/al-arabiya-studios/02.jpg","/projects/al-arabiya-studios/03.jpg","/projects/al-arabiya-studios/04.jpg","/projects/al-arabiya-studios/05.jpg","/projects/al-arabiya-studios/06.jpg","/projects/al-arabiya-studios/07.jpg","/projects/al-arabiya-studios/08.jpg"],
      featured:      true,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     7,
    },
    {
      slug:          "spa-wellness-centre",
      titleEn:       "Spa & Wellness Centre",
      titleAr:       "مركز السبا والعافية",
      categoryEn:    "Commercial",
      categoryAr:    "تجاري",
      year:          "2015",
      locationEn:    "Fifth Settlement, Cairo",
      locationAr:    "التجمع الخامس، القاهرة",
      area:          "200 m²",
      areaAr:        "٢٠٠ م²",
      clientEn:      "Private Developer",
      clientAr:      "مطور خاص",
      descriptionEn: "Interior design, décor, and construction supervision for a 200m² spa and wellness centre in Fifth Settlement, Cairo. Completed in 2015.",
      descriptionAr: "التصميم الداخلي والديكور والإشراف على التنفيذ لمركز سبا وعافية بمساحة ٢٠٠ م² في التجمع الخامس بالقاهرة. اكتمل المشروع عام ٢٠١٥.",
      coverImage:    "/projects/spa-wellness-centre/01.jpg",
      galleryImages: ["/projects/spa-wellness-centre/02.jpg","/projects/spa-wellness-centre/03.jpg","/projects/spa-wellness-centre/04.jpg","/projects/spa-wellness-centre/05.jpg","/projects/spa-wellness-centre/06.jpg","/projects/spa-wellness-centre/07.jpg","/projects/spa-wellness-centre/08.jpg","/projects/spa-wellness-centre/09.jpg"],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     8,
    },
    {
      slug:          "medical-unions-pharmaceuticals",
      titleEn:       "Medical Unions Pharmaceuticals",
      titleAr:       "المقر الإداري لشركة المهن الطبية للأدوية",
      categoryEn:    "Administrative",
      categoryAr:    "إداري",
      year:          "2004",
      locationEn:    "Masr El Gadeda, Cairo",
      locationAr:    "مصر الجديدة، القاهرة",
      area:          "300 m² × 6 floors",
      areaAr:        "٣٠٠ م² × ٦ طوابق",
      clientEn:      "Medical Unions Pharmaceuticals",
      clientAr:      "Medical Unions للأدوية",
      descriptionEn: "Interior design, décor, reconstruction, and construction supervision across six floors of 300m² each in Masr El Gadeda, Cairo. Completed in 2004.",
      descriptionAr: "التصميم الداخلي والديكور وإعادة الإعمار والإشراف على التنفيذ عبر ستة طوابق بمساحة ٣٠٠ م² لكل منها في مصر الجديدة بالقاهرة. اكتمل المشروع عام ٢٠٠٤.",
      coverImage:    "/projects/medical-unions-pharmaceuticals/01.jpg",
      galleryImages: ["/projects/medical-unions-pharmaceuticals/02.jpg","/projects/medical-unions-pharmaceuticals/03.jpg"],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     9,
    },
    // Industrial
    {
      slug:          "abu-simbel-factory",
      titleEn:       "Abu Simbel Factory",
      titleAr:       "مصنع أبو سمبل",
      categoryEn:    "Industrial",
      categoryAr:    "صناعي",
      year:          "1992",
      locationEn:    "Qalyub, Giza",
      locationAr:    "القليوب، الجيزة",
      area:          "4,200 m² × 3 floors + 6 storage rooms",
      areaAr:        "٤٬٢٠٠ م² × ٣ طوابق + ٦ غرف تخزين",
      clientEn:      "Private Industrial Client",
      clientAr:      "عميل صناعي خاص",
      descriptionEn: "Design and construction supervision of the Abu Simbel factory across a 4,200m² site in Qalyub, Giza — three production floors plus six storage rooms. Completed in 1992.",
      descriptionAr: "تصميم مصنع أبو سمبل والإشراف على تنفيذه عبر موقع بمساحة ٤٢٠٠ م² في القليوب بالجيزة — ثلاثة طوابق إنتاجية وستة غرف تخزين. اكتمل المشروع عام ١٩٩٢.",
      coverImage:    "/projects/abu-simbel-factory/01.jpg",
      galleryImages: [],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     10,
    },
    {
      slug:          "manar-tex-factory",
      titleEn:       "Manar Tex Factory",
      titleAr:       "مصنع منار تكس",
      categoryEn:    "Industrial",
      categoryAr:    "صناعي",
      year:          "1989",
      locationEn:    "10th of Ramadan City",
      locationAr:    "مدينة العاشر من رمضان",
      area:          "11,000 m²",
      areaAr:        "١١٬٠٠٠ م²",
      clientEn:      "Al Ashraf Company",
      clientAr:      "شركة الأشرف",
      descriptionEn: "Design and construction supervision of the Manar Tex textile factory — Emara's founding commission, completed in 1989. Spanning 11,000m² in 10th of Ramadan City and built alongside an on-site mosque.",
      descriptionAr: "تصميم مصنع منار تكس النسيجي والإشراف على تنفيذه — العمولة التأسيسية لعمارة، المنجزة عام ١٩٨٩. يمتد المشروع على ١١٬٠٠٠ م² في مدينة العاشر من رمضان، وقد أُنشئ إلى جانبه مسجد داخل الموقع.",
      coverImage:    "/projects/manar-tex-factory/01.jpg",
      galleryImages: ["/projects/manar-tex-factory/02.jpg"],
      featured:      true,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     11,
    },
    // Commercial
    {
      slug:          "comprehensive-cancer-centre",
      titleEn:       "Comprehensive Cancer Centre",
      titleAr:       "مركز طبي لعلاج الأورام",
      categoryEn:    "Commercial",
      categoryAr:    "تجاري",
      year:          "2014",
      locationEn:    "Mohandeseen, Cairo",
      locationAr:    "المهندسين، القاهرة",
      area:          "400 m²",
      areaAr:        "٤٠٠ م²",
      clientEn:      "Private Medical Group",
      clientAr:      "مجموعة طبية خاصة",
      descriptionEn: "Construction and supervision of the Comprehensive Cancer Centre in Mohandeseen — 400m² of carefully designed medical space completed in 2014.",
      descriptionAr: "إنشاء مركز السرطان الشامل في المهندسين والإشراف عليه — ٤٠٠ م² من الفضاءات الطبية المصممة بعناية، اكتملت عام ٢٠١٤.",
      coverImage:    "/projects/comprehensive-cancer-centre/01.jpg",
      galleryImages: ["/projects/comprehensive-cancer-centre/02.jpg","/projects/comprehensive-cancer-centre/03.jpg","/projects/comprehensive-cancer-centre/04.jpg","/projects/comprehensive-cancer-centre/05.jpg","/projects/comprehensive-cancer-centre/06.jpg","/projects/comprehensive-cancer-centre/07.jpg"],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     12,
    },
    {
      slug:          "el-farida-chain",
      titleEn:       "EL Farida Chain",
      titleAr:       "سلسلة الفريدة",
      categoryEn:    "Commercial",
      categoryAr:    "تجاري",
      year:          "Ongoing",
      locationEn:    "37 branches across Egypt",
      locationAr:    "٣٧ فرعاً في مختلف أنحاء مصر",
      area:          "37 branches",
      areaAr:        "٣٧ فرعاً",
      clientEn:      "EL Farida Group",
      clientAr:      "مجموعة الفريدة",
      descriptionEn: "Interior design, fit-out, and construction supervision for 37 branches of EL Farida — one of Egypt's leading chains for modest fashion.",
      descriptionAr: "التصميم الداخلي والتجهيز والإشراف على التنفيذ لـ٣٧ فرعاً من سلسلة الفريدة — إحدى سلاسل الأزياء المحتشمة الرائدة في مصر.",
      coverImage:    "/projects/el-farida-chain/01.jpg",
      galleryImages: ["/projects/el-farida-chain/02.jpg","/projects/el-farida-chain/03.jpg"],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     13,
    },
    {
      slug:          "sphinx-cancer-centre",
      titleEn:       "Sphinx Comprehensive Cancer Centre",
      titleAr:       "مركز سفنكس الطبي لعلاج الأورام",
      categoryEn:    "Commercial",
      categoryAr:    "تجاري",
      year:          "2015",
      locationEn:    "Mohandeseen, Cairo",
      locationAr:    "المهندسين، القاهرة",
      area:          "700 m²",
      areaAr:        "٧٠٠ م²",
      clientEn:      "Sphinx Medical Group",
      clientAr:      "مجموعة سفنكس الطبية",
      descriptionEn: "Interior design and construction supervision for the Sphinx Comprehensive Cancer Centre in Mohandeseen — 700m² completed in 2015.",
      descriptionAr: "التصميم الداخلي والإشراف على التنفيذ لمركز سفنكس الشامل للأورام في المهندسين — ٧٠٠ م² اكتملت عام ٢٠١٥.",
      coverImage:    "/projects/sphinx-cancer-centre/01.jpg",
      galleryImages: ["/projects/sphinx-cancer-centre/02.jpg","/projects/sphinx-cancer-centre/03.jpg","/projects/sphinx-cancer-centre/04.jpg","/projects/sphinx-cancer-centre/05.jpg","/projects/sphinx-cancer-centre/06.jpg","/projects/sphinx-cancer-centre/07.jpg","/projects/sphinx-cancer-centre/08.jpg","/projects/sphinx-cancer-centre/09.jpg","/projects/sphinx-cancer-centre/10.jpg","/projects/sphinx-cancer-centre/11.jpg","/projects/sphinx-cancer-centre/12.jpg","/projects/sphinx-cancer-centre/13.jpg"],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     14,
    },
    {
      slug:          "bialy-dental-clinic",
      titleEn:       "Bialy Dental Clinic",
      titleAr:       "عيادة بيالي لطب الأسنان",
      categoryEn:    "Commercial",
      categoryAr:    "تجاري",
      year:          "2017",
      locationEn:    "October City",
      locationAr:    "مدينة أكتوبر",
      area:          "Private clinic",
      areaAr:        "عيادة خاصة",
      clientEn:      "Dr. Bialy",
      clientAr:      "د. بيالي",
      descriptionEn: "Interior design and supervision for Bialy Dental Clinic in October City — completed in 2017. A refined clinical environment balancing the precision of a modern dental practice with an atmosphere of ease.",
      descriptionAr: "التصميم الداخلي والإشراف على عيادة بيالي لطب الأسنان في مدينة أكتوبر — اكتملت عام ٢٠١٧.",
      coverImage:    "/projects/bialy-dental-clinic/01.jpg",
      galleryImages: [],
      featured:      false,
      status:        PublishStatus.PUBLISHED,
      sortOrder:     15,
    },
  ];

  let projectsCreated = 0;
  let projectsSkipped = 0;
  for (const p of projects) {
    const exists = await prisma.project.findUnique({ where: { slug: p.slug as string } });
    if (!exists) {
      await prisma.project.create({ data: p });
      projectsCreated++;
    } else {
      projectsSkipped++;
    }
  }
  console.log(`✓ Projects: ${projectsCreated} created, ${projectsSkipped} already existed`);

  // ── Services ───────────────────────────────────────────────────────────────
  const services = [
    {
      slug: "structural-design",
      titleEn: "Structural Design for Concrete & Steel",
      titleAr: "تصميمات إنشائية للهياكل الخرسانية والمعدنية",
      descriptionEn: "Design of steel and concrete facilities in compliance with Egyptian and international codes (American, European, British).",
      descriptionAr: "تصميم منشآت خرسانية وفولاذية وفق المواصفات المصرية والدولية (الأمريكية والأوروبية والبريطانية).",
      longDescEn: "Safe and cost-effective sections, construction drawings and section tables using specialized design software.",
      longDescAr: "مقاطع آمنة واقتصادية، ورسومات إنشائية، وجداول مقاطع بواسطة برامج تصميم متخصصة.",
      icon: "Building2",
      status: PublishStatus.PUBLISHED,
      sortOrder: 1,
    },
    {
      slug: "architectural-design",
      titleEn: "Architectural Design",
      titleAr: "تصميمات معمارية",
      descriptionEn: "Exterior and interior designs for homes, restaurants, villas, palaces, chalets, cafes, food courts, building facades, factories, and stores.",
      descriptionAr: "تصاميم خارجية وداخلية للمنازل والمطاعم والفيلات والقصور والشاليهات والمقاهي وصالات الطعام وواجهات المباني والمصانع والمحلات.",
      longDescEn: "Emphasis on the correlation between a building's function, form, and surrounding environment.",
      longDescAr: "مع التأكيد على الترابط بين وظيفة المبنى وشكله وبيئته المحيطة.",
      icon: "Layers",
      status: PublishStatus.PUBLISHED,
      sortOrder: 2,
    },
    {
      slug: "interior-architecture",
      titleEn: "Interior Architecture & Decoration",
      titleAr: "تصميم العمارة الداخلية والديكور",
      descriptionEn: "Planning and designing interior spaces to meet functional requirements while adhering to building standards.",
      descriptionAr: "تخطيط وتصميم الفراغات الداخلية لتلبية المتطلبات الوظيفية والامتثال للمعايير الإنشائية.",
      longDescEn: "Both technical and artistic aspects, maximizing spatial utilization across all environments.",
      longDescAr: "الجوانب التقنية والفنية معاً، مع تعظيم الاستفادة المكانية في جميع البيئات.",
      icon: "PenLine",
      status: PublishStatus.PUBLISHED,
      sortOrder: 3,
    },
    {
      slug: "landscape-design",
      titleEn: "Landscape Design",
      titleAr: "تصميمات تنسيق المواقع (لاند سكيب)",
      descriptionEn: "Softscape: cultivation of trees, flowers, vines, green areas, palms, and irrigation systems. Hardscape: pergolas, fountains, swimming pools, walkways, sculptures, and lighting.",
      descriptionAr: "النباتات الرخوة: أشجار وزهور وكروم ومسطحات خضراء ونخيل وأنظمة ري. العناصر الصلبة: بيرغولا ونوافير ومسابح وممشى ومنحوتات وإضاءة.",
      icon: "TreePine",
      status: PublishStatus.PUBLISHED,
      sortOrder: 4,
    },
    {
      slug: "restoration-strengthening",
      titleEn: "Restoration & Strengthening",
      titleAr: "تنكيس وتدعيم",
      descriptionEn: "Strengthening and repair of structural elements, treatment of cracks and fissures — preserving and reinforcing the built fabric for generations to come.",
      descriptionAr: "تقوية وإصلاح العناصر الإنشائية، ومعالجة الشقوق والصدوع — للحفاظ على الموروث العمراني وتعزيزه للأجيال القادمة.",
      icon: "Wrench",
      status: PublishStatus.PUBLISHED,
      sortOrder: 5,
    },
    {
      slug: "construction-supervision",
      titleEn: "Construction Supervision",
      titleAr: "إشراف على التنفيذ",
      descriptionEn: "Comprehensive review of project specs, examination of drawings, quantity schedules, on-site inspections, soil reports, and preparation of architectural and construction drawings.",
      descriptionAr: "مراجعة شاملة لمواصفات المشروع، وفحص الرسومات وجداول الكميات، وزيارات ميدانية، وتقارير التربة، وإعداد الرسومات المعمارية والإنشائية.",
      icon: "HardHat",
      status: PublishStatus.PUBLISHED,
      sortOrder: 6,
    },
    {
      slug: "model-making",
      titleEn: "Model Making (Maquettes)",
      titleAr: "عمل نماذج (ماكيتات)",
      descriptionEn: "Architectural models drawn to scale, illuminating all essential details. Used for client presentations, real estate conferences, and exhibitions — the craft that founded our practice.",
      descriptionAr: "نماذج معمارية مصغّرة مرسومة بمقاييس دقيقة تكشف كل التفاصيل الجوهرية. تُستخدم في عروض العملاء ومؤتمرات العقارات والمعارض — الحرفة التي أسست ممارستنا.",
      icon: "Box",
      status: PublishStatus.PUBLISHED,
      sortOrder: 7,
    },
  ];

  let servicesCreated = 0;
  let servicesSkipped = 0;
  for (const s of services) {
    const exists = await prisma.service.findUnique({ where: { slug: s.slug } });
    if (!exists) {
      await prisma.service.create({ data: s });
      servicesCreated++;
    } else {
      servicesSkipped++;
    }
  }
  console.log(`✓ Services: ${servicesCreated} created, ${servicesSkipped} already existed`);

  // ── Partners / Clients ─────────────────────────────────────────────────────
  const partners = [
    // Media & Broadcasting
    { nameEn: "Al-Arabiya",    nameAr: "قناة العربية",    sector: "Media & Broadcasting",  sectorAr: "الإعلام والبث",         logo: "/clients/al-arabiya.png",         sortOrder: 1  },
    { nameEn: "MBC Group",     nameAr: "مجموعة MBC",      sector: "Media & Broadcasting",  sectorAr: "الإعلام والبث",         logo: "/clients/mbc.png",                sortOrder: 2  },
    // Hospitality
    { nameEn: "InterContinental Cairo Semiramis", nameAr: "إنتركونتيننتال القاهرة سميراميس", sector: "Hospitality", sectorAr: "الضيافة", logo: "/clients/intercontinental.png", sortOrder: 3 },
    // Retail & Fashion
    { nameEn: "United Colors of Benetton", nameAr: "يونايتد كولورز أوف بنيتون", sector: "Retail & Fashion", sectorAr: "التجزئة والأزياء", logo: "/clients/benetton.png",  sortOrder: 4 },
    { nameEn: "Farida Women Wear",         nameAr: "فريدة للأزياء النسائية",    sector: "Retail & Fashion", sectorAr: "التجزئة والأزياء", logo: "/clients/farida.png",    sortOrder: 5 },
    // Industrial & Commercial
    { nameEn: "Oriental Weavers", nameAr: "الشرقية للسجاد", sector: "Industrial & Commercial", sectorAr: "الصناعي والتجاري", logo: "/clients/oriental-weavers.png", sortOrder: 7 },
    { nameEn: "Mac Mocket",       nameAr: "ماك موكيت",       sector: "Industrial & Commercial", sectorAr: "الصناعي والتجاري", logo: "/clients/mac-mocket.png",       sortOrder: 8 },
    { nameEn: "Nokia",            nameAr: "نوكيا",            sector: "Industrial & Commercial", sectorAr: "الصناعي والتجاري", logo: "/clients/nokia.png",            sortOrder: 9 },
    { nameEn: "Moulinex",         nameAr: "مولينيكس",         sector: "Industrial & Commercial", sectorAr: "الصناعي والتجاري", logo: "/clients/moulinex.png",         sortOrder: 10 },
    // Government & Military
    { nameEn: "Egyptian National Police",  nameAr: "الشرطة المصرية",         sector: "Government & Military", sectorAr: "الحكومي والعسكري", logo: "/clients/egyptian-police.png",  sortOrder: 11 },
    { nameEn: "Military Survey Authority", nameAr: "إدارة المساحة العسكرية", sector: "Government & Military", sectorAr: "الحكومي والعسكري", logo: "/clients/military-survey.png",  sortOrder: 12 },
    // Healthcare
    { nameEn: "El Bialy Dental", nameAr: "عيادة البيلي لطب الأسنان", sector: "Healthcare", sectorAr: "الرعاية الصحية", logo: "/clients/bialy-dental.png", sortOrder: 14 },
    { nameEn: "Sphinx Cure",     nameAr: "سفنكس كيور",               sector: "Healthcare", sectorAr: "الرعاية الصحية", logo: "/clients/sphinx.png",       sortOrder: 15 },
    { nameEn: "MUP",             nameAr: "MUP",                       sector: "Healthcare", sectorAr: "الرعاية الصحية", logo: "/clients/mup.png",          sortOrder: 16 },
  ];

  let partnersCreated = 0;
  let partnersSkipped = 0;
  for (const p of partners) {
    const exists = await prisma.partner.findFirst({ where: { nameEn: p.nameEn } });
    if (!exists) {
      await prisma.partner.create({ data: { ...p, status: PublishStatus.PUBLISHED } });
      partnersCreated++;
    } else {
      partnersSkipped++;
    }
  }
  console.log(`✓ Partners: ${partnersCreated} created, ${partnersSkipped} already existed`);

  console.log("\n🎉 Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
