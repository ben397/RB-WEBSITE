import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { programmes, getProgramme, type Programme } from "@/content/programs";
import { CTASection } from "@/components/CTASection";
import { Illustration } from "@/components/illustrations/Illustration";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgramme(slug as Programme["slug"]);
  if (!programme) return {};

  return {
    title: programme.name,
    description: programme.shortDescription,
    openGraph: {
      title: programme.name,
      description: programme.shortDescription,
    },
  };
}

export default async function ProgrammeDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = getProgramme(slug as Programme["slug"]);
  if (!programme) notFound();

  const otherProgrammes = programmes.filter((p) => p.slug !== programme.slug);

  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link
            href="/programmes"
            className="text-sm font-semibold text-blue hover:text-ochre"
          >
            ← All programmes
          </Link>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-navy sm:text-5xl">
            {programme.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/80">{programme.description}</p>

          {programme.contentVerified === false && (
            <p className="mt-6 max-w-2xl rounded-xl border border-dashed border-ochre/60 bg-ochre/5 p-4 text-sm text-ochre">
              This page&apos;s content is a placeholder pending full detail from RB — see
              the README for what&apos;s missing before this goes live.
            </p>
          )}

          <div className="mt-8 aspect-[21/9] overflow-hidden rounded-2xl">
            <Illustration variant={programme.slug} className="h-full w-full" />
          </div>
        </div>
      </section>

      {programme.subProjects && programme.subProjects.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-serif text-2xl font-semibold text-navy">Sub-projects</h2>
          <div className="mt-8 space-y-8">
            {programme.subProjects
              .filter((sp) => sp.name)
              .map((sp) => (
                <div key={sp.name} className="border-t border-ink/10 pt-6">
                  <h3 className="font-semibold text-navy">{sp.name}</h3>
                  <p className="mt-2 text-ink/80">{sp.summary}</p>
                </div>
              ))}
          </div>
        </section>
      )}

      {programme.highlights && programme.highlights.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-serif text-2xl font-semibold text-navy">Key dates &amp; work</h2>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {programme.highlights.map((h) => (
              <div key={h.label} className="rounded-xl bg-navy/5 p-4">
                <dt className="font-semibold text-ochre">{h.label}</dt>
                <dd className="mt-1 text-sm text-ink/70">{h.detail}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="font-serif text-xl font-semibold text-navy">Other programmes</h2>
        <ul className="mt-4 flex flex-wrap gap-4">
          {otherProgrammes.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/programmes/${p.slug}`}
                className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-navy hover:border-ochre hover:text-ochre"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CTASection />
    </>
  );
}
