const COMMUNICATION_FILE_MAX_SIZE_BYTES = 10 * 1024 * 1024;

const ALLOWED_COMMUNICATION_FILE_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

export interface CommunicationFileLike {
  name: string;
  size: number;
  type: string;
}

export type CommunicationFileValidationResult =
  | { success: true }
  | { success: false; message: string };

export function validateCommunicationFile(file: CommunicationFileLike): CommunicationFileValidationResult {
  if (!ALLOWED_COMMUNICATION_FILE_TYPES.has(file.type)) {
    return { success: false, message: "Solo se permiten archivos PDF, Word o Excel." };
  }

  if (file.size > COMMUNICATION_FILE_MAX_SIZE_BYTES) {
    return { success: false, message: "El archivo adjunto debe pesar como maximo 10 MB." };
  }

  return { success: true };
}

export function buildCommunicationFileStoragePath(communicationId: string, fileName: string, uniqueToken: string) {
  const extension = fileName.split(".").pop()?.toLowerCase() || "pdf";
  const baseName = fileName.replace(/\.[^.]+$/, "");
  const safeName = baseName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "comunicado";

  return `communications/${communicationId}/${safeName}-${uniqueToken}.${extension}`;
}

export const communicationFileConfig = {
  accept: Array.from(ALLOWED_COMMUNICATION_FILE_TYPES).join(","),
  maxSizeBytes: COMMUNICATION_FILE_MAX_SIZE_BYTES,
};
