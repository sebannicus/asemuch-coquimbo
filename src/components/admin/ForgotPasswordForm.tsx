"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/app/admin/actions";
import type { AuthFormState } from "@/types/admin";
import { SubmitButton } from "./SubmitButton";
import { FormError, adminInputClassName } from "./ui";

const INITIAL_STATE: AuthFormState = { error: null };

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(requestPasswordReset, INITIAL_STATE);

  if (state.success) {
    return (
      <div role="status" className="mt-6 space-y-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5 text-lg text-emerald-900">
        <p className="text-xl font-bold">✅ Te enviamos un correo.</p>
        <p>Revisa tu bandeja de entrada (y también la carpeta de spam o correo no deseado).</p>
        <p>
          <strong>Importante:</strong> abre el enlace del correo <strong>en este mismo computador y navegador</strong>.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-6">
      <label className="block">
        <span className="mb-2 block text-lg font-bold text-[#0c2340]">Tu correo</span>
        <input name="email" type="email" required autoComplete="email" className={adminInputClassName} />
      </label>

      <FormError message={state.error} />

      <SubmitButton label="Enviarme el correo" pendingLabel="Enviando..." />
    </form>
  );
}
