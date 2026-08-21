import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Instagram, ExternalLink } from "lucide-react";
import { brand, type Reel } from "@/lib/site-data";

const instagramEmbedUrls = [
  "https://www.instagram.com/reel/Da15gaihj2Z/embed",
  "https://www.instagram.com/reel/DX8Knt2hIiu/embed",
  "https://www.instagram.com/reel/DVkWJVugWdh/embed",
  "https://www.instagram.com/reel/DZwWc9JBQQz/embed",
  "https://www.instagram.com/reel/DZJpxdmhE35/embed",
];

function ReelCard({ reel }: { reel: Reel }) {
  const showThumbnail = !!reel.thumbnail;

  return (
    <article className="w-[72vw] shrink-0 snap-center sm:w-[38vw] lg:w-[280px]">
      <div className="overflow-hidden rounded-[26px] border border-[#eadfce] bg-[linear-gradient(180deg,#fffdfb_0%,#f7f1ea_100%)] shadow-[0_18px_40px_rgba(36,25,18,0.08)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(36,25,18,0.12)]">
        {showThumbnail ? (
          <a href={reel.url} target="_blank" rel="noreferrer" className="group block">
            <div className="overflow-hidden rounded-[22px]">
              <img
                src={reel.thumbnail}
                alt={reel.caption ?? "Reel thumbnail"}
                loading="lazy"
                width={600}
                height={1067}
                className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-center justify-between px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-[#f5efe9] ring-1 ring-[#eadfce]">
                  <Instagram className="size-3.5 text-primary" />
                </span>
                <span className="text-[0.58rem] uppercase tracking-[0.24em] text-primary">Watch reel</span>
              </div>
              <ExternalLink className="size-3.5 text-primary" />
            </div>
          </a>
        ) : (
          <a
            href={reel.url}
            target="_blank"
            rel="noreferrer"
            className="flex aspect-[9/16] flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(243,235,226,0.9)_45%,_rgba(232,220,206,0.92))] px-6 text-center"
          >
            <span className="grid size-12 place-items-center rounded-full bg-white ring-1 ring-[#eadfce] shadow-[0_10px_24px_rgba(46,34,24,0.08)]">
              <Instagram className="size-6 text-primary" />
            </span>
            <span className="text-sm font-medium text-muted-foreground">Open reel on Instagram</span>
            <span className="inline-flex items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.24em] text-primary">
              Watch <ExternalLink className="size-3" />
            </span>
          </a>
        )}
      </div>
      {reel.caption && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{reel.caption}</p>
      )}
    </article>
  );
}

export function ReelsCarousel({ reels }: { reels: Reel[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const embedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof window === "undefined") return;

    const ordered = [...track.children] as HTMLElement[];
    if (ordered.length < 2) return;

    const interval = window.setInterval(() => {
      const current = track.scrollLeft;
      const next = ordered.find((card) => card.offsetLeft > current + 12);

      if (next) {
        track.scrollTo({ left: next.offsetLeft - 20, behavior: "smooth" });
        return;
      }

      track.scrollTo({ left: 0, behavior: "smooth" });
    }, 3200);

    return () => window.clearInterval(interval);
  }, [reels]);

  const ordered = [...reels].filter((r) => r.active).sort((a, b) => a.priority - b.priority);

  return (
    <div>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-end gap-4 px-5 md:px-8">
        <div className="min-w-0">
          <p className="eyebrow">Instagram</p>
          <h2 className="mt-4 font-serif text-3xl tracking-wide md:text-4xl">
            Follow Our Journey
          </h2>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Instagram className="size-4" /> @{brand.instagram}
          </a>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous reels"
            onClick={() => {
              const track = trackRef.current;
              if (!track) return;
              track.scrollBy({ left: -track.clientWidth * 0.8, behavior: "smooth" });
            }}
            className="grid size-10 place-items-center border border-border text-primary transition-colors hover:bg-accent"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next reels"
            onClick={() => {
              const track = trackRef.current;
              if (!track) return;
              track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" });
            }}
            className="grid size-10 place-items-center border border-border text-primary transition-colors hover:bg-accent"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {ordered.length > 0 ? (
        <div
          ref={trackRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:px-8"
        >
          {ordered.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      ) : (
        <div ref={embedRef} className="mx-auto mt-10 px-5 md:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {instagramEmbedUrls.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="overflow-hidden rounded-[26px] border border-[#eadfce] bg-[linear-gradient(180deg,#fffdfb_0%,#f7f1ea_100%)] shadow-[0_18px_40px_rgba(36,25,18,0.08)] ring-1 ring-black/5"
              >
                <iframe
                  src={url}
                  title={`Instagram reel ${index + 1}`}
                  className="h-[560px] w-full border-0 bg-white"
                  style={{ overflow: 'hidden' }}
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
