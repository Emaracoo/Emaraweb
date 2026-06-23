import type { Metadata } from "next";
import { Cormorant_Garamond, Saira, Cairo } from "next/font/google";
import "../globals.css";
import { LangProvider } from "@/components/LangProvider";
import { hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emara — Architecture Studio",
  description: "Award-winning architecture and design studio crafting spaces that endure.",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const isAr = lang === "ar";

  return (
    <html
      lang={lang}
      dir={isAr ? "rtl" : "ltr"}
      className={`${cormorant.variable} ${saira.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('emara-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}`,
          }}
        />
        {isAr && (
          <style>{`
            body { font-family: var(--font-cairo), sans-serif; }
            h1, h2, h3, h4, h5, h6 { font-family: var(--font-cairo), sans-serif; }
          `}</style>
        )}
      </head>
      <body>
        <LangProvider lang={isAr ? "ar" : "en"}>{children}</LangProvider>
      </body>
    </html>
  );
}
