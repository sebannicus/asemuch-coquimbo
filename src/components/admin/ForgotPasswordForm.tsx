"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/app/admin/actions";
import type { AuthFormState } from "@/types/admin";
import { SubmitButton } from "./SubmitButton";

const INITIAL_STATE: AuthFormState = { error: null };

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(requestPasswordReset, INITIAL_STATE);

  if (state.success) {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
        Si el email está registrado, te enviamos un enlace para restablecer tu contraseña. Revisa tu bandeja de
        entrada (y spam).
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-[#0c2340]">Email</span>
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-[#d9e6f5] px-4 py-3 text-sm text-[#0c2340] outline-none transition focus:border-[#0c71c3]"
        />
      </label>

      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

      <SubmitButton label="Enviar enlace de recuperación" pendingLabel="Enviando..." />
    </form>
  );
}
