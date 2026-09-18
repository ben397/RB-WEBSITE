import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/content/posts";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Reveal variant="up">
        <Link href="/blog" className="text-sm font-semibold text-blue hover:text-ochre">
          ← All posts
        </Link>
        <p className="mt-4 text-sm text-ink/50">
          {new Date(post.date).toLocaleDateString("en-KE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-navy">{post.title}</h1>
      </Reveal>
      <Reveal variant="up" delay={120}>
        <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-ink/80">
          {post.body}
        </div>
      </Reveal>
    </article>
  );
}
