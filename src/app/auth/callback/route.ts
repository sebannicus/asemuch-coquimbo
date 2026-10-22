import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next") ?? "";
  // Solo rutas internas del panel: evita redirigir a dominios externos (p. ej. next=@evil.com).
  const next = /^\/admin(\/[\w\-/]*)?$/.test(requestedNext) ? requestedNext : "/admin/perfil";

  if (code) {
    const supabase = await createSupabaseServerClient();

    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=link`);
}
