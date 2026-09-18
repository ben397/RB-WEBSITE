import Link from "next/link";
import type { Metadata } from "next";
import { programmes } from "@/content/programs";

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
          <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
            Our Programmes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/80">
            Four linked areas of work, each addressing a different part of what
            displacement takes from people — economic self-reliance, mental health,
            community relationships, and policy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {programmes.map((programme) => (
            <Link
              key={programme.slug}
              href={`/programmes/${programme.slug}`}
              className="group block rounded-2xl border border-ink/10 p-6 transition-colors hover:border-ochre"
            >
              <div
                className="aspect-[16/9] rounded-xl bg-gradient-to-br from-sage/40 via-blue/30 to-navy/20"
                aria-hidden="true"
              />
              <h2 className="mt-5 font-serif text-2xl font-semibold text-navy">
                {programme.name}
              </h2>
              <p className="mt-2 text-ink/80">{programme.shortDescription}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue group-hover:text-ochre">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
