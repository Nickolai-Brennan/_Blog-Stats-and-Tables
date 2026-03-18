import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { posts } from "@/lib/seed-data";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  if (!payload?.title || !payload?.slug || !payload?.excerpt || !payload?.categoryId || !payload?.authorId) {
    return NextResponse.json({ error: "Missing required post fields" }, { status: 400 });
  }

  if (posts.some((post) => post.slug === payload.slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const now = new Date().toISOString();
  const post = {
    id: randomUUID(),
    title: payload.title,
    subtitle: payload.subtitle ?? "",
    slug: payload.slug,
    excerpt: payload.excerpt,
    featuredImage: payload.featuredImage ?? "",
    authorId: payload.authorId,
    categoryId: payload.categoryId,
    tagIds: payload.tagIds ?? [],
    publishedAt: payload.publishedAt ?? now,
    updatedAt: now,
    seo: payload.seo ?? {
      title: payload.title,
      description: payload.excerpt,
      twitterCard: "summary_large_image"
    },
    contentBlocks: payload.contentBlocks ?? [],
    trendingScore: payload.trendingScore ?? 0,
    views: payload.views ?? 0
  };

  posts.unshift(post);

  return NextResponse.json({ data: post }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const payload = await request.json();

  if (!payload?.slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const index = posts.findIndex((post) => post.slug === payload.slug);
  if (index === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  posts[index] = {
    ...posts[index],
    ...payload,
    updatedAt: new Date().toISOString()
  };

  return NextResponse.json({ data: posts[index] });
}
