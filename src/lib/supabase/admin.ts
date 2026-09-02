import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./config";

export function createSupabaseAdminClient(): SupabaseClient | null {
  const env = getSupabaseEnv();

  if (!env?.serviceRoleKey) {
    return null;
  }

  return createClient(env.url, env.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
