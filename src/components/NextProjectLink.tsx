"use client";

import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

export default function NextProjectLink({ href, label }: Props) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 group shrink-0"
      style={{ background: "#E85830", color: "#fff", fontFamily: "var(--font-inter)" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#C44422")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#E85830")}
    >
      {label}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}
