import type { ContentStatus } from "@/types/admin";

export function isPublished(status: string): status is ContentStatus {
  return status === "published";
}

export function getStatusLabel(status: ContentStatus) {
  return status === "published" ? "Publicado" : "Borrador";
}
