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
import { toast } from "sonner";

export default function ContactsPanel() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/contacts")
      .then(({ data }) => setContacts(data))
      .catch((err) =>
        toast.error(getApiErrorMessage(err.response?.data?.detail))
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="rounded-2xl glass-dark p-10 text-center text-white/55">
        Loading contacts…
      </div>
    );

  if (contacts.length === 0)
    return (
      <div className="rounded-2xl glass-dark p-10 text-center text-white/55">
        No contact messages yet.
      </div>
    );

  return (
    <div
      className="rounded-2xl glass-dark overflow-hidden"
      data-testid="contacts-table"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-white/55">Created</TableHead>
            <TableHead className="text-white/55">Name</TableHead>
            <TableHead className="text-white/55">Email</TableHead>
            <TableHead className="text-white/55">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((c) => (
            <TableRow key={c.id} className="border-white/5 hover:bg-white/5">
              <TableCell className="text-white/80 text-xs whitespace-nowrap">
                {formatDate(c.created_at)}
              </TableCell>
              <TableCell className="text-white text-sm">{c.name}</TableCell>
              <TableCell className="text-white/75 text-sm">
                {c.email}
              </TableCell>
              <TableCell className="text-white/75 text-sm max-w-md">
                {c.message}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
