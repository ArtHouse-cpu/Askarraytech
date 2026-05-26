// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { api, getApiErrorMessage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Trash2, CalendarClock, Lock } from "lucide-react";
import SlotDetailsModal from "./modal/SlotDetailsModal";

export default function SlotsPanel({ bookings = [], onMutate }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [creating, setCreating] = useState(false);

  // Modal State
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date();
  const minDate = today.toLocaleDateString("en-CA");
  const load = async () => {
    try {
      const { data } = await api.get("/admin/slots");
       console.log("Data",data);
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
        getApiErrorMessage(err.response?.data?.detail) || "Could not add slot.",
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
          "Could not delete slot.",
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

  // Find booking associated with selected slot
  const selectedBooking = useMemo(() => {
    if (!selectedSlot) return null;
    return bookings.find(
      (b) => b.slot_id === selectedSlot.id || b.id === selectedSlot.booking_id,
    );
  }, [selectedSlot, bookings]);

  const handleSlotClick = (slot) => {
    if (slot.is_booked) {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="grid lg:grid-cols-[360px,1fr] gap-5 animate-fade-up">
      {/* Create Slot Form */}
      <form
        onSubmit={createSlot}
        className="rounded-2xl glass-dark p-6 h-fit border border-white/5 shadow-2xl"
        data-testid="slot-create-form"
      >
        <h3 className="font-display text-lg flex items-center gap-2 text-white">
          <CalendarClock size={16} className="text-gold animate-pulse" /> Add a
          30-min slot
        </h3>
        <p className="text-white/45 text-xs mt-1 leading-relaxed">
          Created slots will be visible to founders looking to schedule a
          consultation.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="slot-date" className="text-white/70 text-xs">
              Date
            </Label>
            <Input
              id="slot-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              className="mt-1.5 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold/50"
              data-testid="slot-date-input"
              required
            />
          </div>
          <div>
            <Label htmlFor="slot-time" className="text-white/70 text-xs">
              Time (your local timezone)
            </Label>
            <Input
              id="slot-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1.5 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold/50"
              data-testid="slot-time-input"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={creating}
            className="w-full bg-[#D4AF37] hover:bg-[#F3C853] text-black font-bold rounded-full py-5 transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
            data-testid="slot-create-btn"
          >
            <Plus size={14} className="mr-1.5" />
            {creating ? "Adding…" : "Add Slot"}
          </Button>
        </div>
      </form>

      {/* Slots List */}
      <div
        className="rounded-2xl glass-dark p-6 border border-white/5 shadow-2xl"
        data-testid="slots-list"
      >
        <h3 className="font-display text-lg text-white mb-1">
          Available Schedule
        </h3>
        <p className="text-white/45 text-xs mb-6">
          Booked slots can be clicked to view customer and meeting details.
        </p>

        {loading ? (
          <div className="p-12 text-center text-white/45 animate-pulse">
            Loading slots…
          </div>
        ) : slots.length === 0 ? (
          <div className="p-12 text-center text-white/45 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl">
            No slots scheduled yet. Set one up on the left panel.
          </div>
        ) : (
          <div className="divide-y divide-white/5 max-h-[560px] overflow-y-auto pr-1">
            {grouped.map(([day, daySlots]) => (
              <div key={day} className="py-4 first:pt-0 last:pb-0">
                <p className="text-[11px] uppercase tracking-widest text-white/45 font-semibold mb-3">
                  {day}
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {daySlots.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => handleSlotClick(s)}
                      className={`rounded-xl border p-3.5 flex items-center justify-between transition-all duration-300 group ${
                        s.is_booked
                          ? "border-gold/30 bg-gold/[0.04] cursor-pointer hover:bg-gold/[0.09] hover:border-gold/60 shadow-[0_0_15px_rgba(212,175,55,0.03)]"
                          : "border-white/5 bg-white/[0.01] hover:bg-white/[0.04]"
                      }`}
                      data-testid={`slot-item-${s.id}`}
                    >
                      <div>
                        <p className="font-display text-white text-sm font-medium">
                          {formatTime(s.start_at)} – {formatTime(s.end_at)}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          {s.is_booked ? (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-gold tracking-wider">
                              <Lock size={10} className="animate-pulse" />{" "}
                              Booked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-white/35 tracking-wider">
                              Open
                            </span>
                          )}
                        </div>
                      </div>
                      {!s.is_booked && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSlot(s.id);
                          }}
                          className="text-white/35 hover:text-rose-400 p-1.5 hover:bg-white/5 rounded-lg transition-all"
                          aria-label="Delete slot"
                          data-testid={`slot-delete-${s.id}`}
                        >
                          <Trash2 size={13} />
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

      {/* Slot Details Modal Dialog */}
      <SlotDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slot={selectedSlot}
        booking={selectedBooking}
      />
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
