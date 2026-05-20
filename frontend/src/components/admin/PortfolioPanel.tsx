// @ts-nocheck
import { useEffect, useState } from "react";
import { api, getApiErrorMessage } from "@/lib/api";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function PortfolioPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/portfolio")
      .then(({ data }) => setItems(data))
      .catch((err) =>
        toast.error(getApiErrorMessage(err.response?.data?.detail))
      )
      .finally(() => setLoading(false));
  }, []);

  const toggle = async (key, next) => {
    // Optimistic
    setItems((arr) =>
      arr.map((i) => (i.key === key ? { ...i, visible: next } : i))
    );
    try {
      await api.patch(`/admin/portfolio/${key}`, { visible: next });
      toast.success(next ? "Now visible on landing." : "Hidden from landing.");
    } catch (err) {
      // Rollback
      setItems((arr) =>
        arr.map((i) => (i.key === key ? { ...i, visible: !next } : i))
      );
      toast.error(
        getApiErrorMessage(err.response?.data?.detail) ||
          "Could not toggle visibility."
      );
    }
  };

  if (loading)
    return (
      <div className="rounded-2xl glass-dark p-10 text-center text-white/55">
        Loading portfolio…
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="portfolio-admin-grid">
      {items.map((item) => (
        <div
          key={item.key}
          className="rounded-2xl glass-dark overflow-hidden"
          data-testid={`portfolio-admin-card-${item.key}`}
        >
          <div className="aspect-[16/10] overflow-hidden bg-black/40 relative">
            <img
              src={item.image}
              alt={item.name}
              className={`w-full h-full object-cover transition-all ${
                item.visible ? "" : "grayscale opacity-50"
              }`}
            />
            <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-widest">
              {item.visible ? (
                <>
                  <Eye size={11} className="text-emerald-300" /> Live
                </>
              ) : (
                <>
                  <EyeOff size={11} className="text-white/55" /> Hidden
                </>
              )}
            </div>
          </div>
          <div className="p-5">
            <p className="text-[10px] uppercase tracking-widest text-white/45">
              {item.type}
            </p>
            <h3 className="font-display text-lg mt-1">{item.name}</h3>
            <p className="text-xs text-white/55 mt-2 line-clamp-2">
              {item.blurb}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] text-gold uppercase tracking-widest">
                {item.metric}
              </span>
              <Switch
                checked={item.visible}
                onCheckedChange={(v) => toggle(item.key, v)}
                data-testid={`portfolio-toggle-${item.key}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
