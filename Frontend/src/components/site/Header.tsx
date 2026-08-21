import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          {logoLoaded ? (
            <img
              src={logo}
              alt="GS Events & Catering"
              className="h-10 md:h-14 lg:h-16 w-auto rounded-sm"
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
                className="h-10 md:h-14 lg:h-16 w-auto rounded-sm"
              >
                <rect width="48" height="48" rx="6" fill="#D4AF37" />
                <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="serif" fontSize="14" fill="#0b0b0b">GS</text>
              </svg>
              <span className="hidden min-w-0 md:block font-serif text-sm md:text-base lg:text-lg leading-none tracking-widest uppercase text-[#D4AF37]">
                GS EVENTS &amp; CATERING
              </span>
            </div>
          )}
          <div className="min-w-0">
            <span className="block font-serif text-sm md:text-base lg:text-lg leading-none tracking-widest uppercase text-[#D4AF37] drop-shadow-sm">
              GS EVENTS &amp; CATERING
            </span>
            <span className="sr-only">{brand.name}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.8rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-secondary px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.2em] text-secondary-foreground transition-opacity hover:opacity-90"
          >
            Plan Your Event
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="justify-self-end p-2 text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 pb-6 pt-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-3 text-sm uppercase tracking-[0.18em] text-muted-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
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
