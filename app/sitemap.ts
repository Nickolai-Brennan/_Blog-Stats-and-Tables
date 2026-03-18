import type { MetadataRoute } from "next";
import { getTaxonomy, listPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const posts = listPosts();
  const { categories, tags } = getTaxonomy();

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/archive`, lastModified: new Date() },
    ...posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.updatedAt)
    })),
    ...categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date()
    })),
    ...tags.map((tag) => ({
      url: `${baseUrl}/tag/${tag.slug}`,
      lastModified: new Date()
    }))
  ];
}
