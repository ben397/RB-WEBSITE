import { testimonials } from "@/content/testimonials";

// Same honesty rule as Blog/Alumni: an empty state that says so, rather than either
// disappearing silently or filling the space with invented quotes.
export function TestimonialSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif text-3xl font-semibold text-navy">In Their Words</h2>

      {testimonials.length > 0 ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-ink/10 p-6">
              <blockquote className="text-ink/80">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4">
                <p className="font-semibold text-navy">{t.name}</p>
                <p className="text-sm text-ink/60">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-ink/20 p-8 text-center">
          <p className="text-ink/70">
            Testimonials from the people we&apos;ve worked with are being gathered with
            their consent — check back soon.
          </p>
        </div>
      )}
    </section>
  );
}
