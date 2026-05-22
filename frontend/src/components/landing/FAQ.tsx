// @ts-nocheck
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How many businesses do you work with every month?",
    a: "We intentionally onboard only 1–5 businesses monthly to maintain premium execution quality.",
  },
  {
    q: "Can I choose only one service?",
    a: "Yes. You can choose individual services or the complete Idea → Revenue package.",
  },
  {
    q: "What if I need ongoing support later?",
    a: "We offer monthly/yearly support for product, tax, compliance and marketing at additional cost.",
  },
  {
    q: "Do you choose who you work with?",
    a: "Yes. We prioritize serious founders ready to execute.",
  },
  {
    q: "How many calls happen before starting?",
    a: "Usually 1–2 calls of 30–45 minutes each.",
  },
  {
    q: "How does Idea → Revenue actually work?",
    a: (
      <>
        <p className="text-white/75">Founders usually struggle with:</p>
        <ul className="mt-3 space-y-1.5 text-white/65 list-disc list-inside marker:text-[#D4AF37]">
          <li>incorporation</li>
          <li>bank setup</li>
          <li>compliance</li>
          <li>MVP launch</li>
          <li>branding</li>
          <li>marketing setup</li>
        </ul>
        <p className="mt-4 text-white/75">
          We simply build the complete operational setup for your business.
        </p>
        <p className="mt-3 italic text-white/55">
          “We build the gaming setup. You focus on playing and winning.”
        </p>
      </>
    ),
  },
  {
    q: "Do you help me get customers?",
    a: (
      <>
        <p className="text-white/75">
          We help you build the complete launch infrastructure.
        </p>
        <p className="mt-3 text-white/65">
          Business growth depends on your execution, product quality and market
          fit.
        </p>
      </>
    ),
  },
  {
    q: "Can I validate my idea before incorporation?",
    a: (
      <>
        <p className="text-white/75">You can.</p>
        <p className="mt-3 text-white/65">
          But we primarily work with founders serious about building a real
          business.
        </p>
        <p className="mt-4 text-white/75">Company setup helps with:</p>
        <ul className="mt-2 space-y-1.5 text-white/65 list-disc list-inside marker:text-[#D4AF37]">
          <li>customer trust</li>
          <li>funding readiness</li>
          <li>government schemes</li>
          <li>banking</li>
          <li>operational credibility</li>
        </ul>
      </>
    ),
  },
  {
    q: "Why shouldn't I hire separate vendors / agencies?",
    a: (
      <>
        <p className="text-white/75">
          Most founders waste months coordinating between CAs, developers,
          designers and marketers.
        </p>
        <p className="mt-3 text-white/65">
          We simplify everything under one execution partner.
        </p>
      </>
    ),
  },
  {
    q: "How long does company registration take?",
    a: "Most standard registrations are completed within a few working days after successful document verification.",
  },
  {
    q: "Can I build an MVP before raising funding?",
    a: "Yes. Many startups first launch an MVP to validate demand, test user behavior and demonstrate traction before approaching investors.",
  },
  {
    q: "Do I need Startup India registration?",
    a: "Startup India registration can help eligible startups access government schemes, tax benefits, startup recognition and ecosystem credibility.",
  },
  {
    q: "What is included in startup marketing setup?",
    a: "Marketing setup may include branding, social media onboarding, ad account setup, pixel setup and launch infrastructure guidance.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden"
      data-testid="faq-section"
    >
      <div className="absolute -top-32 right-1/4 w-[600px] h-[400px] bg-[#D4AF37]/6 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-white/45">
            Answers, candidly
          </p>
          <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-[-0.025em] mt-4 leading-[1.02]">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12 w-full">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-white/8"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-left font-display text-base md:text-lg text-white hover:text-gold hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/65 text-sm md:text-base leading-relaxed pb-6 pr-2">
                {typeof f.a === "string" ? <p>{f.a}</p> : f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
