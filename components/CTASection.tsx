import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-ochre">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="font-serif text-3xl font-semibold text-paper">
          Help us keep this work going.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-paper/90">
          Every contribution supports savings groups, peace-building events, and advocacy
          led by the community it serves.
        </p>
        <Link
          href="/donate"
          className="mt-8 inline-block rounded-full bg-navy px-8 py-3 text-sm font-semibold text-paper hover:opacity-90"
        >
          Donate now
        </Link>
      </div>
    </section>
  );
}
