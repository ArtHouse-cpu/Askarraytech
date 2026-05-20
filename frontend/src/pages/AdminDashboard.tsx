// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, getApiErrorMessage, TOKEN_KEY, API } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  LogOut,
  Inbox,
  MessageSquareText,
  Activity,
  Download,
  CalendarPlus,
  Wallet,
  CalendarClock,
} from "lucide-react";
import BookingsPanel from "@/components/admin/BookingsPanel";
import ContactsPanel from "@/components/admin/ContactsPanel";
import SlotsPanel from "@/components/admin/SlotsPanel";
import PortfolioPanel from "@/components/admin/PortfolioPanel";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [stats, setStats] = useState({
    bookings_total: 0,
    bookings_paid: 0,
    contacts_total: 0,
    slots_total: 0,
    slots_available: 0,
    revenue_inr: 0,
  });
  const [loading, setLoading] = useState(true);

  const refreshStats = async () => {
    try {
      const { data } = await api.get("/admin/stats");
      setStats(data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        navigate("/admin/login");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const load = async () => {
      try {
        const [meRes, statsRes] = await Promise.all([
          api.get("/auth/me"),
          api.get("/admin/stats"),
        ]);
        setMe(meRes.data);
        setStats(statsRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          navigate("/admin/login");
          return;
        }
        toast.error(getApiErrorMessage(err.response?.data?.detail));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/admin/login");
  };

  const downloadCsv = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch(`${API}/admin/bookings.csv`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to download");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bookings_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("CSV downloaded.");
    } catch {
      toast.error("Could not download CSV.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" data-testid="admin-dashboard">
      <header className="border-b border-white/5 glass-navbar sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-block w-7 h-7 rounded-md bg-gradient-to-br from-[#F3C853] via-[#D4AF37] to-[#8a6d1f] grid place-items-center">
              <span className="text-black font-display font-bold text-sm">
                A
              </span>
            </span>
            <span className="font-display text-base">
              Ask Array <span className="text-gold">Tech</span> · Admin
            </span>
          </Link>
          <div className="flex items-center gap-3 text-sm text-white/65">
            {me && <span data-testid="admin-greeting">{me.email}</span>}
            <Button
              onClick={logout}
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/5 rounded-full"
              data-testid="admin-logout-btn"
            >
              <LogOut size={14} className="mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl">Dashboard</h1>
            <p className="text-white/55 mt-1">
              Bookings, slots, portfolio & pipeline health.
            </p>
          </div>
          <Button
            onClick={downloadCsv}
            className="bg-white text-black hover:bg-white/90 rounded-full self-start md:self-auto"
            data-testid="admin-csv-export-btn"
          >
            <Download size={14} className="mr-2" /> Export Bookings CSV
          </Button>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            icon={Inbox}
            label="Bookings"
            value={stats.bookings_total}
            testid="stat-bookings"
          />
          <StatCard
            icon={Wallet}
            label="Paid"
            value={stats.bookings_paid}
            testid="stat-paid"
          />
          <StatCard
            icon={Activity}
            label="Revenue"
            value={`₹${stats.revenue_inr || 0}`}
            testid="stat-revenue"
          />
          <StatCard
            icon={CalendarClock}
            label="Open Slots"
            value={stats.slots_available}
            testid="stat-slots"
          />
          <StatCard
            icon={MessageSquareText}
            label="Contacts"
            value={stats.contacts_total}
            testid="stat-contacts"
          />
        </div>

        <div className="mt-10">
          <Tabs defaultValue="bookings">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="bookings" data-testid="tab-bookings">
                Bookings
              </TabsTrigger>
              <TabsTrigger value="slots" data-testid="tab-slots">
                <CalendarPlus size={14} className="mr-1.5" /> Slots
              </TabsTrigger>
              <TabsTrigger value="portfolio" data-testid="tab-portfolio">
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="contacts" data-testid="tab-contacts">
                Contacts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bookings" className="mt-5">
              <BookingsPanel onMutate={refreshStats} loading={loading} />
            </TabsContent>
            <TabsContent value="slots" className="mt-5">
              <SlotsPanel onMutate={refreshStats} />
            </TabsContent>
            <TabsContent value="portfolio" className="mt-5">
              <PortfolioPanel />
            </TabsContent>
            <TabsContent value="contacts" className="mt-5">
              <ContactsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, testid }) {
  return (
    <div
      className="rounded-2xl glass-dark p-5 flex items-center gap-4"
      data-testid={testid}
    >
      <span className="inline-grid place-items-center w-11 h-11 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-gold flex-shrink-0">
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-widest text-white/55">
          {label}
        </p>
        <p className="font-display text-xl mt-0.5 truncate">{value}</p>
      </div>
    </div>
  );
}
