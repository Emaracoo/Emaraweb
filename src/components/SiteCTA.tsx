import { prisma } from "@/lib/prisma";
import ContactCTA from "@/components/home/ContactCTA";

interface Overrides {
  eyebrowEn?: string;
  eyebrowAr?: string;
  headlineEn?: string;
  headlineAr?: string;
  ctaEn?: string;
  ctaAr?: string;
}

/** The "Let's Talk" band, using the text and background set in Admin → Homepage → Call to Action.
    Pages can override the copy while keeping the same background. */
export default async function SiteCTA(overrides: Overrides = {}) {
  const section = await prisma.homepageSection.findUnique({ where: { key: "cta" } });
  const data = (section?.data as { bgImage?: string } | null) ?? {};

  return (
    <ContactCTA
      eyebrowEn={overrides.eyebrowEn ?? section?.bodyEn}
      eyebrowAr={overrides.eyebrowAr ?? section?.bodyAr}
      headlineEn={overrides.headlineEn ?? section?.titleEn}
      headlineAr={overrides.headlineAr ?? section?.titleAr}
      ctaEn={overrides.ctaEn ?? section?.ctaLabelEn}
      ctaAr={overrides.ctaAr ?? section?.ctaLabelAr}
      bgImage={data.bgImage}
    />
  );
}
