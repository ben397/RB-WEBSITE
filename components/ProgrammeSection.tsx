import Link from "next/link";
import { programmes } from "@/content/programs";

// Deliberately not a uniform card grid: the four programmes aren't equivalent in scope
// (Livelihood covers several sub-projects, Peace Building runs on a fixed annual
// calendar), so each gets its own row rather than being flattened into identical tiles.
export function ProgrammeSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif text-3xl font-semibold text-navy">Our Programmes</h2>
      <p className="mt-3 max-w-2xl text-ink/70">
        Four linked areas of work, each addressing a different part of what displacement
        takes from people.
      </p>

      <div className="mt-12 space-y-16">
        {programmes.map((programme, i) => {
          const reversed = i % 2 === 1;
          return (
            <article
              key={programme.slug}
              className={`grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-5 ${
                reversed ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div
                className="hidden aspect-[16/10] rounded-2xl bg-gradient-to-br from-sage/40 via-blue/30 to-navy/20 md:col-span-2 md:block"
                aria-hidden="true"
              />
              <div className="md:col-span-3">
                <h3 className="font-serif text-2xl font-semibold text-navy">
                  {programme.name}
                </h3>
                <p className="mt-2 text-ink/80">{programme.description}</p>

                {programme.subProjects && programme.subProjects.length > 0 && (
                  <ul className="mt-6 space-y-4">
                    {programme.subProjects
                      .filter((sp) => sp.name)
                      .map((sp) => (
                        <li key={sp.name}>
                          <p className="font-semibold text-navy">{sp.name}</p>
                          <p className="text-sm text-ink/70">{sp.summary}</p>
                        </li>
                      ))}
                  </ul>
                )}

                {programme.highlights && (
                  <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {programme.highlights.map((h) => (
                      <div key={h.label} className="rounded-xl bg-navy/5 p-3">
                        <dt className="text-sm font-semibold text-ochre">{h.label}</dt>
                        <dd className="text-xs text-ink/70">{h.detail}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <Link
                  href={`/programmes/${programme.slug}`}
                  className="mt-6 inline-block text-sm font-semibold text-blue hover:text-ochre"
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
