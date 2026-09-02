import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminConfigured as hasAdminConfig } from "@/lib/supabase/config";

export async function getAdminSession() {
  if (!hasAdminConfig()) {
    return { supabase: null, user: null, configured: false as const };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { supabase: null, user: null, configured: false as const };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    supabase,
    user: user?.email === process.env.ADMIN_EMAIL ? user : null,
    configured: true as const,
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session.configured) {
    redirect("/admin/login?setup=missing");
  }

  if (!session.user) {
    redirect("/admin/login");
  }

  return session;
}
