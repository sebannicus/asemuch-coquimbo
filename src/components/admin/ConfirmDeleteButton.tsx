"use client";

import { useFormStatus } from "react-dom";

export function ConfirmDeleteButton({ itemLabel }: { itemLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        const message = `¿Seguro que quieres ELIMINAR "${itemLabel}"?\n\nSe borrará para siempre y no se puede recuperar.\n\nSi solo quieres sacarlo del sitio, usa "Editar" y luego "Quitar del sitio".`;
        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
      className="inline-flex min-h-12 items-center rounded-lg border-2 border-rose-200 px-5 text-lg font-bold text-rose-700 hover:bg-rose-50 disabled:opacity-60"
    >
      {pending ? "Eliminando..." : "🗑️ Eliminar"}
    </button>
  );
}
