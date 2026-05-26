import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Megaphone,
  Palette,
  Share2,
  TrendingUp,
  Target,
  Calendar
} from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import Footer from "@/components/landing/Footer";
import BookingDialog from "@/components/landing/BookingDialog";
import { BRAND } from "@/lib/brand";

export default function MarketingSetupPage() {
  useMeta({
    title: "Startup Branding & Marketing Setup Services India | Ask Array Tech",
    description: "Establish your brand presence. We handle logo design, brand kits, social media setup (LinkedIn, Instagram, Facebook, WhatsApp Business), ad accounts, and analytics tracking.",
    canonicalUrl: "https://www.askarray.in/marketing-setup",
  });

  const [bookingOpen, setBookingOpen] = useState(false);
  const [presetService, setPresetService] = useState("Marketing Setup");
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

  const openBooking = (service = "Marketing Setup") => {
    setPresetService(service);
    setBookingOpen(true);
  };

  const socialChannels = [
    { name: "LinkedIn", detail: "Professional company profile & founder personal branding templates" },
    { name: "Instagram", detail: "Launch strategy, custom grid design, and templates for Reels" },
    { name: "Facebook", detail: "Business page setup linked to Ads Manager for campaign execution" },
    { name: "WhatsApp Channel", detail: "Official verified setup to communicate directly with leads" },
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
            <div className="flex items-center gap-2.5">
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
          </div>

          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.06] backdrop-blur-md px-4 py-2">
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/85 font-medium">
                Branding & Growth Infrastructure
              </span>
            </div>

            <h1 className="font-display mt-6 text-4xl md:text-6xl text-white font-bold leading-[1.1] tracking-tight">
              Marketing Setup for Startups
            </h1>

            <p className="mt-8 text-base md:text-lg text-white/60 leading-relaxed font-light">
              <span className="md:hidden">
                {isExpanded ? (
                  <>
                    Establish a powerful market presence with our comprehensive{" "}
                    <strong>startup marketing setup</strong> services. We provide professional{" "}
                    <strong>startup branding services</strong> to construct your initial visual identity, including custom{" "}
                    logo design, color palettes, and typography guidelines. Our package completes your digital footprint by{" "}
                    handling <strong>startup social media setup</strong> across LinkedIn, Instagram, Facebook, and verified{" "}
                    WhatsApp Business accounts. Additionally, we eliminate configuration complexity with professional{" "}
                    <strong>ad account setup</strong> for Meta Ads and Google Ads. From pixel integration and conversion{" "}
                    tracking to setting up a high-performance <strong>startup launch marketing</strong> infrastructure, we{" "}
                    provide the complete growth foundation required to scale your customer acquisition.
                    <button 
                      onClick={() => setIsExpanded(false)} 
                      className="text-[#D4AF37] font-semibold text-xs ml-1.5 hover:underline focus:outline-none"
                    >
                      Read Less
                    </button>
                  </>
                ) : (
                  <>
                    Establish a powerful market presence with our comprehensive{" "}
                    <strong>startup marketing setup</strong> services. We provide professional{" "}
                    <strong>startup branding services</strong> to construct your initial visual identity, including custom{" "}
                    logo design, color palettes, and typography guidelines...
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
                Establish a powerful market presence with our comprehensive{" "}
                <strong>startup marketing setup</strong> services. We provide professional{" "}
                <strong>startup branding services</strong> to construct your initial visual identity, including custom{" "}
                logo design, color palettes, and typography guidelines. Our package completes your digital footprint by{" "}
                handling <strong>startup social media setup</strong> across LinkedIn, Instagram, Facebook, and verified{" "}
                WhatsApp Business accounts. Additionally, we eliminate configuration complexity with professional{" "}
                <strong>ad account setup</strong> for Meta Ads and Google Ads. From pixel integration and conversion{" "}
                tracking to setting up a high-performance <strong>startup launch marketing</strong> infrastructure, we{" "}
                provide the complete growth foundation required to scale your customer acquisition.
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
              Your Day-1 Launch Arsenal
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-12">
              A comprehensive toolkit covering visual assets, social onboarding, and ad platforms.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1: Brand Kit */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#D4AF37]/35 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-6">
                    <Palette size={20} />
                  </div>
                  <h3 className="font-display text-xl text-white font-medium">Brand Identity & Kit</h3>
                  <p className="text-xs text-white/55 mt-2 leading-relaxed">
                    Custom logo marks, typography guidelines, and a defined color palette to ensure brand consistency across platforms.
                  </p>
                </div>
                <div className="mt-8 aspect-[16/9] rounded-lg overflow-hidden border border-white/10 bg-black">
                  <img 
                    src="https://res.cloudinary.com/dzwto9zbu/image/upload/v1779396451/ChatGPT_Image_May_22_2026_02_17_10_AM_oj6g36.png" 
                    alt="Brand kit palette" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Card 2: Social Setup */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#D4AF37]/35 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-6">
                    <Share2 size={20} />
                  </div>
                  <h3 className="font-display text-xl text-white font-medium">Social Channels Setup</h3>
                  <p className="text-xs text-white/55 mt-2 leading-relaxed mb-6">
                    Complete onboarding and visual customization for four essential networks:
                  </p>
                  <div className="space-y-3">
                    {socialChannels.map((ch, idx) => (
                      <div key={idx} className="border-t border-white/5 pt-3">
                        <p className="text-xs text-white font-medium">{ch.name}</p>
                        <p className="text-[11px] text-white/50 mt-0.5">{ch.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Growth Infrastructure */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#D4AF37]/35 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-6">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="font-display text-xl text-white font-medium">Advertising Infrastructure</h3>
                  <p className="text-xs text-white/55 mt-2 leading-relaxed">
                    Setting up corporate advertising accounts, implementing conversion tracking pixels (Meta Pixel, Google Tag), and outlining campaign structures.
                  </p>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold">
                      <Target size={14} />
                      Campaign Funnel Structure
                    </div>
                    <p className="text-[11px] text-white/50 mt-1">
                      TOF (Top of Funnel) · MOF (Middle) · BOF (Bottom of Funnel) campaign outlines.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <p className="text-xs text-white font-medium">Meta & Google Accounts</p>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      Completed verification and settings ready for launch day.
                    </p>
                  </div>
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
          onClick={() => openBooking("Marketing Setup")}
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
