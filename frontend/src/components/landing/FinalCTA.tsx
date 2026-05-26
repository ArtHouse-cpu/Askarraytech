// @ts-nocheck
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCTA({ onBookSlot }) {
  return (
    <section
      id="cta"
      className="relative bg-[#0a0a0a] text-white py-28 md:py-36 overflow-hidden"
      data-testid="final-cta-section"
    >
      {/* Ambient + grid */}
      <div className="absolute inset-0 bg-grid-soft pointer-events-none opacity-70" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#D4AF37]/14 blur-[110px]" />
      </div>
      <div className="absolute inset-0 grain pointer-events-none opacity-50" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div
          className="inline-flex items-center gap-3 justify-center"
          data-testid="final-cta-eyebrow"
        >
          <span className="h-px w-8 bg-[#D4AF37]" />
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37] font-medium">
            When you're ready
          </p>
          <span className="h-px w-8 bg-[#D4AF37]" />
        </div>

        <h2
          className="display-bold mt-6 text-white"
          style={{ fontSize: "clamp(2.75rem, 8vw, 7rem)" }}
        >
          Serious founders <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #F3C853 0%, #D4AF37 45%, #8a6d1f 100%)",
            }}
          >
            don't wait to start.
          </span>
        </h2>

        <p className="mt-7 text-lg text-white/65 max-w-xl mx-auto leading-relaxed">
          Apply for a strategy call. We'll get back personally<br/> within 24 business
          hours.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={() => onBookSlot()}
            className="bg-[#D4AF37] hover:bg-[#F3C853] text-black font-semibold rounded-full px-10 py-7 text-base gold-button-glow group"
            data-testid="final-cta-book-btn"
          >
            Let's Connect
            <ArrowRight
              size={18}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </Button>
         
        </div>

        <p className="mt-10 text-xs text-white/35 tracking-widest uppercase">
          Only 1–5 founders onboarded each month
        </p>
      </div>
    </section>
  );
}
