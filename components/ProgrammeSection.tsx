import Image from "next/image";
import Link from "next/link";
import { programmes } from "@/content/programs";
import { Reveal } from "@/components/Reveal";

const PROGRAMME_IMAGES: Record<string, { src: string; alt: string }> = {
  livelihood: {
    src: "/images/livelihood-market.jpg",
    alt: "Colourful market stall of fresh produce grown and sold through small enterprise",
  },
  psychosocial: {
    src: "/images/psychosocial-support.jpg",
    alt: "Volunteers handing over food parcels during a community support distribution",
  },
  peace: {
    src: "/images/peace-football.jpg",
    alt: "Coach talking with young footballers on the pitch at a Peace Cup-style tournament",
  },
  advocacy: {
    src: "/images/advocacy-stage.jpg",
    alt: "Microphone on stage ready for a speaker at a community advocacy event",
  },
};

// Home shows a teaser per programme (name + one-liner) and links out to the dedicated
// /programmes/[slug] page for the full detail — sub-projects, highlights, everything.
// Deliberately not a uniform card grid even at teaser size: the four programmes aren't
// equivalent in scope, so each gets its own row rather than being flattened into
// identical tiles.
export function ProgrammeSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal variant="up">
        <h2 className="font-serif text-3xl font-semibold text-navy">Our Programmes</h2>
        <p className="mt-3 max-w-2xl text-ink/70">
          Four linked areas of work, each addressing a different part of what displacement
          takes from people.
        </p>
      </Reveal>

      <div className="mt-12 space-y-10">
        {programmes.map((programme, i) => {
          const reversed = i % 2 === 1;
          return (
            <Reveal
              as="article"
              key={programme.slug}
              className={`grid items-center gap-8 border-t border-ink/10 pt-10 md:grid-cols-5 ${
                reversed ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative hidden aspect-[16/9] overflow-hidden rounded-2xl md:col-span-2 md:block">
                {(() => {
                  const image = PROGRAMME_IMAGES[programme.slug];
                  return image ? (
                    <Image
                      src={image.src}
                      alt={`${programme.name}: ${image.alt}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 40vw, 100vw"
                    />
                  ) : null;
                })()}
              </div>
              <div className="md:col-span-3">
                <h3 className="font-serif text-2xl font-semibold text-navy">
                  {programme.name}
                </h3>
                <p className="mt-2 text-ink/80">{programme.shortDescription}</p>
                <Link
                  href={`/programmes/${programme.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-blue hover:text-ochre"
                >
                  Learn more about {programme.name} →
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
