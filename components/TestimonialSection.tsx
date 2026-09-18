"use client";

import { useRef, useState } from "react";
import { testimonials } from "@/content/testimonials";

export function TestimonialSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const hasPlaceholders = testimonials.some((t) => t.placeholder);

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, testimonials.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-serif text-3xl font-semibold text-navy">In Their Words</h2>
        {testimonials.length > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-navy hover:border-ochre hover:text-ochre"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(index + 1)}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-navy hover:border-ochre hover:text-ochre"
            >
              →
            </button>
          </div>
        )}
      </div>

      {hasPlaceholders && (
        <p className="mt-3 text-sm text-ochre">
          Sample quotes shown for layout — pending real, consented testimonials from RB.
        </p>
      )}

      {testimonials.length > 0 ? (
        <>
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
          >
            {testimonials.map((t) => (
              <figure
                key={t.name + t.role}
                className="w-full shrink-0 snap-center rounded-2xl border border-ink/10 bg-paper p-8 sm:p-10"
              >
                <blockquote className="max-w-2xl font-serif text-xl leading-relaxed text-navy sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-semibold text-navy">{t.name}</p>
                  <p className="text-sm text-ink/60">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {testimonials.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name + t.role}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-ochre" : "w-2 bg-ink/20"
                  }`}
                />
              ))}
            </div>
          )}
        </>
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
