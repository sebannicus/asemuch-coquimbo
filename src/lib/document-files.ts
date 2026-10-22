// Vercel corta los requests sobre 4.5 MB y las Server Actions suben el archivo en el mismo request.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const MAX_UPLOAD_LABEL = "4 MB";
const MAX_DOCUMENT_SIZE_BYTES = MAX_UPLOAD_BYTES;

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
    return { success: false as const, message: `El archivo debe pesar como maximo ${MAX_UPLOAD_LABEL}.` };
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
