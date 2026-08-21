import { Link } from "react-router-dom";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { brand } from "@/lib/site-data";
import { ADMIN_PATH } from "@/lib/admin-path";

export function Footer() {
  return (
    <footer className="bg-espresso text-[oklch(0.93_0.014_84.6)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 md:py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-4 md:gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="GS Events & Catering" className="h-16 w-auto sm:h-20" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[oklch(0.8_0.02_80)]">
              A design-led events and catering atelier creating weddings, ceremonies and
              corporate gatherings with quiet luxury and faultless hospitality.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full border border-primary/40 text-primary transition-colors hover:bg-primary/10"
              >
                <Instagram className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow text-[oklch(0.72_0.02_80)]">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/gallery", label: "Gallery" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[oklch(0.85_0.02_80)] transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[oklch(0.72_0.02_80)]">Reach Us</p>
            <ul className="mt-5 space-y-3 text-sm text-[oklch(0.85_0.02_80)]">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="break-all">
                  {brand.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`mailto:${brand.email}`} className="break-all">
                  {brand.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="leading-relaxed">{brand.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-xs text-[oklch(0.68_0.02_80)] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved. Designed and Developed by Deepak Kumar Sahu
          </p>
          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <span>Designed for celebrations that last a lifetime.</span>
            <Link
              to={ADMIN_PATH}
              aria-label="Studio"
              title="Studio"
              className="inline-block size-1.5 rounded-full bg-primary/50 transition-colors hover:bg-primary"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
