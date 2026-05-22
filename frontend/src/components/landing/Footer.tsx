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
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3">
            {/* <img
              src={BRAND.logoMark}
              alt="Ask Array Tech"
              className="w-10 h-10 rounded-md"
            /> */}
            <span className="font-display text-base tracking-[0.18em] uppercase">
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
          <p className="text-xs uppercase tracking-[0.22em] text-white/40">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>
              <a href="#pricing" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#process" className="hover:text-white">
                Process
              </a>
            </li>
            {/* <li>
              <a href="#portfolio" className="hover:text-white">
                Portfolio
              </a>
            </li> */}
            <li>
              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="terms-and-conditions" className="hover:text-white">
                Terms
              </a>
            </li>
          </ul>
        </div>

      <div>
  <p className="text-xs uppercase tracking-[0.22em] text-white/40">
    Reach Out
  </p>

  <ul className="mt-4 space-y-2.5 text-sm text-white/70">
    <li>
      <a
        href="mailto:founders@askarray.in"
        className="flex items-center gap-2 hover:text-white transition-colors"
        data-testid="footer-email"
      >
        <Mail size={16} />
        founders@askarray.in
      </a>
    </li>

    {/* <li>
      <a
        href="https://www.askarray.in"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:text-white transition-colors"
        data-testid="footer-website"
      >
        <Globe size={16} />
        askarray.in
      </a>
    </li> */}

    <li>
      <Link
        to="/admin/login"
        className="flex items-center gap-2 hover:text-white transition-colors"
        data-testid="footer-admin-link"
      >
        <ShieldCheck size={16} />
        Admin Panel
      </Link>
    </li>
  </ul>
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
