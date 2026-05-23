import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Code,
  Layout,
  Smartphone,
  Layers,
  CheckCircle2
} from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import BookingDialog from "@/components/landing/BookingDialog";

export default function MVPDevelopmentPage() {
  useMeta({
    title: "MVP Development Company for Startups | Ask Array Tech",
    description: "Scale your startup idea with a custom MVP. We design and build modern websites, web apps, SaaS portals, and iOS/Android applications using a premium Figma design system.",
    canonicalUrl: "https://www.askarray.in/mvp-development",
  });

  const [bookingOpen, setBookingOpen] = useState(false);
  const [presetService, setPresetService] = useState("Product MVP");

  const openBooking = (service = "Product MVP") => {
    setPresetService(service);
    setBookingOpen(true);
  };

  const screens = [
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
      title: "Admin Dashboard",
      sub: "SaaS analytics & business operations portal",
    },
    {
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
      title: "Mobile App Development",
      sub: "Cross-platform iOS and Android apps built with React Native",
    },
    {
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
      title: "Marketing Website",
      sub: "SEO-optimized, conversion-focused fast landing page",
    },
    {
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
      title: "UI/UX Design & Wireframing",
      sub: "Modern Figma design system and interactive mockups",
    },
  ];

  const caseStudies = [
    {
      title: "D2C Marketplace",
      metric: "Live in 28 days",
      desc: "Designed and engineered an online storefront with complex cart logistics.",
    },
    {
      title: "B2B SaaS Dashboard",
      metric: "MVP shipped · pilot live",
      desc: "Launched a multi-tenant corporate platform with interactive analytics.",
    },
    {
      title: "Fintech Ops Console",
      metric: "Automated verification",
      desc: "Streamlined customer onboarding workflows and payment triggers.",
    },
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
              <span className="inline-block w-6 h-6 rounded bg-gradient-to-br from-[#F3C853] via-[#D4AF37] to-[#8a6d1f] grid place-items-center shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                <span className="text-black font-display font-bold text-xs">A</span>
              </span>
              <span className="text-xs text-white/40 font-medium tracking-wider uppercase">Ask Array Tech</span>
            </div>
          </div>

          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.06] backdrop-blur-md px-4 py-2">
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/85 font-medium">
                Product Design & Engineering
              </span>
            </div>

            <h1 className="font-display mt-6 text-4xl md:text-6xl text-white font-bold leading-[1.1] tracking-tight">
              MVP Development for Startups
            </h1>

            <p className="mt-8 text-base md:text-lg text-white/60 leading-relaxed font-light">
              Transform your vision into a functioning product with a specialized{" "}
              <strong>MVP development company India</strong>. We provide custom{" "}
              <strong>startup product development</strong> services designed to help founders validate their ideas and{" "}
              achieve market-fit. From <strong>startup website development</strong> using high-conversion components{" "}
              to custom <strong>startup app development</strong> for iOS and Android, we build production-ready{" "}
              applications under one quiet roof. Our execution compresses months of development into weeks, delivering{" "}
              interactive admin dashboards, sleek Figma design systems, scalable SaaS MVPs, and detailed user flows.{" "}
              Skip hiring individual freelance developers—our team works as your dedicated product partner to build,{" "}
              deploy, and scale your product infrastructure.
            </p>

            <button
              onClick={() => openBooking()}
              className="mt-8 bg-[#D4AF37] hover:bg-[#F3C853] text-black font-semibold rounded-full px-8 py-4 text-base h-auto gold-button-glow inline-flex items-center gap-2 group transition-all duration-300"
            >
              Book Strategy Call
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Deliverables Section */}
          <div className="mt-20 md:mt-28 border-t border-white/5 pt-16">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-4">
              Visual Snapshots of What We Ship
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-12">
              Clean interfaces, responsive code, and optimized deployments.
            </p>

            {/* Design Mockups Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {screens.map((sc, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 hover:border-[#D4AF37]/30 transition-colors group"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#161616]">
                    <img 
                      src={sc.image} 
                      alt={sc.title} 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg text-white font-medium">{sc.title}</h3>
                    <p className="text-xs text-white/55 mt-1.5 leading-relaxed">{sc.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Case Studies */}
            <div className="mt-20 border-t border-white/5 pt-16">
              <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-12">
                Proven Track Records
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {caseStudies.map((cs, idx) => (
                  <div 
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#D4AF37]/35 transition-colors"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                      Case Study
                    </span>
                    <h3 className="font-display text-xl text-white mt-3 font-medium">{cs.title}</h3>
                    <p className="text-sm text-white/60 mt-2 leading-relaxed">{cs.desc}</p>
                    <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-3 py-1 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {cs.metric}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Contact />
      <Footer />

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        presetService={presetService}
      />
    </div>
  );
}
