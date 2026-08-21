import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { brand } from "@/lib/site-data";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled ? "border-border bg-background/90 shadow-[0_10px_30px_rgba(43,31,23,0.08)] backdrop-blur-md" : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-5 md:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          {logoLoaded ? (
            <img
              src={logo}
              alt="GS Events & Catering"
              className="h-10 w-auto rounded-sm sm:h-12 md:h-14 lg:h-16"
              onError={() => setLogoLoaded(false)}
            />
          ) : (
            <div className="flex items-center gap-3">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                className="h-10 w-auto rounded-sm sm:h-12 md:h-14 lg:h-16"
              >
                <rect width="48" height="48" rx="6" fill="#D4AF37" />
                <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="serif" fontSize="14" fill="#0b0b0b">GS</text>
              </svg>
            </div>
          )}
          <div className="min-w-0">
            <span className="block truncate font-serif text-[0.68rem] leading-none tracking-[0.18em] text-[#D4AF37] drop-shadow-sm sm:text-[0.8rem] md:text-base lg:text-lg">
              GS EVENTS &amp; CATERING
            </span>
            <span className="sr-only">{brand.name}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `text-[0.72rem] uppercase tracking-[0.18em] transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="bg-secondary px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.2em] text-secondary-foreground transition-opacity hover:opacity-90"
          >
            Plan Your Event
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md border border-border bg-card p-2 text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-5 pt-3 lg:hidden">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block border-b border-border/60 py-3 text-sm uppercase tracking-[0.18em] ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 block bg-secondary px-5 py-3 text-center text-[0.7rem] uppercase tracking-[0.2em] text-secondary-foreground"
          >
            Plan Your Event
          </Link>
        </nav>
      )}
    </header>
  );
}
