import { getStatusLabel } from "@/lib/content-status";
import type { ContentStatus } from "@/types/admin";

export function StatusBadge({ status }: { status: ContentStatus }) {
  const isPublished = status === "published";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
        isPublished ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
      }`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
