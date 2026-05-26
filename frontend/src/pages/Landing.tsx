// @ts-nocheck
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import Pricing from "@/components/landing/Pricing";
import ProblemSolution from "@/components/landing/ProblemSolution";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyUs from "@/components/landing/WhyUs";
import Portfolio from "@/components/landing/Portfolio";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Exclusivity from "@/components/landing/Exclusivity";
import FinalCTA from "@/components/landing/FinalCTA";
// import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import BookingDialog from "@/components/landing/BookingDialog";

export default function Landing() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [presetService, setPresetService] = useState("");
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  const openBooking = (service = "") => {
    setPresetService(service);
    setBookingOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroHeight = heroEl.offsetHeight;
        if (window.scrollY > heroHeight - 100) {
          setShowFloatingBtn(true);
        } else {
          setShowFloatingBtn(false);
        }
      } else {
        if (window.scrollY > 500) {
          setShowFloatingBtn(true);
        } else {
          setShowFloatingBtn(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white"
      data-testid="landing-root"
    >
      <Navbar onBookSlot={openBooking} />
      <Hero onBookSlot={openBooking} />
      <TrustBar />
      <Pricing onBookSlot={openBooking} />
      <ProblemSolution />
      <HowItWorks onBookSlot={openBooking} />
      <WhyUs />
      <Portfolio />
      {/* <Testimonials /> */}
      <FAQ />
      <Exclusivity />
      <FinalCTA onBookSlot={openBooking} />
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
          onClick={() => openBooking("General Consultation")}
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
