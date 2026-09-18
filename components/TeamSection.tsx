import { team } from "@/content/team";
import { AvatarIllustration } from "@/components/illustrations/Illustration";

export function TeamSection() {
  const known = team.filter((m) => m.name);
  if (known.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif text-3xl font-semibold text-navy">Our Team</h2>
      <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {known.map((member) => (
          <div key={member.name}>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <AvatarIllustration seed={member.name ?? ""} className="h-full w-full" />
            </div>
            <p className="mt-3 font-semibold text-navy">{member.name}</p>
            {member.role && <p className="text-sm text-ink/70">{member.role}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
