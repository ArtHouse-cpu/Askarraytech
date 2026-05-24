// @ts-nocheck
const STATS = [
  { value: "25+", label: "Startups Assisted" },
  { value: "30", label: "Day Launch Framework" },
  { value: "100%", label: "Founder Focused" },
  { value: "A→Z", label: "End-to-End Support" },
];

export default function TrustBar() {
  return (
    <section
      className="relative border-y border-white/5 bg-[#0a0a0a]"
      data-testid="trust-bar"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center md:items-start text-center md:text-left"
              data-testid={`trust-stat-${s.label.split(" ")[0].toLowerCase()}`}
            >
              <p className="font-display text-3xl md:text-5xl font-bold text-white">
                <span className="gold-gradient-text">{s.value}</span>
              </p>
              <p className="text-xs md:text-sm text-white/55 mt-1 uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
