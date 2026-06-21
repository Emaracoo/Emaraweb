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
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    description:
      "Villa design, interior design, and construction supervision of a private residential villa in Mina Garden City — built across three floors on a 660m² plot. Completed in October 2022, the project reflects Emara's integrated design approach: from structural engineering through to interior finishes and external landscaping, delivered as a single cohesive vision.",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    description:
      "Exterior design, interior design, and construction supervision of a large private villa in New Cairo, spanning five floors with 450m² per level. Completed in 2014, the project represents Emara's command of large-scale residential architecture — blending contemporary proportions with refined detailing across more than 2,000m² of built area.",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    description:
      "Full villa design, interior design, and construction supervision for a private residence in Shorouk City, distributed across four floors with 400m² per level. Completed in 2017, the project exemplifies Emara's disciplined approach to residential design — balancing generous scale with warmth, material richness, and spatial coherence throughout.",
    galleryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    description:
      "Villa design, interior design, and construction supervision — including landscaping and a swimming pool — for a private family residence in Mina Garden City. Spread across three floors on a 750m² plot, this 2013 project is one of Emara's most complete residential commissions: architecture, interiors, landscape, and pool designed as a unified whole.",
    galleryImages: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    description:
      "Interior design, décor, and construction supervision of a private 150m² apartment in New Cairo. Completed in 2022, the project demonstrates Emara's ability to work at every scale — bringing the same precision, material intelligence, and spatial sensitivity found in the firm's landmark villas to a refined urban apartment.",
    galleryImages: [
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    description:
      "Full villa design, interior design, and construction supervision including landscaping and an indoor swimming pool for a private residence in Al-Badrashin, Giza. Completed in 2001, Villa WM is among Emara's earlier landmark residential commissions — four floors of 250m² each, with extensive general site design that established the firm's integrated approach to residential architecture.",
    galleryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description:
      "Interior design, décor, and construction supervision for Al Arabiya News studios and administrative offices spanning 600m² in the historic Maspero broadcasting district of Cairo. The project encompasses broadcast studios, editorial suites, and administrative offices — each space calibrated for both technical function and visual authority on screen.",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    description:
      "Interior design, décor, and construction supervision for a 200m² spa and wellness centre in Fifth Settlement, Cairo. Completed in 2015, the design creates an atmosphere of calm and restoration through considered material choices, natural light, and spatial sequencing that moves guests from street-level arrival through to the innermost treatment spaces.",
    galleryImages: [
      "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    description:
      "Interior design, décor, reconstruction, and construction supervision across six floors of 300m² each in Masr El Gadeda, Cairo. Completed in 2004, this commercial landmark demonstrates Emara's capacity for multi-storey interior fit-out — coordinating complex structural, mechanical, and aesthetic requirements across a substantial built programme of nearly 1,800m².",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    description:
      "Design and construction supervision of the Abu Simbel factory across a 4,200m² site in Qalyub, Giza — three production floors plus six storage rooms. Completed in 1992, the project stands as one of Emara's key large-scale industrial commissions, establishing the technical rigour and site discipline that has defined the firm's industrial practice for over three decades.",
    galleryImages: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
      "https://images.unsplash.com/photo-1565610222536-ef125173c1b8?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
  },
  {
    slug: "manar-tex-factory",
    title: "Manar Tex Factory",
    category: "Industrial",
    year: "1989",
    location: "10th of Ramadan City",
    area: "11,000 m²",
    client: "Al Ashraf Company",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description:
      "Design and construction supervision of the Manar Tex textile factory — Emara's founding commission, completed in 1989. Spanning 11,000m² in 10th of Ramadan City and built alongside an on-site mosque, the project set the standard that four decades of practice have continued to honour: structural precision, functional clarity, and a respect for the communities these buildings serve.",
    galleryImages: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1565610222536-ef125173c1b8?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
    description:
      "Construction and supervision of the Comprehensive Cancer Centre in Mohandeseen — 400m² of carefully designed medical space completed in 2014. Every aspect of the environment, from circulation to material finish, was considered through the lens of patient and clinician wellbeing, creating a setting that is both clinically rigorous and genuinely humane.",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    description:
      "Interior design, fit-out, and construction supervision for 37 branches of EL Farida — one of Egypt's leading chains for modest fashion. Each branch applies a consistent design language that is refined, recognisable, and adaptable to varying footprints — establishing a retail identity that scales with the brand across the country.",
    galleryImages: [
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=800&q=80",
    description:
      "Interior design and construction supervision for the Sphinx Comprehensive Cancer Centre in Mohandeseen — 700m² completed in 2015. A companion project to the earlier Mohandeseen cancer centre, the Sphinx facility builds on that experience: refined wayfinding, calm materiality, and a spatial sequence calibrated to the physical and emotional needs of oncology patients and staff.",
    galleryImages: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    description:
      "Interior design and supervision for Bialy Dental Clinic in October City — completed in 2017. A refined clinical environment that balances the precision of a modern dental practice with an atmosphere of ease: clean geometry, warm materials, and spatial planning designed to minimise anxiety and support the delivery of excellent care.",
    galleryImages: [
      "https://images.unsplash.com/photo-1588776814546-1ffbb5e0a13a?w=800&q=80",
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
      "https://images.unsplash.com/photo-1606811851212-f33e6aa7b67f?w=800&q=80",
    ],
  },
];

export const CATEGORIES = ["All", "Residential", "Administrative", "Industrial", "Commercial"] as const;

export const FEATURED_SLUGS = ["villa-tn", "al-arabiya-studios", "manar-tex-factory"];

export function getFeaturedProjects() {
  return FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)!);
}
