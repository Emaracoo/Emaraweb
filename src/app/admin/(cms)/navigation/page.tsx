import { S } from "@/lib/admin-styles";
import { Navigation as NavIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Navigation" };

const NAV_ITEMS = [
  { label: "Projects",  href: "/[lang]/projects",  labelAr: "المشاريع"  },
  { label: "Services",  href: "/[lang]/services",  labelAr: "الخدمات"   },
  { label: "About",     href: "/[lang]/about",     labelAr: "عن الشركة" },
  { label: "Blog",      href: "/[lang]/blog",      labelAr: "المدونة"   },
  { label: "Partners",  href: "/[lang]/partners",  labelAr: "العملاء"   },
  { label: "Contact",   href: "/[lang]/contact",   labelAr: "تواصل معنا" },
];

export default function NavigationPage() {
  return (
    <>
      <style>{S}</style>
      <div className="aph"><h1 className="apt">Navigation</h1></div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.25rem", alignItems: "start" }}>
        <div className="aw">
          <div className="ah"><h2 className="at">Main Navigation Links</h2></div>
          <table className="tb">
            <thead>
              <tr>
                <th>#</th>
                <th>Label (EN)</th>
                <th>Label (AR)</th>
                <th>Route</th>
              </tr>
            </thead>
            <tbody>
              {NAV_ITEMS.map((item, i) => (
                <tr key={item.href} className="tr">
                  <td className="atag">{i + 1}</td>
                  <td style={{ fontWeight: 500 }}>{item.label}</td>
                  <td dir="rtl" className="atag">{item.labelAr}</td>
                  <td className="atag">{item.href}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="aw" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".75rem" }}>
            <NavIcon size={16} color="#993434" strokeWidth={1.5} />
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A", fontFamily: "var(--font-inter),system-ui,sans-serif", margin: 0 }}>
              Navigation Info
            </p>
          </div>
          <p style={{ fontSize: "13px", color: "#5A5A5A", fontFamily: "var(--font-inter),system-ui,sans-serif", lineHeight: 1.65, margin: 0 }}>
            Navigation links are defined in the codebase and automatically support both English and Arabic routes via the <code style={{ background: "#F5F4F2", padding: "0 4px" }}>[lang]</code> prefix.
          </p>
          <p style={{ fontSize: "13px", color: "#5A5A5A", fontFamily: "var(--font-inter),system-ui,sans-serif", lineHeight: 1.65, marginTop: ".75rem" }}>
            To reorder or add new links, update <code style={{ background: "#F5F4F2", padding: "0 4px" }}>src/components/Header.tsx</code>.
          </p>
        </div>
      </div>
    </>
  );
}
