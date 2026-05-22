// @ts-nocheck
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Award, FileBadge, ShieldCheck, Sparkles } from "lucide-react";

const DELIVERABLES = {
  "company-setup": {
    title: "Company Setup",
    subtitle: "Sample artifacts you receive at the end of the engagement.",
    sections: [
      {
        label: "Government Certificates",
        items: [
          {
            kind: "cert",
            icon: Award,
            title: "Incorporation Certificate",
            sub: "MCA · Private Limited",
          },
          {
            kind: "cert",
            icon: FileBadge,
            title: "GST Registration",
            sub: "GSTIN allotted",
          },
          {
            kind: "cert",
            icon: ShieldCheck,
            title: "DPIIT · Startup India",
            sub: "Recognition certificate",
          },
          {
            kind: "cert",
            icon: FileBadge,
            title: "MSME / Udyam",
            sub: "Udyam registration",
          },
        ],
      },
      {
        label: "Legal Templates",
        items: [
          { kind: "doc", title: "Founders Agreement" },
          { kind: "doc", title: "NDA · Mutual" },
          { kind: "doc", title: "Employment Letter" },
          { kind: "doc", title: "Vendor MoU" },
          { kind: "doc", title: "Privacy Policy" },
          { kind: "doc", title: "Terms of Service" },
        ],
      },
      {
        label: "Onboarding Checklists",
        items: [
          { kind: "check", title: "Bank account opening" },
          { kind: "check", title: "Payment gateway onboarding" },
          { kind: "check", title: "Tax filings calendar" },
        ],
      },
    ],
  },
  "product-mvp": {
    title: "Product MVP",
    subtitle: "Visual snapshots of what we ship.",
    sections: [
      {
        label: "Sample Screens",
        items: [
          {
            kind: "screen",
            image:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            title: "Admin Dashboard",
            sub: "SaaS · analytics",
          },
          {
            kind: "screen",
            image:
              "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            title: "Mobile App",
            sub: "iOS + Android",
          },
          {
            kind: "screen",
            image:
              "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            title: "Marketing Website",
            sub: "Conversion-focused",
          },
          {
            kind: "screen",
            image:
              "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            title: "Wireframes & UX",
            sub: "Figma design system",
          },
        ],
      },
      {
        label: "Case Studies",
        items: [
          {
            kind: "case",
            title: "D2C marketplace",
            metric: "Live in 28 days",
          },
          {
            kind: "case",
            title: "B2B SaaS dashboard",
            metric: "MVP shipped · pilot live",
          },
          {
            kind: "case",
            title: "Fintech ops console",
            metric: "₹ on-board automation",
          },
        ],
      },
    ],
  },
  "marketing-setup": {
    title: "Marketing Setup",
    subtitle: "Your day-1 launch arsenal.",
    sections: [
      {
        label: "Brand Identity",
        items: [
          {
            kind: "brand",
            image:
              "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            title: "Logo & marks",
          },
          {
            kind: "brand",
            image:
              "https://res.cloudinary.com/dzwto9zbu/image/upload/v1779396451/ChatGPT_Image_May_22_2026_02_17_10_AM_oj6g36.png",
            title: "Brand kit · palette + type",
          },
        ],
      },
      {
        label: "Social Profiles",
        items: [
          { kind: "social", title: "LinkedIn", sub: "Company + Founder pages" },
          { kind: "social", title: "Instagram", sub: "Branded grid + reels" },
          { kind: "social", title: "Facebook", sub: "Business page" },
          { kind: "social", title: "WhatsApp Channel", sub: "Verified setup" },
        ],
      },
      {
        label: "Growth Infrastructure",
        items: [
          {
            kind: "screen",
            image:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            title: "Ad Account Setup",
            sub: "Meta + Google",
          },
          {
            kind: "screen",
            image:
              "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            title: "Campaign Structure",
            sub: "TOF · MOF · BOF",
          },
        ],
      },
    ],
  },
  "idea-to-revenue": {
    title: "Idea → Revenue in 30 Days",
    subtitle:
      "A complete launch operating system across legal, product and growth.",
    sections: [
      {
        label: "Week-by-week Roadmap",
        items: [
          {
            kind: "week",
            week: "Week 1",
            title: "Company + Brand",
            sub: "Incorporation, GST, DPIIT, brand kit",
          },
          {
            kind: "week",
            week: "Week 2",
            title: "Product",
            sub: "MVP build, design system, payments",
          },
          {
            kind: "week",
            week: "Week 3",
            title: "Marketing",
            sub: "Social, ads, pixel, campaigns",
          },
          {
            kind: "week",
            week: "Week 4",
            title: "Launch",
            sub: "Soft launch, ads live, first revenue",
          },
        ],
      },
      {
        label: "Operating Cadence",
        items: [
          { kind: "doc", title: "Dedicated PoC before launch" },
          { kind: "doc", title: "Priority support across engagement" },
          { kind: "doc", title: "Founder dashboard for launch readiness" },
        ],
      },
    ],
  },
};

export default function DeliverablesDialog({ planKey, onOpenChange }) {
  const data = planKey ? DELIVERABLES[planKey] : null;
  if (!data) return null;

  return (
    <Dialog open={!!planKey} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl bg-[#0a0a0a] border-[#D4AF37]/20 text-white max-h-[88vh] overflow-y-auto p-0"
        data-testid="deliverables-dialog"
      >
        <div className="px-7 pt-7 pb-2 border-b border-white/5 sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md z-10">
          <DialogHeader>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">
              <Sparkles size={12} /> Deliverables preview
            </div>
            <DialogTitle className="font-display text-2xl md:text-3xl mt-2 tracking-tight">
              {data.title}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {data.subtitle}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-7 pb-7 pt-5 space-y-9">
          {data.sections.map((sec) => (
            <div key={sec.label}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-4">
                {sec.label}
              </p>
              {renderSection(sec.items)}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function renderSection(items) {
  const kind = items[0]?.kind;

  if (kind === "cert")
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <div
              key={i}
              className="relative rounded-xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#1a1612] to-[#0a0a0a] p-5 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none" />
              <div className="flex items-start justify-between">
                <span className="inline-grid place-items-center w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-gold">
                  <Icon size={16} />
                </span>
                <span className="text-[9px] uppercase tracking-widest text-white/40">
                  Sample
                </span>
              </div>
              <p className="font-display text-base mt-4">{it.title}</p>
              <p className="text-xs text-white/55 mt-1">{it.sub}</p>
              <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-transparent" />
            </div>
          );
        })}
      </div>
    );

  if (kind === "doc")
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/45">
              Template
            </p>
            <p className="text-sm text-white mt-1">{it.title}</p>
          </div>
        ))}
      </div>
    );

  if (kind === "check")
    return (
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5"
          >
            <span className="inline-grid place-items-center w-5 h-5 rounded-full border border-[#D4AF37]/40 text-gold text-[10px]">
              ✓
            </span>
            <span className="text-sm text-white/85">{it.title}</span>
          </li>
        ))}
      </ul>
    );

  if (kind === "screen" || kind === "brand")
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden border border-white/10 bg-black/40"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={it.image}
                alt={it.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="font-display text-base text-white">{it.title}</p>
              {it.sub && (
                <p className="text-xs text-white/55 mt-1">{it.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );

  if (kind === "case")
    return (
      <div className="grid sm:grid-cols-3 gap-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/45">
              Case study
            </p>
            <p className="font-display text-lg text-white mt-2">{it.title}</p>
            <p className="text-xs text-gold mt-2">{it.metric}</p>
          </div>
        ))}
      </div>
    );

  if (kind === "social")
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center"
          >
            <p className="font-display text-sm text-white">{it.title}</p>
            <p className="text-[10px] text-white/50 mt-1">{it.sub}</p>
          </div>
        ))}
      </div>
    );

  if (kind === "week")
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#1a1612] to-[#0a0a0a] p-5"
          >
            <p className="text-[10px] uppercase tracking-widest text-gold">
              {it.week}
            </p>
            <p className="font-display text-lg text-white mt-2">{it.title}</p>
            <p className="text-xs text-white/55 mt-1.5">{it.sub}</p>
          </div>
        ))}
      </div>
    );

  return null;
}
