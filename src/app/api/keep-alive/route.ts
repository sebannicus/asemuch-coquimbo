import { NextResponse, type NextRequest } from "next/server";
import { createSupabasePublicClient } from "@/lib/supabase/public";

// Llamado a diario por el cron de vercel.json. El plan gratuito de Supabase pausa
// el proyecto tras 7 dias sin actividad; una consulta minima lo mantiene activo.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Supabase no configurado" }, { status: 500 });
  }

  const { error } = await supabase.from("news").select("id").limit(1);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true, checkedAt: new Date().toISOString() });
}
