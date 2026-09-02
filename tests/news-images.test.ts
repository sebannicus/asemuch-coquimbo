import assert from "node:assert/strict";
import test from "node:test";
import {
  buildNewsImageStoragePath,
  planNewsImagePersistence,
  resolveFeaturedNewsImageUrl,
  validateNewsImageFiles,
} from "../src/lib/news-images.ts";

test("validateNewsImageFiles accepts valid images within configured limits", () => {
  const result = validateNewsImageFiles([
    { name: "portada.jpg", size: 1_024, type: "image/jpeg" },
    { name: "galeria.webp", size: 2_048, type: "image/webp" },
  ]);

  assert.equal(result.success, true);
});

test("validateNewsImageFiles rejects too many images", () => {
  const result = validateNewsImageFiles(
    Array.from({ length: 11 }, (_, index) => ({
      name: `image-${index + 1}.png`,
      size: 512,
      type: "image/png",
    })),
  );

  assert.deepEqual(result, {
    success: false,
    message: "Puedes subir un maximo de 10 imagenes por noticia.",
  });
});

test("validateNewsImageFiles counts retained existing images toward the limit", () => {
  const result = validateNewsImageFiles(
    Array.from({ length: 2 }, (_, index) => ({
      name: `image-${index + 1}.png`,
      size: 512,
      type: "image/png",
    })),
    9,
  );

  assert.deepEqual(result, {
    success: false,
    message: "Puedes subir un maximo de 10 imagenes por noticia.",
  });
});

test("validateNewsImageFiles rejects unsupported mime types", () => {
  const result = validateNewsImageFiles([{ name: "adjunto.gif", size: 512, type: "image/gif" }]);

  assert.deepEqual(result, {
    success: false,
    message: "Solo se permiten imagenes JPG, PNG o WebP.",
  });
});

test("validateNewsImageFiles rejects files larger than 5 MB", () => {
  const result = validateNewsImageFiles([
    { name: "pesada.jpg", size: 5 * 1024 * 1024 + 1, type: "image/jpeg" },
  ]);

  assert.deepEqual(result, {
    success: false,
    message: "Cada imagen debe pesar como maximo 5 MB.",
  });
});

test("resolveFeaturedNewsImageUrl prefers the first gallery image and falls back to the external url", () => {
  assert.equal(
    resolveFeaturedNewsImageUrl(
      ["https://cdn.example.com/news/portada.webp", "https://cdn.example.com/news/galeria.webp"],
      "https://externo.example.com/cover.jpg",
    ),
    "https://cdn.example.com/news/portada.webp",
  );

  assert.equal(
    resolveFeaturedNewsImageUrl([], "https://externo.example.com/cover.jpg"),
    "https://externo.example.com/cover.jpg",
  );

  assert.equal(resolveFeaturedNewsImageUrl([], ""), null);
});

test("buildNewsImageStoragePath creates a stable sanitized path per news item", () => {
  assert.equal(
    buildNewsImageStoragePath("news-123", 0, "Foto Portada 2026.JPG"),
    "news/news-123/00-foto-portada-2026.jpg",
  );
});

test("planNewsImagePersistence keeps retained images, appends uploads and marks removed storage paths", () => {
  const result = planNewsImagePersistence({
    existingImages: [
      {
        id: "existing-1",
        image_url: "https://cdn.example.com/news/existing-1.jpg",
        storage_path: "news/news-123/00-existing-1.jpg",
        sort_order: 0,
      },
      {
        id: "existing-2",
        image_url: "https://cdn.example.com/news/existing-2.jpg",
        storage_path: "news/news-123/01-existing-2.jpg",
        sort_order: 1,
      },
    ],
    retainedImageIds: ["existing-2"],
    uploadedImageUrls: [
      {
        imageUrl: "https://cdn.example.com/news/new-1.jpg",
        storagePath: "news/news-123/02-new-1.jpg",
      },
    ],
    externalFeaturedImageUrl: "https://externo.example.com/cover.jpg",
  });

  assert.deepEqual(result.images, [
    {
      image_url: "https://cdn.example.com/news/existing-2.jpg",
      storage_path: "news/news-123/01-existing-2.jpg",
      sort_order: 0,
    },
    {
      image_url: "https://cdn.example.com/news/new-1.jpg",
      storage_path: "news/news-123/02-new-1.jpg",
      sort_order: 1,
    },
  ]);
  assert.equal(result.featuredImageUrl, "https://cdn.example.com/news/existing-2.jpg");
  assert.deepEqual(result.removedStoragePaths, ["news/news-123/00-existing-1.jpg"]);
});

test("planNewsImagePersistence falls back to the external featured image when the gallery is empty", () => {
  const result = planNewsImagePersistence({
    existingImages: [],
    retainedImageIds: [],
    uploadedImageUrls: [],
    externalFeaturedImageUrl: "https://externo.example.com/cover.jpg",
  });

  assert.deepEqual(result.images, []);
  assert.equal(result.featuredImageUrl, "https://externo.example.com/cover.jpg");
  assert.deepEqual(result.removedStoragePaths, []);
});
