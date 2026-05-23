// @ts-nocheck
import { useEffect, useState } from "react";
import { api, getApiErrorMessage } from "@/lib/api";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Search, Mail, Phone, Calendar, ArrowUpRight } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "lead", label: "Lead" },
  { value: "slot_selected", label: "Slot Picked" },
  { value: "payment_initiated", label: "Payment Initiated" },
  { value: "paid", label: "Paid" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

const STATUS_COLORS = {
  lead: "bg-blue-500/10 text-blue-300 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
  slot_selected: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]",
  payment_initiated: "bg-amber-500/10 text-amber-300 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
  paid: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
  completed: "bg-gold/10 text-gold border border-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.15)]",
  cancelled: "bg-rose-500/10 text-rose-300 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]",
  refunded: "bg-orange-500/10 text-orange-300 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]",
};

export default function BookingsPanel({
  bookings: externalBookings,
  loading: externalLoading,
  onMutate,
  filterType,
}) {
  const [internalBookings, setInternalBookings] = useState([]);
  const [internalLoading, setInternalLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const isExternal = externalBookings !== undefined;
  const bookings = isExternal ? externalBookings : internalBookings;
  const loading = isExternal ? externalLoading : internalLoading;

  const load = async () => {
    try {
      const { data } = await api.get("/admin/bookings");
      setInternalBookings(data);
    } catch (err) {
      toast.error(getApiErrorMessage(err.response?.data?.detail));
    } finally {
      setInternalLoading(false);
    }
  };

  useEffect(() => {
    if (!isExternal) {
      load();
    }
  }, [isExternal]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/bookings/${id}`, { status });
      toast.success("Status updated.");
      if (isExternal) {
        onMutate?.();
      } else {
        setInternalBookings((bs) =>
          bs.map((b) => (b.id === id ? { ...b, status } : b))
        );
        onMutate?.();
      }
    } catch (err) {
      toast.error(
        getApiErrorMessage(err.response?.data?.detail) ||
          "Could not update status."
      );
    }
  };

  // Filter bookings based on filterType and searchQuery
  const filteredBookings = bookings.filter((b) => {
    const isPaid = b.status === "paid" || b.status === "completed";
    
    if (filterType === "paid" && !isPaid) return false;
    if (filterType === "lead" && isPaid) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = (b.name || "").toLowerCase().includes(q);
      const emailMatch = (b.email || "").toLowerCase().includes(q);
      const phoneMatch = (b.phone || "").toLowerCase().includes(q);
      const cityMatch = (b.city || "").toLowerCase().includes(q);
      const serviceMatch = (b.service_needed || "").toLowerCase().includes(q);
      const ideaMatch = (b.startup_idea || "").toLowerCase().includes(q);
      const budgetMatch = (b.budget_range || "").toLowerCase().includes(q);
      const timelineMatch = (b.timeline_to_start || "").toLowerCase().includes(q);
      const statusMatch = (b.status || "").toLowerCase().includes(q);

      return (
        nameMatch ||
        emailMatch ||
        phoneMatch ||
        cityMatch ||
        serviceMatch ||
        ideaMatch ||
        budgetMatch ||
        timelineMatch ||
        statusMatch
      );
    }

    return true;
  });

  if (loading)
    return (
      <div className="rounded-2xl glass-dark p-10 text-center text-white/55 animate-pulse">
        Loading bookings…
      </div>
    );

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Search Header */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 glass-dark">
        <Search size={18} className="text-white/40" />
        <input
          type="text"
          placeholder={`Search ${filterType === "paid" ? "bookings" : "leads"} by name, email, phone, status, or details...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-0 outline-none text-sm text-white w-full placeholder-white/35"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-white/40 hover:text-white/80 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Bookings Table */}
      <div
        className="rounded-2xl glass-dark overflow-hidden border border-white/5 shadow-2xl animate-fade-up"
        data-testid="bookings-table"
      >
        <div className="overflow-x-auto">
          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-white/45">
              {searchQuery ? "No matching records found." : "No bookings found."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent bg-white/[0.02]">
                  <TableHead className="text-white/55 font-medium">Created</TableHead>
                  <TableHead className="text-white/55 font-medium">Client Name</TableHead>
                  <TableHead className="text-white/55 font-medium">Contact</TableHead>
                  <TableHead className="text-white/55 font-medium">Startup Idea</TableHead>
                  <TableHead className="text-white/55 font-medium">City</TableHead>
                  <TableHead className="text-white/55 font-medium">Service Needed</TableHead>
                  <TableHead className="text-white/55 font-medium">Budget</TableHead>
                  <TableHead className="text-white/55 font-medium">Timeline</TableHead>
                  <TableHead className="text-white/55 font-medium">Status & Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((b) => (
                  <TableRow
                    key={b.id}
                    className="border-white/5 hover:bg-white/5 transition-colors group"
                    data-testid={`booking-row-${b.id}`}
                  >
                    {/* Created Date */}
                    <TableCell className="py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-white/35 group-hover:text-gold transition-colors" />
                        <div className="flex flex-col">
                          <span className="text-white/85 font-semibold text-xs">{formatDateOnly(b.created_at)}</span>
                          <span className="text-white/40 text-[10px] mt-0.5 font-mono">{formatTimeOnly(b.created_at)}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Client Name */}
                    <TableCell className="py-4">
                      <div className="font-display font-medium text-white group-hover:text-gold transition-colors">
                        {b.name}
                      </div>
                    </TableCell>

                    {/* Contact details combined */}
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1">
                        <a
                          href={`mailto:${b.email}`}
                          className="flex items-center gap-1.5 text-sm text-white/85 hover:text-gold transition-colors font-medium w-fit"
                          title="Send Email"
                        >
                          <Mail size={13} className="text-white/40 group-hover:text-gold/60" />
                          <span>{b.email}</span>
                        </a>
                        {b.phone && (
                          <a
                            href={`tel:${b.phone}`}
                            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-gold/80 transition-colors w-fit"
                            title="Call/SMS"
                          >
                            <Phone size={11} className="text-white/30" />
                            <span>{b.phone}</span>
                          </a>
                        )}
                      </div>
                    </TableCell>

                    {/* Startup Idea */}
                    <TableCell className="py-4 max-w-[200px]">
                      <div
                        className="text-white/70 text-xs line-clamp-2 leading-relaxed cursor-help hover:text-white transition-colors"
                        title={b.startup_idea}
                      >
                        {b.startup_idea || <span className="text-white/20">—</span>}
                      </div>
                    </TableCell>

                    {/* City */}
                    <TableCell className="text-white/75 text-sm">
                      {b.city || <span className="text-white/20">—</span>}
                    </TableCell>

                    {/* Service */}
                    <TableCell className="text-white/75 text-sm max-w-[150px] truncate" title={b.service_needed}>
                      {b.service_needed}
                    </TableCell>

                    {/* Budget */}
                    <TableCell className="text-white/75 text-xs whitespace-nowrap font-mono">
                      {b.budget_range || <span className="text-white/20">—</span>}
                    </TableCell>

                    {/* Timeline */}
                    <TableCell className="text-white/75 text-xs whitespace-nowrap">
                      {b.timeline_to_start || <span className="text-white/20">—</span>}
                    </TableCell>

                    {/* Status & Action */}
                    <TableCell className="py-4 min-w-[180px] whitespace-nowrap">
                      <Select
                        value={b.status}
                        onValueChange={(v) => updateStatus(b.id, v)}
                      >
                        <SelectTrigger
                          className={`h-8 w-[160px] text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${STATUS_COLORS[b.status] || "bg-white/5 border-white/10 text-white"}`}
                          data-testid={`booking-status-select-${b.id}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f0f11] text-white border-white/10 rounded-xl shadow-2xl">
                          {STATUS_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value} className="text-xs uppercase font-semibold hover:bg-white/5 focus:bg-white/10 cursor-pointer">
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function formatDateOnly(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatTimeOnly(iso) {
  try {
    return new Date(iso).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}
