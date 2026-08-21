import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { photos as seedPhotos, type GalleryCategory, type Photo } from "@/lib/site-data";
import { API_BASE } from "@/lib/api";

const tabs = ["ALL", "WEDDING", "CATERING", "EVENTS", "DECORATION"] as const;
const PAGE = 8;

export function Gallery() {
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
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top,_rgba(184,134,59,0.12),_transparent_25%),linear-gradient(180deg,#f7f1e8_0%,#f9f7f4_100%)] px-5 py-20 text-center md:px-8 md:py-24">
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(43,31,23,0.04),transparent)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="eyebrow">Portfolio</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-[0.02em] md:text-5xl lg:text-6xl">
            Gallery
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Real celebrations, unretouched. Filter by category to see the details, textures, and moments that made each event feel unforgettable.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="no-scrollbar -mx-1 flex justify-start gap-2 overflow-x-auto px-1 sm:justify-center">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.2em] transition-all ${
                  tab === t
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_18px_30px_-22px_rgba(184,134,59,0.85)]"
                    : "border-border bg-white/25 text-muted-foreground hover:border-primary hover:text-primary"
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
                  className="group block w-full overflow-hidden rounded-[22px] border border-border bg-card shadow-soft transition-transform hover:-translate-y-1"
                  aria-label={`Open image: ${p.alt}`}
                >
                  <div className="image-frame">
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {count < filtered.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setCount((c) => c + PAGE)}
                className="premium-button"
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
            className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/5 p-2 text-[oklch(0.9_0.02_80)] backdrop-blur-sm"
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
            className="absolute left-3 rounded-full border border-white/20 bg-white/5 p-3 text-[oklch(0.9_0.02_80)] backdrop-blur-sm md:left-8"
          >
            <ChevronLeft className="size-8" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full">
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[78vh] w-auto max-w-full rounded-[20px] object-contain shadow-lift"
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
            className="absolute right-3 rounded-full border border-white/20 bg-white/5 p-3 text-[oklch(0.9_0.02_80)] backdrop-blur-sm md:right-8"
          >
            <ChevronRight className="size-8" />
          </button>
        </div>
      )}
    </>
  );
}
