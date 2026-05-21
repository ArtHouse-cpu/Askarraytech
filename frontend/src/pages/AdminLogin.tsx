// @ts-nocheck
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, getApiErrorMessage, TOKEN_KEY } from "@/lib/api";
import { toast } from "sonner";
import { Lock, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      toast.success("Welcome back.");
      navigate("/admin");
    } catch (err) {
      toast.error(
        getApiErrorMessage(err.response?.data?.detail) ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center px-6 radial-gold grain"
      data-testid="admin-login-page"
    >
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-white/55 hover:text-white"
      >
        <ArrowLeft size={14} /> Back to site
      </Link>

      <div className="w-full max-w-md rounded-2xl glass-dark p-8 md:p-10 relative">
        <div className="inline-grid place-items-center w-11 h-11 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-gold">
          <Lock size={18} />
        </div>
        <h1 className="font-display text-3xl mt-5">Admin Login</h1>
        <p className="text-sm text-white/55 mt-1">
          Ask Array Tech · Restricted area
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="admin-email" className="text-white/80">
              Email
            </Label>
            <Input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1.5 bg-white/5 border-white/10 text-white"
              data-testid="admin-email-input"
            />
          </div>
          <div>
            <Label htmlFor="admin-password" className="text-white/80">
              Password
            </Label>
            <Input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 bg-white/5 border-white/10 text-white"
              data-testid="admin-password-input"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] hover:bg-[#F3C853] text-black font-semibold rounded-full py-6 gold-button-glow"
            data-testid="admin-login-submit"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
