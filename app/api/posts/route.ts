import { NextRequest, NextResponse } from "next/server";
import { getPostPresentation, listPosts } from "@/lib/posts";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const posts = listPosts({
    category: searchParams.get("category") ?? undefined,
    tag: searchParams.get("tag") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    date: searchParams.get("date") ?? undefined
  }).map(getPostPresentation);

  return NextResponse.json({ data: posts });
}
