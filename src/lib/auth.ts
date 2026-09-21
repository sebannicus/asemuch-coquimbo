import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminEmails, isAdminConfigured as hasAdminConfig } from "@/lib/supabase/config";

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

  const allowedEmails = getAdminEmails();
  const isAllowed = Boolean(user?.email && allowedEmails.includes(user.email.toLowerCase()));

  return {
    supabase,
    user: isAllowed ? user : null,
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
