// @ts-nocheck
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function BookingCancelled() {
  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center px-6 radial-gold"
      data-testid="booking-cancelled-page"
    >
      <div className="w-full max-w-md rounded-2xl glass-dark p-8 md:p-10 text-center">
        <div className="mx-auto w-14 h-14 grid place-items-center rounded-full bg-yellow-500/15 border border-yellow-500/30">
          <AlertTriangle size={26} className="text-yellow-300" />
        </div>
        <h1 className="font-display text-2xl mt-5">Payment cancelled</h1>
        <p className="text-white/55 mt-2 text-sm">
          Your application is saved. Start the booking flow again to confirm
          your slot.
        </p>
        <Link to="/">
          <Button
            className="mt-8 bg-[#D4AF37] hover:bg-[#F3C853] text-black rounded-full px-8 gold-button-glow"
            data-testid="cancelled-retry-btn"
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
