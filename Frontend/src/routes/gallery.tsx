import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { photos as seedPhotos, type GalleryCategory, type Photo } from "@/lib/site-data";
import { API_BASE } from "@/lib/api";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Weddings, Decor & Cuisine | GS Events & Catering" },
      {
        name: "description",
        content:
          "Browse our portfolio of weddings, corporate events, decor installations and catering photographed at real celebrations.",
      },
      { property: "og:title", content: "Gallery — GS Events & Catering" },
      {
        property: "og:description",
        content: "Weddings, corporate events, food and decor from recent celebrations.",
      },
    ],
  }),
  component: Gallery,
});

const tabs = ["ALL", "WEDDING", "CATERING", "EVENTS", "DECORATION"] as const;
const PAGE = 8;

function Gallery() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("ALL");
  const [count, setCount] = useState(PAGE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const [photosState, setPhotosState] = useState<Photo[]>(seedPhotos);

  useEffect(() => {
    fetch(`${API_BASE}/api/photos`)
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) setPhotosState(data as Photo[]);
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(
    () => (tab === "ALL" ? photosState : photosState.filter((p) => p.category === (tab as GalleryCategory))),
    [tab, photosState],
  );
  const visible = filtered.slice(0, count);

  useEffect(() => setCount(PAGE), [tab]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % filtered.length);
      if (e.key === "ArrowLeft")
        setLightbox((i) => ((i ?? 0) - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  const current = lightbox === null ? null : filtered[lightbox];

  return (
    <>
      <section className="border-b border-border bg-accent/30 px-5 py-20 text-center md:px-8 md:py-24">
        <p className="eyebrow">Portfolio</p>
        <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-wide md:text-5xl">
          Gallery
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Real celebrations, unretouched. Filter by category to see what interests you most.
        </p>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="no-scrollbar -mx-1 flex justify-start gap-2 overflow-x-auto px-1 sm:justify-center">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`shrink-0 border px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.2em] transition-colors ${
                  tab === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {visible.map((p, i) => (
              <Reveal key={p.id}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group block w-full overflow-hidden shadow-soft"
                  aria-label={`Open image: ${p.alt}`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              </Reveal>
            ))}
          </div>

          {count < filtered.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setCount((c) => c + PAGE)}
                className="border border-primary px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {current && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-espresso/95 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 p-2 text-[oklch(0.9_0.02_80)]"
          >
            <X className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => ((i ?? 0) - 1 + filtered.length) % filtered.length);
            }}
            className="absolute left-3 p-3 text-[oklch(0.9_0.02_80)] md:left-8"
          >
            <ChevronLeft className="size-8" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full">
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[78vh] w-auto max-w-full object-contain shadow-lift"
            />
            <figcaption className="mt-4 text-center text-sm text-[oklch(0.82_0.02_80)]">
              {current.alt} · <span className="text-primary">{current.category}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => ((i ?? 0) + 1) % filtered.length);
            }}
            className="absolute right-3 p-3 text-[oklch(0.9_0.02_80)] md:right-8"
          >
            <ChevronRight className="size-8" />
          </button>
        </div>
      )}
    </>
  );
}
