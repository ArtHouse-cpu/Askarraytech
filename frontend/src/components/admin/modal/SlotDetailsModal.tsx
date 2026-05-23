// @ts-nocheck
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CalendarClock, Mail, Phone, Lock, Target } from "lucide-react";

const STATUS_COLORS = {
  lead: "bg-blue-500/10 text-blue-300 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
  slot_selected: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]",
  payment_initiated: "bg-amber-500/10 text-amber-300 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
  paid: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
  completed: "bg-gold/10 text-gold border border-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.15)]",
  cancelled: "bg-rose-500/10 text-rose-300 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]",
  refunded: "bg-orange-500/10 text-orange-300 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]",
};

export default function SlotDetailsModal({ isOpen, onClose, slot, booking }) {
  const formatTime = (iso) => {
    try {
      return new Date(iso).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0b0b0d]/95 backdrop-blur-xl border border-white/10 text-white rounded-2xl max-w-lg shadow-2xl p-6 overflow-hidden">
        <DialogHeader className="border-b border-white/5 pb-4">
          <DialogTitle className="font-display text-xl font-bold flex items-center gap-2 text-gold">
            <CalendarClock size={20} className="text-gold" /> Booked Slot details
          </DialogTitle>
          <DialogDescription className="text-white/45 text-xs mt-1">
            Complete customer details and meeting schedule for this slot.
          </DialogDescription>
        </DialogHeader>

        {slot && (
          <div className="space-y-5 pt-4 text-sm max-h-[450px] overflow-y-auto pr-1">
            {/* Scheduled Time Display */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3.5">
              <span className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                <CalendarClock size={18} />
              </span>
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                  Scheduled Time
                </div>
                <div className="font-display font-semibold text-white text-base mt-0.5">
                  {new Date(slot.start_at).toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-xs text-white/50 font-mono mt-0.5">
                  {formatTime(slot.start_at)} – {formatTime(slot.end_at)}
                </div>
              </div>
            </div>

            {/* Customer and Project Details */}
            {booking ? (
              <div className="space-y-4 animate-fade-up">
                {/* Customer Info Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-4">
                  <div className="text-xs text-white/35 uppercase tracking-wider font-semibold border-b border-white/5 pb-1.5 flex items-center gap-1.5">
                    <Lock size={12} /> Contact Information
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-white/45 uppercase tracking-wider">Client Name</div>
                      <div className="text-white font-medium font-display text-base mt-0.5">
                        {booking.name}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/45 uppercase tracking-wider">Location/City</div>
                      <div className="text-white/80 text-sm mt-0.5">
                        {booking.city || <span className="text-white/20">—</span>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-white/45 uppercase tracking-wider mb-1">Contact Channels</div>
                    <div className="flex flex-col gap-1.5">
                      <a
                        href={`mailto:${booking.email}`}
                        className="flex items-center gap-2 text-sm text-white/85 hover:text-gold transition-colors font-medium w-fit"
                        title="Mail client"
                      >
                        <Mail size={13} className="text-white/35" />
                        <span>{booking.email}</span>
                      </a>
                      {booking.phone && (
                        <a
                          href={`tel:${booking.phone}`}
                          className="flex items-center gap-2 text-xs text-white/50 hover:text-gold/80 transition-colors w-fit"
                          title="Call/SMS client"
                        >
                          <Phone size={11} className="text-white/30" />
                          <span>{booking.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-4">
                  <div className="text-xs text-white/35 uppercase tracking-wider font-semibold border-b border-white/5 pb-1.5 flex items-center gap-1.5">
                    <Target size={12} /> Project Context
                  </div>

                  <div>
                    <div className="text-[10px] text-white/45 uppercase tracking-wider">Requested Service</div>
                    <div className="text-white/90 text-sm font-medium mt-0.5">
                      {booking.service_needed}
                    </div>
                  </div>

                  {booking.startup_idea && (
                    <div>
                      <div className="text-[10px] text-white/45 uppercase tracking-wider">Startup Idea / Pitch</div>
                      <div className="text-white/70 text-xs mt-1 leading-relaxed max-h-[90px] overflow-y-auto bg-black/35 p-3 rounded-xl border border-white/5 font-sans">
                        {booking.startup_idea}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-white/45 uppercase tracking-wider">Budget Estimate</div>
                      <div className="text-white/85 text-xs font-mono mt-0.5">
                        {booking.budget_range || <span className="text-white/20">—</span>}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/45 uppercase tracking-wider">Timeline Goal</div>
                      <div className="text-white/85 text-xs mt-0.5">
                        {booking.timeline_to_start || <span className="text-white/20">—</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-[10px] text-white/45 uppercase tracking-wider mb-1">Workflow Status</div>
                      <span
                        className={`inline-block text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[booking.status] || "bg-white/10 text-white/70"}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-white/[0.01] border border-white/5 rounded-2xl">
                <p className="text-white/45 text-sm">No corresponding booking records found.</p>
                <p className="text-xs text-white/30 mt-1">This slot has been marked as booked, but there is no booking document matching its slot_id or booking_id.</p>
                {slot.booking_id && (
                  <div className="text-[10px] font-mono bg-white/5 p-2 rounded-lg text-white/40 mt-3 text-left overflow-x-auto">
                    Slot booking_id: {slot.booking_id}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end border-t border-white/5 pt-4">
          <button
            onClick={onClose}
            className="bg-white text-black hover:bg-white/90 font-bold text-xs px-6 py-2.5 rounded-full transition-all"
          >
            Close Details
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
