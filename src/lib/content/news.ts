import { NEWS_CARDS } from "@/components/SiteData";
import type { NewsCard } from "@/types";
import type { NewsRecord } from "@/types/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabasePublicClient } from "@/lib/supabase/public";

const FALLBACK_NEWS_BODY = [
  "La directiva de ASEMUCH Coquimbo reafirma su compromiso con la defensa de los derechos laborales de los funcionarios municipales de la región.",
  "Seguiremos informando oportunamente sobre reuniones, avances de gestión y próximos hitos gremiales para mantener a la comunidad actualizada.",
].join("\n\n");

const DEFAULT_NEWS_IMAGE = "https://picsum.photos/seed/asemuch-default/768/432";

export interface PublicNewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  href: string;
  date: string;
  isoDate: string | null;
  status: "draft" | "published";
}

function formatDisplayDate(value: string | null) {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Santiago",
  }).format(new Date(value));
}

function normalizeNewsRecord(item: NewsRecord): PublicNewsItem {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    imageUrl: item.featured_image_url || DEFAULT_NEWS_IMAGE,
    href: `/noticias/${item.slug}`,
    date: formatDisplayDate(item.published_at || item.created_at),
    isoDate: item.published_at || item.created_at,
    status: item.status,
  };
}

function normalizeFallbackCard(card: NewsCard): PublicNewsItem {
  const slug = card.href.split("/").pop() ?? String(card.id);

  return {
    id: String(card.id),
    title: card.title,
    slug,
    excerpt: card.excerpt,
    content: `${card.excerpt}\n\n${FALLBACK_NEWS_BODY}`,
    imageUrl: card.imageUrl,
    href: `/noticias/${slug}`,
    date: card.date,
    isoDate: null,
    status: "published",
  };
}

export async function getPublishedNews(limit?: number) {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    const fallback = NEWS_CARDS.map(normalizeFallbackCard);
    return typeof limit === "number" ? fallback.slice(0, limit) : fallback;
  }

  const query = supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  const { data, error } = typeof limit === "number" ? await query.limit(limit) : await query;

  if (error || !data?.length) {
    const fallback = NEWS_CARDS.map(normalizeFallbackCard);
    return typeof limit === "number" ? fallback.slice(0, limit) : fallback;
  }

  return data.map(normalizeNewsRecord);
}

export async function getPublishedNewsBySlug(slug: string) {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return NEWS_CARDS.map(normalizeFallbackCard).find((item) => item.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    return NEWS_CARDS.map(normalizeFallbackCard).find((item) => item.slug === slug) ?? null;
  }

  return normalizeNewsRecord(data);
}

export async function getAdminNewsList() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NEWS_CARDS.map(normalizeFallbackCard).map((item, index) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      featured_image_url: item.imageUrl,
      status: item.status,
      published_at: item.isoDate,
      created_at: item.isoDate || new Date(Date.UTC(2026, 0, index + 1)).toISOString(),
      updated_at: item.isoDate || new Date(Date.UTC(2026, 0, index + 1)).toISOString(),
      source: "fallback" as const,
    }));
  }

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    source: "supabase" as const,
  }));
}

export async function getAdminNewsById(id: string) {
  const items = await getAdminNewsList();
  return items.find((item) => item.id === id) ?? null;
}

export async function getNewsSlugs() {
  const items = await getPublishedNews();
  return items.map((item) => item.slug);
}
