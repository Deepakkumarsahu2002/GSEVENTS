import { Award, Leaf, NotebookPen, Timer } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { images, whyUs } from "@/lib/site-data";

const icons = [Award, Leaf, NotebookPen, Timer];

export function About() {
  return (
    <>
      <section className="border-b border-border bg-accent/30 px-5 py-20 text-center md:px-8 md:py-24">
        <p className="eyebrow">Our Story</p>
        <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-wide md:text-5xl">
          Years of celebrations, one obsession with detail
        </h1>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={images.founder}
              alt="Founder Aarti Rao in an ivory saree inside a decorated banquet hall"
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full object-cover shadow-lift"
            />
          </Reveal>
          <Reveal>
            <p className="eyebrow">Founder</p>
            <h2 className="mt-4 font-serif text-3xl tracking-wide md:text-4xl">Gopal Subudhi</h2>
            <div className="gold-rule mt-5" />
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                GS Events & Catering began in 2017 with a small dream 
                that Gopal cooked and styled for himself. Word travelled the way it
                does in close families, and passion became profession.
              </p>
              <p>
                Ten years later, the studio designs multi-day weddings and thousand-guest
                galas, but the working method hasn't changed: one senior planner owns your event,
                the menu is written for your family's palate, and nothing leaves the kitchen that
                Gopal wouldn't serve at home.
              </p>
              <p className="font-serif text-lg tracking-wide text-foreground">
                “Luxury isn't gold on everything. It's a guest who never has to ask for anything.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-espresso px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Our Approach"
            title="Design first, hospitality always"
            tone="dark"
            intro="We start with your story, not a package. Every mood board, run sheet and tasting is built around the people in the room — then executed with a crew that has done it five hundred times."
          />
        </Reveal>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="The Team"
              title="Members, Planners & Workers"
              intro="A permanent core team — no rotating freelancers on your event day."
            />
          </Reveal>
          <Reveal className="mt-14">
            <img
              src={images.team}
              alt="Chefs and event planners preparing dishes in a professional kitchen"
              loading="lazy"
              width={1024}
              height={768}
              className="w-full object-cover shadow-lift"
            />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { src: images.team2, alt: "Chef plating appetisers at a live counter" },
              { src: images.team3, alt: "Stylist finishing a gold and ivory tablescape" },
              { src: images.team4, alt: "Planners setting a wedding ceremony aisle" },
            ].map((m) => (
              <Reveal key={m.alt}>
                <img
                  src={m.src}
                  alt={m.alt}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-4/3 w-full object-cover shadow-soft"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-accent/40 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading eyebrow="Why Choose Us" title="Four Promises" />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item, i) => {
              const Icon = icons[i]!;
              return (
                <Reveal key={item.title}>
                  <div className="h-full border border-border bg-card p-7 shadow-soft">
                    <Icon className="size-6 text-primary" />
                    <h3 className="mt-5 font-serif text-lg tracking-wide">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionHeading eyebrow="Recognition" title="Certifications & Awards" />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              "FSSAI Certified Kitchen — Lic. 12345678901234",
              "Best Wedding Caterer, Odisha Hospitality Awards 2023",
              "HACCP Food Safety Compliant",
              "Featured — WeddingSutra Favourites 2024",
            ].map((c) => (
              <Reveal key={c}>
                <p className="border border-border bg-card p-5 text-sm text-muted-foreground shadow-soft">
                  {c}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
