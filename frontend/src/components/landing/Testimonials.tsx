// @ts-nocheck
import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Ask Array Tech compressed what would have taken us 6 months into 30 days. Legal, MVP and marketing — all done by one team. Game changer.",
    name: "Aanya Mehta",
    role: "Founder · Loomly Ops (SaaS)",
  },
  {
    quote:
      "I stopped chasing CAs, developers and agencies separately. One roadmap, one PoC. We launched our D2C brand on day 32 and started revenue immediately.",
    name: "Rohan Kapoor",
    role: "Founder · Maaty Roots (D2C)",
  },
  {
    quote:
      "Premium delivery, founder-friendly support, transparent pricing. They treated my idea like their own startup. That's rare.",
    name: "Karthik Iyer",
    role: "Founder · Kavach Pay (Fintech)",
  },
  {
    quote:
      "From brand identity to LinkedIn engine, the playbook was tight. We started getting inbound leads within 3 weeks of launch.",
    name: "Niharika Sen",
    role: "Founder · Nine & North (Agency)",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const current = TESTIMONIALS[i];

  return (
    <section
      id="testimonials"
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden"
      data-testid="testimonials-section"
    >
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#D4AF37]/8 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-white/50">
          Founders speak
        </p>
        <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tighter mt-3 leading-[1.05]">
          The proof is in the launches.
        </h2>

        <div className="mt-14 relative">
          <Quote
            size={40}
            className="mx-auto text-[#D4AF37]/40"
            strokeWidth={1.5}
          />
          <p
            key={i}
            className="mt-6 font-display text-2xl md:text-3xl leading-snug text-white/90 animate-fade-up"
            data-testid="testimonial-quote"
          >
            "{current.quote}"
          </p>
          <div className="mt-8">
            <p className="font-medium text-white">{current.name}</p>
            <p className="text-sm text-white/55">{current.role}</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() =>
              setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
            }
            className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
            data-testid="testimonial-prev"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-[#D4AF37]" : "w-1.5 bg-white/25"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setI((p) => (p + 1) % TESTIMONIALS.length)}
            className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
            data-testid="testimonial-next"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
