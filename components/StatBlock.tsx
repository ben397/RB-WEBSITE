import type { Stat } from "@/content/impact";

// Filters out any stat whose value hasn't been verified before rendering anything.
// This is the fix for the live site's "Lives Impacted" counter that rendered as a bare
// label with no number: an unverified stat should not appear at all, rather than appear
// empty.
export function StatBlock({ stats }: { stats: Stat[] }) {
  const verified = stats.filter((s) => s.value !== null);
  if (verified.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {verified.map((stat) => (
        <div key={stat.label}>
          <dt className="text-sm text-ink/70">{stat.label}</dt>
          <dd className="font-serif text-4xl font-semibold text-navy">
            {stat.value}
            {stat.suffix ?? ""}
          </dd>
        </div>
      ))}
    </dl>
  );
}
