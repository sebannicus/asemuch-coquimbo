import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type DashboardTable = "news" | "communications" | "documents" | "agreements";

export interface ContentCounts {
  published: number;
  draft: number;
}

const TABLES: DashboardTable[] = ["news", "communications", "documents", "agreements"];

export async function getContentCounts(): Promise<Record<DashboardTable, ContentCounts> | null> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const results = await Promise.all(
    TABLES.flatMap((table) =>
      (["published", "draft"] as const).map(async (status) => {
        const { count } = await supabase.from(table).select("id", { count: "exact", head: true }).eq("status", status);
        return { table, status, count: count ?? 0 };
      }),
    ),
  );

  const counts = Object.fromEntries(TABLES.map((table) => [table, { published: 0, draft: 0 }])) as Record<
    DashboardTable,
    ContentCounts
  >;
  results.forEach(({ table, status, count }) => {
    counts[table][status] = count;
  });

  return counts;
}
