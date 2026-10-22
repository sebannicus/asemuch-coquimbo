// Vercel corta los requests sobre 4.5 MB y las Server Actions suben el archivo en el mismo request.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const MAX_UPLOAD_LABEL = "4 MB";
const MAX_IMAGE_SIZE_BYTES = MAX_UPLOAD_BYTES;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export interface AgreementImageLike {
  name: string;
  size: number;
  type: string;
}

export function validateAgreementImage(file: AgreementImageLike) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { success: false as const, message: "Solo se permiten imagenes JPG, PNG o WebP." };
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return { success: false as const, message: `La imagen debe pesar como maximo ${MAX_UPLOAD_LABEL}.` };
  }
  return { success: true as const };
}

export function buildAgreementAssetPath(agreementId: string, kind: "image" | "file", fileName: string, uniqueToken: string) {
  const extension = fileName.split(".").pop()?.toLowerCase() || (kind === "image" ? "jpg" : "pdf");
  const safeName = fileName
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "convenio";
  return `${kind}s/${agreementId}/${safeName.slice(0, 64)}-${uniqueToken}.${extension}`;
}

export const agreementAssetConfig = { imageAccept: "image/jpeg,image/png,image/webp", fileAccept: "application/pdf" };
