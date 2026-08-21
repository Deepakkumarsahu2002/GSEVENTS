import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Utensils } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { images } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Catering — GS Events & Catering" },
      {
        name: "description",
        content:
          "Weddings, thread ceremonies, house warmings, corporate events, decor and full-service catering with buffet, plated and live counters.",
      },
      {
        name: "keywords",
        content:
          "Best Event Management in Berhampur, Best Event Management in Odisha, Best Event Management in Brahmapur, Best Catering in Odisha, Best Catering Service in Odisha, Best Catering Service in Berhampur",
      },
      { property: "og:title", content: "Services & Catering — GS Events & Catering" },
      {
        property: "og:description",
        content:
          "Bespoke event design and catering: buffet, plated service, live counters and complete decor.",
      },
    ],
  }),
  component: Services,
});

const categories = [
  {
    title: "Wedding Events",
    image: images.serviceWedding,
    body: "Haldi, mehendi, muhurtham and reception — design, decor, hospitality and catering across every function of the week.",
    points: ["Mandap & stage design", "Guest hospitality desk", "Multi-cuisine wedding menus"],
  },
  {
    title: "Thread Ceremony",
  image: images.serviceThreadCeremony,
    body: "Traditional Upanayanam mornings handled with ritual accuracy — priest coordination, seating, prasadam and a satvik menu.",
    points: ["Ritual-compliant satvik menu", "Traditional floral decor", "Family seating plans"],
  },
  {
    title: "House Warming",
  image: images.serviceHouseWarming,
    body: "Gruhapravesam catering and decor from early-morning pooja through to a full afternoon lunch service.",
    points: ["Pooja setup & rangoli", "Banana-leaf lunch service", "On-site kitchen crew"],
  },
  {
    title: "Corporate Events",
    image: images.serviceCorporate,
    body: "Conferences, product launches, offsites and award nights — branded environments, precise timing and business-grade service.",
    points: ["Branded stage & signage", "Breakout catering", "AV & vendor coordination"],
  },
  {
    title: "Birthday & Private Parties",
    image: images.serviceParty,
    body: "Milestone birthdays, anniversaries and intimate soirées styled down to the last candle and canapé.",
    points: ["Theme design", "Cocktail & canapé service", "Entertainment coordination"],
  },
  {
    title: "All Decorations",
    image: images.serviceAllDecorations,
    body: "An in-house decor studio: florals, drapery, lighting, entrance arches, photo walls and tablescapes.",
    points: ["Fresh floral installations", "Architectural lighting", "Custom tablescapes"],
  },

];

const cateringFormats = [
  {
    title: "Buffet Service",
    image: images.cateringBuffet,
    body: "Multi-counter buffets with 12–40 dishes, brass and copper serveware, dedicated replenishment crew and a chaperone at every counter to guide guests.",
    points: [
      "Separate veg and non-veg lines",
      "Live replenishment every 8 minutes",
      "Dessert and paan stations",
    ],
  },
  {
    title: "Plated Service",
    image: images.cateringPlated,
    body: "Course-by-course plated dinners for seated events — synchronised service so every table is served within ninety seconds of the first plate.",
    points: [
      "3 to 7 course menus",
      "One server per 10 guests",
      "Wine and mocktail pairing available",
    ],
  },
  {
    title: "Live Counters",
    image: images.cateringLiveCounters,
    body: "Theatre at the table: chaat, dosa, kebab, pasta, teppanyaki, tandoor and dessert counters cooked in front of your guests.",
    points: [
      "Chaat, dosa & tandoor stations",
      "Continental & pan-Asian counters",
      "Live dessert & ice-cream carts",
    ],
  },
];

const tiers = [
  {
    name: "Basic",
    price: "Starting from ₹350 / guest",
    items: [
      "Set menu — 12 dishes",
      "Buffet service with crew",
      "Standard floral centrepieces",
      "Event captain on site",
    ],
  },
  {
    name: "Premium",
    price: "Starting from ₹1,200 / guest",
    featured: true,
    items: [
      "Custom menu — 25 dishes",
      "Buffet + 2 live counters",
      "Full decor: stage, entrance, tables",
      "Menu tasting for 2 guests",
      "Dedicated planner from day one",
    ],
  },
  {
    name: "Luxury",
    price: "Starting from ₹2,000 / guest",
    items: [
      "Chef-designed menu — unlimited scope",
      "Plated service + 4 live counters",
      "Bespoke decor design & lighting",
      "Guest hospitality & valet desk",
      "Multi-day function management",
    ],
  },
];

const cuisines = [
  { name: "North Indian", tag: "Veg & Non-Veg" },
  { name: "South Indian", tag: "Pure Veg" },
  { name: "Hyderabadi", tag: "Veg & Non-Veg" },
  { name: "Continental", tag: "Veg & Non-Veg" },
  { name: "Pan-Asian", tag: "Veg & Non-Veg" },
  { name: "Jain / Satvik", tag: "Without Onion Garlic" },
];

function Services() {
  return (
    <>
      <section className="border-b border-border bg-accent/30 px-5 py-20 text-center md:px-8 md:py-24">
        <p className="eyebrow">Services</p>
        <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-wide md:text-5xl">
          Every occasion, designed and fed with care
        </h1>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Reveal key={c.title}>
              <article className="group flex h-full flex-col border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-serif text-xl tracking-wide">{c.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  <ul className="mt-5 space-y-2">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-7 inline-block border border-primary px-6 py-3 text-center text-[0.7rem] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Enquire Now
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-espresso px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Our Heart"
              title="Catering, In Detail"
              tone="dark"
              intro="Catering is where we started and where we still spend most of our time. Three service formats, one in-house kitchen, zero outsourcing."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {cateringFormats.map((f) => (
              <Reveal key={f.title}>
                <div className="h-full border border-primary/25 bg-[oklch(0.26_0.026_55)] p-0 overflow-hidden">
                  <div className="overflow-hidden">
                    <img
                      src={f.image}
                      alt={f.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <Utensils className="size-6 text-primary" />
                    <h3 className="mt-5 font-serif text-xl tracking-wide text-primary">{f.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-[oklch(0.82_0.02_80)]">
                      {f.body}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {f.points.map((p) => (
                        <li
                          key={p}
                          className="flex gap-2 text-sm text-[oklch(0.78_0.02_80)]"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-block bg-primary px-9 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Request a Tasting
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Packages"
              title="Three Ways to Begin"
              intro="Indicative tiers for 200+ guests. Every package is adjusted after a menu consultation."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => (
              <Reveal key={t.name}>
                <div
                  className={`flex h-full flex-col border p-8 shadow-soft ${
                    t.featured ? "border-primary bg-card" : "border-border bg-card"
                  }`}
                >
                  {t.featured && <p className="eyebrow text-primary">Most Chosen</p>}
                  <h3 className="mt-2 font-serif text-2xl tracking-wide">{t.name}</h3>
                  <p className="mt-2 text-sm text-primary">{t.price}</p>
                  <div className="gold-rule mt-6" />
                  <ul className="mt-6 flex-1 space-y-3">
                    {t.items.map((i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`mt-8 block px-6 py-3 text-center text-[0.7rem] uppercase tracking-[0.2em] transition-opacity hover:opacity-90 ${
                      t.featured
                        ? "bg-secondary text-secondary-foreground"
                        : "border border-primary text-primary"
                    }`}
                  >
                    Enquire Now
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-accent/40 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionHeading
              eyebrow="Menu Highlights"
              title="Cuisines We Cook"
              intro="Separate kitchens and crew for vegetarian and non-vegetarian preparation."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cuisines.map((c) => (
              <Reveal key={c.name}>
                <div className="flex items-center justify-between gap-3 border border-border bg-card px-6 py-5 shadow-soft">
                  <span className="min-w-0 truncate font-serif text-lg tracking-wide">
                    {c.name}
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                    <span
                      className="size-2.5 rounded-full border"
                      style={{ borderColor: "oklch(0.55 0.14 145)", background: "oklch(0.55 0.14 145)" }}
                      aria-hidden
                    />
                    {c.tag !== "Pure Veg" && (
                      <span
                        className="size-2.5 rounded-full"
                        style={{ background: "oklch(0.52 0.19 27.3)" }}
                        aria-hidden
                      />
                    )}
                    {c.tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
