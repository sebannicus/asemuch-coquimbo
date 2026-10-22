"use client";

import { useFormStatus } from "react-dom";
import { adminPrimaryButtonClassName } from "./ui";

export function SubmitButton({
  label = "Guardar cambios",
  pendingLabel = "Guardando...",
  disabled = false,
}: {
  label?: string;
  pendingLabel?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending || disabled} className={`${adminPrimaryButtonClassName} w-full`}>
      {pending ? pendingLabel : label}
    </button>
  );
}
