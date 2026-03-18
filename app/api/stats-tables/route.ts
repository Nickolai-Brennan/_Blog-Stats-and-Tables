import { NextRequest, NextResponse } from "next/server";
import { getStatsTables } from "@/lib/posts";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const data = getStatsTables();

  if (slug) {
    const table = data.find((item) => item.slug === slug);
    if (!table) {
      return NextResponse.json({ error: "Stats table not found" }, { status: 404 });
    }
    return NextResponse.json({ data: table });
  }

  return NextResponse.json({ data });
}
