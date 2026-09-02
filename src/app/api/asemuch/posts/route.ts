import { NextRequest, NextResponse } from "next/server";

const allowedCategories = new Set([9, 10, 12, 19]);

export async function GET(request: NextRequest) {
  const category = Number(request.nextUrl.searchParams.get("category"));
  const perPage = Math.min(Math.max(Number(request.nextUrl.searchParams.get("perPage")) || 20, 1), 20);

  if (!allowedCategories.has(category)) {
    return NextResponse.json({ error: "Categoría no permitida" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://asemuch.cl/wp-json/wp/v2/posts?categories=${category}&per_page=${perPage}&orderby=date&order=desc&_fields=id,date,title,excerpt,link`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) },
    );

    if (!response.ok) {
      return NextResponse.json([]);
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json([]);
  }
}
