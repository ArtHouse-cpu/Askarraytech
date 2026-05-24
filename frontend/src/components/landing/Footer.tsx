// @ts-nocheck
import { Link, useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/brand";
import { Mail, Globe, ShieldCheck } from "lucide-react";

export default function Footer() {
  const navigate= useNavigate();
  return (
    <footer
      className="relative bg-[#0a0a0a] text-white border-t border-white/5"
      data-testid="site-footer"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3">
             <img
              src={BRAND.logoMark}
              alt="Ask Array Tech"
              className="w-10 h-10 rounded-md"
            />
         <span className="font-display text-lg md:text-xl text-white font-bold tracking-tight group-hover:text-gold md:inline-flex items-center gap-1.5">
            Ask Array <span className="text-gold">Tech</span>
          </span>
          </div>
          <p className="mt-5 text-sm text-white/55 max-w-xs leading-relaxed">
            A concierge launch partner for serious founders. Legal, product,
            brand and growth — under one quiet roof.
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-white/35">
            Start · Build · Grow
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/40 font-semibold">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>
              <a href="#pricing" className="hover:text-white transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#process" className="hover:text-white transition-colors">
                Process
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </li>
            {/* <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li> */}
            <li>
              <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/40 font-semibold">
            Reach Out
          </p>
          <ul className="mt-4 space-y-3.5 text-sm text-white/70">
            <li>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Email</p>
              <a
                href="mailto:founders@askarray.in"
                className="mt-1 flex items-center gap-2 hover:text-white transition-colors text-white font-medium"
                data-testid="footer-email"
              >
                <Mail size={15} className="text-[#D4AF37]" />
                founders@askarray.in
              </a>
            </li>
            <li className="pt-1">
              <Link
                to="/admin/login"
                className="flex items-center gap-2 hover:text-white transition-colors text-white/60 hover:text-white"
                data-testid="footer-admin-link"
              >
                <ShieldCheck size={15} />
                Admin Panel
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/40 font-semibold">
            Headquarter
          </p>
          <div className="mt-4 text-sm text-white/70 leading-relaxed space-y-1">
            <p className="text-white font-medium">Ask Array Tech</p>
            <p>#20, Commercial Complex,</p>
            <p>Nehru Nagar (E), Bhilai,</p>
            <p>C.G, India 490020</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} Ask Array Tech. Built for serious
            founders. All rights reserved.
          </p>
          <p>Concierge for the startup launch.</p>
        </div>
      </div>
    </footer>
  );
}
