import type { Metadata } from "next";
import { Cormorant_Garamond, Saira } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Emara — Architecture Studio",
  description: "Award-winning architecture and design studio crafting spaces that endure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${saira.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs synchronously before paint to prevent theme flash */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('emara-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
