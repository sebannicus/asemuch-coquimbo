import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Enlaces de correo (recuperar contraseña) con token_hash: a diferencia de /auth/callback (PKCE),
// funcionan aunque el correo se abra en otro dispositivo o navegador.
// Plantilla de Supabase: {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/admin/perfil
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const requestedNext = searchParams.get("next") ?? "";
  const next = /^\/admin(\/[\w\-/]*)?$/.test(requestedNext) ? requestedNext : "/admin/perfil";

  if (tokenHash && type) {
    const supabase = await createSupabaseServerClient();

    if (supabase) {
      const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=link`);
}
