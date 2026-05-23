import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Calendar,
  Zap,
  CreditCard,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Users
} from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import BookingDialog from "@/components/landing/BookingDialog";

export default function IdeaToRevenuePage() {
  useMeta({
    title: "Idea to Revenue Startup Launch Package | Ask Array Tech",
    description: "Launch your startup from idea to revenue in 30 days. We provide comprehensive company setup, MVP product development, marketing setup, and payment integration as your single execution partner.",
    canonicalUrl: "https://www.askarray.in/idea-to-revenue",
  });

  const [bookingOpen, setBookingOpen] = useState(false);
  const [presetService, setPresetService] = useState("Idea to Revenue");

  const openBooking = (service = "Idea to Revenue") => {
    setPresetService(service);
    setBookingOpen(true);
  };

  const weeks = [
    {
      week: "Week 1",
      title: "Company Setup & Branding",
      icon: ShieldCheck,
      details: [
        "Company incorporation (Private Limited, LLP or OPC)",
        "GST, MSME/Udyam & DPIIT registration assistance",
        "Visual identity kit (Custom logo design, color guidelines & typography)",
        "Core corporate documentation and founders agreement"
      ]
    },
    {
      week: "Week 2",
      title: "Product MVP & Design",
      icon: Zap,
      details: [
        "Figma UI/UX high-fidelity wireframing",
        "Frontend & backend engineering architecture design",
        "Custom landing page or app interface design",
        "Database schema and secure API integration setup"
      ]
    },
    {
      week: "Week 3",
      title: "Product Building & Marketing Setup",
      icon: Calendar,
      details: [
        "MVP product development and initial builds testing",
        "Ad account configurations (Meta Ads, Google Ads)",
        "Onboarding on 4 key social channels with customized headers",
        "Pixel implementation and conversion tracking setup"
      ]
    },
    {
      week: "Week 4",
      title: "Launch Infrastructure & Operations",
      icon: Rocket,
      details: [
        "Payment gateway setup & onboarding support (e.g. Razorpay)",
        "Production deployment (Vercel, AWS or Render)",
        "Final quality audits, security checks & browser testing",
        "Public launch and handoff of the operating system"
      ]
    }
  ];

  const cadence = [
    {
      title: "Daily Standups & Reports",
      desc: "Get transparent daily updates on slack to keep track of every detail.",
    },
    {
      title: "Weekly Direct Strategy Reviews",
      desc: "Weekly video calls to align on deliverables, check iterations, and approve layouts.",
    },
    {
      title: "Dedicated Launch Manager",
      desc: "A single contact point managing CA coordination, development, design, and operations.",
    }
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
                The 30-Day Launch Package
              </span>
            </div>

            <h1 className="font-display mt-6 text-4xl md:text-6xl text-white font-bold leading-[1.1] tracking-tight">
              Idea to Revenue in 30 Days
            </h1>

            <p className="mt-8 text-base md:text-lg text-white/60 leading-relaxed font-light">
              Accelerate your path to traction with our complete <strong>idea to revenue startup</strong> package. 
              Ask Array Tech operates as your dedicated <strong>startup execution partner</strong>, delivering 
              comprehensive, elite-level <strong>startup launch support</strong> and a solid <strong>startup growth setup</strong>. 
              Instead of wasting months managing disconnected agencies, designers, CAs, and freelancers, we consolidate 
              the entire setup under a single, unified execution engine. From legal company setup to product MVP engineering, 
              marketing infrastructure, branding, and payment gateway onboarding, we build your startup's operational 
              backbone so you are ready to process revenue and scale starting on day 30.
            </p>

            <button
              onClick={() => openBooking()}
              className="mt-8 bg-[#D4AF37] hover:bg-[#F3C853] text-black font-semibold rounded-full px-8 py-4 text-base h-auto gold-button-glow inline-flex items-center gap-2 group transition-all duration-300"
            >
              Book Strategy Call
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Roadmap Section */}
          <div className="mt-20 md:mt-28 border-t border-white/5 pt-16">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-4">
              The 30-Day Execution Roadmap
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-12">
              How we compress legal incorporation, design, MVP engineering, and marketing into 4 weeks.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {weeks.map((wk, idx) => {
                const Icon = wk.icon;
                return (
                  <div 
                    key={idx}
                    className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#121212] to-[#0a0a0a] p-6 hover:border-[#D4AF37]/35 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-3 py-1 rounded-full">
                        {wk.week}
                      </span>
                      <span className="inline-grid place-items-center w-8 h-8 rounded-lg bg-white/5 text-white/70 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                        <Icon size={16} />
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-white font-medium mb-4">{wk.title}</h3>
                    <ul className="space-y-3">
                      {wk.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-white/60 leading-relaxed">
                          <span className="text-[#D4AF37] mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Operational Cadence Section */}
          <div className="mt-20 md:mt-28 border-t border-white/5 pt-16">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-4">
              Operational Cadence
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-12">
              We operate with maximum speed and complete transparency.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {cadence.map((item, idx) => (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#D4AF37]/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4">
                    <CheckCircle2 size={16} />
                  </div>
                  <h3 className="font-display text-base text-white font-medium">{item.title}</h3>
                  <p className="text-xs text-white/55 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
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
