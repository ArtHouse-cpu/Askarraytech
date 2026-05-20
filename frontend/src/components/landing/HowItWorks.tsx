// @ts-nocheck
import { CalendarCheck, MessagesSquare, Hammer, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: CalendarCheck,
    label: "Step 1",
    title: "Apply",
    desc: "Send us your application. We read every one personally.",
  },
  {
    icon: MessagesSquare,
    label: "Step 2",
    title: "Strategy Call",
    desc: "We map your idea → revenue with a tailored roadmap.",
  },
  {
    icon: Hammer,
    label: "Step 3",
    title: "We Execute",
    desc: "Legal, product, brand, marketing — all in parallel.",
  },
  {
    icon: Rocket,
    label: "Step 4",
    title: "Launch",
    desc: "You go live. We stay on for the first-revenue stretch.",
  },
];

export default function HowItWorks({ onBookSlot }) {
  return (
    <section
      id="process"
      className="relative bg-white text-black py-24 md:py-32"
      data-testid="how-it-works-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-black/50">
              How it works
            </p>
            <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-tighter mt-3 leading-[1.05]">
              A clean path from{" "}
              <span className="text-black/40">idea to revenue.</span>
            </h2>
          </div>
          <Button
            onClick={onBookSlot}
            className="self-start md:self-auto bg-black hover:bg-black/85 text-white rounded-full px-6 py-5"
            data-testid="process-book-slot-btn"
          >
            Book Strategy Call
          </Button>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="relative rounded-2xl border border-black/10 bg-white p-7 hover:border-black/30 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)] transition-all"
                data-testid={`process-step-${i + 1}`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs uppercase tracking-[0.22em] text-black/45">
                    {s.label}
                  </span>
                  <span className="font-display text-lg text-black/15">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-6 inline-grid place-items-center w-11 h-11 rounded-xl bg-black text-white">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-xl mt-5">{s.title}</h3>
                <p className="text-sm text-black/60 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
