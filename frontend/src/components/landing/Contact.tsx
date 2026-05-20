// @ts-nocheck
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send } from "lucide-react";
import { api, getApiErrorMessage } from "@/lib/api";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contacts", form);
      toast.success("Thanks — we'll reach out within 24 hours.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(
        getApiErrorMessage(err.response?.data?.detail) || "Couldn't send."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-white text-black py-24 md:py-32"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-black/50">
            Contact
          </p>
          <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-tighter mt-3 leading-[1.05]">
            Talk to a{" "}
            <span className="text-black/40">launch partner.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-black/60 max-w-xl">
            Have a quick question before booking? Drop us a note and we'll get
            back within 24 hours.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <span className="inline-grid place-items-center w-10 h-10 rounded-xl bg-black text-white">
                <Mail size={16} />
              </span>
              <div>
                <p className="text-sm text-black/50 uppercase tracking-widest">
                  Email
                </p>
                <a
                  href="mailto:hello@askarray.tech"
                  className="font-display text-lg text-black hover:text-[#B8860B]"
                  data-testid="contact-email"
                >
                  hello@askarray.tech
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="inline-grid place-items-center w-10 h-10 rounded-xl bg-black text-white">
                <MapPin size={16} />
              </span>
              <div>
                <p className="text-sm text-black/50 uppercase tracking-widest">
                  Headquarters
                </p>
                <p className="font-display text-lg text-black">
                  Built remote · India first
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-black/10 bg-white p-7 md:p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.2)]"
          data-testid="contact-form"
        >
          <div className="space-y-5">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
                required
                className="mt-1.5"
                data-testid="contact-input-name"
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@startup.com"
                required
                className="mt-1.5"
                data-testid="contact-input-email"
              />
            </div>
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Tell us a bit about your idea or question…"
                required
                rows={5}
                className="mt-1.5"
                data-testid="contact-input-message"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-black/85 text-white rounded-full py-6"
              data-testid="contact-submit-btn"
            >
              {loading ? "Sending…" : (
                <>
                  Send Message
                  <Send size={16} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
