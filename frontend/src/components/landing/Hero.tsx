// @ts-nocheck
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Scale, Megaphone, Code } from "lucide-react";
import { BRAND } from "@/lib/brand";

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Headline & Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.06] backdrop-blur-md px-4 py-2 self-start animate-fade-up"
              data-testid="hero-eyebrow"
            >
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/85 font-medium">
                Founder helps founder
              </span>
            </div>

            {/* Headline with backend shading */}
            <div className="relative mt-8">
              {/* Premium gold/yellow backend shading */}
              <div className="absolute -left-16 -top-16 w-[450px] h-[350px] rounded-full bg-[#D4AF37]/10 blur-[130px] pointer-events-none" />
              <div className="absolute -left-8 -top-8 w-[250px] h-[250px] rounded-full bg-[#F3C853]/6 blur-[90px] pointer-events-none" />

              <h1
                className="relative font-display text-white animate-fade-up leading-[1.02] tracking-tighter font-black"
                style={{
                  fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)",
                  animationDelay: "0.05s",
                }}
              >
                <span className="inline">Start Your </span>
                <span className="inline gold-gradient-text">Startup.</span>
                <span className="mt-2 md:mt-3 inline-block">Build Your </span>
                <span className="gold-gradient-text inline"> Product.</span>
                <span className="mt-2 md:mt-3 inline-block">
                  Grow Faster.
                </span>
              </h1>
            </div>

            {/* Paragraph description */}
            <p
              className="mt-6 text-base md:text-lg text-white/60 max-w-xl leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              <strong>Turn Your Idea Into Revenue in 30 Days.</strong> Ask Array
              Tech helps founders launch startups faster with company setup, MVP
              development, and marketing setup — all under one execution
              partner.
            </p>

            {/* 3 service pill CTAs */}
            <div
              className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 animate-fade-up"
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

            {/* Bottom Trust points */}
            <div
              className="mt-12 md:mt-16 flex flex-wrap gap-x-8 gap-y-3 text-[11px] tracking-[0.2em] font-semibold text-white/40 uppercase animate-fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[#D4AF37] font-bold">✓</span> LEGAL
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D4AF37] font-bold">✓</span> PRODUCT
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D4AF37] font-bold">✓</span> GROWTH
              </div>
            </div>
          </div>

          {/* Right Column - Concentric circles & Floating Badges */}
          <div className="lg:col-span-5 flex items-center justify-center w-full mt-8 lg:mt-0">
            <div className="relative w-full max-w-[460px] aspect-[1.05] rounded-[32px] border border-white/5 bg-[#060606]/90 overflow-hidden flex items-center justify-center p-8 shadow-3xl">
              {/* Radial gradient background glow */}
              <div className="absolute w-[220px] h-[220px] rounded-full bg-[#D4AF37]/[0.08] blur-3xl pointer-events-none" />

              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[180px] h-[180px] rounded-full border border-white/[0.03] md:border-white/[0.04]" />
                <div className="absolute w-[280px] h-[280px] rounded-full border border-white/[0.03] md:border-white/[0.04]" />
                <div className="absolute w-[380px] h-[380px] rounded-full border border-white/[0.02] md:border-white/[0.03]" />
                <div className="absolute w-[480px] h-[480px] rounded-full border border-white/[0.015] md:border-white/[0.02]" />
              </div>

              {/* Central Glowing Card */}
              <div className="relative z-10 flex items-center justify-center">
                {/* Gold aura backglow */}
                <div className="absolute w-[150px] h-[150px] rounded-full bg-[#D4AF37]/15 blur-2xl pointer-events-none animate-pulse" />
                {/* Black rounded square card */}
                <div className="relative w-[125px] h-[125px] rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src={BRAND.logoMark}
                    alt="Ask Array Monogram"
                    className="w-14 h-14 object-contain"
                  />
                </div>
              </div>

              {/* Floating Badges */}

              {/* 1. Pvt Ltd - Filed */}
              <div
                className="absolute top-[12%] left-[8%] z-20 flex items-center gap-2 bg-black/85 border border-white/10 px-3.5 py-1.5 rounded-full shadow-lg hover:border-[#D4AF37]/35 transition-colors cursor-default"
                style={{
                  animation: "float-y 6s ease-in-out infinite",
                  animationDelay: "0s",
                }}
              >
                <Scale size={13} className="text-[#D4AF37]" />
                <span className="text-[11px] font-medium tracking-wide text-white/90">
                  Pvt Ltd - Filed
                </span>
              </div>

              {/* 2. CTR 4.2% ↑ */}
              <div
                className="absolute top-[52%] right-[6%] z-20 flex items-center gap-2 bg-black/85 border border-white/10 px-3.5 py-1.5 rounded-full shadow-lg hover:border-[#D4AF37]/35 transition-colors cursor-default"
                style={{
                  animation: "float-y 7s ease-in-out infinite",
                  animationDelay: "1.5s",
                }}
              >
                <Megaphone size={13} className="text-[#D4AF37]" />
                <span className="text-[11px] font-medium tracking-wide text-white/90">
                  CTR 4.2% ↑
                </span>
              </div>

              {/* 3. MVP - v1.2 shipped */}
              <div
                className="absolute bottom-[12%] left-[10%] z-20 flex items-center gap-2 bg-black/85 border border-white/10 px-3.5 py-1.5 rounded-full shadow-lg hover:border-[#D4AF37]/35 transition-colors cursor-default"
                style={{
                  animation: "float-y 5s ease-in-out infinite",
                  animationDelay: "3s",
                }}
              >
                <Code size={13} className="text-[#D4AF37]" />
                <span className="text-[11px] font-medium tracking-wide text-white/90">
                  MVP - v1.2 shipped
                </span>
              </div>
            </div>
          </div>
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
        className="bg-[#D4AF37] hover:bg-[#F3C853] text-black font-semibold rounded-full px-6 py-2.5 text-sm md:text-base h-auto gold-button-glow group transition-all duration-300"
        data-testid={cta.testid}
      >
        {cta.label}
        {cta.arrow && (
          <ArrowRight
            size={16}
            className="ml-1.5 transition-transform group-hover:translate-x-0.5"
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
        className="rounded-full px-6 py-2.5 text-sm md:text-base h-auto border border-[#D4AF37]/50 hover:border-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/[0.06] text-[#D4AF37] hover:text-[#F3C853] font-semibold transition-all duration-300"
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
      className="rounded-full px-6 py-2.5 text-sm md:text-base h-auto border border-white/20 hover:border-white/50 bg-transparent hover:bg-white/[0.04] text-white hover:text-white font-semibold transition-all duration-300"
      data-testid={cta.testid}
    >
      {cta.label}
    </Button>
  );
}
