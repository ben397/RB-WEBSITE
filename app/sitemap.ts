import type { MetadataRoute } from "next";
import { programmes } from "@/content/programs";
import { posts } from "@/content/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const staticRoutes = [
  "",
  "/about",
  "/programmes",
  "/alumni",
  "/partners",
  "/blog",
  "/contact",
  "/donate",
  "/governance",
  "/safeguarding",
  "/annual-report",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
    })),
    ...programmes.map((p) => ({
      url: `${siteUrl}/programmes/${p.slug}`,
      lastModified: now,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
