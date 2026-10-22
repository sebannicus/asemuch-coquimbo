import type { ContentStatus } from "@/types/admin";

export function StatusBadge({ status }: { status: ContentStatus }) {
  return status === "published" ? (
    <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-base font-bold text-emerald-800">
      ✓ Publicado en el sitio
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-base font-bold text-amber-800">
      Sin publicar
    </span>
  );
}
