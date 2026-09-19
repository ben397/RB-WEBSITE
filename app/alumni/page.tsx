import type { Metadata } from "next";
import Link from "next/link";
import { alumniProfiles } from "@/content/alumni";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Alumni",
  description: "People who have gone through Refugee Brotherhood's programmes.",
};

export default function AlumniPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Reveal variant="up">
            <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
              Alumni
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink/80">
              People who have gone through RB&apos;s programmes — USLA savings branches,
              psychosocial support, the Peace Cup, and advocacy work — and what came after.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        {alumniProfiles.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {alumniProfiles.map((a, i) => (
              <Reveal as="li" key={a.name} delay={(i % 2) * 90} variant="up" className="h-full">
                <div className="h-full rounded-xl border border-ink/10 p-5">
                  <p className="font-semibold text-navy">{a.name}</p>
                  <p className="text-sm text-ink/70">{a.programme}</p>
                  <p className="mt-2 text-sm text-ink/70">{a.story}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal variant="fade">
            <div className="rounded-xl border border-dashed border-ink/20 p-8 text-center">
              <p className="text-ink/70">
                Alumni stories are being gathered with consent from the people involved —
                check back soon.
              </p>
              <p className="mt-4 text-sm">
                <Link href="/programmes" className="font-semibold text-blue hover:text-ochre">
                  See the programmes people come through →
                </Link>
              </p>
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
