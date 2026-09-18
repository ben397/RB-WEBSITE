import Link from "next/link";
import { team } from "@/content/team";
import { AvatarIllustration } from "@/components/illustrations/Illustration";
import { Reveal } from "@/components/Reveal";

// Renders every confirmed team member (not a truncated preview) — the null-safe filter
// only ever drops entries that aren't confirmed yet, never trims a real one for space.
export function TeamSection({ linkToAbout = false }: { linkToAbout?: boolean }) {
  const known = team.filter((m) => m.name);
  if (known.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal variant="up">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-navy">Our Team</h2>
          {linkToAbout && (
            <Link href="/about" className="text-sm font-semibold text-blue hover:text-ochre">
              Meet the team →
            </Link>
          )}
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {known.map((member, i) => (
          <Reveal key={member.name} delay={(i % 4) * 90} variant="up">
            <div className="aspect-square overflow-hidden rounded-2xl">
              <AvatarIllustration seed={member.name ?? ""} className="h-full w-full" />
            </div>
            <p className="mt-3 font-semibold text-navy">{member.name}</p>
            {member.role && <p className="text-sm text-ink/70">{member.role}</p>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
