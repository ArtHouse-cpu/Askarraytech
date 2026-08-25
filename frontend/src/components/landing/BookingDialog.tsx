// @ts-nocheck
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api, getApiErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import {
  Sparkles,
  ArrowRight,
  CalendarClock,
  Lock,
  Loader2,
  Check,
  ChevronLeft,
} from "lucide-react";

const SERVICE_OPTIONS = [
  "Company Setup",
  "Product MVP",
  "Marketing Setup",
  "Idea → Revenue · 30 Days",
  "Not sure yet",
];

const BUDGET_OPTIONS = [
  "₹80K - ₹1L",
  "₹1L - ₹2L",
  "₹2L - ₹5L",
  "₹5L - ₹10L",
  "₹10L - ₹20L",
  "₹20L+",
  "Need guidance",
];

const TIMELINE_OPTIONS = [
  "Immediately",
  "Within 2 weeks",
  "Within a month",
  "1–3 months",
  "Just exploring",
];

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  city: "",
  service_needed: "",
  budget_range: "",
  timeline_to_start: "",
  startup_idea: "",
};

export default function BookingDialog({ open, onOpenChange, presetService }) {
  const [step, setStep] = useState("lead"); // lead | slot | pay
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ ...EMPTY, service_needed: presetService || "" });
  const [bookingId, setBookingId] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (open) {
      setStep("lead");
      setBookingId(null);
      setSelectedSlotId(null);
      setForm((f) => ({ ...f, service_needed: presetService || f.service_needed }));
    }
  }, [open, presetService]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const loadSlots = async () => {
    setSlotsLoading(true);
    try {
      const { data } = await api.get("/slots/available");
      setSlots(data);
    } catch {
      toast.error("Couldn't load slots.");
    } finally {
      setSlotsLoading(false);
    }
  };

  const submitLead = async (e) => {
    e.preventDefault();
    if (!form.service_needed) {
      toast.error("Please select a service.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/bookings", form);
      setBookingId(data.id);
      setStep("slot");
      await loadSlots();
    } catch (err) {
      toast.error(
        getApiErrorMessage(err.response?.data?.detail) ||
          "Couldn't submit. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const pickSlot = async () => {
    if (!selectedSlotId) {
      toast.error("Please pick a time slot.");
      return;
    }
    setLoading(true);
    try {
      await api.post(`/bookings/${bookingId}/slot`, { slot_id: selectedSlotId });
      setStep("pay");
    } catch (err) {
      toast.error(
        getApiErrorMessage(err.response?.data?.detail) || "Couldn't reserve slot."
      );
      await loadSlots();
    } finally {
      setLoading(false);
    }
  };

  const startPayment = async () => {
    setRedirecting(true);
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load. Please check your internet connection.");
        setRedirecting(false);
        return;
      }

      const { data } = await api.post("/payments/checkout", {
        booking_id: bookingId,
      });

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Ask Array Tech",
        description: "Strategy Call Booking Fee",
        order_id: data.order_id,
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#D4AF37",
        },
        handler: async function (response) {
          setRedirecting(true);
          try {
            const verifyRes = await api.post("/payments/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: data.booking_id,
            });

            if (verifyRes.data.success) {
              toast.success("Payment verified successfully!");
              window.location.href = `${window.location.origin}/booking/success?session_id=${data.order_id}&booking_id=${data.booking_id}`;
            } else {
              toast.error("Payment verification failed.");
              setRedirecting(false);
            }
          } catch (err) {
            toast.error(
              getApiErrorMessage(err.response?.data?.detail) ||
                "Error verifying payment."
            );
            setRedirecting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setRedirecting(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      setRedirecting(false);
      toast.error(
        getApiErrorMessage(err.response?.data?.detail) ||
          "Couldn't start checkout."
      );
    }
  };

  const reset = () => {
    setForm({ ...EMPTY, service_needed: presetService || "" });
    setBookingId(null);
    setSelectedSlotId(null);
    setStep("lead");
  };

  const currentSlot = slots.find((s) => s.id === selectedSlotId);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent
        className="w-[95%] sm:w-full max-w-lg rounded-2xl sm:rounded-2xl bg-[#0a0a0a] border-[#D4AF37]/25 text-white max-h-[92vh] overflow-y-auto p-5 sm:p-6"
        data-testid="booking-dialog"
      >
        <div className="hidden sm:block">
          <Stepper step={step} />
        </div>

        {step === "lead" && (
          <LeadStep
            form={form}
            onChange={onChange}
            setForm={setForm}
            onSubmit={submitLead}
            loading={loading}
          />
        )}

        {step === "slot" && (
          <SlotStep
            slots={slots}
            slotsLoading={slotsLoading}
            selectedSlotId={selectedSlotId}
            setSelectedSlotId={setSelectedSlotId}
            onBack={() => setStep("lead")}
            onConfirm={pickSlot}
            loading={loading}
          />
        )}

        {step === "pay" && (
          <PayStep
            form={form}
            currentSlot={currentSlot}
            onBack={() => setStep("slot")}
            onPay={startPayment}
            redirecting={redirecting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function Stepper({ step }) {
  const steps = ["lead", "slot", "pay"];
  const labels = { lead: "Details", slot: "Slot", pay: "Confirm" };
  const idx = steps.indexOf(step);
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= idx ? "bg-[#D4AF37]" : "bg-white/15"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2">
        {steps.map((s, i) => (
          <span
            key={s}
            className={`text-[10px] uppercase tracking-[0.22em] ${
              i === idx ? "text-gold" : "text-white/40"
            }`}
          >
            {i + 1}. {labels[s]}
          </span>
        ))}
      </div>
    </div>
  );
}

function LeadStep({ form, onChange, setForm, onSubmit, loading }) {
  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold">
          {/* <Sparkles size={12} /> Step 1 of 3 */}
        </div>
        <DialogTitle className="font-display text-2xl mt-2">
         Let's Connect ASAP
        </DialogTitle>
        <DialogDescription className="text-white/60">
          We read every application personally before booking the call.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={onSubmit} className="space-y-4 mt-3">
        <div>
          <Field
            label="Full Name"
            id="b-name"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Your full name"
            required
            minLength={2}
            testid="booking-input-name"
          />
        </div>
        <div>
          <Field
            label="Email"
            id="b-email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@startup.com"
            required
            testid="booking-input-email"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Phone"
            id="b-phone"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="+91 9876543210"
            required
            testid="booking-input-phone"
          />
          <Field
            label="City"
            id="b-city"
            name="city"
            value={form.city}
            onChange={onChange}
            placeholder="Bengaluru, Mumbai…"
            testid="booking-input-city"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-white/80">Service Required</Label>
            <Select
              value={form.service_needed}
              onValueChange={(v) => setForm((f) => ({ ...f, service_needed: v }))}
            >
              <SelectTrigger
                className="mt-1.5 bg-white/5 border-white/10 text-white"
                data-testid="booking-select-service"
              >
                <SelectValue placeholder="Select a track" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] text-white border-white/10">
                {SERVICE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-white/80">Timeline</Label>
            <Select
              value={form.timeline_to_start}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, timeline_to_start: v }))
              }
            >
              <SelectTrigger
                className="mt-1.5 bg-white/5 border-white/10 text-white"
                data-testid="booking-select-timeline"
              >
                <SelectValue placeholder="When?" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] text-white border-white/10">
                {TIMELINE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-white/80">Budget Range</Label>
          <Select
            value={form.budget_range}
            onValueChange={(v) => setForm((f) => ({ ...f, budget_range: v }))}
          >
            <SelectTrigger
              className="mt-1.5 bg-white/5 border-white/10 text-white"
              data-testid="booking-select-budget"
            >
              <SelectValue placeholder="Pick a range" />
            </SelectTrigger>
            <SelectContent className="bg-[#111] text-white border-white/10">
              {BUDGET_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="b-idea" className="text-white/80">
            Startup Idea
          </Label>
          <Textarea
            id="b-idea"
            name="startup_idea"
            value={form.startup_idea}
            onChange={onChange}
            required
            minLength={4}
            rows={3}
            placeholder="A short note about what you're building…"
            className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30"
            data-testid="booking-input-idea"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D4AF37] hover:bg-[#F3C853] text-black font-medium rounded-full py-6 gold-button-glow group"
          data-testid="booking-submit-lead-btn"
        >
          {loading ? "Saving…" : (
            <>
              Continue
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}

function SlotStep({
  slots,
  slotsLoading,
  selectedSlotId,
  setSelectedSlotId,
  onBack,
  onConfirm,
  loading,
}) {
  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold">
          <CalendarClock size={12} /> Step 2 of 3
        </div>
        <DialogTitle className="font-display text-2xl mt-2">
          Pick a strategy call slot
        </DialogTitle>
        <DialogDescription className="text-white/60">
          30-minute call with our launch team.
        </DialogDescription>
      </DialogHeader>

      {slotsLoading ? (
        <div className="py-10 text-center text-white/55">
          <Loader2 size={20} className="animate-spin mx-auto mb-2 text-gold" />
          Loading available slots…
        </div>
      ) : slots.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
          <p className="text-white/85 font-display text-lg">
            No slots open right now.
          </p>
          <p className="text-white/55 text-sm mt-1.5 leading-relaxed">
            Your application is saved. Our team will email you slot options
            within 4 business hours.
          </p>
        </div>
      ) : (
        <div
          className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1"
          data-testid="booking-slots-grid"
        >
          {slots.map((s) => (
            <SlotButton
              key={s.id}
              slot={s}
              selected={selectedSlotId === s.id}
              onSelect={() => setSelectedSlotId(s.id)}
            />
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex-1 rounded-full border border-white/15 text-white hover:bg-white/5"
          data-testid="booking-back-to-lead"
        >
          <ChevronLeft size={14} className="mr-1" /> Back
        </Button>
        {slots.length > 0 && (
          <Button
            disabled={loading || !selectedSlotId}
            onClick={onConfirm}
            className="flex-1 bg-[#D4AF37] hover:bg-[#F3C853] text-black font-medium rounded-full"
            data-testid="booking-confirm-slot"
          >
            {loading ? "Reserving…" : "Reserve & Continue"}
          </Button>
        )}
      </div>
    </>
  );
}

function PayStep({ form, currentSlot, onBack, onPay, redirecting }) {
  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold">
          <Lock size={12} /> Step 3 of 3
        </div>
        <DialogTitle className="font-display text-2xl mt-2">
          Confirm with a commitment fee
        </DialogTitle>
        <DialogDescription className="text-white/60">
          Secure payment via Razorpay. 
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
        <Row label="Name" value={form.name} />
        <Row label="Service" value={form.service_needed} />
        <Row
          label="Slot"
          value={currentSlot ? formatSlot(currentSlot) : "—"}
        />
        <div className="border-t border-white/10 pt-3 flex items-center justify-between">
          <span className="text-white/55 text-sm">Commitment fee</span>
          <span className="font-display text-2xl gold-gradient-text">₹399</span>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="rounded-full border border-white/15 text-white hover:bg-white/5"
          data-testid="booking-back-to-slot"
        >
          <ChevronLeft size={14} className="mr-1" /> Back
        </Button>
        <Button
          onClick={onPay}
          disabled={redirecting}
          className="flex-1 bg-[#D4AF37] hover:bg-[#F3C853] text-black font-medium rounded-full gold-button-glow"
          data-testid="booking-start-payment-btn"
        >
          {redirecting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Opening Razorpay…
            </>
          ) : (
            <>
              Pay ₹399 to Confirm
              <ArrowRight size={16} className="ml-2" />
            </>
          )}
        </Button>
      </div>
      <p className="text-[11px] text-white/40 text-center mt-3">
        Powered by Razorpay. Your slot is held until checkout completes.
      </p>
    </>
  );
}

function Field({ label, id, testid, ...rest }) {
  return (
    <div>
      <Label htmlFor={id} className="text-white/80">
        {label}
      </Label>
      <Input
        id={id}
        className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30"
        data-testid={testid}
        {...rest}
      />
    </div>
  );
}

function SlotButton({ slot, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      type="button"
      className={`text-left rounded-xl border p-3 transition-all ${
        selected
          ? "border-[#D4AF37] bg-[#D4AF37]/10"
          : "border-white/10 bg-white/[0.02] hover:border-white/25"
      }`}
      data-testid={`slot-option-${slot.id}`}
    >
      <p className="text-[11px] uppercase tracking-widest text-white/45">
        {formatSlotDate(slot.start_at)}
      </p>
      <p className="font-display text-base mt-1 text-white">
        {formatSlotTime(slot.start_at)} – {formatSlotTime(slot.end_at)}
      </p>
      {selected && (
        <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-gold">
          <Check size={12} /> Selected
        </div>
      )}
    </button>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-white/55 text-sm">{label}</span>
      <span className="text-white text-sm text-right max-w-[60%] truncate">
        {value || "—"}
      </span>
    </div>
  );
}

function formatSlot(s) {
  return `${formatSlotDate(s.start_at)} · ${formatSlotTime(s.start_at)}`;
}

function formatSlotDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  } catch {
    return iso;
  }
}

function formatSlotTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
