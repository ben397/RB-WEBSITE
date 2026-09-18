import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/posts";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "News and updates from Refugee Brotherhood.",
};

export default function BlogIndex() {
  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Reveal variant="up">
            <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">Blog</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink/80">
              Updates from our programmes, partnerships, and events.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        {posts.length > 0 ? (
          <ul className="space-y-8">
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={Math.min(i, 4) * 90} variant="up" className="border-t border-ink/10 pt-6">
                <Link href={`/blog/${post.slug}`} className="group">
                  <p className="text-sm text-ink/50">
                    {new Date(post.date).toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl font-semibold text-navy group-hover:text-ochre">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-ink/70">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal variant="fade">
            <div className="rounded-xl border border-dashed border-ink/20 p-8 text-center">
              <p className="text-ink/70">No posts published yet — check back soon.</p>
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
