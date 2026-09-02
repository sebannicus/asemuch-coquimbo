const NEWS_IMAGE_LIMIT = 10;
const NEWS_IMAGE_MAX_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_NEWS_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export interface NewsImageFileLike {
  name: string;
  size: number;
  type: string;
}

export interface ExistingNewsImage {
  id: string;
  image_url: string;
  storage_path: string | null;
  sort_order: number;
}

export interface UploadedNewsImage {
  imageUrl: string;
  storagePath: string;
}

export type NewsImageValidationResult =
  | { success: true }
  | { success: false; message: string };

export function validateNewsImageFiles(
  files: NewsImageFileLike[],
  existingImageCount = 0,
): NewsImageValidationResult {
  if (existingImageCount + files.length > NEWS_IMAGE_LIMIT) {
    return {
      success: false,
      message: "Puedes subir un maximo de 10 imagenes por noticia.",
    };
  }

  for (const file of files) {
    if (!ALLOWED_NEWS_IMAGE_TYPES.has(file.type)) {
      return {
        success: false,
        message: "Solo se permiten imagenes JPG, PNG o WebP.",
      };
    }

    if (file.size > NEWS_IMAGE_MAX_SIZE_BYTES) {
      return {
        success: false,
        message: "Cada imagen debe pesar como maximo 5 MB.",
      };
    }
  }

  return { success: true };
}

export function resolveFeaturedNewsImageUrl(imageUrls: string[], externalUrl: string | null | undefined) {
  return imageUrls[0] ?? (externalUrl?.trim() || null);
}

export function buildNewsImageStoragePath(
  newsId: string,
  sortOrder: number,
  fileName: string,
  uniqueToken?: string,
) {
  const extension = fileName.split(".").pop()?.toLowerCase() || "jpg";
  const baseName = fileName.replace(/\.[^.]+$/, "");
  const sanitizedName = baseName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  const safeName = sanitizedName || "imagen";
  const suffix = uniqueToken ? `-${uniqueToken}` : "";
  return `news/${newsId}/${String(sortOrder).padStart(2, "0")}-${safeName}${suffix}.${extension}`;
}

export function planNewsImagePersistence({
  existingImages,
  retainedImageIds,
  uploadedImageUrls,
  externalFeaturedImageUrl,
}: {
  existingImages: ExistingNewsImage[];
  retainedImageIds: string[];
  uploadedImageUrls: UploadedNewsImage[];
  externalFeaturedImageUrl: string | null | undefined;
}) {
  const retainedIdSet = new Set(retainedImageIds);
  const retainedImages = existingImages
    .filter((image) => retainedIdSet.has(image.id))
    .sort((left, right) => left.sort_order - right.sort_order);

  const images = [
    ...retainedImages.map((image, index) => ({
      image_url: image.image_url,
      storage_path: image.storage_path,
      sort_order: index,
    })),
    ...uploadedImageUrls.map((image, index) => ({
      image_url: image.imageUrl,
      storage_path: image.storagePath,
      sort_order: retainedImages.length + index,
    })),
  ];

  const removedStoragePaths = existingImages
    .filter((image) => !retainedIdSet.has(image.id) && image.storage_path)
    .map((image) => image.storage_path)
    .filter((path): path is string => Boolean(path));

  return {
    images,
    featuredImageUrl: resolveFeaturedNewsImageUrl(
      images.map((image) => image.image_url),
      externalFeaturedImageUrl,
    ),
    removedStoragePaths,
  };
}

export const newsImageConfig = {
  allowedTypes: Array.from(ALLOWED_NEWS_IMAGE_TYPES),
  limit: NEWS_IMAGE_LIMIT,
  maxSizeBytes: NEWS_IMAGE_MAX_SIZE_BYTES,
};
