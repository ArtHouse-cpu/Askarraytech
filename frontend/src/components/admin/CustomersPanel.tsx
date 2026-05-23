// @ts-nocheck
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Search, Mail, Phone, Calendar } from "lucide-react";

export default function CustomersPanel({ bookings = [], loading = false }) {
  const [searchQuery, setSearchQuery] = useState("");

  if (loading)
    return (
      <div className="rounded-2xl glass-dark p-10 text-center text-white/55 animate-pulse">
        Loading customers…
      </div>
    );

  // Group bookings by email to get unique customers
  const customersMap = {};
  bookings.forEach((b) => {
    if (!b.email) return;
    const emailKey = b.email.toLowerCase().trim();
    // Since bookings are sorted by created_at desc (newest first),
    // the first booking we encounter for a customer is their latest one.
    if (!customersMap[emailKey]) {
      customersMap[emailKey] = {
        name: b.name || "Unnamed Customer",
        email: b.email,
        phone: b.phone || "—",
        lastBookingDate: b.created_at,
        bookingCount: 1,
      };
    } else {
      customersMap[emailKey].bookingCount += 1;
    }
  });

  const customers = Object.values(customersMap);

  // Filter customers based on search query
  const filteredCustomers = customers.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.phone.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Search Header */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 glass-dark">
        <Search size={18} className="text-white/40" />
        <input
          type="text"
          placeholder="Search customers by name, email, or phone..."
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

      {/* Customers Table */}
      <div className="rounded-2xl glass-dark overflow-hidden border border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          {filteredCustomers.length === 0 ? (
            <div className="p-12 text-center text-white/45">
              {searchQuery ? "No matching customers found." : "No customers found."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent bg-white/[0.02]">
                  <TableHead className="text-white/55 font-medium">Customer Name</TableHead>
                  <TableHead className="text-white/55 font-medium">Contact Details</TableHead>
                  <TableHead className="text-white/55 font-medium text-center">Total Bookings</TableHead>
                  <TableHead className="text-white/55 font-medium">Last Booking</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((c, idx) => (
                  <TableRow
                    key={c.email}
                    className="border-white/5 hover:bg-white/5 transition-colors group"
                    data-testid={`customer-row-${idx}`}
                  >
                    {/* Name */}
                    <TableCell className="py-4">
                      <div className="font-display font-medium text-white text-base group-hover:text-gold transition-colors">
                        {c.name}
                      </div>
                    </TableCell>

                    {/* Unified Contact */}
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1">
                        <a
                          href={`mailto:${c.email}`}
                          className="flex items-center gap-1.5 text-sm text-white/85 hover:text-gold transition-colors font-medium w-fit"
                          title="Send Email"
                        >
                          <Mail size={13} className="text-white/40 group-hover:text-gold/60" />
                          <span>{c.email}</span>
                        </a>
                        {c.phone && c.phone !== "—" && (
                          <a
                            href={`tel:${c.phone}`}
                            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-gold/80 transition-colors w-fit"
                            title="Call Customer"
                          >
                            <Phone size={11} className="text-white/30" />
                            <span>{c.phone}</span>
                          </a>
                        )}
                      </div>
                    </TableCell>

                    {/* Total Bookings */}
                    <TableCell className="py-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/5">
                        {c.bookingCount}
                      </span>
                    </TableCell>

                    {/* Last Booking Date */}
                    <TableCell className="py-4 text-white/70 text-xs whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-white/30" />
                        <span>{formatDate(c.lastBookingDate)}</span>
                      </div>
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
  if (!iso) return "—";
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
