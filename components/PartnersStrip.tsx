import Link from "next/link";
import { partners } from "@/content/partners";

// Renders every confirmed partner (not a truncated preview) — same null-safe pattern as
// the rest of the site.
export function PartnersStrip() {
  const known = partners.filter((p) => p.name);
  if (known.length === 0) return null;

  return (
    <section className="border-y border-ink/10 bg-navy/5">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold text-navy">Our Partners</h2>
          <Link href="/partners" className="text-sm font-semibold text-blue hover:text-ochre">
            See all partners →
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
          {known.map((partner) => (
            <li key={partner.name}>
              <p className="font-semibold text-navy">{partner.name}</p>
              {partner.description && (
                <p className="mt-1 text-sm text-ink/70">{partner.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
