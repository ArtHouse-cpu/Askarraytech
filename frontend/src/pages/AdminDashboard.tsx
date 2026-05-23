// @ts-nocheck
import { useEffect, useState, useMemo } from "react";
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
  Activity,
  Download,
  CalendarPlus,
  Wallet,
  CalendarClock,
  Users,
} from "lucide-react";
import BookingsPanel from "@/components/admin/BookingsPanel";
import SlotsPanel from "@/components/admin/SlotsPanel";
import PortfolioPanel from "@/components/admin/PortfolioPanel";
import CustomersPanel from "@/components/admin/CustomersPanel";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [stats, setStats] = useState({
    bookings_total: 0,
    bookings_unpaid: 0,
    bookings_paid: 0,
    customers_total: 0,
    slots_total: 0,
    slots_available: 0,
    revenue_inr: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  // Compute stats dynamically from bookings list to ensure accurate display
  const computedStats = useMemo(() => {
    const totalBookings = bookings.length;
    const paidBookings = bookings.filter(b => b.status === "paid" || b.status === "completed").length;
    const unpaidBookings = totalBookings - paidBookings;

    // Unique customers based on email
    const uniqueEmails = new Set(
      bookings.map(b => b.email?.toLowerCase().trim()).filter(Boolean)
    );
    const totalCustomers = uniqueEmails.size;

    // Revenue in INR (399 per paid booking)
    const computedRevenue = paidBookings * 399;

    return {
      bookings_total: totalBookings,
      bookings_paid: stats.bookings_paid || paidBookings,
      bookings_unpaid: stats.bookings_unpaid !== undefined && stats.bookings_unpaid !== 0 ? stats.bookings_unpaid : unpaidBookings,
      customers_total: stats.customers_total !== undefined && stats.customers_total !== 0 ? stats.customers_total : totalCustomers,
      revenue_inr: stats.revenue_inr || computedRevenue,
      slots_available: stats.slots_available,
    };
  }, [bookings, stats]);

  const refreshStats = async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/bookings"),
      ]);
      setStats(statsRes.data);
      setBookings(bookingsRes.data);
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
        const [meRes, statsRes, bookingsRes] = await Promise.all([
          api.get("/auth/me"),
          api.get("/admin/stats"),
          api.get("/admin/bookings"),
        ]);
        setMe(meRes.data);
        setStats(statsRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          navigate("/admin/login");
          return;
        }
        toast.error(getApiErrorMessage(err.response?.data?.detail));
      } finally {
        setLoading(false);
        setBookingsLoading(false);
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
    <div
      className="min-h-screen bg-[#0a0a0a] text-white relative"
      data-testid="admin-dashboard"
    >
      <div className="relative z-10">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-[#F3C853] via-[#D4AF37] to-[#8a6d1f] grid place-items-center group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <span className="text-black font-display font-bold text-base">
                  A
                </span>
              </span>
              <span className="font-display text-base font-medium tracking-tight">
                Ask Array <span className="text-gold font-bold">Tech</span> <span className="text-white/40">·</span> Admin
              </span>
            </Link>
            <div className="flex items-center gap-4 text-sm text-white/65">
              {me && (
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-white/80" data-testid="admin-greeting">
                    {me.email}
                  </span>
                </div>
              )}
              <Button
                onClick={logout}
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-full transition-all text-xs font-semibold px-4 py-2"
                data-testid="admin-logout-btn"
              >
                <LogOut size={13} className="mr-1.5" /> Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* Dashboard Title & Action Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-fade-up">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-white/45 mt-2 text-sm max-w-xl">
                Pipeline overview, slot scheduling, portfolio management, and customer relations.
              </p>
            </div>
            <Button
              onClick={downloadCsv}
              className="bg-white text-black hover:bg-white/90 border border-white/20 rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.15)] font-semibold text-xs py-5 px-6 self-start md:self-auto transition-all hover:scale-102"
              data-testid="admin-csv-export-btn"
            >
              <Download size={14} className="mr-2" /> Export Bookings CSV
            </Button>
          </div>

          {/* Key Metric Stats Cards */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-up">
            <StatCard
              icon={Inbox}
              label="Paid Bookings"
              value={computedStats.bookings_paid}
              testid="stat-bookings"
            />
            <StatCard
              icon={CalendarClock}
              label="Leads (Unpaid)"
              value={computedStats.bookings_unpaid}
              testid="stat-leads"
            />
            <StatCard
              icon={Wallet}
              label="Revenue"
              value={`₹${computedStats.revenue_inr?.toLocaleString() || 0}`}
              testid="stat-revenue"
            />
            <StatCard
              icon={Users}
              label="Customers"
              value={computedStats.customers_total}
              testid="stat-customers"
            />
            <StatCard
              icon={CalendarPlus}
              label="Open Slots"
              value={computedStats.slots_available}
              testid="stat-slots"
            />
          </div>

          {/* Main Dashboard Navigation Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="bg-white/[0.03] border border-white/5 p-1 rounded-2xl flex flex-wrap gap-1 w-full max-w-fit shadow-2xl glass-dark mb-6">
                <TabsTrigger
                  value="bookings"
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black transition-all duration-300 flex items-center gap-1.5"
                  data-testid="tab-bookings"
                >
                  <Inbox size={14} />
                  Bookings
                </TabsTrigger>
                <TabsTrigger
                  value="leads"
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black transition-all duration-300 flex items-center gap-1.5"
                  data-testid="tab-leads"
                >
                  <CalendarClock size={14} />
                  Leads
                </TabsTrigger>
                <TabsTrigger
                  value="slots"
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black transition-all duration-300 flex items-center gap-1.5"
                  data-testid="tab-slots"
                >
                  <CalendarPlus size={14} />
                  Slots
                </TabsTrigger>
                <TabsTrigger
                  value="portfolio"
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black transition-all duration-300 flex items-center gap-1.5"
                  data-testid="tab-portfolio"
                >
                  <Activity size={14} />
                  Portfolio
                </TabsTrigger>
                <TabsTrigger
                  value="customers"
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black transition-all duration-300 flex items-center gap-1.5"
                  data-testid="tab-customers"
                >
                  <Users size={14} />
                  Customers
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="mt-0 focus-visible:outline-none">
                <BookingsPanel
                  bookings={bookings}
                  loading={bookingsLoading}
                  onMutate={refreshStats}
                  filterType="paid"
                />
              </TabsContent>
              <TabsContent value="leads" className="mt-0 focus-visible:outline-none">
                <BookingsPanel
                  bookings={bookings}
                  loading={bookingsLoading}
                  onMutate={refreshStats}
                  filterType="lead"
                />
              </TabsContent>
              <TabsContent value="slots" className="mt-0 focus-visible:outline-none">
                <SlotsPanel bookings={bookings} onMutate={refreshStats} />
              </TabsContent>
              <TabsContent value="portfolio" className="mt-0 focus-visible:outline-none">
                <PortfolioPanel />
              </TabsContent>
              <TabsContent value="customers" className="mt-0 focus-visible:outline-none">
                <CustomersPanel
                  bookings={bookings}
                  loading={bookingsLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, testid }) {
  return (
    <div
      className="group rounded-2xl glass-dark border border-white/5 p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.06)]"
      data-testid={testid}
    >
      <span className="inline-grid place-items-center w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 text-gold flex-shrink-0 group-hover:scale-105 group-hover:bg-gold/25 transition-all">
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">
          {label}
        </p>
        <p className="font-display text-2xl font-bold mt-1 text-white tracking-tight group-hover:text-gold transition-colors truncate">
          {value}
        </p>
      </div>
    </div>
  );
}
