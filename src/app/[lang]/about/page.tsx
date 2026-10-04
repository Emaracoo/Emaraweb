import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import StudioStory from "@/components/about/StudioStory";
import Values from "@/components/about/Values";
import BuiltOnExpertise from "@/components/about/BuiltOnExpertise";
import SiteCTA from "@/components/SiteCTA";
import { hasLocale } from "../dictionaries";
import { prisma } from "@/lib/prisma";
import { getPageImage } from "@/lib/site-settings";
import { localizeDigits } from "@/lib/labels";

interface Stat { value: string; labelEn: string; labelAr: string }
interface ValueRow { titleEn: string; titleAr: string; descEn: string; descAr: string }

interface HeroData { eyebrowEn?: string; eyebrowAr?: string; accentEn?: string; accentAr?: string }
interface StoryData { eyebrowEn?: string; eyebrowAr?: string; body2En?: string; body2Ar?: string; stats?: Stat[] }
interface VisionData { values?: ValueRow[] }
interface TeamData { eyebrowEn?: string; eyebrowAr?: string; p2En?: string; p2Ar?: string; p3En?: string; p3Ar?: string }

const FALLBACK = {
  en: {
    heroEyebrow: "Our Story", heroTitle: "Four Decades of", heroAccent: "Design & Construction",
    heroSubtitle: "Based in Heliopolis, Cairo — building with concrete, steel, and glass since 1989.",
    storyEyebrow: "Who we are",
    storyHeading: "Four decades of design, built on the smallest details.",
    body1: "With over four decades of experience in design and construction, our journey began with miniature architectural models (maquettes), with attention paid to the smallest details, combining functionality and aesthetics. Our construction journey began with industrial buildings, then gradually extended to commercial and residential projects, including many villas and palaces.",
    body2: "Our experience is diverse, spanning distinguished architectural projects, interior architecture, and site landscaping, incorporating design and execution of concrete and steel structures, utilization of materials such as concrete, steel, and glass, coupled with proficiency in restoration and strengthening.",
    stats: [
      { value: "40",  label: "Years of Experience" },
      { value: "423", label: "Projects Completed"  },
      { value: "237", label: "Clients Served"      },
    ],
    valuesEyebrow: "Our Values",
    values: [
      { num: "01", title: "Mission", desc: "We set new industry standards in design and construction by crafting distinctive structures using concrete, steel, and glass. With fastidious attention to details, we ensure harmonious outcomes across diverse architectural ventures, drawing from our expertise in both industrial and residential sectors." },
      { num: "02", title: "Vision", desc: "To transcend boundaries in the expansive realm of design and construction, leaving an indelible mark on a global scale. We aim to lead the industry by driving innovation, setting international benchmarks, and contributing to the creation of iconic structures worldwide." },
      { num: "03", title: "Our Approach", desc: "Every project begins with maquette-level attention to detail — the same craft that defined our origins in architectural model making. From industrial facilities to intimate residences, we bring structural rigour and aesthetic sensibility to every discipline we practise." },
    ],
    studioEyebrow: "The Studio",
    studioHeading: "Built on Expertise",
    p1: "Emara was founded in Heliopolis, Cairo — and that is where we remain. Our work is rooted in the Egyptian built environment: its codes, its climate, its materials, and the clients who call it home. Over four decades, we have accumulated a depth of local knowledge that no single project could teach.",
    p2: "Our practice spans structural engineering, architectural design, interior architecture, landscape, restoration, construction supervision, and the architectural model making that started it all. That breadth is not incidental — it means every discipline informs every other, and every project benefits from the whole.",
    p3: "We are committed to pushing the boundaries of innovation and excellence — drawing from Egyptian and international codes alike, and delivering results that stand as a testament to rigorous craft.",
  },
  ar: {
    heroEyebrow: "قصتنا", heroTitle: "أربعة عقود من", heroAccent: "التصميم والبناء",
    heroSubtitle: "مقرنا في مصر الجديدة، القاهرة — نبني بالخرسانة والفولاذ والزجاج منذ ١٩٨٩.",
    storyEyebrow: "من نحن",
    storyHeading: "أربعة عقود من التصميم، مبنية على أدق التفاصيل.",
    body1: "بخبرة تمتد لأكثر من أربعة عقود في التصميم والبناء، بدأت رحلتنا بصناعة النماذج المعمارية المصغّرة (المجسّمات)، مع اهتمام دقيق بأصغر التفاصيل، وجمع بين الوظيفية والجماليات. انطلق مسيرنا الإنشائي بالمباني الصناعية، ثم تطوّر تدريجياً ليشمل المشاريع التجارية والسكنية، بما فيها كثير من الفيلات والقصور.",
    body2: "تجربتنا متنوعة، تمتد عبر مشاريع معمارية مميزة، وعمارة داخلية، وتنسيق مواقع، وتشمل تصميم وتنفيذ الهياكل الخرسانية والفولاذية، واستخدام مواد كالخرسانة والفولاذ والزجاج، مع كفاءة في الترميم والتقوية.",
    stats: [
      { value: "٤٠",  label: "عاماً من الخبرة" },
      { value: "٤٢٣", label: "مشروع مكتمل"     },
      { value: "٢٣٧", label: "عميل نخدمه"       },
    ],
    valuesEyebrow: "قيمنا",
    values: [
      { num: "٠١", title: "رسالتنا", desc: "نضع معايير جديدة في التصميم والبناء من خلال صياغة هياكل مميزة بالخرسانة والفولاذ والزجاج. بعناية فائقة بالتفاصيل، نضمن نتائج متناسقة في مختلف المشاريع المعمارية، مستندين إلى خبرتنا في القطاعين الصناعي والسكني." },
      { num: "٠٢", title: "رؤيتنا", desc: "تجاوز الحدود في عالم التصميم والبناء الرحيب، وترك أثر لا يُمحى على مستوى عالمي. نسعى لريادة الصناعة بدفع الابتكار وإرساء المعايير الدولية والمساهمة في إنشاء أيقونات معمارية حول العالم." },
      { num: "٠٣", title: "نهجنا", desc: "كل مشروع يبدأ باهتمام بالتفاصيل على مستوى النماذج المصغّرة — ذات الحرفة التي حددت أصولنا في صناعة النماذج المعمارية. من المنشآت الصناعية إلى المساكن الراقية، نُضفي الصرامة الإنشائية والحساسية الجمالية على كل تخصص نمارسه." },
    ],
    studioEyebrow: "الاستوديو",
    studioHeading: "مبني على الخبرة",
    p1: "تأسست عمارة في مصر الجديدة بالقاهرة — ولا يزال هذا موطننا. يتجذّر عملنا في البيئة العمرانية المصرية: مواصفاتها ومناخها ومواد بنائها وعملاؤها. على مدى أربعة عقود، راكمنا عمقاً من المعرفة المحلية لا يُكتسب من مشروع بعينه.",
    p2: "تمتد ممارستنا لتشمل الهندسة الإنشائية والتصميم المعماري والعمارة الداخلية وتنسيق الحدائق والترميم والإشراف على التنفيذ وصناعة النماذج المعمارية التي كانت البداية. هذا الاتساع ليس عرضياً — فكل تخصص يُغذّي الآخر، وكل مشروع يستفيد من المنظومة كلها.",
    p3: "نحن ملتزمون بدفع حدود الابتكار والتميز — مستلهمين المعايير المصرية والدولية على حدٍّ سواء، ومقدِّمين نتائج تشهد على صرامة الحرفة.",
  },
};

interface Props { params: Promise<{ lang: string }> }

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l  = lang as "en" | "ar";
  const f  = l === "ar" ? "var(--font-cairo)" : "var(--font-saira)";
  const fs = l === "ar" ? "var(--font-cairo)" : "var(--font-cormorant)";
  const fb = FALLBACK[l];

  const [sections, heroImage, storyImage] = await Promise.all([
    prisma.homepageSection.findMany({
      where: { key: { in: ["about_hero", "about_story", "about_vision", "about_team"] } },
    }),
    getPageImage("hero_image_about"),
    getPageImage("about_story_image"),
  ]);
  const get = (key: string) => sections.find(s => s.key === key);

  const hero    = get("about_hero");
  const heroD   = (hero?.data as HeroData | null) ?? {};
  const story   = get("about_story");
  const storyD  = (story?.data as StoryData | null) ?? {};
  const vision  = get("about_vision");
  const visionD = (vision?.data as VisionData | null) ?? {};
  const team    = get("about_team");
  const teamD   = (team?.data as TeamData | null) ?? {};

  const pick = (v: string | null | undefined, fallback: string) => v || fallback;

  const heroStats = (storyD.stats && storyD.stats.length > 0
    ? storyD.stats.map((s, i) => ({ value: s.value, label: pick(l === "ar" ? s.labelAr : s.labelEn, fb.stats[i]?.label ?? "") }))
    : fb.stats
  ).map(s => ({ ...s, value: localizeDigits(s.value, l) }));

  const values = visionD.values && visionD.values.length > 0
    ? visionD.values.map((v, i) => ({
        num: String(i + 1).padStart(2, "0"),
        title: pick(l === "ar" ? v.titleAr : v.titleEn, fb.values[i]?.title ?? ""),
        desc:  pick(l === "ar" ? v.descAr : v.descEn, fb.values[i]?.desc ?? ""),
      }))
    : fb.values;

  return (
    <>
      <Header />
      <main>
        <PageHero
          lang={l}
          eyebrow={pick(l === "ar" ? heroD.eyebrowAr : heroD.eyebrowEn, fb.heroEyebrow)}
          title={pick(l === "ar" ? hero?.titleAr : hero?.titleEn, fb.heroTitle)}
          titleAccent={pick(l === "ar" ? heroD.accentAr : heroD.accentEn, fb.heroAccent)}
          subtitle={pick(l === "ar" ? hero?.bodyAr : hero?.bodyEn, fb.heroSubtitle)}
          image={heroImage}
        />
        <StudioStory
          f={f} fs={fs}
          eyebrow={pick(l === "ar" ? storyD.eyebrowAr : storyD.eyebrowEn, fb.storyEyebrow)}
          heading={pick(l === "ar" ? story?.titleAr : story?.titleEn, fb.storyHeading)}
          body1={pick(l === "ar" ? story?.bodyAr : story?.bodyEn, fb.body1)}
          body2={pick(l === "ar" ? storyD.body2Ar : storyD.body2En, fb.body2)}
          stats={heroStats}
          image={storyImage}
        />
        <Values
          f={f} fs={fs}
          eyebrow={pick(l === "ar" ? vision?.titleAr : vision?.titleEn, fb.valuesEyebrow)}
          values={values}
        />
        <BuiltOnExpertise
          f={f} fs={fs}
          eyebrow={pick(l === "ar" ? teamD.eyebrowAr : teamD.eyebrowEn, fb.studioEyebrow)}
          heading={pick(l === "ar" ? team?.titleAr : team?.titleEn, fb.studioHeading)}
          p1={pick(l === "ar" ? team?.bodyAr : team?.bodyEn, fb.p1)}
          p2={pick(l === "ar" ? teamD.p2Ar : teamD.p2En, fb.p2)}
          p3={pick(l === "ar" ? teamD.p3Ar : teamD.p3En, fb.p3)}
        />
        <SiteCTA />
      </main>
      <Footer />
    </>
  );
}
