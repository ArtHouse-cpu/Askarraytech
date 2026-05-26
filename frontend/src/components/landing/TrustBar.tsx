import React, { useState } from "react";
import {
  Target,
  Rocket,
  Calendar,
  Users,
  Shield,
  Clock,
  Linkedin,
  ArrowRight,
} from "lucide-react";

import BookingDialog from "./BookingDialog";

export default function TrustBar() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="bg-white py-12 md:py-24" data-testid="trust-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Hero Card */}
        <div className="flex flex-col lg:flex-row bg-[#FAF8F5] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-sm border border-gray-100">
          {/* Left Image */}
          <div className="w-full lg:w-[45%] relative min-h-[500px] lg:min-h-[700px]">
            <img
              src="https://res.cloudinary.com/dzwto9zbu/image/upload/v1779813043/ChatGPT_Image_May_26_2026_10_00_07_PM_b2c3ew.png"
              alt="Ankur Anand"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 bg-black/30 backdrop-blur-md border border-white/10 text-white p-4 md:p-8 rounded-3xl md:max-w-[320px] shadow-2xl">
              <h3
  style={{
    fontFamily:
      "'Brush Script MT', 'Dancing Script', 'Great Vibes', cursive",
  }}
  className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-white text-4xl md:text-5xl mb-3 tracking-wide font-normal"
>
  Ankur Anand
</h3>
              <p className="font-bold text-lg md:text-xl mb-1">Founder</p>
              <p className="text-sm text-gray-300 font-medium tracking-wide">
                Founder • Builder • Operator
              </p>
              {/* <div className="w-full h-[1.5px] bg-gray-700/50 my-5"></div> */}
              <br/>
              <div className="bg-[#D4AF37] p-1.5 rounded-lg inline-flex items-center justify-center">
                <a
                  href="https://www.linkedin.com/in/2004-ankur-anand"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="inline-flex items-center justify-center"
                >
                  <Linkedin
                    className="w-5 h-5 text-black hover:text-[#0A66C2] transition-colors"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[55%] p-6 py-12 md:p-16 lg:p-20 flex flex-col justify-center">
            <div className="text-[#D4AF37] text-7xl font-serif font-bold leading-none mb-4 -mt-8">
              “
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111] mb-8 leading-tight tracking-tight">
              It's <span className="text-[#D4AF37]">painful</span> watching
              <br className="hidden lg:block" /> great ideas stay stuck.
            </h2>

            <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                It's painful watching ambitious founders spend months figuring
                out incorporation, banking, developers, landing pages, branding,
                ad accounts, compliance and endless coordination — instead of
                actually building their business.
              </p>
              <p>
                I've personally seen how operational chaos kills momentum,
                delays launches and drains founder energy before the real
                journey even begins.
              </p>
              <p className="text-[#D4AF37] font-bold text-base md:text-lg">
                That's exactly why we exist.
              </p>
              <p>
                To help serious founders launch faster — legally, digitally and
                strategically — without dealing with scattered vendors,
                confusing processes or unnecessary delays.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex items-start gap-4 p-5 bg-[#F4EFE6] rounded-2xl">
                <Target className="text-[#D4AF37] shrink-0 w-6 h-6 mt-0.5" />
                <p className="text-sm text-gray-800 leading-relaxed">
                  <span className="font-semibold block mb-0.5">
                    You focus on building your vision.
                  </span>
                  We help set up the system around it.
                </p>
              </div>
              <div className="flex items-start gap-4 p-5">
                <Rocket className="text-[#D4AF37] shrink-0 w-6 h-6 mt-0.5" />
                <p className="text-sm text-gray-800 leading-relaxed">
                  <span className="font-semibold block mb-0.5">
                    Your dream deserves{" "}
                    <span className="text-[#D4AF37]">execution</span>.
                  </span>
                  Not endless planning.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse xl:flex-row items-center xl:items-start gap-6 pt-6">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full xl:w-auto bg-[#0a0a0a] text-[#D4AF37] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shrink-0"
              >
                Let's Connect <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex flex-row items-center gap-4 text-xs md:text-sm text-gray-600 border-l-0 xl:border-l-2 xl:border-gray-200 xl:pl-6">
                <Calendar
                  className="w-10 h-10 text-[#D4AF37] shrink-0"
                  strokeWidth={1.5}
                />
                <p className="leading-tight text-left">
                  <span className="font-bold text-black block mb-1">
                    We onboard only a few startups every month.
                  </span>
                  Focused. Selective. Effective.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="bg-[#FAF8F5] rounded-[24px] md:rounded-[32px] p-4 md:p-8 mt-6 md:mt-8 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Stat 1 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-50 flex flex-col xl:flex-row items-center xl:items-start gap-3 md:gap-4 text-center xl:text-left">
              <div className="bg-[#FAF8F5] p-3 md:p-4 rounded-full shrink-0 border border-gray-100 text-[#D4AF37]">
                <Users className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center h-full">
                <h4 className="font-bold text-lg md:text-xl text-black mb-1">
                  25+
                </h4>
                <p className="text-[11px] md:text-xs text-gray-600 font-medium leading-snug">
                  Startups Supported
                  <br />
                  Across India
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-50 flex flex-col xl:flex-row items-center xl:items-start gap-3 md:gap-4 text-center xl:text-left">
              <div className="bg-[#FAF8F5] p-3 md:p-4 rounded-full shrink-0 border border-gray-100 text-[#D4AF37]">
                <Rocket className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center h-full">
                <h4 className="font-bold text-lg md:text-xl text-black mb-1">
                  5+
                </h4>
                <p className="text-[11px] md:text-xs text-gray-600 font-medium leading-snug">
                  Years of Startup
                  <br />
                  Execution Experience
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-50 flex flex-col xl:flex-row items-center xl:items-start gap-3 md:gap-4 text-center xl:text-left">
              <div className="bg-[#FAF8F5] p-3 md:p-4 rounded-full shrink-0 border border-gray-100 text-[#D4AF37]">
                <Shield className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center h-full">
                <h4 className="font-bold text-sm md:text-base text-black mb-1 leading-tight">
                  End-to-End Support
                </h4>
                <p className="text-[11px] md:text-xs text-gray-600 font-medium leading-snug">
                  Legal, Digital & Marketing
                  <br />
                  Setup Support
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-50 flex flex-col xl:flex-row items-center xl:items-start gap-3 md:gap-4 text-center xl:text-left">
              <div className="bg-[#FAF8F5] p-3 md:p-4 rounded-full shrink-0 border border-gray-100 text-[#D4AF37]">
                <Clock className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center h-full">
                <h4 className="font-bold text-sm md:text-base text-black mb-1 leading-tight">
                  Faster Launch.
                </h4>
                <p className="text-[11px] md:text-xs text-gray-600 font-medium leading-snug">
                  Smarter Execution.
                  <br />
                  Stronger Growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingDialog 
        open={isBookingOpen} 
        onOpenChange={setIsBookingOpen} 
        presetService=""
      />
    </section>
  );
}
