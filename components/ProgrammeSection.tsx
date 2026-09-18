import Link from "next/link";
import { programmes } from "@/content/programs";

// Home shows a teaser per programme (name + one-liner) and links out to the dedicated
// /programmes/[slug] page for the full detail — sub-projects, highlights, everything.
// Deliberately not a uniform card grid even at teaser size: the four programmes aren't
// equivalent in scope, so each gets its own row rather than being flattened into
// identical tiles.
export function ProgrammeSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif text-3xl font-semibold text-navy">Our Programmes</h2>
      <p className="mt-3 max-w-2xl text-ink/70">
        Four linked areas of work, each addressing a different part of what displacement
        takes from people.
      </p>

      <div className="mt-12 space-y-10">
        {programmes.map((programme, i) => {
          const reversed = i % 2 === 1;
          return (
            <article
              key={programme.slug}
              className={`grid items-center gap-8 border-t border-ink/10 pt-10 md:grid-cols-5 ${
                reversed ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div
                className="hidden aspect-[16/9] rounded-2xl bg-gradient-to-br from-sage/40 via-blue/30 to-navy/20 md:col-span-2 md:block"
                aria-hidden="true"
              />
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
            </article>
          );
        })}
      </div>
    </section>
  );
}
