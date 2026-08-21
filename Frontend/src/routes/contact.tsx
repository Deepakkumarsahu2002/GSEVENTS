import { useState } from "react";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { brand } from "@/lib/site-data";

const eventTypes = ["Wedding", "Corporate", "Birthday", "Other"];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const message = String(formData.get("message") || "").trim();

    setSubmitting(true);

    const whatsappMessage = [
      "Hello GS Events & Catering, I would like to enquire about my event.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Event Date: ${date}`,
      `Event Type: ${type}`,
      `Message: ${message || "No additional details provided."}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast.success("Your enquiry has been opened in WhatsApp. Please send it to continue.");
    }, 400);
  };

  const field =
    "mt-2 w-full border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";
  const label = "eyebrow block";

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top,_rgba(184,134,59,0.18),_transparent_30%),linear-gradient(180deg,#f5efe8_0%,#f9f5f1_100%)] px-5 py-20 text-center md:px-8 md:py-24">
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(43,31,23,0.06),transparent)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="eyebrow">Enquiries</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-[0.02em] md:text-5xl lg:text-6xl">
            Let’s plan something memorable
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Share your vision, date, and guest details — we’ll turn it into a celebration that feels personal, seamless, and beautifully hosted.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <Reveal>
            <div className="soft-panel rounded-[28px] p-6 sm:p-8">
              <SectionHeading eyebrow="Enquiry Form" title="Tell us the details" align="left" />
              <form onSubmit={onSubmit} className="mt-8 space-y-6">
                <div>
                  <label className={label} htmlFor="name">
                    Name
                  </label>
                  <input id="name" name="name" required className={field} placeholder="Your name" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className={field}
                      placeholder="+91 —"
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="date">
                      Event Date
                    </label>
                    <input id="date" name="date" type="date" required className={field} />
                  </div>
                </div>
                <div>
                  <label className={label} htmlFor="type">
                    Event Type
                  </label>
                  <select id="type" name="type" required defaultValue="" className={field}>
                    <option value="" disabled>
                      Select an event type
                    </option>
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={field}
                    placeholder="Guest count, venue, cuisine preferences…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="premium-button w-full sm:w-auto disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Send Enquiry"}
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal>
            <div className="soft-panel rounded-[28px] p-6 sm:p-8">
              <div className="space-y-6">
                <div>
                  <p className="eyebrow">Direct</p>
                  <div className="mt-5 space-y-3">
                    <a
                      href={`tel:${brand.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <Phone className="size-4 shrink-0" /> Call {brand.phone}
                    </a>
                    <a
                      href={`https://wa.me/${brand.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-full border border-primary bg-white/30 px-5 py-3.5 text-sm text-primary transition-colors hover:bg-accent"
                    >
                      <MessageCircle className="size-4 shrink-0" /> Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="space-y-4 border-t border-border pt-8 text-sm text-muted-foreground">
                  <p className="flex gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                    <a href={`mailto:${brand.email}`} className="break-all hover:text-primary">
                      {brand.email}
                    </a>
                  </p>
                  <p className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    {brand.address}
                  </p>
                </div>

                <div className="border-t border-border pt-8">
                  <p className="eyebrow flex items-center gap-2">
                    <Clock className="size-3.5 text-primary" /> Business Hours
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {brand.hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-4">
                        <span>{h.day}</span>
                        <span className="text-foreground">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4 border-t border-border pt-8">
                  <a
                    href={brand.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="grid size-10 place-items-center rounded-full border border-border text-primary transition-colors hover:bg-accent"
                  >
                    <Instagram className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-accent/20 py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <iframe
            title="GS Events & Catering studio location"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d941.3608935365702!2d84.78753326956382!3d19.30654899887164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDE4JzIzLjYiTiA4NMKwNDcnMTcuNCJF!5e0!3m2!1sen!2sin!4v1787305786321!5m2!1sen!2sin"
            className="h-[420px] w-full border-0 rounded-[24px] grayscale-[0.2] shadow-soft"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
    </>
  );
}
