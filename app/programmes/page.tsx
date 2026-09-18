import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Refugee Brotherhood's four programme areas: Livelihood, Psychosocial Support, Peace Building, and Advocacy.",
};

export default function ProgrammesIndex() {
  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal variant="up">
            <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
              Our Programmes
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink/80">
              Four linked areas of work, each addressing a different part of what
              displacement takes from people — economic self-reliance, mental health,
              community relationships, and policy.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {programmes.map((programme, i) => (
            <Reveal key={programme.slug} delay={(i % 2) * 100} variant="up">
              <Link
                href={`/programmes/${programme.slug}`}
                className="group block rounded-2xl border border-ink/10 p-6 transition-colors hover:border-ochre"
              >
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                {(() => {
                  const image = PROGRAMME_IMAGES[programme.slug];
                  return image ? (
                    <Image
                      src={image.src}
                      alt={`${programme.name}: ${image.alt}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  ) : null;
                })()}
              </div>
              <h2 className="mt-5 font-serif text-2xl font-semibold text-navy">
                {programme.name}
              </h2>
              <p className="mt-2 text-ink/80">{programme.shortDescription}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue group-hover:text-ochre">
                Learn more →
              </span>
            </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
