import Link from "next/link";
import { partners } from "@/content/partners";
import { Reveal } from "@/components/Reveal";

// Scrolling monochrome marquee of text-based partner wordmarks. The track content
// is duplicated so the loop is seamless; animation pauses on hover/focus and is
// disabled for users who prefer reduced motion.
export function PartnersStrip() {
  const known = partners.filter((p) => p.name).map((p) => p.name as string);
  if (known.length === 0) return null;

  const loop = [...known, ...known];

  return (
    <section className="border-y border-ink/10 bg-navy/5" aria-label="Our trusted partners">
      <div className="mx-auto max-w-6xl px-6 pt-14">
        <Reveal variant="up">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-navy">Our Trusted Partners</h2>
            <Link href="/partners" className="text-sm font-semibold text-blue hover:text-ochre">
              See all partners →
            </Link>
          </div>
        </Reveal>
      </div>
      <div className="partners-marquee overflow-hidden pb-14 pt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="partners-track flex w-max items-stretch gap-4 pr-4">
          {loop.map((name, i) => (
            <div
              key={`${name}-${i}`}
              aria-hidden={i >= known.length}
              className="flex h-24 w-48 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-paper px-4 text-center"
            >
              <span className="font-serif text-base font-semibold leading-snug text-navy/70 grayscale">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
