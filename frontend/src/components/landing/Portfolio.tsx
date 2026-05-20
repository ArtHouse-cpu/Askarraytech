// @ts-nocheck
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { api } from "@/lib/api";

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/portfolio")
      .then(({ data }) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section
      id="portfolio"
      className="relative bg-white text-black py-24 md:py-32"
      data-testid="portfolio-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-black/50">
              Portfolio
            </p>
            <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-tighter mt-3 leading-[1.05]">
              Founders we've{" "}
              <span className="text-black/40">helped ship.</span>
            </h2>
          </div>
          <p className="text-sm text-black/55 max-w-md">
            A snapshot across SaaS, D2C, fintech, mobile and creator brands.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((c) => (
            <div
              key={c.key}
              className="group rounded-2xl bg-white border border-black/10 overflow-hidden hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)] transition-all"
              data-testid={`portfolio-card-${c.key}`}
            >
              <div className="aspect-[16/10] overflow-hidden bg-black/5">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">
                  {c.type}
                </p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl">{c.name}</h3>
                  <ArrowUpRight
                    size={18}
                    className="text-black/40 group-hover:text-black transition-colors mt-1"
                  />
                </div>
                <p className="text-sm text-black/60 mt-2 leading-relaxed">
                  {c.blurb}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-black text-white px-3 py-1.5 text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  {c.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
