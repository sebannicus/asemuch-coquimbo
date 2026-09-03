const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;

export interface DocumentFileLike {
  name: string;
  size: number;
  type: string;
}

export function validateDocumentFile(file: DocumentFileLike) {
  if (file.type !== "application/pdf") {
    return { success: false as const, message: "Solo se permiten archivos PDF." };
  }
  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return { success: false as const, message: "El archivo debe pesar como maximo 10 MB." };
  }
  return { success: true as const };
}

export function buildDocumentStoragePath(documentId: string, fileName: string, uniqueToken: string) {
  const safeName = fileName
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "documento";
  return `documents/${documentId}/${safeName.slice(0, 64)}-${uniqueToken}.pdf`;
}

export const documentFileConfig = { accept: "application/pdf" };
