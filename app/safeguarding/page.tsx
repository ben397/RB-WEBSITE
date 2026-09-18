import type { Metadata } from "next";
import { siteInfo } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Safeguarding",
  description: `${siteInfo.name}'s commitment to safeguarding the people it works with.`,
};

export default function SafeguardingPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Reveal variant="up">
            <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
              Safeguarding
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink/80">
              {siteInfo.name} works directly with children, survivors of trauma, and other
              vulnerable people. Their safety in every interaction with us is non-negotiable.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 space-y-8 text-ink/80">
        <Reveal variant="up">
          <p className="rounded-xl border border-dashed border-ochre/60 bg-ochre/5 p-4 text-sm text-ochre">
            This policy is drafted to a standard appropriate for an organisation working with
            displaced people and children, and is pending formal review and adoption by RB&apos;s
            leadership before it should be treated as binding.
          </p>
        </Reveal>

        <Reveal variant="up">
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">Our commitment</h2>
            <p className="mt-2">
              {siteInfo.name} has zero tolerance for abuse, exploitation, or harassment of any
              person we work with, by staff, volunteers, partners, or anyone acting on our
              behalf. This applies regardless of a person&apos;s age, status, or role in our
              programmes.
            </p>
          </div>
        </Reveal>

        <Reveal variant="up">
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">Code of conduct</h2>
            <p className="mt-2">
              Everyone representing {siteInfo.name} — staff, volunteers, and partner
              organisations working alongside us — is expected to treat programme
              participants with dignity, obtain informed consent before using their image or
              story, and never be alone with a child outside of a supervised programme
              setting.
            </p>
          </div>
        </Reveal>

        <Reveal variant="up">
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">Reporting a concern</h2>
            <p className="mt-2">
              If you have a safeguarding concern involving {siteInfo.name} — including
              concerns about a staff member, volunteer, or partner — contact us directly at{" "}
              <a href={`mailto:${siteInfo.email.value}`} className="text-blue hover:text-ochre">
                {siteInfo.email.value}
              </a>
              . Concerns are treated confidentially and taken seriously regardless of who is
              involved.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
