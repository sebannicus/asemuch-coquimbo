import type { CommunicationRecord } from "@/types/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export interface PublicCommunicationItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  attachmentUrl: string | null;
  attachmentName: string | null;
  href: string;
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

function normalizeCommunication(item: CommunicationRecord): PublicCommunicationItem {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    attachmentUrl: item.attachment_url,
    attachmentName: item.attachment_name,
    href: `/comunicados/${item.slug}`,
    date: formatDisplayDate(item.published_at || item.created_at),
  };
}

export async function getPublishedCommunications() {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("communications")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((item) => normalizeCommunication(item as CommunicationRecord));
}

export async function getPublishedCommunicationBySlug(slug: string) {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("communications")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  return error || !data ? null : normalizeCommunication(data as CommunicationRecord);
}

export async function getAdminCommunicationsList() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("communications").select("*").order("updated_at", { ascending: false });
  return error || !data ? [] : (data as CommunicationRecord[]);
}

export async function getAdminCommunicationById(id: string) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("communications").select("*").eq("id", id).maybeSingle();
  return error || !data ? null : (data as CommunicationRecord);
}

export async function getCommunicationSlugs() {
  const communications = await getPublishedCommunications();
  return communications.map((communication) => communication.slug);
}
