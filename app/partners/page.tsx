import type { Metadata } from "next";
import { partners } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners",
  description: "Organisations Refugee Brotherhood partners with to deliver its programmes.",
};

export default function PartnersPage() {
  const known = partners.filter((p) => p.name);

  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
            Our Partners
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/80">
            Refugee Brotherhood&apos;s programmes run through partnerships — with NGOs,
            businesses, and community organisations who bring resources and expertise
            our own community-led model doesn&apos;t have on its own.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        {known.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {known.map((partner) => (
              <li key={partner.name} className="rounded-xl border border-ink/10 p-5">
                <p className="font-semibold text-navy">{partner.name}</p>
                {partner.description && (
                  <p className="mt-2 text-sm text-ink/70">{partner.description}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink/70">Partner details coming soon.</p>
        )}
      </section>
    </>
  );
}
