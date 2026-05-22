// @ts-nocheck
import { Crown, Zap, ShieldCheck, UserRound, Award } from "lucide-react";

const POINTS = [
  {
    icon: Crown,
    title: "Only 1–5 startups onboarded monthly",
    desc: "We intentionally cap intake to protect execution quality.",
  },
  {
    icon: UserRound,
    title: "Dedicated execution support",
    desc: "One PoC. One team. One thread across legal, product & growth.",
  },
  {
    icon: Zap,
    title: "Faster turnaround",
    desc: "Parallel workstreams that compress months into days.",
  },
  {
    icon: Award,
    title: "Premium founder experience",
    desc: "Quiet, concierge-style coordination. No noise. No nickel & dime.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-end ownership",
    desc: "We don't hand-off. We own the launch alongside you.",
  },
];

export default function Exclusivity() {
  return (
    <section
      id="exclusivity"
      className="relative bg-white text-black py-24 md:py-32"
      data-testid="exclusivity-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-black/45">
            By invitation, almost
          </p>
          <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-[-0.025em] mt-4 leading-[1.02]">
            Built for serious founders
          </h2>
          <p className="mt-6 text-base md:text-lg text-black/55 max-w-2xl leading-relaxed">
            We intentionally cap intake to 1–5 startups monthly to protect execution quality and focus on founders ready to launch.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {POINTS.map((p, i) => {
            const Icon = p.icon;
            const featured = i === 0;
            return (
              <div
                key={p.title}
                className={[
                  "relative rounded-2xl p-7 transition-all duration-300 overflow-hidden",
                  featured
                    ? "bg-[#0a0a0a] text-white lg:col-span-1 lg:row-span-2 border border-[#D4AF37]/40 shadow-[0_40px_80px_-30px_rgba(212,175,55,0.35)]"
                    : "bg-white border border-black/[0.08] hover:border-black/25 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)]",
                ].join(" ")}
                data-testid={`exclusivity-card-${i}`}
              >
                {featured && (
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none" />
                )}
                <span
                  className={[
                    "inline-grid place-items-center w-11 h-11 rounded-xl",
                    featured
                      ? "bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-gold"
                      : "bg-black text-white",
                  ].join(" ")}
                >
                  <Icon size={19} />
                </span>
                <h3
                  className={`font-display ${featured ? "text-2xl md:text-3xl" : "text-lg"} mt-5 tracking-tight`}
                >
                  {p.title}
                </h3>
                <p
                  className={`text-sm mt-2 leading-relaxed ${featured ? "text-white/65" : "text-black/55"}`}
                >
                  {p.desc}
                </p>
                {featured && (
                  <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Limited monthly intake
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
