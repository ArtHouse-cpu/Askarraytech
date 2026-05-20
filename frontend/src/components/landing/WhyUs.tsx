// @ts-nocheck
import {
  Crown,
  Zap,
  ShieldCheck,
  UserRound,
  Headphones,
  Diamond,
} from "lucide-react";

const FEATURES = [
  {
    icon: UserRound,
    title: "Founder First",
    desc: "Built around your timelines, your runway, your vision.",
  },
  {
    icon: Zap,
    title: "Fast Execution",
    desc: "30-day launch framework with parallel workstreams.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    desc: "Fixed-fee packages. No surprise invoices. No nickel & dime.",
  },
  {
    icon: Crown,
    title: "Single Point Contact",
    desc: "One dedicated partner across legal, product & growth.",
  },
  {
    icon: Headphones,
    title: "Premium Support",
    desc: "Priority responses, weekly reviews, founder-friendly hours.",
  },
  {
    icon: Diamond,
    title: "Built for Serious Founders",
    desc: "SaaS, D2C, agencies & creators ready to launch and scale.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden"
      data-testid="why-us-section"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/8 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Why Ask Array Tech
          </p>
          <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-tighter mt-3 leading-[1.05]">
            Premium agency.{" "}
            <span className="gold-gradient-text">Founder-grade rigour.</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl glass-dark p-7 hover:border-[#D4AF37]/40 transition-all duration-300"
                data-testid={`why-us-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="inline-grid place-items-center w-11 h-11 rounded-xl bg-[#D4AF37]/12 border border-[#D4AF37]/25 text-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-xl mt-5">{f.title}</h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
