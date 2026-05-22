import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Globe, CheckCircle, Shield, AlertTriangle } from "lucide-react";
import { BRAND } from "@/lib/brand";

const SECTIONS = [
  { id: "introduction", label: "1. Introduction" },
  { id: "nature-of-services", label: "2. Nature of Services" },
  { id: "company-setup-services", label: "3. Company Setup Services" },
  { id: "disclaimer-company-setup", label: "4. Disclaimer - Company Setup" },
  { id: "government-process", label: "5. Government & Regulatory Process" },
  { id: "mvp-services", label: "6. MVP / Product Development" },
  { id: "infrastructure-exclusions", label: "7. Technical Infrastructure Exclusions" },
  { id: "mvp-limitation", label: "8. MVP Limitation of Liability" },
  { id: "marketing-setup", label: "9. Marketing Setup Services" },
  { id: "idea-to-revenue", label: "10. Idea to Revenue Disclaimer" },
  { id: "consultation-policy", label: "11. Consultation Strategy Call Policy" },
  { id: "payment-terms", label: "12. Payment Terms" },
  { id: "client-responsibilities", label: "13. Client Responsibilities" },
  { id: "third-party-services", label: "14. Third-Party Services" },
  { id: "intellectual-property", label: "15. Intellectual Property" },
  { id: "confidentiality-data", label: "16. Confidentiality & Data Protection" },
  { id: "privacy-policy", label: "17. Privacy Policy" },
  { id: "confidentiality-safeguards", label: "18. Confidentiality Safeguards" },
  { id: "no-guarantee", label: "19. No Guarantee Clause" },
  { id: "termination", label: "20. Termination of Engagement" },
  { id: "limitation-of-liability", label: "21. Limitation of Liability" },
  { id: "force-majeure", label: "22. Force Majeure" },
  { id: "modification-terms", label: "23. Modification of Terms" },
  { id: "jurisdiction", label: "24. Jurisdiction" },
  { id: "professional-advisory", label: "25. Professional Advisory Disclaimer" },
  { id: "client-approval", label: "26. Client Approval Responsibility" },
  { id: "document-authenticity", label: "27. Document Authenticity" },
  { id: "communication-policy", label: "28. Communication Policy" },
  { id: "delivery-revision", label: "29. Delivery & Revision Policy" },
  { id: "project-abandonment", label: "30. Project Abandonment Policy" },
  { id: "no-employment", label: "31. No Employment / Partnership" },
  { id: "data-access", label: "32. Data & Access Responsibility" },
  { id: "platform-disclaimer", label: "33. Platform & Third-Party Approval" },
  { id: "performance-disclaimer", label: "34. Performance & Marketing" },
  { id: "indemnity", label: "35. Indemnity" },
  { id: "right-to-refuse", label: "36. Right to Refuse Service" },
  { id: "contact", label: "37. Contact Information" },
  { id: "final-acknowledgement", label: "38. Final Acknowledgement" }
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("introduction");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Scroll spy logic using IntersectionObserver
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find the first entry that is intersecting
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) {
        setActiveSection(visible.target.id);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-10% 0px -75% 0px",
      threshold: 0,
    });

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el && observer.current) {
        observer.current.observe(el);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // offset to account for sticky header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans antialiased selection:bg-stone-200 selection:text-stone-900">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={BRAND.logoMark}
              alt="Ask Array Tech Logo"
              className="w-8 h-8 rounded bg-black object-contain"
            />
            <span className="font-display font-medium text-sm tracking-[0.2em] uppercase text-stone-900">
              ASK ARRAY <span className="text-[#B8860B]">TECH</span>
            </span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-[280px_1fr] gap-12 items-start">
        
        {/* Sticky Sidebar Outline for Desktop */}
        <aside className="hidden lg:block sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-4 border-r border-stone-200 scrollbar-thin scrollbar-thumb-stone-200">
          <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold mb-6">
            Document Outline
          </p>
          <nav className="space-y-1">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs font-medium tracking-wide transition-all ${
                  activeSection === sec.id
                    ? "bg-[#B8860B]/10 text-[#8B6508] border-l-2 border-[#B8860B] pl-4"
                    : "text-stone-500 hover:text-stone-900 hover:bg-stone-100/50"
                }`}
              >
                {sec.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* The White Sheet */}
        <main className="w-full">
          <article className="bg-white rounded-2xl border border-stone-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 md:p-16 max-w-4xl mx-auto relative overflow-hidden">
            {/* Fine line details on paper to feel like letterhead */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B8860B]" />
            
            {/* Header info */}
            <div className="border-b border-stone-200 pb-8 mb-10 text-center md:text-left">
              <h1 className="font-display font-semibold text-3xl md:text-4xl tracking-tight text-stone-900 leading-tight">
                Terms of Service, Commercials, Delivery Policy &amp; Client Engagement Framework
              </h1>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-stone-500">
                <div>
                  <span className="font-semibold text-stone-700">Company:</span> Ask Array Tech
                </div>
                <div>
                  <span className="font-semibold text-stone-700">Effective Date:</span> 20 February 2026
                </div>
              </div>
            </div>

            {/* Document Content */}
            <div className="space-y-10 text-stone-600 leading-relaxed text-sm md:text-base">
              
              {/* 1. Introduction */}
              <section id="introduction" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  1. INTRODUCTION
                </h2>
                <p className="mb-4">
                  Welcome to Ask Array Tech.
                </p>
                <p className="mb-4 font-medium text-stone-700">
                  Ask Array Tech provides startup execution support services including:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                  <li>Company Setup &amp; Startup Registration Assistance</li>
                  <li>MVP / Product Development Support</li>
                  <li>Marketing Setup &amp; Launch Infrastructure</li>
                  <li>Startup Execution Consulting</li>
                  <li>Idea-to-Launch Coordination Services</li>
                </ul>
                <p className="mb-4">
                  By engaging with Ask Array Tech, booking a consultation, making payment, or availing any service, the client agrees to the terms, policies, disclaimers and commercial conditions mentioned below.
                </p>
                <p>
                  These terms are intended to ensure transparency, professional clarity, smooth execution and mutual understanding between both parties.
                </p>
              </section>

              {/* 2. Nature of Services */}
              <section id="nature-of-services" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  2. NATURE OF SERVICES
                </h2>
                <p className="mb-4">
                  Ask Array Tech primarily operates as a startup execution and coordination platform.
                </p>
                <p className="mb-4 font-medium text-stone-700">
                  Execution of services may be carried out through:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                  <li>Internal/core team members</li>
                  <li>Associated professionals</li>
                  <li>Third-party experts</li>
                  <li>External CA/CS/legal/accounting partners</li>
                  <li>Technology partners</li>
                  <li>Freelance or contract-based execution associates</li>
                </ul>
                <p className="mb-4">
                  Depending upon the scope of engagement, certain deliverables may be executed partially or fully by external professional partners.
                </p>
                <p className="mb-2 font-medium text-stone-700">
                  The client acknowledges and agrees that:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Ask Array Tech acts as a coordination, execution and management partner.</li>
                  <li>Certain registrations, approvals, filings or technical services are dependent upon third-party professionals and/or government authorities.</li>
                  <li>Timelines may vary depending upon government processing timelines, external partner availability, client responsiveness, technical scope or regulatory changes.</li>
                </ul>
              </section>

              {/* 3. Company Setup Services */}
              <section id="company-setup-services" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  3. COMPANY SETUP SERVICES
                </h2>
                
                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  3.1 Scope of Services
                </h3>
                <p className="mb-2">Company setup services may include:</p>
                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                  <li>Private Limited Company Incorporation</li>
                  <li>LLP Registration</li>
                  <li>OPC Registration</li>
                  <li>PAN/TAN Application</li>
                  <li>GST Registration Assistance</li>
                  <li>MSME/Udyam Registration</li>
                  <li>Startup India (DPIIT) Assistance</li>
                  <li>Basic Documentation Coordination</li>
                  <li>Bank Account Opening Assistance</li>
                  <li>Payment Gateway Assistance (if applicable)</li>
                  <li>Standard Legal Templates</li>
                </ul>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  3.2 Deliverables
                </h3>
                <p className="mb-2">Depending on the selected package, deliverables may include:</p>
                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                  <li>Certificate of Incorporation</li>
                  <li>PAN &amp; TAN</li>
                  <li>GST Certificate</li>
                  <li>MSME Certificate</li>
                  <li>Startup India Recognition Assistance</li>
                  <li>Standard Founders Agreement Templates</li>
                  <li>NDA Templates</li>
                  <li>Basic Employment Agreement Templates</li>
                  <li>Vendor Agreement Templates</li>
                  <li>Invoice Templates</li>
                  <li>Business Documentation Templates</li>
                  <li>Bank Account Opening Assistance</li>
                  <li>Payment Gateway Assistance</li>
                </ul>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  3.3 Additional Director / Partner Charges
                </h3>
                <p>
                  Commercials generally include up to 2 directors/partners. Any additional director/partner/shareholder may attract additional charges.
                </p>
              </section>

              {/* 4. Disclaimer - Company Setup */}
              <section id="disclaimer-company-setup" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  4. IMPORTANT DISCLAIMER – COMPANY SETUP
                </h2>
                <div className="bg-stone-50 border-l-2 border-[#B8860B] p-4 rounded-r-lg mb-4">
                  <p className="text-stone-700 font-medium mb-2">
                    The company setup package commercials cover only incorporation/setup-related activities.
                  </p>
                  <p className="text-stone-600 mb-2">
                    The following are NOT included unless specifically mentioned:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-stone-600">
                    <li>Annual ROC Compliance</li>
                    <li>Monthly GST Filings</li>
                    <li>Quarterly Filings</li>
                    <li>Income Tax Return Filings</li>
                    <li>Accounting/Bookkeeping</li>
                    <li>Audit Services</li>
                    <li>Payroll Management</li>
                    <li>Trademark Registration</li>
                    <li>Secretarial Compliance</li>
                    <li>FEMA/International Compliance</li>
                    <li>Ongoing Legal Advisory</li>
                  </ul>
                </div>
                <p className="mb-2 font-medium text-stone-700">Clients may:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>avail additional yearly compliance support packages from Ask Array Tech; OR</li>
                  <li>engage independent professionals for ongoing compliance.</li>
                </ul>
                <p className="mt-3">
                  Ask Array Tech may recommend third-party professionals for the same.
                </p>
              </section>

              {/* 5. Government & Regulatory Process Disclaimer */}
              <section id="government-process" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  5. GOVERNMENT &amp; REGULATORY PROCESS DISCLAIMER
                </h2>
                <p className="mb-2 font-medium text-stone-700">Certain services depend upon:</p>
                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                  <li>MCA approvals</li>
                  <li>GST department processing</li>
                  <li>Startup India approvals</li>
                  <li>Bank verification processes</li>
                  <li>Payment gateway KYC reviews</li>
                  <li>Government portal availability</li>
                  <li>Regulatory timelines</li>
                </ul>
                <div className="bg-amber-50/50 border-l-2 border-amber-500/65 p-4 rounded-r-lg mb-4">
                  <p className="font-medium text-amber-950/80 mb-2">
                    Ask Array Tech shall not be held liable for delays caused due to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-amber-900/80">
                    <li>Government processing timelines</li>
                    <li>Regulatory changes</li>
                    <li>Technical portal issues</li>
                    <li>Rejection due to incomplete documents</li>
                    <li>Banking partner requirements</li>
                    <li>Client-side delays</li>
                    <li>Changes in law/policy</li>
                  </ul>
                </div>
                <p className="italic text-stone-500">
                  All timelines shared are estimated timelines only.
                </p>
              </section>

              {/* 6. MVP / Product Development Services */}
              <section id="mvp-services" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  6. MVP / PRODUCT DEVELOPMENT SERVICES
                </h2>
                
                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  6.1 Nature of Services
                </h3>
                <p className="mb-2">Ask Array Tech assists founders with:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4 flex flex-wrap md:grid md:grid-cols-2 gap-x-6 gap-y-1">
                  <li>Landing Pages</li>
                  <li>Website Development</li>
                  <li>Web Applications</li>
                  <li>Mobile Applications</li>
                  <li>MVP Development</li>
                  <li>UI/UX Design</li>
                  <li>Admin Dashboards</li>
                  <li>AI Integrations</li>
                  <li>Product Prototyping</li>
                  <li>Startup Validation Infrastructure</li>
                </ul>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  6.2 Important Commercial Disclaimer
                </h3>
                <p className="mb-3">
                  The advertised/commercialized MVP package pricing (including ₹99,000 bundle references) is primarily intended for:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                  <li>Landing Pages</li>
                  <li>Basic Validation Platforms</li>
                  <li>Service-based Platforms</li>
                  <li>Startup Validation MVPs</li>
                  <li>Early-stage Product Testing</li>
                  <li>Lightweight Business Platforms</li>
                </ul>
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl mb-4">
                  <p className="font-medium text-stone-800 mb-2">
                    Complex applications including but not limited to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>SaaS Platforms</li>
                    <li>Large-scale Mobile Apps</li>
                    <li>Custom Enterprise Software</li>
                    <li>AI-heavy Applications</li>
                    <li>Marketplace Platforms</li>
                    <li>Multi-role Systems</li>
                    <li>ERP/CRM Systems</li>
                    <li>Advanced Automation Platforms</li>
                  </ul>
                  <p className="mt-3 text-stone-700 font-semibold text-sm">
                    shall require separate commercial evaluation.
                  </p>
                </div>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  6.3 Scope &amp; Timeline Disclaimer
                </h3>
                <p className="mb-2 font-medium text-stone-700">
                  Final:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li>project scope</li>
                  <li>technical requirements</li>
                  <li>timeline</li>
                  <li>commercials</li>
                  <li>milestones</li>
                  <li>integrations</li>
                  <li>infrastructure requirements</li>
                </ul>
                <p className="mb-4">
                  shall be finalized only after detailed requirement discussion and technical evaluation.
                </p>
                <p className="font-semibold text-[#8B6508]">
                  No public pricing displayed by Ask Array Tech shall be considered final for custom software projects.
                </p>
              </section>

              {/* 7. Technical Infrastructure Exclusions */}
              <section id="infrastructure-exclusions" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  7. TECHNICAL INFRASTRUCTURE EXCLUSIONS
                </h2>
                <p className="mb-3">
                  Unless specifically mentioned in writing, the following are NOT included in development commercials:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-4 flex flex-wrap md:grid md:grid-cols-2 gap-x-6 gap-y-1">
                  <li>Domain Charges</li>
                  <li>Hosting Charges</li>
                  <li>Server Charges</li>
                  <li>Cloud Infrastructure Charges</li>
                  <li>Third-party API Charges</li>
                  <li>SMS/Email Service Charges</li>
                  <li>Apple Developer Account Fees</li>
                  <li>Google Play Console Fees</li>
                  <li>Paid Plugins</li>
                  <li>Premium Licenses</li>
                  <li>AI Usage/API Credits</li>
                  <li>Database Scaling Costs</li>
                  <li>CDN Charges</li>
                  <li>Security Certificates</li>
                  <li>Maintenance Costs</li>
                  <li>Third-party Subscription Fees</li>
                </ul>
                <p className="font-medium text-stone-700">
                  These costs shall either be paid directly by the client or be billed separately.
                </p>
              </section>

              {/* 8. MVP Development Limitation of Liability */}
              <section id="mvp-limitation" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  8. MVP DEVELOPMENT LIMITATION OF LIABILITY
                </h2>
                <p className="mb-3">
                  Ask Array Tech provides execution support and technical development assistance.
                </p>
                <div className="bg-rose-50/30 border-l-2 border-rose-500/50 p-4 rounded-r-lg mb-4">
                  <p className="font-medium text-rose-950/80 mb-2">
                    However, outcomes such as:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-rose-900/80 mb-3">
                    <li>business success</li>
                    <li>funding</li>
                    <li>user adoption</li>
                    <li>product-market fit</li>
                    <li>revenue generation</li>
                    <li>profitability</li>
                    <li>customer acquisition</li>
                  </ul>
                  <p className="font-semibold text-rose-900/90">
                    cannot be guaranteed.
                  </p>
                </div>
                <p>
                  The client acknowledges that startup execution inherently involves business risks.
                </p>
              </section>

              {/* 9. Marketing Setup Services */}
              <section id="marketing-setup" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  9. MARKETING SETUP SERVICES
                </h2>
                
                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  9.1 Scope of Services
                </h3>
                <p className="mb-2">Marketing setup services may include:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4 flex flex-wrap md:grid md:grid-cols-2 gap-x-6 gap-y-1">
                  <li>Logo Setup</li>
                  <li>Brand Kit</li>
                  <li>Social Media Setup</li>
                  <li>LinkedIn Setup</li>
                  <li>Instagram Setup</li>
                  <li>Facebook Setup</li>
                  <li>WhatsApp Channel Setup</li>
                  <li>Ad Account Setup</li>
                  <li>Pixel Setup</li>
                  <li>Campaign Structure Guidance</li>
                  <li>Basic Launch Strategy Guidance</li>
                </ul>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  9.2 Important Clarification
                </h3>
                <p className="mb-3 font-medium text-stone-700">
                  Marketing setup services are intended to help founders establish brand presence, create launch infrastructure, set up marketing systems, and prepare digital foundations.
                </p>
                <p className="mb-2">
                  Unless specifically agreed in writing, Ask Array Tech does NOT:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>manage social media accounts continuously</li>
                  <li>create daily content</li>
                  <li>run/manage advertisements</li>
                  <li>guarantee leads/sales</li>
                  <li>provide long-term marketing management</li>
                </ul>
                <p className="mt-3">
                  Ongoing marketing management may be offered separately under additional commercial agreements.
                </p>
              </section>

              {/* 10. Idea to Revenue Package Disclaimer */}
              <section id="idea-to-revenue" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  10. IDEA TO REVENUE PACKAGE DISCLAIMER
                </h2>
                <p className="mb-3 font-medium text-stone-700">
                  The “Idea to Revenue” package is designed to help founders legally start their business, launch a validation-ready product, establish initial digital presence, and prepare launch infrastructure.
                </p>
                <p className="mb-2">
                  This package does NOT guarantee:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                  <li>funding</li>
                  <li>revenue</li>
                  <li>customers</li>
                  <li>business growth</li>
                  <li>profitability</li>
                  <li>investor interest</li>
                </ul>
                <p className="mb-2 font-medium text-stone-700">
                  Business performance depends upon:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>founder execution</li>
                  <li>market demand</li>
                  <li>product quality</li>
                  <li>operational efficiency</li>
                  <li>customer experience</li>
                  <li>business strategy</li>
                </ul>
              </section>

              {/* 11. Consultation Strategy Call Policy */}
              <section id="consultation-policy" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  11. CONSULTATION / STRATEGY CALL POLICY
                </h2>
                <p className="mb-4">
                  Ask Array Tech may charge consultation or strategy session fees.
                </p>
                
                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  11.1 Non-Refundable Booking Fees
                </h3>
                <p className="mb-2 font-medium text-stone-700">
                  Strategy call / slot booking fees are generally non-refundable because:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                  <li>consultation slots are limited</li>
                  <li>time is blocked exclusively for the founder</li>
                  <li>internal evaluation and preparation may begin before the session</li>
                  <li>onboarding capacity is intentionally restricted</li>
                </ul>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  11.2 Partial Refund Exception
                </h3>
                <p className="mb-2">
                  In certain mutually agreed situations, partial refunds (up to 50%) may be considered only when:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3">
                  <li>both parties mutually decide not to proceed; OR</li>
                  <li>service suitability mismatch is identified during initial evaluation.</li>
                </ul>
                <p className="italic">
                  Refund decisions shall remain solely at the discretion of Ask Array Tech.
                </p>
              </section>

              {/* 12. Payment Terms */}
              <section id="payment-terms" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  12. PAYMENT TERMS
                </h2>
                
                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  12.1 General Terms
                </h3>
                <p className="mb-4">
                  Depending on project nature, Ask Array Tech may require:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                  <li>100% advance payment; OR</li>
                  <li>70–80% advance payment before execution.</li>
                </ul>
                <p className="mb-4">
                  Remaining payment terms shall be communicated case-to-case.
                </p>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  12.2 Delay in Payment
                </h3>
                <p className="mb-2 font-medium text-stone-700">
                  Project execution may be:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-4 flex gap-4">
                  <li className="bg-stone-100 px-3 py-1 rounded text-xs">paused</li>
                  <li className="bg-stone-100 px-3 py-1 rounded text-xs">delayed</li>
                  <li className="bg-stone-100 px-3 py-1 rounded text-xs">withheld</li>
                  <li className="bg-stone-100 px-3 py-1 rounded text-xs">deprioritized</li>
                </ul>
                <p className="mb-4">
                  in case of delayed payments.
                </p>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  12.3 No Deliverable Release Without Payment
                </h3>
                <p>
                  Final files, credentials, deployment access or project handover may be withheld until complete payment clearance.
                </p>
              </section>

              {/* 13. Client Responsibilities */}
              <section id="client-responsibilities" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  13. CLIENT RESPONSIBILITIES
                </h2>
                <p className="mb-2 font-medium text-stone-700">The client agrees to:</p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3">
                  <li>provide accurate information,</li>
                  <li>share documents timely,</li>
                  <li>respond within reasonable timelines,</li>
                  <li>avoid abusive or unreasonable communication,</li>
                  <li>cooperate during execution.</li>
                </ul>
                <p>
                  Delays caused due to client-side communication or document submission may affect timelines.
                </p>
              </section>

              {/* 14. Third-Party Services */}
              <section id="third-party-services" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  14. THIRD-PARTY SERVICES
                </h2>
                <p className="mb-2">
                  Certain services may involve third-party providers including:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-4 flex flex-wrap gap-x-4">
                  <li>payment gateways,</li>
                  <li>cloud providers,</li>
                  <li>hosting companies,</li>
                  <li>government portals,</li>
                  <li>CA/CS professionals,</li>
                  <li>APIs,</li>
                  <li>software tools.</li>
                </ul>
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl">
                  <p className="font-medium text-stone-800 mb-2">
                    Ask Array Tech shall not be responsible for:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>downtime</li>
                    <li>rejection</li>
                    <li>suspension</li>
                    <li>pricing changes</li>
                    <li>service outages</li>
                    <li>compliance actions</li>
                  </ul>
                  <p className="mt-3 text-xs text-stone-500">
                    caused by third-party providers.
                  </p>
                </div>
              </section>

              {/* 15. Intellectual Property */}
              <section id="intellectual-property" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  15. INTELLECTUAL PROPERTY
                </h2>
                <p className="mb-2 font-medium text-stone-700">
                  Upon complete payment clearance:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>project ownership</li>
                  <li>deliverables</li>
                  <li>design assets</li>
                  <li>developed source files</li>
                </ul>
                <p className="mb-4">
                  may be transferred to the client as mutually agreed.
                </p>
                <p className="mb-2 font-medium text-stone-700">
                  Ask Array Tech reserves the right to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>showcase work in portfolio</li>
                  <li>use project references for marketing</li>
                  <li>display non-confidential work samples</li>
                </ul>
                <p className="mt-3">
                  unless restricted through written agreement.
                </p>
              </section>

              {/* 16. Confidentiality & Data Protection */}
              <section id="confidentiality-data" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  16. CONFIDENTIALITY &amp; DATA PROTECTION
                </h2>
                <p className="mb-4">
                  Ask Array Tech shall make commercially reasonable efforts to maintain confidentiality of client information. However, clients acknowledge that digital systems inherently involve certain operational and cybersecurity risks.
                </p>
                <p className="mb-2 font-medium text-stone-700">
                  Unless separately agreed through written NDA or agreement:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>general business discussions</li>
                  <li>onboarding conversations</li>
                  <li>idea discussions</li>
                  <li>operational communication</li>
                </ul>
                <p className="mt-3 font-semibold text-stone-800">
                  shall not automatically be considered legally privileged or confidential.
                </p>
              </section>

              {/* 17. Privacy Policy */}
              <section id="privacy-policy" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  17. PRIVACY POLICY
                </h2>
                
                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  17.1 Information Collection
                </h3>
                <p className="mb-2">Ask Array Tech may collect and process:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4 text-sm flex flex-wrap md:grid md:grid-cols-2 gap-x-6 gap-y-1">
                  <li>lead information</li>
                  <li>contact details</li>
                  <li>email addresses</li>
                  <li>WhatsApp numbers</li>
                  <li>business information</li>
                  <li>KYC documents</li>
                  <li>project requirements</li>
                  <li>financial/payment-related details</li>
                  <li>onboarding information</li>
                  <li>technical/project files</li>
                  <li>communication records</li>
                </ul>
                <p className="mb-2">Information may be collected through:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4 text-sm">
                  <li>website forms, Google Forms</li>
                  <li>WhatsApp, email communication</li>
                  <li>consultation calls, onboarding processes</li>
                  <li>payment systems, third-party integrations</li>
                </ul>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  17.2 Usage of Information
                </h3>
                <p className="mb-2">Collected information may be used for:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4 text-sm">
                  <li>service delivery, onboarding</li>
                  <li>operational coordination, communication</li>
                  <li>invoicing, compliance purposes</li>
                  <li>technical execution, customer support</li>
                  <li>marketing communication, internal analysis and improvement</li>
                </ul>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  17.3 Data Sharing With Partners &amp; Vendors
                </h3>
                <p className="mb-2 font-medium text-stone-700">
                  The client acknowledges and agrees that information/documents may be shared with:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-3 text-sm flex flex-wrap gap-x-4">
                  <li>internal/core teams,</li>
                  <li>CA/CS/legal professionals,</li>
                  <li>technical vendors,</li>
                  <li>developers,</li>
                  <li>infrastructure providers,</li>
                  <li>hosting/cloud partners,</li>
                  <li>payment gateway providers,</li>
                  <li>operational partners,</li>
                  <li>third-party service providers,</li>
                  <li>compliance associates,</li>
                </ul>
                <p className="mb-2">strictly on a need-to-know basis for:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>service execution, onboarding</li>
                  <li>regulatory compliance, technical deployment</li>
                  <li>operational support, project coordination</li>
                </ul>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  17.4 Communication Consent
                </h3>
                <p className="mb-2">
                  By submitting forms, contacting Ask Array Tech or availing services, the client/user consents to receiving communication via:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm flex flex-wrap gap-x-4">
                  <li>WhatsApp,</li>
                  <li>phone,</li>
                  <li>email,</li>
                  <li>SMS,</li>
                  <li>digital communication platforms,</li>
                  <li>marketing communication,</li>
                  <li>onboarding updates,</li>
                  <li>operational notifications.</li>
                </ul>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  17.5 Marketing &amp; Promotional Communication
                </h3>
                <p className="mb-2 font-medium text-stone-700">Users may receive:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                  <li>startup-related updates, launch announcements, promotional offers, newsletters, onboarding/service communication.</li>
                </ul>
                <p className="italic text-xs">
                  Users may request communication opt-out wherever applicable.
                </p>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  17.6 Cookie &amp; Analytics Usage
                </h3>
                <p className="mb-2">Ask Array Tech websites/platforms may use cookies, analytics tools, tracking technologies, pixels, and performance monitoring tools for improving:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>website performance, user experience</li>
                  <li>marketing performance, analytics and operational insights</li>
                </ul>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  17.7 Data Retention
                </h3>
                <p>
                  Ask Array Tech may retain onboarding records, invoices, agreements, project files, communication history, KYC details, and compliance records for operational, compliance, legal and dispute-resolution purposes.
                </p>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  17.8 Third-Party Platforms Disclaimer
                </h3>
                <p className="mb-2">
                  The client acknowledges that information may be processed or stored through third-party platforms including but not limited to: Google Workspace, WhatsApp, payment gateways, cloud providers, CRM systems, hosting infrastructure, and project management tools.
                </p>
                <p className="font-semibold text-stone-700">
                  Ask Array Tech shall not be liable for outages, breaches or failures originating from third-party systems.
                </p>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  17.9 Security Disclaimer
                </h3>
                <p>
                  While commercially reasonable safeguards may be implemented, Ask Array Tech does not guarantee absolute protection against cyber attacks, hacking, unauthorized access, data breaches, technical failures, and internet-based vulnerabilities.
                </p>

                <h3 className="font-semibold text-stone-800 text-sm md:text-base mt-4 mb-2">
                  17.10 Portfolio &amp; Work Showcase Rights
                </h3>
                <p className="mb-2">
                  Unless explicitly restricted through written agreement, Ask Array Tech reserves the right to:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>showcase non-confidential work,</li>
                  <li>display project screenshots,</li>
                  <li>reference executed work,</li>
                  <li>use brand/project references</li>
                </ul>
                <p className="mt-2 text-stone-700 font-medium">
                  for portfolio, case study, marketing or business development purposes.
                </p>
              </section>

              {/* 18. Confidentiality Safeguards */}
              <section id="confidentiality-safeguards" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  18. CONFIDENTIALITY &amp; CREDENTIAL SAFEGUARDS
                </h2>
                <div className="bg-amber-50/30 border border-amber-200 p-4 rounded-xl">
                  <p className="font-medium text-stone-800 mb-2">
                    Ask Array Tech shall make reasonable efforts to maintain confidentiality of client information.
                  </p>
                  <p className="text-amber-900 font-medium mb-2">
                    However, clients are advised NOT to share the following without proper NDA/legal protection:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-stone-700">
                    <li>passwords</li>
                    <li>sensitive financial credentials</li>
                    <li>confidential investor data</li>
                    <li>highly classified trade secrets</li>
                  </ul>
                </div>
              </section>

              {/* 19. No Guarantee Clause */}
              <section id="no-guarantee" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  19. NO GUARANTEE CLAUSE
                </h2>
                <p className="mb-2 font-medium text-stone-700">
                  Ask Array Tech does not guarantee:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li>funding</li>
                  <li>startup success</li>
                  <li>profitability</li>
                  <li>customer acquisition</li>
                  <li>viral growth</li>
                  <li>app approvals</li>
                  <li>government approvals</li>
                  <li>investment opportunities</li>
                </ul>
                <p className="font-medium text-stone-800">
                  All services are provided on a best-effort professional execution basis.
                </p>
              </section>

              {/* 20. Termination of Engagement */}
              <section id="termination" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  20. TERMINATION OF ENGAGEMENT
                </h2>
                <p className="mb-2 font-medium text-stone-700">
                  Ask Array Tech reserves the right to refuse, pause or terminate engagement in cases including:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3">
                  <li>abusive behavior</li>
                  <li>non-payment</li>
                  <li>unrealistic expectations</li>
                  <li>legal/regulatory concerns</li>
                  <li>unethical business models</li>
                  <li>misrepresentation</li>
                  <li>non-cooperation</li>
                </ul>
                <p className="italic">
                  Any refund in such situations shall remain discretionary.
                </p>
              </section>

              {/* 21. Limitation of Liability */}
              <section id="limitation-of-liability" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  21. LIMITATION OF LIABILITY
                </h2>
                <p className="mb-4 font-semibold text-stone-800">
                  Ask Array Tech’s total liability under any circumstance shall not exceed the amount paid by the client for the specific service engagement.
                </p>
                <p className="mb-2">
                  Ask Array Tech shall not be liable for:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>indirect losses</li>
                  <li>business losses</li>
                  <li>opportunity losses</li>
                  <li>revenue loss</li>
                  <li>startup failure</li>
                  <li>operational disruption</li>
                  <li>regulatory action</li>
                  <li>market risks</li>
                </ul>
              </section>

              {/* 22. Force Majeure */}
              <section id="force-majeure" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  22. FORCE MAJEURE
                </h2>
                <p className="mb-2">
                  Ask Array Tech shall not be liable for delays or failure caused due to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>government restrictions</li>
                  <li>internet outages</li>
                  <li>server failures</li>
                  <li>natural disasters</li>
                  <li>strikes</li>
                  <li>cyber incidents</li>
                  <li>pandemics</li>
                  <li>war</li>
                  <li>unforeseen external circumstances</li>
                </ul>
              </section>

              {/* 23. Modification of Terms */}
              <section id="modification-terms" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  23. MODIFICATION OF TERMS
                </h2>
                <p className="mb-2 font-medium text-stone-700">
                  Ask Array Tech reserves the right to update, modify, or revise these terms at any time without prior notice.
                </p>
                <p>
                  Updated versions shall become effective upon publication.
                </p>
              </section>

              {/* 24. Jurisdiction */}
              <section id="jurisdiction" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  24. JURISDICTION
                </h2>
                <p className="font-semibold text-stone-900">
                  All disputes shall be subject to the exclusive jurisdiction of courts located in Durg, Chhattisgarh, India.
                </p>
              </section>

              {/* 25. Professional Advisory Disclaimer */}
              <section id="professional-advisory" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  25. PROFESSIONAL ADVISORY DISCLAIMER
                </h2>
                <p className="mb-3">
                  Ask Array Tech is primarily a startup execution, coordination and operational support platform.
                </p>
                <div className="bg-stone-50 border-l-2 border-stone-400 p-4 rounded-r-lg">
                  <p className="mb-2 font-medium text-stone-800">
                    Unless explicitly mentioned in writing, services should NOT be interpreted as:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-stone-600">
                    <li>formal legal opinion</li>
                    <li>financial advisory</li>
                    <li>investment advisory</li>
                    <li>taxation opinion</li>
                    <li>securities advisory</li>
                    <li>guaranteed regulatory certification</li>
                    <li>guaranteed compliance clearance</li>
                  </ul>
                </div>
                <p className="mt-3">
                  Clients are advised to independently consult qualified professionals wherever required.
                </p>
              </section>

              {/* 26. Client Approval Responsibility */}
              <section id="client-approval" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  26. CLIENT APPROVAL &amp; DECISION RESPONSIBILITY
                </h2>
                <p className="mb-2 font-medium text-stone-700">
                  All final business decisions including:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-3 text-sm">
                  <li>incorporation structure, shareholding pattern</li>
                  <li>tax selection, funding structure</li>
                  <li>product decisions, launch strategy</li>
                  <li>marketing decisions, business operations</li>
                </ul>
                <p className="mb-2">
                  remain solely the responsibility of the client.
                </p>
                <p className="font-semibold text-stone-800">
                  Ask Array Tech shall not be held liable for consequences arising from business decisions made by the client.
                </p>
              </section>

              {/* 27. Document Authenticity */}
              <section id="document-authenticity" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  27. DOCUMENT &amp; INFORMATION AUTHENTICITY
                </h2>
                <p className="mb-3">
                  The client confirms that all documents, KYC details, business information, declarations, filings, and representations shared with Ask Array Tech are true, valid and legally accurate.
                </p>
                <div className="bg-rose-50/20 border border-rose-200 p-4 rounded-xl">
                  <p className="font-semibold text-rose-950 mb-2">
                    Ask Array Tech shall not be liable for any rejection, penalty, regulatory action or legal consequence arising due to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-rose-900">
                    <li>false information</li>
                    <li>forged documents</li>
                    <li>incorrect declarations</li>
                    <li>hidden liabilities</li>
                    <li>misleading representations</li>
                  </ul>
                </div>
              </section>

              {/* 28. Communication Policy */}
              <section id="communication-policy" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  28. COMMUNICATION POLICY
                </h2>
                <p className="mb-2 font-medium text-stone-700">Official communication shall be considered valid through:</p>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li>email, WhatsApp</li>
                  <li>signed documents</li>
                  <li>project management tools, written confirmations</li>
                </ul>
                <p className="mb-2">
                  Clients are responsible for reviewing and responding to communication in a timely manner.
                </p>
                <p className="font-semibold text-stone-800">
                  Ask Array Tech shall not be liable for delays arising due to delayed responses from the client.
                </p>
              </section>

              {/* 29. Delivery & Revision Policy */}
              <section id="delivery-revision" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  29. DELIVERY &amp; REVISION POLICY
                </h2>
                <p className="mb-2">
                  Reasonable revisions may be provided depending upon the nature of service.
                </p>
                <div className="bg-amber-50/20 border-l-2 border-amber-400 p-4 rounded-r-lg mb-3">
                  <p className="font-medium text-amber-900 mb-1">
                    However, the following may attract additional charges:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-stone-700">
                    <li>unlimited revisions</li>
                    <li>complete redesigns</li>
                    <li>repeated scope changes</li>
                    <li>feature additions</li>
                    <li>delayed feedback cycles</li>
                  </ul>
                </div>
                <p>
                  Any work requested outside the mutually agreed scope shall be treated as additional work.
                </p>
              </section>

              {/* 30. Project Abandonment Policy */}
              <section id="project-abandonment" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  30. PROJECT ABANDONMENT POLICY
                </h2>
                <p className="mb-2 font-medium text-stone-700">
                  If the client becomes unresponsive for more than 30 days:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3">
                  <li>execution timelines may be reset</li>
                  <li>delivery schedules may change</li>
                  <li>onboarding priority may be removed</li>
                </ul>
                <p className="mb-2">
                  Ask Array Tech reserves the right to close inactive projects after reasonable follow-up.
                </p>
                <p className="font-semibold text-[#8B6508]">
                  Reactivation of inactive projects may attract additional commercial charges.
                </p>
              </section>

              {/* 31. No Employment / Partnership */}
              <section id="no-employment" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  31. NO EMPLOYMENT / PARTNERSHIP RELATIONSHIP
                </h2>
                <p className="mb-2">
                  Engagement with Ask Array Tech shall not create any:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-3 text-sm flex flex-wrap gap-x-6">
                  <li>partnership</li>
                  <li>employment</li>
                  <li>joint venture</li>
                  <li>agency</li>
                  <li>fiduciary relationship</li>
                </ul>
                <p>
                  between the client and Ask Array Tech. All services are rendered strictly on an independent professional service basis.
                </p>
              </section>

              {/* 32. Data & Access Responsibility */}
              <section id="data-access" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  32. DATA &amp; ACCESS RESPONSIBILITY
                </h2>
                <p className="mb-2 font-medium text-stone-700">
                  Clients are responsible for securely maintaining:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-4 text-sm flex flex-wrap md:grid md:grid-cols-2 gap-x-6 gap-y-1">
                  <li>passwords, recovery keys</li>
                  <li>admin access, cloud accounts</li>
                  <li>hosting credentials, domain ownership</li>
                  <li>payment gateway access</li>
                </ul>
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl">
                  <p className="font-medium text-stone-850 mb-2">
                    Ask Array Tech shall not be liable for:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-stone-650">
                    <li>hacking or unauthorized access</li>
                    <li>data breaches</li>
                    <li>account suspensions</li>
                    <li>client-side negligence</li>
                    <li>credential misuse</li>
                  </ul>
                </div>
              </section>

              {/* 33. Platform & Third-Party Approval Disclaimer */}
              <section id="platform-disclaimer" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  33. PLATFORM &amp; THIRD-PARTY APPROVAL DISCLAIMER
                </h2>
                <p className="mb-2">
                  Approval or acceptance by:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-3 text-sm flex flex-wrap gap-x-4">
                  <li>payment gateways,</li>
                  <li>banks,</li>
                  <li>app stores,</li>
                  <li>advertising platforms,</li>
                  <li>government portals,</li>
                  <li>startup programs,</li>
                  <li>marketplaces,</li>
                </ul>
                <p className="font-medium text-stone-800">
                  is solely subject to their internal review policies. Ask Array Tech does not guarantee approval from any third-party platform.
                </p>
              </section>

              {/* 34. Performance & Marketing Disclaimer */}
              <section id="performance-disclaimer" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  34. PERFORMANCE &amp; MARKETING DISCLAIMER
                </h2>
                <p className="mb-3 font-medium text-stone-700">
                  Any references to growth, traction, leads, scaling, launch success, startup acceleration, or idea-to-revenue are illustrative positioning statements and should not be interpreted as guaranteed business outcomes.
                </p>
                <p className="mb-2">
                  Actual business results vary based on:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>market conditions</li>
                  <li>founder execution</li>
                  <li>competition</li>
                  <li>product quality</li>
                  <li>customer demand</li>
                  <li>operational capability</li>
                </ul>
              </section>

              {/* 35. Indemnity */}
              <section id="indemnity" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  35. INDEMNITY
                </h2>
                <p className="mb-2">
                  The client agrees to indemnify and hold harmless Ask Array Tech, its founders, employees, partners, contractors and associates from any legal claim, regulatory action, loss, penalty, dispute, damage, or liability, arising from:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>client business activities,</li>
                  <li>misuse of deliverables,</li>
                  <li>misleading business conduct,</li>
                  <li>violation of law,</li>
                  <li>third-party disputes,</li>
                  <li>intellectual property infringement caused by client-provided material.</li>
                </ul>
              </section>

              {/* 36. Right to Refuse Service */}
              <section id="right-to-refuse" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  36. RIGHT TO REFUSE SERVICE
                </h2>
                <p className="mb-2 font-medium text-stone-700">
                  Ask Array Tech reserves the right to refuse onboarding or discontinue services for businesses involving:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-3 text-sm flex flex-wrap gap-x-6">
                  <li>illegal activity</li>
                  <li>financial fraud</li>
                  <li>gambling</li>
                  <li>adult content</li>
                  <li>misleading schemes</li>
                  <li>prohibited products</li>
                  <li>unethical practices</li>
                  <li>reputational risk</li>
                </ul>
              </section>

              {/* 37. Contact */}
              <section id="contact" className="scroll-mt-24">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  37. CONTACT INFORMATION
                </h2>
                <p className="mb-4">
                  For clarifications or queries, please contact Ask Array Tech:
                </p>
                <div className="grid md:grid-cols-3 gap-6 bg-stone-50 border border-stone-200/80 p-6 rounded-2xl">
                  <div className="flex flex-col items-center text-center p-4">
                    <span className="inline-grid place-items-center w-10 h-10 rounded-xl bg-stone-900 text-white mb-3">
                      <Mail size={18} />
                    </span>
                    <h4 className="font-semibold text-sm text-stone-900 mb-1">Email</h4>
                    <a href="mailto:founders@askarray.in" className="text-xs text-[#B8860B] hover:underline font-medium">
                      founders@askarray.in
                    </a>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <span className="inline-grid place-items-center w-10 h-10 rounded-xl bg-stone-900 text-white mb-3">
                      <Globe size={18} />
                    </span>
                    <h4 className="font-semibold text-sm text-stone-900 mb-1">Website</h4>
                    <a href="https://www.askarray.in" target="_blank" rel="noopener noreferrer" className="text-xs text-[#B8860B] hover:underline font-medium">
                      www.askarray.in
                    </a>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <span className="inline-grid place-items-center w-10 h-10 rounded-xl bg-stone-900 text-white mb-3">
                      <MapPin size={18} />
                    </span>
                    <h4 className="font-semibold text-sm text-stone-900 mb-1">Address</h4>
                    <p className="text-[11px] text-stone-600 leading-tight">
                      #20, Commercial Complex, Nehru Nagar (E), Bhilai, Durg, Chhattisgarh, India – 490020
                    </p>
                  </div>
                </div>
              </section>

              {/* 38. Final Acknowledgement */}
              <section id="final-acknowledgement" className="scroll-mt-24 border-t border-stone-200 pt-8 mt-12">
                <h2 className="font-display font-semibold text-xl text-stone-900 border-b border-stone-100 pb-2 mb-3">
                  38. FINAL ACKNOWLEDGEMENT
                </h2>
                <div className="bg-[#B8860B]/5 border border-[#B8860B]/20 p-6 rounded-2xl">
                  <p className="font-medium text-stone-900 mb-3 text-center md:text-left">
                    By making payment, booking a consultation, proceeding with onboarding, sharing documents, or availing services, the client acknowledges that they have read, understood, and accepted all terms, policies, disclaimers, and commercial conditions mentioned above.
                  </p>
                  <div className="flex items-center justify-center md:justify-end gap-2 text-stone-500 text-xs">
                    <Shield size={14} className="text-[#B8860B]" />
                    <span>End of Document · Ask Array Tech</span>
                  </div>
                </div>
              </section>

            </div>
          </article>
        </main>

      </div>
    </div>
  );
}
