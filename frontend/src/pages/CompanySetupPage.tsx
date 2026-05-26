import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Award, 
  FileBadge, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Calendar
} from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { BRAND } from "@/lib/brand";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import BookingDialog from "@/components/landing/BookingDialog";

export default function CompanySetupPage() {
  useMeta({
    title: "Company Registration & Startup Setup Services India | Ask Array Tech",
    description: "Get your startup legally registered in India. We handle OPC, LLP, Private Limited incorporation, GST registration, DPIIT Startup India recognition, and legal templates.",
    canonicalUrl: "https://www.askarray.in/company-setup",
  });

  const [bookingOpen, setBookingOpen] = useState(false);
  const [presetService, setPresetService] = useState("Company Setup");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingBtn(true);
      } else {
        setShowFloatingBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBooking = (service = "Company Setup") => {
    setPresetService(service);
    setBookingOpen(true);
  };

  const certificates = [
    {
      icon: Award,
      title: "Incorporation Certificate",
      sub: "MCA · Private Limited, LLP, or OPC registration",
    },
    {
      icon: FileBadge,
      title: "GST Registration",
      sub: "GSTIN allotted for tax compliance",
    },
    {
      icon: ShieldCheck,
      title: "DPIIT · Startup India",
      sub: "Recognition certificate for tax & funding benefits",
    },
    {
      icon: FileBadge,
      title: "MSME / Udyam",
      sub: "Udyam registration for bank and credit perks",
    },
  ];

  const templates = [
    "Founders Agreement",
    "NDA · Mutual",
    "Employment Letter",
    "Vendor MoU",
    "Privacy Policy",
    "Terms of Service"
  ];

  const checklists = [
    "Bank account opening guidance",
    "Payment gateway onboarding support",
    "Corporate tax filings calendar & setup"
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="relative pt-12 pb-20 md:pt-16 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-grid-soft pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 grain pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs text-white/70 hover:text-white transition-all group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
              Back to Home
            </Link>
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
              <span className="font-display text-lg md:text-xl text-white font-bold tracking-tight group-hover:text-gold md:inline-flex items-center gap-1.5">
                Ask Array <span className="text-gold">Tech</span>
              </span>
            </button>
          </div>

          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.06] backdrop-blur-md px-4 py-2">
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/85 font-medium">
                Legal & Corporate Setup
              </span>
            </div>

            <h1 className="font-display mt-6 text-4xl md:text-6xl text-white font-bold leading-[1.1] tracking-tight">
              Company Setup Services for Startups
            </h1>

            <p className="mt-8 text-base md:text-lg text-white/60 leading-relaxed font-light">
              <span className="md:hidden">
                {isExpanded ? (
                  <>
                    Launch your business legally and securely with our end-to-end{" "}
                    <strong>company setup services for startups</strong>. Whether you require{" "}
                    <strong>private limited registration India</strong>, <strong>LLP registration services</strong>,{" "}
                    or <strong>Startup India registration</strong>, we manage the entire process under one execution partner.{" "}
                    From initial name approval and incorporation documents to <strong>GST registration</strong> and{" "}
                    <strong>DPIIT registration assistance</strong>, we ensure your legal entity is fully compliant.{" "}
                    Avoid coordinating between multiple vendors—our concierge team delivers MCA incorporation certificates,{" "}
                    bank account setup, and a complete suite of <strong>startup legal documentation</strong> including founders'{" "}
                    agreements, NDAs, and employment contracts to protect your venture from day one.
                    <button 
                      onClick={() => setIsExpanded(false)} 
                      className="text-[#D4AF37] font-semibold text-xs ml-1.5 hover:underline focus:outline-none"
                    >
                      Read Less
                    </button>
                  </>
                ) : (
                  <>
                    Launch your business legally and securely with our end-to-end{" "}
                    <strong>company setup services for startups</strong>. Whether you require{" "}
                    <strong>private limited registration India</strong>, <strong>LLP registration services</strong>,{" "}
                    or <strong>Startup India registration</strong>, we manage the entire process...
                    <button 
                      onClick={() => setIsExpanded(true)} 
                      className="text-[#D4AF37] font-semibold text-xs ml-1.5 hover:underline focus:outline-none"
                    >
                      Read More
                    </button>
                  </>
                )}
              </span>
              <span className="hidden md:inline">
                Launch your business legally and securely with our end-to-end{" "}
                <strong>company setup services for startups</strong>. Whether you require{" "}
                <strong>private limited registration India</strong>, <strong>LLP registration services</strong>,{" "}
                or <strong>Startup India registration</strong>, we manage the entire process under one execution partner.{" "}
                From initial name approval and incorporation documents to <strong>GST registration</strong> and{" "}
                <strong>DPIIT registration assistance</strong>, we ensure your legal entity is fully compliant.{" "}
                Avoid coordinating between multiple vendors—our concierge team delivers MCA incorporation certificates,{" "}
                bank account setup, and a complete suite of <strong>startup legal documentation</strong> including founders'{" "}
                agreements, NDAs, and employment contracts to protect your venture from day one.
              </span>
            </p>

            <button
              onClick={() => openBooking()}
              className="mt-8 bg-[#D4AF37] hover:bg-[#F3C853] text-black font-semibold rounded-full px-8 py-4 text-base h-auto gold-button-glow inline-flex items-center gap-2 group transition-all duration-300"
            >
              Let's Connect
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Deliverables Section */}
          <div className="mt-20 md:mt-28 border-t border-white/5 pt-16">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-4">
              What We Deliver
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-12">
              Every document, registration certificate, and template you need to be legally ready.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Left Column: Certs */}
              <div className="lg:col-span-2 space-y-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Government Registrations
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {certificates.map((cert, index) => {
                    const Icon = cert.icon;
                    return (
                      <div 
                        key={index}
                        className="relative rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#161310] to-[#0d0d0d] p-6 overflow-hidden"
                      >
                        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
                        <div className="flex items-start justify-between mb-6">
                          <span className="inline-grid place-items-center w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
                            <Icon size={18} />
                          </span>
                          <span className="text-[9px] uppercase tracking-widest text-white/30">
                            Official
                          </span>
                        </div>
                        <h3 className="font-display text-lg text-white font-medium">{cert.title}</h3>
                        <p className="text-xs text-white/55 mt-1.5 leading-relaxed">{cert.sub}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Templates & Checklists */}
              <div className="space-y-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-4">
                    Legal Templates Provided
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {templates.map((title, index) => (
                      <div 
                        key={index}
                        className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                      >
                        <p className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 font-semibold">
                          Template
                        </p>
                        <p className="text-sm text-white/90 mt-1">{title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-4">
                    Onboarding Guidance
                  </p>
                  <ul className="space-y-2">
                    {checklists.map((title, index) => (
                      <li 
                        key={index}
                        className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                      >
                        <span className="inline-grid place-items-center w-5 h-5 rounded-full border border-[#D4AF37]/35 text-[#D4AF37] text-[10px] flex-shrink-0">
                          ✓
                        </span>
                        <span className="text-sm text-white/80">{title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Contact /> */}
      <Footer />

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        presetService={presetService}
      />

      {/* Floating mobile CTA */}
      <div 
        className={`fixed bottom-6 left-4 right-4 z-50 md:hidden transition-all duration-500 transform ${
          showFloatingBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <button
          onClick={() => openBooking("Company Setup")}
          className="w-full bg-[#D4AF37] hover:bg-[#F3C853] text-black rounded-2xl p-4 shadow-[0_12px_40px_rgba(212,175,55,0.4)] border border-[#F3C853]/25 flex items-center justify-between active:scale-95 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3.5">
            <span className="inline-grid place-items-center w-11 h-11 rounded-xl bg-black/10 text-black">
              <Calendar size={20} className="stroke-[2.5]" />
            </span>
            <div className="text-left">
              <p className="font-display font-extrabold text-xl tracking-tight leading-none text-black">
                Let's Connect
              </p>
              <p className="text-[15px] font-medium text-black/60 mt-1.5 leading-none">
                Serious founder don't delay  
              </p>
            </div>
          </div>
          <span className="inline-grid place-items-center w-9 h-9 rounded-xl bg-black/5 text-black">
            <ArrowRight size={18} className="stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
          </span>
        </button>
      </div>
    </div>
  );
}
