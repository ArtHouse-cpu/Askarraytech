// @ts-nocheck
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

const NAV_LINKS = [
  { label: "Services", href: "#pricing" },
  { label: "Process", href: "#process" },
  // { label: "Pricing", href: "#pricing" },
  // { label: "Portfolio", href: "#portfolio" },
  { label: "Why Us", href: "#why-us" },
  // { label: "Contact", href: "#contact" },
];

export default function Navbar({ onBookSlot }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-navbar" : "bg-transparent"
      }`}
      data-testid="site-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 h-[78px] flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
          data-testid="brand-logo"
        >
          <img
            src={BRAND.logoMark}
            alt="Ask Array Tech"
            className="w-8 h-8 rounded object-cover"
          />
          <span className="font-display text-lg md:text-xl text-white font-bold tracking-tight hidden sm:inline-flex items-center gap-1.5">
            Ask Array <span className="text-gold">Tech</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.href)}
              className="text-[13px] text-white/70 hover:text-white tracking-wide transition-colors font-medium"
              data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={onBookSlot}
            className="hidden sm:inline-flex bg-[#D4AF37] hover:bg-[#F3C853] text-black font-medium rounded-full px-5 py-2.5 gold-button-glow group transition-all duration-300"
            data-testid="navbar-book-slot-btn"
          >
            Start Now
            <ArrowRight
              size={15}
              className="ml-1.5 transition-transform group-hover:translate-x-0.5"
            />
          </Button>
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
            data-testid="navbar-mobile-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass-navbar border-t border-white/5">
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l.href)}
                className="text-left text-white/80 py-2 font-medium"
                data-testid={`nav-mobile-${l.label.toLowerCase()}`}
              >
                {l.label}
              </button>
            ))}
            <Button
              onClick={() => {
                setOpen(false);
                onBookSlot();
              }}
              className="bg-[#D4AF37] hover:bg-[#F3C853] text-black font-medium rounded-full mt-2"
              data-testid="navbar-mobile-book-slot-btn"
            >
              Start Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
