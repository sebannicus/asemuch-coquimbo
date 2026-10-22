import type { AgreementRecord } from "@/types/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export interface PublicAgreementItem {
  id: string;
  title: string;
  summary: string;
  details: string;
  imageUrl: string | null;
  promoCode: string | null;
  validity: string | null;
}

function formatDate(value: string) {
  // Las fechas de vigencia son `date` (sin hora): se fijan a mediodia para no correr el dia por zona horaria.
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Santiago",
  }).format(new Date(`${value}T12:00:00`));
}

function formatValidity(validFrom: string | null, validUntil: string | null) {
  if (validFrom && validUntil) {
    return `Vigente del ${formatDate(validFrom)} al ${formatDate(validUntil)}`;
  }

  if (validUntil) {
    return `Vigente hasta el ${formatDate(validUntil)}`;
  }

  if (validFrom) {
    return `Vigente desde el ${formatDate(validFrom)}`;
  }

  return null;
}

function todayInChile() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date());
}

export async function getPublishedAgreements(): Promise<PublicAgreementItem[]> {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("agreements")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  const today = todayInChile();

  return (data as AgreementRecord[])
    .filter((item) => !item.valid_until || item.valid_until >= today)
    .map((item) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      details: item.details,
      imageUrl: item.image_url,
      promoCode: item.promo_code,
      validity: formatValidity(item.valid_from, item.valid_until),
    }));
}

export async function getAdminAgreementsList() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("agreements").select("*").order("updated_at", { ascending: false });
  return error || !data ? [] : (data as AgreementRecord[]);
}

export async function getAdminAgreementById(id: string) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("agreements").select("*").eq("id", id).maybeSingle();
  return error || !data ? null : (data as AgreementRecord);
}
