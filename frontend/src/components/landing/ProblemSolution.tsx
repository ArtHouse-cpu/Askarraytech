// @ts-nocheck
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const PROBLEMS = [
  {
    group: "Company Setup",
    items: ["CA delays", "Registration confusion", "Compliance mistakes"],
  },
  {
    group: "Product",
    items: ["Bad developers", "Delayed MVPs", "Overpaying agencies"],
  },
  {
    group: "Marketing",
    items: ["No branding", "Wasted ad spend", "Poor launch planning"],
  },
  {
    group: "Founder",
    items: ["Burnout", "Wasted time", "Lost momentum"],
  },
];

const SOLUTIONS = [
  "One partner",
  "One roadmap",
  "One team",
  "Faster execution",
  "Lower wasted costs",
  "Peace of mind",
  "Launch in 30 days",
];

export default function ProblemSolution() {
  return (
    <section
      id="problem"
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden"
      data-testid="problem-solution-section"
    >
      <div className="absolute -top-32 right-1/3 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            The reality
          </p>
          <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-tighter mt-3 leading-[1.05]">
            Don't let execution{" "}
            <span className="text-white/40">kill your idea.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/65 max-w-2xl">
            Most founders waste months because they try to figure everything out
            alone.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          {/* LEFT — Problems */}
          <div
            className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 md:p-10"
            data-testid="problems-card"
          >
            <div className="flex items-center gap-2 text-white/50">
              <AlertTriangle size={16} />
              <span className="text-xs uppercase tracking-[0.22em]">
                Founders face
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl mt-3 text-white/85">
              The DIY founder spiral.
            </h3>

            <div className="mt-8 space-y-7">
              {PROBLEMS.map((p) => (
                <div key={p.group}>
                  <p className="text-sm text-white/45 uppercase tracking-widest">
                    {p.group}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {p.items.map((i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-white/55 text-base"
                      >
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span className="line-through decoration-white/20">
                          {i}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Solutions */}
          <div
            className="rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#D4AF37]/[0.06] to-transparent p-8 md:p-10 relative overflow-hidden"
            data-testid="solutions-card"
          >
            <div className="absolute inset-x-0 top-0 divider-gold" />
            <div className="flex items-center gap-2 text-gold">
              <CheckCircle2 size={16} />
              <span className="text-xs uppercase tracking-[0.22em]">
                Ask Array Tech solves it
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl mt-3 text-white">
              One team. One roadmap.{" "}
              <span className="gold-gradient-text">Launched in 30 days.</span>
            </h3>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {SOLUTIONS.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2.5 text-white/85 text-base"
                >
                  <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                    <CheckCircle2 size={13} className="text-gold" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-xl border border-white/10 bg-black/40 p-5">
              <p className="font-display text-xl md:text-2xl">
                Save Time. Save Money. Save Energy.
              </p>
              <p className="text-white/55 mt-1 text-sm">
                Focus on building your dream. We handle the rest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
