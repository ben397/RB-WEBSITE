import Link from "next/link";
import type { Metadata } from "next";
import { siteInfo } from "@/content/site";
import { programmes } from "@/content/programs";
import { TeamSection } from "@/components/TeamSection";

export const metadata: Metadata = {
  title: "About",
  description: siteInfo.tagline,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
            About {siteInfo.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/80">{siteInfo.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-serif text-2xl font-semibold text-navy">How We Work</h2>
        <p className="mt-4 max-w-3xl text-ink/80">
          Refugee Brotherhood is led by people who have themselves navigated
          displacement, and our programmes are built around what that experience
          actually requires: income that doesn&apos;t depend on paperwork most refugees
          can&apos;t get, support for the trauma displacement leaves behind, real
          relationships between refugee and host communities, and a seat in the policy
          conversations that decide how refugees are treated in Kenya.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {programmes.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/programmes/${p.slug}`}
                className="block rounded-xl border border-ink/10 p-4 hover:border-ochre"
              >
                <p className="font-semibold text-navy">{p.name}</p>
                <p className="mt-1 text-sm text-ink/70">{p.shortDescription}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <TeamSection />
    </>
  );
}
