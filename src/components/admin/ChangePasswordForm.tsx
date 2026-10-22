"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/admin/actions";
import type { AuthFormState } from "@/types/admin";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";
import { AdminPageHeader, FormError } from "./ui";

const INITIAL_STATE: AuthFormState = { error: null };

export function ChangePasswordForm() {
  const [state, formAction] = useActionState(changePassword, INITIAL_STATE);

  return (
    <section className="space-y-6">
      <AdminPageHeader
        title="Cambiar mi contraseña"
        description="Escribe la nueva contraseña dos veces. Debe tener al menos 8 letras o números. Anótala en un lugar seguro."
      />

      <form action={formAction} className="max-w-xl space-y-6 rounded-3xl border-2 border-[#e1ebf6] bg-white p-6">
        <PasswordField name="password" label="Nueva contraseña" minLength={8} autoComplete="new-password" />
        <PasswordField name="confirm_password" label="Repite la nueva contraseña" minLength={8} autoComplete="new-password" />

        <FormError message={state.error} />
        {state.success ? (
          <div role="status" className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-5 py-4 text-xl font-bold text-emerald-800">
            ✅ Listo, tu contraseña fue cambiada.
          </div>
        ) : null}

        <SubmitButton label="Cambiar contraseña" pendingLabel="Cambiando..." />
      </form>
    </section>
  );
}
