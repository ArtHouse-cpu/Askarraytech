// @ts-nocheck
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const SERVICE_CTAS = [
  {
    label: "Start Setup",
    service: "Company Setup",
    variant: "primary",
    testid: "hero-cta-start-setup",
    arrow: true,
  },
  {
    label: "Build MVP",
    service: "Product MVP",
    variant: "outline-gold",
    testid: "hero-cta-build-mvp",
  },
  {
    label: "Setup Marketing",
    service: "Marketing Setup",
    variant: "outline-white",
    testid: "hero-cta-setup-marketing",
  },
];

export default function Hero({ onBookSlot }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0a0a0a] pt-32 pb-20 md:pt-40 md:pb-28"
      data-testid="hero-section"
    >
      {/* Grid + ambient gold */}
      <div className="absolute inset-0 bg-grid-soft pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full bg-[#D4AF37]/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/6 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.06] backdrop-blur-md px-4 py-2 animate-fade-up"
            data-testid="hero-eyebrow"
          >
            <Sparkles size={13} className="text-gold" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-white/85 font-medium">
              Founder helps founder
            </span>
          </div>

          {/* Headline — bold sans display with gold gradient fills */}
          <h1
            className="display-bold mt-10 text-white animate-fade-up"
            style={{
              fontSize: "clamp(3rem, 10vw, 10rem)",
              animationDelay: "0.05s",
            }}
          >
            <span className="block">
              Start Your <span className="gold-gradient-text">Startup.</span>
            </span>
            <span className="block">
              Build Your <span className="gold-gradient-text">Product.</span>
            </span>
            <span className="block gold-gradient-text">Grow Faster.</span>
          </h1>

          {/* Sub */}
          <p
            className="mt-9 text-lg md:text-xl text-white/65 max-w-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Ask Array Tech is the quiet operating partner founders bring in to
            build it properly — legal, product, brand, and launch. One team.
            One roadmap.
          </p>

          {/* 3 service pill CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
            data-testid="hero-cta-row"
          >
            {SERVICE_CTAS.map((cta) => (
              <PillCTA
                key={cta.label}
                cta={cta}
                onClick={() => onBookSlot(cta.service)}
              />
            ))}
          </div>

          <p
            className="mt-7 text-sm text-white/45 max-w-md leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            Choose one track or run the entire 30-day launch.{" "}
            <span className="text-white/65">
              Only 1–5 founders onboarded each month.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function PillCTA({ cta, onClick }) {
  if (cta.variant === "primary") {
    return (
      <Button
        size="lg"
        onClick={onClick}
        className="bg-[#D4AF37] hover:bg-[#F3C853] text-black font-medium rounded-full px-9 py-7 text-base gold-button-glow group"
        data-testid={cta.testid}
      >
        {cta.label}
        {cta.arrow && (
          <ArrowRight
            size={17}
            className="ml-2 transition-transform group-hover:translate-x-1"
          />
        )}
      </Button>
    );
  }
  if (cta.variant === "outline-gold") {
    return (
      <Button
        size="lg"
        variant="ghost"
        onClick={onClick}
        className="rounded-full px-9 py-7 text-base border border-[#D4AF37]/55 hover:border-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/[0.06] text-[#D4AF37] hover:text-[#F3C853]"
        data-testid={cta.testid}
      >
        {cta.label}
      </Button>
    );
  }
  return (
    <Button
      size="lg"
      variant="ghost"
      onClick={onClick}
      className="rounded-full px-9 py-7 text-base border border-white/20 hover:border-white/55 bg-transparent hover:bg-white/[0.04] text-white"
      data-testid={cta.testid}
    >
      {cta.label}
    </Button>
  );
}
