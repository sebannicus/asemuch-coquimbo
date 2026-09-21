"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/admin/actions";
import type { AuthFormState } from "@/types/admin";
import { SubmitButton } from "./SubmitButton";

const INITIAL_STATE: AuthFormState = { error: null };

export function ChangePasswordForm() {
  const [state, formAction] = useActionState(changePassword, INITIAL_STATE);

  return (
    <section className="space-y-6 rounded-3xl border border-[#d9e6f5] bg-white p-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">Cuenta</p>
        <h2 className="mt-2 text-3xl font-extrabold text-[#0c2340]" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
          Cambiar contraseña
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[#5d6675]">
          Define una nueva contraseña para el acceso al panel administrador.
        </p>
      </div>

      <form action={formAction} className="max-w-sm space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-[#0c2340]">Nueva contraseña</span>
          <input
            name="password"
            type="password"
            minLength={8}
            required
            className="w-full rounded-xl border border-[#d9e6f5] px-4 py-3 text-sm text-[#0c2340] outline-none transition focus:border-[#0c71c3]"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-[#0c2340]">Repetir contraseña</span>
          <input
            name="confirm_password"
            type="password"
            minLength={8}
            required
            className="w-full rounded-xl border border-[#d9e6f5] px-4 py-3 text-sm text-[#0c2340] outline-none transition focus:border-[#0c71c3]"
          />
        </label>

        {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
        {state.success ? <p className="text-sm text-emerald-600">Contraseña actualizada correctamente.</p> : null}

        <SubmitButton label="Actualizar contraseña" />
      </form>
    </section>
  );
}
