// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { api, getApiErrorMessage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Trash2, CalendarClock, Lock } from "lucide-react";

export default function SlotsPanel({ onMutate }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form: date + time (local) → combined to ISO with timezone offset
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [creating, setCreating] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get("/admin/slots");
      setSlots(data);
    } catch (err) {
      toast.error(getApiErrorMessage(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createSlot = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      toast.error("Pick a date and time.");
      return;
    }
    setCreating(true);
    try {
      // Build a local Date and serialize to ISO; backend stores as-is.
      const local = new Date(`${date}T${time}:00`);
      if (isNaN(local.getTime())) throw new Error("invalid datetime");
      if (local.getTime() < Date.now()) {
        toast.error("Slot must be in the future.");
        setCreating(false);
        return;
      }
      const startIso = local.toISOString();
      await api.post("/admin/slots", {
        start_at: startIso,
        duration_minutes: 30,
      });
      toast.success("Slot added.");
      setTime("10:00");
      await load();
      onMutate?.();
    } catch (err) {
      toast.error(
        getApiErrorMessage(err.response?.data?.detail) ||
          "Could not add slot."
      );
    } finally {
      setCreating(false);
    }
  };

  const deleteSlot = async (id) => {
    if (!window.confirm("Delete this slot?")) return;
    try {
      await api.delete(`/admin/slots/${id}`);
      toast.success("Slot deleted.");
      setSlots((s) => s.filter((x) => x.id !== id));
      onMutate?.();
    } catch (err) {
      toast.error(
        getApiErrorMessage(err.response?.data?.detail) ||
          "Could not delete slot."
      );
    }
  };

  const grouped = useMemo(() => {
    const m = new Map();
    for (const s of slots) {
      const key = new Date(s.start_at).toDateString();
      if (!m.has(key)) m.set(key, []);
      m.get(key).push(s);
    }
    return Array.from(m.entries());
  }, [slots]);

  return (
    <div className="grid lg:grid-cols-[360px,1fr] gap-5">
      <form
        onSubmit={createSlot}
        className="rounded-2xl glass-dark p-6 h-fit"
        data-testid="slot-create-form"
      >
        <h3 className="font-display text-lg flex items-center gap-2">
          <CalendarClock size={16} className="text-gold" /> Add a 30-min slot
        </h3>
        <p className="text-white/55 text-xs mt-1">
          Founders only see future, unbooked slots.
        </p>
        <div className="mt-5 space-y-4">
          <div>
            <Label htmlFor="slot-date" className="text-white/80">
              Date
            </Label>
            <Input
              id="slot-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1.5 bg-white/5 border-white/10 text-white"
              data-testid="slot-date-input"
              required
            />
          </div>
          <div>
            <Label htmlFor="slot-time" className="text-white/80">
              Time (your local timezone)
            </Label>
            <Input
              id="slot-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1.5 bg-white/5 border-white/10 text-white"
              data-testid="slot-time-input"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={creating}
            className="w-full bg-[#D4AF37] hover:bg-[#F3C853] text-black font-semibold rounded-full"
            data-testid="slot-create-btn"
          >
            <Plus size={14} className="mr-1.5" />
            {creating ? "Adding…" : "Add Slot"}
          </Button>
        </div>
      </form>

      <div
        className="rounded-2xl glass-dark p-2"
        data-testid="slots-list"
      >
        {loading ? (
          <div className="p-10 text-center text-white/55">Loading slots…</div>
        ) : slots.length === 0 ? (
          <div className="p-10 text-center text-white/55">
            No slots yet. Add your first one →
          </div>
        ) : (
          <div className="divide-y divide-white/5 max-h-[560px] overflow-y-auto">
            {grouped.map(([day, daySlots]) => (
              <div key={day} className="p-4">
                <p className="text-[11px] uppercase tracking-widest text-white/45 mb-3">
                  {day}
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {daySlots.map((s) => (
                    <div
                      key={s.id}
                      className={`rounded-xl border p-3 flex items-center justify-between ${
                        s.is_booked
                          ? "border-[#D4AF37]/40 bg-[#D4AF37]/5"
                          : "border-white/10 bg-white/[0.02]"
                      }`}
                      data-testid={`slot-item-${s.id}`}
                    >
                      <div>
                        <p className="font-display text-white text-sm">
                          {formatTime(s.start_at)} – {formatTime(s.end_at)}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest mt-0.5 text-white/45">
                          {s.is_booked ? (
                            <span className="inline-flex items-center gap-1 text-gold">
                              <Lock size={10} /> Booked
                            </span>
                          ) : (
                            "Open"
                          )}
                        </p>
                      </div>
                      {!s.is_booked && (
                        <button
                          onClick={() => deleteSlot(s.id)}
                          className="text-white/40 hover:text-red-300"
                          aria-label="Delete slot"
                          data-testid={`slot-delete-${s.id}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
