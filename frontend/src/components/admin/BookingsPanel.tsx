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
  lead: "bg-white/10 text-white/75",
  slot_selected: "bg-blue-500/15 text-blue-200",
  payment_initiated: "bg-yellow-500/15 text-yellow-200",
  paid: "bg-emerald-500/15 text-emerald-200",
  completed: "bg-[#D4AF37]/20 text-[#F3C853]",
  cancelled: "bg-red-500/15 text-red-200",
  refunded: "bg-orange-500/15 text-orange-200",
};

export default function BookingsPanel({ onMutate }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await api.get("/admin/bookings");
      setBookings(data);
    } catch (err) {
      toast.error(getApiErrorMessage(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/bookings/${id}`, { status });
      toast.success("Status updated.");
      setBookings((bs) =>
        bs.map((b) => (b.id === id ? { ...b, status } : b))
      );
      onMutate?.();
    } catch (err) {
      toast.error(
        getApiErrorMessage(err.response?.data?.detail) ||
          "Could not update status."
      );
    }
  };

  if (loading)
    return (
      <div className="rounded-2xl glass-dark p-10 text-center text-white/55">
        Loading bookings…
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="rounded-2xl glass-dark p-10 text-center text-white/55">
        No bookings yet.
      </div>
    );

  return (
    <div
      className="rounded-2xl glass-dark overflow-hidden"
      data-testid="bookings-table"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/55">Created</TableHead>
              <TableHead className="text-white/55">Name</TableHead>
              <TableHead className="text-white/55">Email</TableHead>
              <TableHead className="text-white/55">Phone</TableHead>
              <TableHead className="text-white/55">City</TableHead>
              <TableHead className="text-white/55">Service</TableHead>
              <TableHead className="text-white/55">Budget</TableHead>
              <TableHead className="text-white/55">Timeline</TableHead>
              <TableHead className="text-white/55">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((b) => (
              <TableRow
                key={b.id}
                className="border-white/5 hover:bg-white/5"
                data-testid={`booking-row-${b.id}`}
              >
                <TableCell className="text-white/80 text-xs whitespace-nowrap">
                  {formatDate(b.created_at)}
                </TableCell>
                <TableCell className="text-white text-sm">{b.name}</TableCell>
                <TableCell className="text-white/75 text-sm">
                  {b.email}
                </TableCell>
                <TableCell className="text-white/75 text-sm whitespace-nowrap">
                  {b.phone}
                </TableCell>
                <TableCell className="text-white/75 text-sm">
                  {b.city || "—"}
                </TableCell>
                <TableCell className="text-white/75 text-sm">
                  {b.service_needed}
                </TableCell>
                <TableCell className="text-white/75 text-xs whitespace-nowrap">
                  {b.budget_range || "—"}
                </TableCell>
                <TableCell className="text-white/75 text-xs whitespace-nowrap">
                  {b.timeline_to_start || "—"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${STATUS_COLORS[b.status] || "bg-white/10 text-white/70"}`}
                    >
                      {b.status}
                    </span>
                    <Select
                      value={b.status}
                      onValueChange={(v) => updateStatus(b.id, v)}
                    >
                      <SelectTrigger
                        className="h-7 w-[140px] bg-white/5 border-white/10 text-white text-xs"
                        data-testid={`booking-status-select-${b.id}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] text-white border-white/10">
                        {STATUS_OPTIONS.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
