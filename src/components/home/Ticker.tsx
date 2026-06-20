const ITEMS = [
  "Architecture",
  "Interior Design",
  "Urban Planning",
  "Landscape",
  "MENA Region",
  "Excellence",
  "Masterplanning",
  "Sustainability",
  "18 Years",
  "157 Projects",
];

const SEP = <span style={{ color: "#E85830", margin: "0 1.5rem" }}>·</span>;

export default function Ticker() {
  /* Build one copy of the track — CSS duplicates it via the ticker-track animation */
  const items = [...ITEMS, ...ITEMS]; // doubled for seamless loop

  return (
    <div
      className="overflow-hidden select-none"
      style={{ background: "#1A1916", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1rem 0" }}
      aria-hidden
    >
      <div className="ticker-track flex items-center" style={{ width: "max-content" }}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="text-xs tracking-[0.3em] uppercase whitespace-nowrap"
              style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.25)", fontWeight: 300 }}
            >
              {item}
            </span>
            {SEP}
          </span>
        ))}
      </div>
    </div>
  );
}
