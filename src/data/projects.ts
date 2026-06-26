export type ProjectCategory = "Residential" | "Administrative" | "Industrial" | "Commercial";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  location: string;
  area: string;
  client: string;
  image: string;
  description: string;
  galleryImages: string[];
}

export const PROJECTS: Project[] = [
  // ── Residential ───────────────────────────────────────────────────────────
  {
    slug: "villa-tn",
    title: "Villa TN, Mina Garden City",
    category: "Residential",
    year: "2022",
    location: "Mina Garden City, October",
    area: "180 m² × 3 floors on 660 m² land",
    client: "Private Client",
    image: "/projects/villa-tn/01.png",
    description:
      "Villa design, interior design, and construction supervision of a private residential villa in Mina Garden City — built across three floors on a 660m² plot. Completed in October 2022, the project reflects Emara's integrated design approach: from structural engineering through to interior finishes and external landscaping, delivered as a single cohesive vision.",
    galleryImages: [
      "/projects/villa-tn/02.png",
      "/projects/villa-tn/03.png",
      "/projects/villa-tn/04.png",
      "/projects/villa-tn/05.png",
      "/projects/villa-tn/06.png",
      "/projects/villa-tn/07.png",
      "/projects/villa-tn/08.png",
      "/projects/villa-tn/09.png",
      "/projects/villa-tn/10.png",
      "/projects/villa-tn/11.png",
      "/projects/villa-tn/12.png",
      "/projects/villa-tn/13.png",
      "/projects/villa-tn/14.png",
      "/projects/villa-tn/15.png",
      "/projects/villa-tn/16.png",
      "/projects/villa-tn/17.png",
      "/projects/villa-tn/18.png",
      "/projects/villa-tn/19.png",
      "/projects/villa-tn/20.png",
      "/projects/villa-tn/21.png",
      "/projects/villa-tn/22.png",
    ],
  },
  {
    slug: "villa-zw",
    title: "Villa ZW, New Cairo",
    category: "Residential",
    year: "2014",
    location: "New Cairo",
    area: "450 m² × 5 floors",
    client: "Private Client",
    image: "/projects/villa-zw/01.png",
    description:
      "Exterior design, interior design, and construction supervision of a large private villa in New Cairo, spanning five floors with 450m² per level. Completed in 2014, the project represents Emara's command of large-scale residential architecture — blending contemporary proportions with refined detailing across more than 2,000m² of built area.",
    galleryImages: [
      "/projects/villa-zw/02.png",
      "/projects/villa-zw/03.png",
      "/projects/villa-zw/04.png",
      "/projects/villa-zw/05.png",
      "/projects/villa-zw/06.png",
      "/projects/villa-zw/07.png",
      "/projects/villa-zw/08.png",
      "/projects/villa-zw/09.png",
      "/projects/villa-zw/10.png",
      "/projects/villa-zw/11.png",
      "/projects/villa-zw/12.png",
      "/projects/villa-zw/13.png",
      "/projects/villa-zw/14.png",
    ],
  },
  {
    slug: "villa-mw",
    title: "Villa MW, Shorouk City",
    category: "Residential",
    year: "2017",
    location: "Shorouk City, Cairo",
    area: "400 m² × 4 floors",
    client: "Private Client",
    image: "/projects/villa-mw/01.png",
    description:
      "Full villa design, interior design, and construction supervision for a private residence in Shorouk City, distributed across four floors with 400m² per level. Completed in 2017, the project exemplifies Emara's disciplined approach to residential design — balancing generous scale with warmth, material richness, and spatial coherence throughout.",
    galleryImages: [
      "/projects/villa-mw/02.png",
      "/projects/villa-mw/03.png",
      "/projects/villa-mw/04.png",
      "/projects/villa-mw/05.png",
      "/projects/villa-mw/06.png",
      "/projects/villa-mw/07.png",
      "/projects/villa-mw/08.png",
      "/projects/villa-mw/09.png",
      "/projects/villa-mw/10.png",
      "/projects/villa-mw/11.png",
      "/projects/villa-mw/12.png",
      "/projects/villa-mw/13.png",
      "/projects/villa-mw/14.png",
      "/projects/villa-mw/15.png",
      "/projects/villa-mw/16.png",
      "/projects/villa-mw/17.png",
      "/projects/villa-mw/18.png",
      "/projects/villa-mw/19.png",
      "/projects/villa-mw/20.png",
      "/projects/villa-mw/21.png",
      "/projects/villa-mw/22.png",
      "/projects/villa-mw/23.png",
      "/projects/villa-mw/24.png",
    ],
  },
  {
    slug: "villa-hm",
    title: "Villa HM, Mina Garden City",
    category: "Residential",
    year: "2013",
    location: "Mina Garden City, October",
    area: "150 m² × 3 floors on 750 m² land",
    client: "Private Client",
    image: "/projects/villa-hm/01.png",
    description:
      "Villa design, interior design, and construction supervision — including landscaping and a swimming pool — for a private family residence in Mina Garden City. Spread across three floors on a 750m² plot, this 2013 project is one of Emara's most complete residential commissions: architecture, interiors, landscape, and pool designed as a unified whole.",
    galleryImages: [
      "/projects/villa-hm/02.png",
      "/projects/villa-hm/03.png",
      "/projects/villa-hm/04.png",
      "/projects/villa-hm/05.png",
      "/projects/villa-hm/06.png",
      "/projects/villa-hm/07.png",
      "/projects/villa-hm/08.png",
      "/projects/villa-hm/09.png",
      "/projects/villa-hm/10.png",
      "/projects/villa-hm/11.png",
      "/projects/villa-hm/12.png",
      "/projects/villa-hm/13.png",
      "/projects/villa-hm/14.png",
      "/projects/villa-hm/15.png",
      "/projects/villa-hm/16.png",
      "/projects/villa-hm/17.png",
      "/projects/villa-hm/18.png",
      "/projects/villa-hm/19.png",
    ],
  },
  {
    slug: "apartment-ms",
    title: "Apartment MS, New Cairo",
    category: "Residential",
    year: "2022",
    location: "New Cairo",
    area: "150 m²",
    client: "Private Client",
    image: "/projects/apartment-ms/01.png",
    description:
      "Interior design, décor, and construction supervision of a private 150m² apartment in New Cairo. Completed in 2022, the project demonstrates Emara's ability to work at every scale — bringing the same precision, material intelligence, and spatial sensitivity found in the firm's landmark villas to a refined urban apartment.",
    galleryImages: [
      "/projects/apartment-ms/02.png",
      "/projects/apartment-ms/03.png",
      "/projects/apartment-ms/04.png",
      "/projects/apartment-ms/05.png",
      "/projects/apartment-ms/06.png",
    ],
  },
  {
    slug: "villa-wm",
    title: "Villa WM, Al-Badrashin",
    category: "Residential",
    year: "2001",
    location: "Al-Badrashin, Giza",
    area: "250 m² × 4 floors",
    client: "Private Client",
    image: "/projects/villa-wm/01.png",
    description:
      "Full villa design, interior design, and construction supervision including landscaping and an indoor swimming pool for a private residence in Al-Badrashin, Giza. Completed in 2001, Villa WM is among Emara's earlier landmark residential commissions — four floors of 250m² each, with extensive general site design that established the firm's integrated approach to residential architecture.",
    galleryImages: [
      "/projects/villa-wm/02.png",
      "/projects/villa-wm/03.png",
      "/projects/villa-wm/04.png",
      "/projects/villa-wm/05.png",
      "/projects/villa-wm/06.png",
      "/projects/villa-wm/07.png",
    ],
  },

  // ── Administrative ────────────────────────────────────────────────────────
  {
    slug: "al-arabiya-studios",
    title: "Al Arabiya News Studios",
    category: "Administrative",
    year: "2011",
    location: "Maspero, Cairo",
    area: "600 m²",
    client: "Al Arabiya News / MBC Group",
    image: "/projects/al-arabiya-studios/01.png",
    description:
      "Interior design, décor, and construction supervision for Al Arabiya News studios and administrative offices spanning 600m² in the historic Maspero broadcasting district of Cairo. The project encompasses broadcast studios, editorial suites, and administrative offices — each space calibrated for both technical function and visual authority on screen.",
    galleryImages: [
      "/projects/al-arabiya-studios/02.png",
      "/projects/al-arabiya-studios/03.png",
      "/projects/al-arabiya-studios/04.png",
      "/projects/al-arabiya-studios/05.png",
      "/projects/al-arabiya-studios/06.png",
      "/projects/al-arabiya-studios/07.png",
      "/projects/al-arabiya-studios/08.png",
    ],
  },
  {
    slug: "spa-wellness-centre",
    title: "Spa & Wellness Centre",
    category: "Administrative",
    year: "2015",
    location: "Fifth Settlement, Cairo",
    area: "200 m²",
    client: "Private Developer",
    image: "/projects/spa-wellness-centre/01.png",
    description:
      "Interior design, décor, and construction supervision for a 200m² spa and wellness centre in Fifth Settlement, Cairo. Completed in 2015, the design creates an atmosphere of calm and restoration through considered material choices, natural light, and spatial sequencing that moves guests from street-level arrival through to the innermost treatment spaces.",
    galleryImages: [
      "/projects/spa-wellness-centre/02.png",
      "/projects/spa-wellness-centre/03.png",
      "/projects/spa-wellness-centre/04.png",
      "/projects/spa-wellness-centre/05.png",
      "/projects/spa-wellness-centre/06.png",
      "/projects/spa-wellness-centre/07.png",
      "/projects/spa-wellness-centre/08.png",
      "/projects/spa-wellness-centre/09.png",
    ],
  },
  {
    slug: "medical-unions-pharmaceuticals",
    title: "Medical Unions Pharmaceuticals",
    category: "Administrative",
    year: "2004",
    location: "Masr El Gadeda, Cairo",
    area: "300 m² × 6 floors",
    client: "Medical Unions Pharmaceuticals",
    image: "/projects/medical-unions-pharmaceuticals/01.png",
    description:
      "Interior design, décor, reconstruction, and construction supervision across six floors of 300m² each in Masr El Gadeda, Cairo. Completed in 2004, this commercial landmark demonstrates Emara's capacity for multi-storey interior fit-out — coordinating complex structural, mechanical, and aesthetic requirements across a substantial built programme of nearly 1,800m².",
    galleryImages: [
      "/projects/medical-unions-pharmaceuticals/02.png",
      "/projects/medical-unions-pharmaceuticals/03.png",
    ],
  },

  // ── Industrial ────────────────────────────────────────────────────────────
  {
    slug: "abu-simbel-factory",
    title: "Abu Simbel Factory",
    category: "Industrial",
    year: "1992",
    location: "Qalyub, Giza",
    area: "4,200 m² × 3 floors + 6 storage rooms",
    client: "Private Industrial Client",
    image: "/projects/abu-simbel-factory/01.png",
    description:
      "Design and construction supervision of the Abu Simbel factory across a 4,200m² site in Qalyub, Giza — three production floors plus six storage rooms. Completed in 1992, the project stands as one of Emara's key large-scale industrial commissions, establishing the technical rigour and site discipline that has defined the firm's industrial practice for over three decades.",
    galleryImages: [],
  },
  {
    slug: "manar-tex-factory",
    title: "Manar Tex Factory",
    category: "Industrial",
    year: "1989",
    location: "10th of Ramadan City",
    area: "11,000 m²",
    client: "Al Ashraf Company",
    image: "/projects/manar-tex-factory/01.png",
    description:
      "Design and construction supervision of the Manar Tex textile factory — Emara's founding commission, completed in 1989. Spanning 11,000m² in 10th of Ramadan City and built alongside an on-site mosque, the project set the standard that four decades of practice have continued to honour: structural precision, functional clarity, and a respect for the communities these buildings serve.",
    galleryImages: [
      "/projects/manar-tex-factory/02.png",
    ],
  },

  // ── Commercial ────────────────────────────────────────────────────────────
  {
    slug: "comprehensive-cancer-centre",
    title: "Comprehensive Cancer Centre",
    category: "Commercial",
    year: "2014",
    location: "Mohandeseen, Cairo",
    area: "400 m²",
    client: "Private Medical Group",
    image: "/projects/comprehensive-cancer-centre/01.png",
    description:
      "Construction and supervision of the Comprehensive Cancer Centre in Mohandeseen — 400m² of carefully designed medical space completed in 2014. Every aspect of the environment, from circulation to material finish, was considered through the lens of patient and clinician wellbeing, creating a setting that is both clinically rigorous and genuinely humane.",
    galleryImages: [
      "/projects/comprehensive-cancer-centre/02.png",
      "/projects/comprehensive-cancer-centre/03.png",
      "/projects/comprehensive-cancer-centre/04.png",
      "/projects/comprehensive-cancer-centre/05.png",
      "/projects/comprehensive-cancer-centre/06.png",
      "/projects/comprehensive-cancer-centre/07.png",
    ],
  },
  {
    slug: "el-farida-chain",
    title: "EL Farida Chain",
    category: "Commercial",
    year: "Ongoing",
    location: "37 branches across Egypt",
    area: "37 branches",
    client: "EL Farida Group",
    image: "/projects/el-farida-chain/01.png",
    description:
      "Interior design, fit-out, and construction supervision for 37 branches of EL Farida — one of Egypt's leading chains for modest fashion. Each branch applies a consistent design language that is refined, recognisable, and adaptable to varying footprints — establishing a retail identity that scales with the brand across the country.",
    galleryImages: [
      "/projects/el-farida-chain/02.png",
      "/projects/el-farida-chain/03.png",
    ],
  },
  {
    slug: "sphinx-cancer-centre",
    title: "Sphinx Comprehensive Cancer Centre",
    category: "Commercial",
    year: "2015",
    location: "Mohandeseen, Cairo",
    area: "700 m²",
    client: "Sphinx Medical Group",
    image: "/projects/sphinx-cancer-centre/01.png",
    description:
      "Interior design and construction supervision for the Sphinx Comprehensive Cancer Centre in Mohandeseen — 700m² completed in 2015. A companion project to the earlier Mohandeseen cancer centre, the Sphinx facility builds on that experience: refined wayfinding, calm materiality, and a spatial sequence calibrated to the physical and emotional needs of oncology patients and staff.",
    galleryImages: [
      "/projects/sphinx-cancer-centre/02.png",
      "/projects/sphinx-cancer-centre/03.png",
      "/projects/sphinx-cancer-centre/04.png",
      "/projects/sphinx-cancer-centre/05.png",
      "/projects/sphinx-cancer-centre/06.png",
      "/projects/sphinx-cancer-centre/07.png",
      "/projects/sphinx-cancer-centre/08.png",
      "/projects/sphinx-cancer-centre/09.png",
      "/projects/sphinx-cancer-centre/10.png",
      "/projects/sphinx-cancer-centre/11.png",
      "/projects/sphinx-cancer-centre/12.png",
      "/projects/sphinx-cancer-centre/13.png",
    ],
  },
  {
    slug: "bialy-dental-clinic",
    title: "Bialy Dental Clinic",
    category: "Commercial",
    year: "2017",
    location: "October City",
    area: "Private clinic",
    client: "Dr. Bialy",
    image: "/projects/bialy-dental-clinic/01.png",
    description:
      "Interior design and supervision for Bialy Dental Clinic in October City — completed in 2017. A refined clinical environment that balances the precision of a modern dental practice with an atmosphere of ease: clean geometry, warm materials, and spatial planning designed to minimise anxiety and support the delivery of excellent care.",
    galleryImages: [],
  },
];

export const CATEGORIES = ["All", "Residential", "Administrative", "Industrial", "Commercial"] as const;

export const FEATURED_SLUGS = ["villa-tn", "al-arabiya-studios", "manar-tex-factory"];

export function getFeaturedProjects() {
  return FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)!);
}
