// @ts-nocheck
import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Crown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeliverablesDialog from "@/components/landing/DeliverablesDialog";

const PLAN_ROUTES = {
  "company-setup": "/company-setup",
  "product-mvp": "/mvp-development",
  "marketing-setup": "/marketing-setup",
  "idea-to-revenue": "/idea-to-revenue",
};

const PLANS = [
  {
    key: "company-setup",
    name: "Company Setup",
    price: "₹39,999",
    tagline: "Get legal. Get serious.",
    features: [
      "OPC / LLP / Private Limited",
      "GST Registration",
      "MSME / Udyam",
      "Startup India (DPIIT)",
      "PAN / TAN",
      "Bank account assistance",
      "15+ Legal templates",
      "End-to-end coordination",
    ],
    footnote: "Includes up to 2 directors / partners.",
    extras: ["Additional director: ₹5,000 each"],
    accent: false,
  },
  {
    key: "product-mvp",
    name: "Product MVP",
    price: "Starts at ₹34,999+",
    tagline: "Ship the thing.",
    features: [
      "Website Development",
      "Web & Mobile Apps",
      "MVP Development",
      "UI / UX Design",
      "Admin Dashboard",
      "AI Integrations",
      "Deployment Support",
    ],
    disclaimer:
      "Final pricing and project timeline may vary depending on project scope and complexity. Final quotation is shared after the initial consultation call.",
    accent: false,
  },
  {
    key: "marketing-setup",
    name: "Marketing Setup",
    price: "₹24,999",
    tagline: "Launch loud. Launch ready.",
    features: [
      "Logo Setup & Brand Kit",
      "Social: LinkedIn, FB, Instagram, WhatsApp Channel",
      "Ad account & Pixel setup",
      "Campaign guidance",
      "Launch strategy playbook",
    ],
    accent: false,
  },
  {
    key: "idea-to-revenue",
    name: "Idea → Revenue · 30 Days",
    price: "₹99,000",
    tagline: "The complete launch operating system.",
    badge: "Most Popular",
    features: [
      "Company Setup",
      "Product MVP",
      "Marketing Setup",
      "Payment Gateway Setup",
      "Dedicated team member before launch",
      "Priority support & faster execution",
      "Launch assistance",
    ],
    disclaimer:
      "Final pricing and project timeline may vary depending on project scope and complexity. Final quotation is shared after the initial consultation call.",
    accent: true,
  },
];

export default function Pricing({ onBookSlot }) {
  const [openPlan, setOpenPlan] = useState(null);

  return (
    <section
      id="pricing"
      className="relative bg-white text-black py-24 md:py-32"
      data-testid="pricing-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl">
          <div
            className="inline-flex items-center gap-3"
            data-testid="pricing-eyebrow"
          >
            <span className="h-px w-8 bg-[#D4AF37]" />
            <p className="text-xs uppercase tracking-[0.28em] text-[#8a6d1f] font-medium">
              What we do
            </p>
          </div>
          <h2
            className="display-bold mt-5 text-black tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
          >
            Four tracks.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #8a6d1f 100%)",
              }}
            >
              One launch partner.
            </span>
          </h2>
          <p className="mt-7 text-base md:text-lg text-black/55 max-w-2xl leading-relaxed">
            Whether you're registering your company or shipping your MVP, we own
            the entire journey — from paperwork to production.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.key}
              plan={plan}
              onBookSlot={() => onBookSlot(plan.name)}
              onShowDeliverables={() => setOpenPlan(plan.key)}
            />
          ))}
        </div>
      </div>

      <DeliverablesDialog
        planKey={openPlan}
        onOpenChange={(v) => !v && setOpenPlan(null)}
      />
    </section>
  );
}

function PricingCard({ plan, onBookSlot, onShowDeliverables }) {
  const isAccent = plan.accent;
  return (
    <div
      className={[
        "relative rounded-2xl p-7 flex flex-col transition-all duration-300",
        isAccent
          ? "bg-[#0a0a0a] text-white border border-[#D4AF37]/40 shadow-[0_40px_90px_-30px_rgba(212,175,55,0.45)]"
          : "bg-white text-black border border-black/[0.08] hover:border-black/25 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.2)]",
      ].join(" ")}
      data-testid={`pricing-card-${plan.key}`}
    >
      {plan.badge && (
        <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] text-black px-3 py-1 text-[10px] uppercase tracking-widest font-semibold">
          <Crown size={12} /> {plan.badge}
        </div>
      )}

      <div>
        <h3 className="font-display text-xl tracking-tight">{plan.name}</h3>
        <p
          className={`text-sm mt-1 ${isAccent ? "text-white/55" : "text-black/55"}`}
        >
          {plan.tagline}
        </p>
        <div className="mt-5">
          <span
            className={`font-display text-3xl ${isAccent ? "gold-gradient-text" : "text-black"}`}
          >
            {plan.price}
          </span>
        </div>
      </div>

      <ul className="mt-6 space-y-2.5 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check
              size={16}
              className={`mt-0.5 flex-shrink-0 ${isAccent ? "text-[#D4AF37]" : "text-black"}`}
            />
            <span className={isAccent ? "text-white/85" : "text-black/75"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {plan.extras && (
        <div className="mt-5 space-y-1.5 border-t border-black/10 pt-4">
          {plan.extras.map((e) => (
            <p
              key={e}
              className={`text-xs ${isAccent ? "text-white/55" : "text-black/55"}`}
            >
              {e}
            </p>
          ))}
        </div>
      )}

      {plan.footnote && (
        <p
          className={`mt-3 text-xs ${isAccent ? "text-white/55" : "text-black/55"}`}
        >
          {plan.footnote}
        </p>
      )}

      {plan.disclaimer && (
        <div
          className={[
            "mt-4 rounded-lg px-3 py-2.5 border",
            isAccent
              ? "border-[#D4AF37]/30 bg-[#D4AF37]/10"
              : "border-black/10 bg-black/[0.03]",
          ].join(" ")}
          data-testid={`pricing-disclaimer-${plan.key}`}
        >
          <p
            className={[
              "text-[11px] leading-relaxed italic",
              isAccent ? "text-white/75" : "text-black/65",
            ].join(" ")}
          >
            <span
              className={[
                "font-medium not-italic",
                isAccent ? "text-[#D4AF37]" : "text-[#8a6d1f]",
              ].join(" ")}
            >
              Note:
            </span>{" "}
            {plan.disclaimer}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Button
          onClick={onBookSlot}
          className={
            isAccent
              ? "bg-[#D4AF37] hover:bg-[#F3C853] text-black font-medium rounded-full"
              : "bg-black hover:bg-black/85 text-white font-medium rounded-full"
          }
          data-testid={`pricing-book-${plan.key}`}
        >
          Book Strategy Call
        </Button>
        <Link
          to={PLAN_ROUTES[plan.key]}
          className={[
            "inline-flex items-center justify-center gap-1.5 text-sm group",
            isAccent
              ? "text-[#D4AF37] hover:text-[#F3C853]"
              : "text-black/70 hover:text-black",
          ].join(" ")}
          data-testid={`pricing-deliverables-${plan.key}`}
        >
          View Deliverables
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
