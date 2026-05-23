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
import { useState } from "react";
import BookingDialog from "@/components/landing/BookingDialog";

export default function Landing() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [presetService, setPresetService] = useState("");

  const openBooking = (service = "") => {
    setPresetService(service);
    setBookingOpen(true);
  };

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
    </div>
  );
}
