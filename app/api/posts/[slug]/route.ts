import { NextResponse } from "next/server";
import { getPostBySlug, getPostPresentation } from "@/lib/posts";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ data: getPostPresentation(post) });
}
