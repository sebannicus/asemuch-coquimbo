"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  label = "Guardar cambios",
  pendingLabel = "Guardando...",
}: {
  label?: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-xl bg-[#0c71c3] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2ea3f2] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
