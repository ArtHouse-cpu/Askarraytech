// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { api, getApiErrorMessage } from "@/lib/api";
import {
  CheckCircle2,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Mail,
  MessageCircle,
} from "lucide-react";

const MAX_POLLS = 8;
const POLL_INTERVAL = 2000;

export default function BookingSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const bookingIdParam = params.get("booking_id");

  const [state, setState] = useState({
    status: "checking",
    message: "Verifying your payment…",
  });
  const polledRef = useRef(0);

  useEffect(() => {
    if (!sessionId) {
      setState({
        status: "error",
        message: "Missing payment session. Please contact support.",
      });
      return;
    }

    let cancelled = false;

    const poll = async () => {
      try {
        const { data } = await api.get(`/payments/status/${sessionId}`);
        if (cancelled) return;

        if (data.payment_status === "paid") {
          setState({ status: "paid", message: "Payment successful." });
          return;
        }
        if (data.status === "expired") {
          setState({
            status: "expired",
            message: "Your checkout session expired. Please try again.",
          });
          return;
        }

        polledRef.current += 1;
        if (polledRef.current >= MAX_POLLS) {
          setState({
            status: "pending",
            message:
              "Payment is still processing. We'll email confirmation shortly.",
          });
          return;
        }
        setTimeout(poll, POLL_INTERVAL);
      } catch (err) {
        if (cancelled) return;
        setState({
          status: "error",
          message:
            getApiErrorMessage(err.response?.data?.detail) ||
            "Could not verify payment.",
        });
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center px-6 radial-gold grain"
      data-testid="booking-success-page"
    >
      <div className="w-full max-w-md rounded-2xl glass-dark p-8 md:p-10 text-center">
        {state.status === "checking" && (
          <>
            <Loader2 size={36} className="mx-auto text-gold animate-spin" />
            <h1 className="font-display text-2xl mt-5">Verifying payment…</h1>
            <p className="text-white/55 mt-2 text-sm">{state.message}</p>
          </>
        )}

        {state.status === "paid" && (
          <>
            <div className="mx-auto w-14 h-14 grid place-items-center rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30">
              <CheckCircle2 size={26} className="text-gold" />
            </div>
            <h1 className="font-display text-3xl mt-5">Slot Confirmed.</h1>
            <p className="text-white/65 mt-2">
              Your strategy call is locked in. Our team will reach out personally.
            </p>
            <div className="mt-6 mx-auto rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left text-sm space-y-3">
              <div className="flex items-start gap-3">
                <span className="inline-grid place-items-center w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex-shrink-0">
                  <MessageCircle size={13} />
                </span>
                <div>
                  <p className="text-white/85 font-medium">WhatsApp follow-up</p>
                  <p className="text-white/55 text-xs">
                    We'll message you with the call link.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-grid place-items-center w-7 h-7 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-gold flex-shrink-0">
                  <Mail size={13} />
                </span>
                <div>
                  <p className="text-white/85 font-medium">Email confirmation</p>
                  <p className="text-white/55 text-xs">
                    Check your inbox — calendar invite incoming.
                  </p>
                </div>
              </div>
            </div>
            {bookingIdParam && (
              <p className="mt-5 text-xs text-white/45">
                Reference:{" "}
                <span className="font-mono text-gold">
                  {bookingIdParam.slice(0, 8)}
                </span>
              </p>
            )}
            <Link to="/">
              <Button
                className="mt-7 bg-[#D4AF37] hover:bg-[#F3C853] text-black rounded-full px-8 gold-button-glow"
                data-testid="success-back-home-btn"
              >
                Back to Home
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </>
        )}

        {state.status === "pending" && (
          <>
            <Loader2 size={36} className="mx-auto text-gold" />
            <h1 className="font-display text-2xl mt-5">Almost there.</h1>
            <p className="text-white/55 mt-2 text-sm">{state.message}</p>
            <Link to="/">
              <Button
                variant="ghost"
                className="mt-8 border border-white/15 text-white rounded-full px-8"
              >
                Back to Home
              </Button>
            </Link>
          </>
        )}

        {(state.status === "expired" || state.status === "error") && (
          <>
            <div className="mx-auto w-14 h-14 grid place-items-center rounded-full bg-red-500/15 border border-red-500/30">
              <AlertTriangle size={26} className="text-red-300" />
            </div>
            <h1 className="font-display text-2xl mt-5">
              {state.status === "expired"
                ? "Session expired"
                : "Something went wrong"}
            </h1>
            <p className="text-white/55 mt-2 text-sm">{state.message}</p>
            <Link to="/">
              <Button className="mt-8 bg-white text-black hover:bg-white/90 rounded-full px-8">
                Try again
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
