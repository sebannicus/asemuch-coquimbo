"use client";

import { useFormStatus } from "react-dom";
import type { ContentStatus } from "@/types/admin";
import { adminPrimaryButtonClassName, adminSecondaryButtonClassName } from "./ui";

// Reemplaza el selector "Estado": el boton que se presiona define si queda publicado o no.
export function PublishButtons({
  currentStatus,
  disabled = false,
  busyLabel,
}: {
  currentStatus?: ContentStatus;
  disabled?: boolean;
  busyLabel?: string;
}) {
  const { pending, data } = useFormStatus();
  const submitting = data?.get("status");
  const isPublished = currentStatus === "published";

  const publishLabel = isPublished ? "Guardar cambios" : "Publicar en el sitio";
  const draftLabel = isPublished ? "Quitar del sitio (dejar sin publicar)" : "Guardar sin publicar";

  return (
    <div className="space-y-3 rounded-3xl border-2 border-[#e1ebf6] bg-[#f5f9fc] p-5 sm:p-6">
      {busyLabel ? <p className="text-lg font-semibold text-[#0c71c3]">{busyLabel}</p> : null}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          name="status"
          value="published"
          disabled={pending || disabled}
          className={adminPrimaryButtonClassName}
        >
          {pending && submitting === "published" ? "Guardando..." : publishLabel}
        </button>
        <button
          type="submit"
          name="status"
          value="draft"
          disabled={pending || disabled}
          className={adminSecondaryButtonClassName}
        >
          {pending && submitting === "draft" ? "Guardando..." : draftLabel}
        </button>
      </div>
      <p className="text-base text-[#3d4756]">
        {isPublished
          ? "Esto ya se ve en el sitio. “Guardar cambios” actualiza lo publicado."
          : "“Guardar sin publicar” lo deja guardado aquí para terminarlo después; nadie más lo verá."}
      </p>
    </div>
  );
}
