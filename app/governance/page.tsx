import type { Metadata } from "next";
import { siteInfo } from "@/content/site";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Governance",
  description: `How ${siteInfo.name} is led and governed.`,
};

export default function GovernancePage() {
  const leadership = team.filter((m) => m.name);

  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
            Governance
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/80">
            How {siteInfo.name} is led, and who is accountable for its decisions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-serif text-2xl font-semibold text-navy">Leadership</h2>
        <ul className="mt-6 space-y-3">
          {leadership.map((m) => (
            <li key={m.name}>
              <span className="font-semibold text-navy">{m.name}</span>
              {m.role && <span className="text-ink/70"> — {m.role}</span>}
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-xl border border-dashed border-ochre/60 bg-ochre/5 p-6 text-sm text-ochre">
          <p className="font-semibold">Still needed from RB before this page is complete:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Board of Directors — names and roles</li>
            <li>Legal/registration status and registration number</li>
            <li>How often the board meets and what it oversees</li>
            <li>Any relevant policies (conflict of interest, financial oversight)</li>
          </ul>
        </div>
      </section>
    </>
  );
}
