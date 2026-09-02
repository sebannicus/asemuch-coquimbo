import type { Metadata } from "next";
import { loginAdmin } from "@/app/admin/actions";
import { isAdminConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Login Admin",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; setup?: string }>;
}) {
  const params = await searchParams;
  const configured = isAdminConfigured();

  return (
    <main className="min-h-screen bg-[#f5f9fc] px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-[#d9e6f5] bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">Panel Admin</p>
        <h1
          className="mt-2 text-3xl font-extrabold text-[#0c2340]"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          Acceso ASEMUCH Coquimbo
        </h1>

        {!configured ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Falta configurar Supabase y la cuenta admin en variables de entorno antes de usar este panel.
          </div>
        ) : null}

        {params.error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            No se pudo iniciar sesión. Revisa email y contraseña.
          </div>
        ) : null}

        {params.setup ? (
          <div className="mt-6 rounded-2xl border border-[#d9e6f5] bg-[#f5f9fc] p-4 text-sm text-[#5d6675]">
            Variables esperadas: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
            `SUPABASE_SERVICE_ROLE_KEY` y `ADMIN_EMAIL`.
          </div>
        ) : null}

        <form action={loginAdmin} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#0c2340]">Email</span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-[#d9e6f5] px-4 py-3 text-sm text-[#0c2340] outline-none transition focus:border-[#0c71c3]"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#0c2340]">Contraseña</span>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-[#d9e6f5] px-4 py-3 text-sm text-[#0c2340] outline-none transition focus:border-[#0c71c3]"
            />
          </label>
          <button
            type="submit"
            disabled={!configured}
            className="w-full rounded-xl bg-[#0c71c3] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2ea3f2] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Entrar al panel
          </button>
        </form>
      </div>
    </main>
  );
}
