import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { loginAdmin } from "@/app/admin/actions";
import { PasswordField } from "@/components/admin/PasswordField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { adminInputClassName } from "@/components/admin/ui";
import { isAdminConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Entrar al panel",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; setup?: string }>;
}) {
  const params = await searchParams;
  const configured = isAdminConfigured();

  return (
    <main className="min-h-screen bg-[#f5f9fc] px-4 py-12 text-lg text-[#0c2340]">
      <div className="mx-auto max-w-lg rounded-3xl border-2 border-[#e1ebf6] bg-white p-6 shadow-sm sm:p-10">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.webp" alt="" width={64} height={64} className="h-16 w-16" />
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#0c71c3]">Panel de administración</p>
            <h1 className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
              ASEMUCH Coquimbo
            </h1>
          </div>
        </div>

        {!configured ? (
          <div className="mt-6 rounded-2xl border-2 border-amber-200 bg-amber-50 p-4 text-base text-amber-900">
            El panel todavía no está configurado. Contacta al soporte técnico.
          </div>
        ) : null}

        {params.error ? (
          <div role="alert" className="mt-6 rounded-2xl border-2 border-rose-300 bg-rose-50 p-4 text-lg font-semibold text-rose-900">
            ⚠️ El correo o la contraseña no son correctos. Revísalos e intenta otra vez. Usa “Mostrar” para ver lo que escribiste.
          </div>
        ) : null}

        <form action={loginAdmin} className="mt-8 space-y-6">
          <label className="block">
            <span className="mb-2 block text-lg font-bold">Tu correo</span>
            <input name="email" type="email" required autoComplete="email" className={adminInputClassName} />
          </label>
          <PasswordField name="password" label="Tu contraseña" />
          <SubmitButton label="Entrar" pendingLabel="Entrando..." disabled={!configured} />
        </form>

        <Link
          href="/admin/forgot-password"
          className="mt-8 flex min-h-12 items-center justify-center text-lg font-bold text-[#0c71c3] underline"
        >
          Olvidé mi contraseña
        </Link>
      </div>
    </main>
  );
}
