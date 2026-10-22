import type { DocumentRecord } from "@/types/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export interface PublicDocumentItem {
  id: string;
  title: string;
  documentType: string;
  summary: string;
  fileUrl: string;
  fileName: string | null;
  date: string;
}

function formatDisplayDate(value: string | null) {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Santiago",
  }).format(new Date(value));
}

export async function getPublishedDocuments(): Promise<PublicDocumentItem[]> {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("status", "published")
    .not("file_url", "is", null)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as DocumentRecord[]).map((item) => ({
    id: item.id,
    title: item.title,
    documentType: item.document_type,
    summary: item.summary,
    fileUrl: item.file_url as string,
    fileName: item.file_name,
    date: formatDisplayDate(item.published_at || item.created_at),
  }));
}

export async function getAdminDocumentsList() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("documents").select("*").order("updated_at", { ascending: false });
  return error || !data ? [] : (data as DocumentRecord[]);
}

export async function getAdminDocumentById(id: string) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("documents").select("*").eq("id", id).maybeSingle();
  return error || !data ? null : (data as DocumentRecord);
}
