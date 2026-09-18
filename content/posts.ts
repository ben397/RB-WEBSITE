// Blog posts. The live site's /news section content wasn't captured in the earlier
// review, so this starts empty rather than inventing articles. Add real posts here (or
// swap this for an MDX/CMS-backed loader) once RB has content to publish.

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  body: string;
}

export const posts: Post[] = [];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
