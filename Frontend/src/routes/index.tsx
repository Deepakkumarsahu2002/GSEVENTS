import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import {
  brand,
  images,
  photos as seedPhotos,
  servicePreview,
  stats,
  type Photo,
} from "@/lib/site-data";
import { API_BASE } from "@/lib/api";

const testimonialCards = [
  {
    initial: "M",
    color: "bg-[#6c3db5]",
    name: "MANJESH PAL",
    handle: "@MANJESH PAL",
    time: "1 week ago",
    quote:
      "The best part was the support throughout the planning process. Even when we had last-minute questions, the team was quick to respond and always helped us find a solution.",
  },
  {
    initial: "R",
    color: "bg-[#5e48d4]",
    name: "RAKESH KUMAR",
    handle: "@RAKESHKUMAR",
    time: "2 weeks ago",
    quote:
      "We had a specific budget and the team respected it throughout the planning process — no unnecessary expenses, and every detail was checked before all the wedding functions.",
  },
  {
    initial: "B",
    color: "bg-[#8a5a3f]",
    name: "BHISAMDUTT SHARMA",
    handle: "@BhisamduttSharma",
    time: "3 weeks ago",
    quote:
      "We appreciated how honest the team was about every venue and service. They explained the pros and cons of all the things mentioned instead of just trying to sell us one option.",
  },
  {
    initial: "R",
    color: "bg-[#2f9ab0]",
    name: "RAMESH CHAWLA",
    handle: "@RameshChawla",
    time: "3 weeks ago",
    quote:
      "Both of us had busy work schedules and barely had time to plan the wedding. Having a dedicated team handle the timeline and coordination made the entire process blissfully stress-free.",
  },
  {
    initial: "K",
    color: "bg-[#e06a2a]",
    name: "KHUSHBOO SHARMA",
    handle: "@KhushbooSharma",
    time: "4 weeks ago",
    quote:
      "Our wedding planner was always available whenever we needed help. They understood our vision, answered our questions patiently, and guided us through every step with grace.",
  },
  {
    initial: "S",
    color: "bg-[#9e7b39]",
    name: "SNEHA MEHTA",
    handle: "@SnehaMehta",
    time: "5 weeks ago",
    quote:
      "From the floral styling to the guest flow, everything felt polished and deeply personal. GS Events created a celebration that looked effortless and felt unforgettable.",
  },
  {
    initial: "A",
    color: "bg-[#4f6a8a]",
    name: "AARUSHI JAIN",
    handle: "@AarushiJain",
    time: "1 months ago",
    quote:
      "Their team brought a sense of calm luxury to our wedding planning. Every suggestion felt curated, and every decision was handled with professionalism and warmth.",
  },
  {
    initial: "V",
    color: "bg-[#7c3d43]",
    name: "VIKRAM SETHI",
    handle: "@VikramSethi",
    time: "2 months ago",
    quote:
      "We wanted an elegant wedding with flawless execution, and that is exactly what we received. The attention to detail and hospitality were exceptional from start to finish.",
  },
  {
    initial: "N",
    color: "bg-[#3f7d5a]",
    name: "NIDHI GUPTA",
    handle: "@NidhiGupta",
    time: "6 weeks ago",
    quote:
      "The team understood exactly how we wanted our celebration to feel. The final experience looked luxurious, intimate and extremely well-managed from every angle.",
  },
  {
    initial: "P",
    color: "bg-[#5d4a94]",
    name: "PRATEEK SHARMA",
    handle: "@PrateekSharma",
    time: "1 month ago",
    quote:
      "Our family events usually feel hectic, but with GS Events everything was beautifully coordinated. Their communication, planning and execution were genuinely top-tier.",
  },
  {
    initial: "T",
    color: "bg-[#7c5a3c]",
    name: "TANVI MALHOTRA",
    handle: "@TanviMalhotra",
    time: "6 weeks ago",
    quote:
      "Every detail was thought through with care — the theme, the table styling, the guest experience and the final atmosphere. It felt like a true luxury affair.",
  },
  {
    initial: "Y",
    color: "bg-[#2d7b7f]",
    name: "YASHIKA VERMA",
    handle: "@YashikaVerma",
    time: "2 months ago",
    quote:
      "They balanced elegance with comfort beautifully. The team was responsive, creative and incredibly efficient, and the end result surpassed all our expectations.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GS Events & Catering — Luxury Event Management & Fine Catering" },
      {
        name: "description",
        content:
          "Design-led weddings, ceremonies and corporate events with bespoke catering. 500+ celebrations crafted over 15 years.",
      },
      {
        name: "keywords",
        content:
          "Best Event Management in Berhampur, Best Event Management in Odisha, Best Event Management in Brahmapur, Best Catering in Odisha, Best Catering Service in Odisha, Best Catering Service in Berhampur",
      },
      { property: "og:title", content: "GS Events & Catering — Luxury Events & Fine Catering" },
      {
        property: "og:description",
        content:
          "Crafting unforgettable celebrations: weddings, ceremonies, corporate events and bespoke catering.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [photosState, setPhotosState] = useState<Photo[]>(seedPhotos);
  const testimonialTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/photos`)
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && data.length) setPhotosState(data as Photo[]);
      })
      .catch(() => {});
  }, []);

  const scrollTestimonials = (direction: 1 | -1) => {
    const container = testimonialTrackRef.current;
    if (!container) return;

    const firstCard = container.querySelector("article");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 320;
    const gap = 20;
    container.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  };

  const featured = photosState.slice(0, 8);

  return (
    <>
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
        <img
          src={images.heroEvent}
          alt="Candlelit outdoor wedding reception with an ivory and gold floral mandap"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-espresso/60" />
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center">
          <p className="eyebrow text-[oklch(0.86_0.03_80)]">Events &amp; Fine Catering</p>
          <h1 className="mt-6 font-serif text-3xl leading-[1.15] tracking-wide text-[oklch(0.97_0.012_84.6)] sm:text-5xl md:text-6xl">
            {brand.tagline}
          </h1>
          <div className="gold-rule mx-auto mt-8" />
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-[oklch(0.88_0.02_80)] md:text-base">
            Weddings, ceremonies and corporate gatherings designed end to end — decor,
            hospitality and menus written for your family.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-secondary px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-secondary-foreground transition-opacity hover:opacity-90"
            >
              Plan Your Event
            </Link>
            <Link
              to="/gallery"
              className="border border-[oklch(0.9_0.02_80_/_0.6)] px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-[oklch(0.95_0.012_84.6)] transition-colors hover:bg-white/10"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Est. 2011 · Hyderabad</p>
          <p className="mt-6 font-serif text-xl leading-relaxed tracking-wide text-foreground md:text-2xl">
            We are a small atelier of planners, designers and chefs who believe a celebration
            should feel like the family that hosts it — never like a template.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            From a fifty-guest thread ceremony to a thousand-guest wedding week, every event is
            handled by one dedicated team from first sketch to final send-off.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-border bg-accent/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-14 md:grid-cols-4 md:px-8">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <p className="font-serif text-4xl text-primary md:text-5xl">{s.value}</p>
              <p className="eyebrow mt-3">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title="Services Crafted Around You"
              intro="Four ways to work with us — each fully bespoke, each delivered by the same senior team."
            />
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {servicePreview.map((s, i) => (
              <Reveal key={s.slug} className={`[transition-delay:${i * 80}ms]`}>
                <article className="group h-full border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
                  <div className="overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl tracking-wide">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                    <Link
                      to="/services"
                      className="mt-5 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary"
                    >
                      Learn More <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <section className="border-y border-border bg-accent/30 py-16 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-4 px-4 sm:px-5 md:grid-cols-[minmax(0,1fr)_auto] md:px-8">
          <div className="min-w-0 text-center md:text-left">
            <p className="eyebrow">Instagram</p>
            <h2 className="mt-4 font-serif text-2xl tracking-wide sm:text-3xl md:text-4xl">Follow Our Journey</h2>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              @{brand.instagram}
            </a>
          </div>
          <div className="hidden gap-2 sm:flex" />
        </div>

        <div className="mx-auto mt-8 px-3 sm:px-5 md:mt-10 md:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "https://www.instagram.com/reel/Da15gaihj2Z/embed",
              "https://www.instagram.com/reel/DX8Knt2hIiu/embed",
              "https://www.instagram.com/reel/DVkWJVugWdh/embed",
              "https://www.instagram.com/reel/DZwWc9JBQQz/embed",
              "https://www.instagram.com/reel/DZJpxdmhE35/embed",
            ].map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="overflow-hidden rounded-[22px] border border-[#eadfce] bg-[linear-gradient(180deg,#fffdfb_0%,#f7f1ea_100%)] shadow-[0_18px_40px_rgba(36,25,18,0.08)] ring-1 ring-black/5 sm:rounded-[26px]"
              >
                <iframe
                  src={url}
                  title={`Instagram reel ${index + 1}`}
                  className="h-[300px] w-full border-0 bg-white sm:h-[340px] md:h-[420px]"
                  style={{ overflow: "hidden" }}
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Portfolio"
              title="Moments We've Created"
              intro="A glimpse of recent celebrations — decor, cuisine and the details in between."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {featured.map((p, i) => (
              <Reveal key={p.id}>
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full object-cover shadow-soft"
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/gallery"
              className="inline-block border border-primary px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[#f5f1eb] px-4 py-16 sm:px-5 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <div className="flex items-end justify-center">
              <div className="w-full max-w-5xl text-center">
                <p className="eyebrow text-[#80776b]">Kind Words</p>
                <h2 className="mt-4 font-serif text-[2.1rem] leading-none tracking-[-0.04em] text-[#201b17] sm:text-[2.8rem] md:text-[4rem]">
                  From Our Clients
                </h2>
                <div className="mx-auto mt-5 h-px w-24 bg-[#d9cab7]" />
              </div>
            </div>
          </Reveal>

          <div ref={testimonialTrackRef} className="mt-10 overflow-hidden md:mt-12">
            <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-5">
              {testimonialCards.map((t) => (
                <Reveal
                  key={t.name}
                  className="w-[82vw] shrink-0 snap-start sm:w-[52vw] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.25rem)]"
                >
                  <article className="h-full rounded-[22px] border border-[#e1d5c5] bg-[linear-gradient(180deg,#fbf7f3_0%,#f5efe8_100%)] p-4 shadow-[0_16px_40px_rgba(49,38,29,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(39,29,22,0.10)] sm:rounded-[28px] sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-inner ${t.color}`}
                        >
                          {t.initial}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#201b17]">
                            {t.name}
                          </p>
                          <p className="mt-1 truncate text-[0.62rem] uppercase tracking-[0.12em] text-[#7a7168]">
                            {t.handle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-[#e2d8ca] bg-[#f7f4ef] px-2 py-1.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]">
                        <span className="flex size-5 items-center justify-center rounded-full bg-[#1d1d1f] text-[0.48rem] font-bold text-white">
                          G
                        </span>
                      </div>
                    </div>

                    <p className="mt-6 min-h-[138px] text-[0.92rem] leading-7 text-[#3f3934] sm:text-[0.95rem]">“{t.quote}”</p>

                    <div className="mt-6 flex items-center justify-between border-t border-[#e7dccd] pt-4">
                      <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-[#70665d]">
                        Verified
                      </span>
                      <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#70665d]">
                        {t.time}
                      </span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-5 md:px-8 md:py-32">
        <img
          src={images.heroEvent}
          alt="Celebration background"
          className="absolute inset-0 h-full w-full scale-105 object-cover brightness-75 blur-md"
        />
        <div className="absolute inset-0 bg-amber-900/30 mix-blend-multiply" />

        <div className="relative text-center">
          <Reveal className="mx-auto max-w-2xl">
            <p className="eyebrow text-[oklch(0.74_0.02_80)]">Let's Begin</p>
            <h2 className="mt-5 font-serif text-2.5xl leading-tight tracking-wide text-primary sm:text-3xl md:text-4xl">
              Tell us about your celebration
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[oklch(0.84_0.02_80)] md:text-base">
              Share your date and guest count — we'll come back with a tailored proposal within two
              working days.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-block bg-primary px-8 py-3.5 text-[0.68rem] uppercase tracking-[0.24em] text-primary-foreground transition-opacity hover:opacity-90 sm:px-9 sm:py-4"
            >
              Plan Your Event
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
