// @ts-nocheck
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center px-6 radial-gold"
      data-testid="not-found-page"
    >
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-[0.25em] text-white/45">
          404
        </p>
        <h1 className="font-display text-5xl md:text-6xl tracking-tighter mt-3">
          Lost in <span className="gold-gradient-text">launch</span> space.
        </h1>
        <p className="text-white/55 mt-4">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/">
          <Button
            className="mt-8 bg-[#D4AF37] hover:bg-[#F3C853] text-black rounded-full px-8 py-5 gold-button-glow"
            data-testid="not-found-home-btn"
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
