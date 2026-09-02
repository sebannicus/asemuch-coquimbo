"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireAdminSession } from "@/lib/auth";
import {
  buildNewsImageStoragePath,
  planNewsImagePersistence,
  type ExistingNewsImage,
  type UploadedNewsImage,
  validateNewsImageFiles,
} from "@/lib/news-images";
import { slugify } from "@/lib/slug";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { NewsFormState } from "@/types/admin";

export async function loginAdmin(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/admin/login?setup=missing");
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/admin/login?error=invalid");
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}

const newsSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  slug: z.string().optional(),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  featured_image_url: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
});

function getUploadedNewsFiles(formData: FormData) {
  return formData
    .getAll("news_images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
}

function getRetainedImageIds(formData: FormData) {
  return formData
    .getAll("existing_image_ids")
    .map((value) => String(value))
    .filter(Boolean);
}

async function getExistingNewsImages(supabaseAdmin: SupabaseClient, newsId: string): Promise<ExistingNewsImage[]> {
  const { data, error } = await supabaseAdmin
    .from("news_images")
    .select("id, image_url, storage_path, sort_order")
    .eq("news_id", newsId);

  if (error || !data) {
    throw new Error("No se pudieron cargar las imagenes actuales de la noticia.");
  }

  return data;
}

async function removeStoragePaths(supabaseAdmin: SupabaseClient, paths: string[]) {
  if (!paths.length) {
    return;
  }

  const { error } = await supabaseAdmin.storage.from("news-images").remove(paths);

  if (error) {
    throw new Error("No se pudieron limpiar las imagenes anteriores en Storage.");
  }
}

async function uploadNewsImages(
  supabaseAdmin: SupabaseClient,
  newsId: string,
  retainedImageCount: number,
  files: File[],
): Promise<UploadedNewsImage[]> {
  const uploadedImages: UploadedNewsImage[] = [];

  for (const [index, file] of files.entries()) {
    const storagePath = buildNewsImageStoragePath(
      newsId,
      retainedImageCount + index,
      file.name,
      crypto.randomUUID(),
    );

    const { error: uploadError } = await supabaseAdmin.storage
      .from("news-images")
      .upload(storagePath, await file.arrayBuffer(), {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      await removeStoragePaths(
        supabaseAdmin,
        uploadedImages.map((image) => image.storagePath),
      );
      throw new Error("No se pudo subir una de las imagenes seleccionadas.");
    }

    const { data } = supabaseAdmin.storage.from("news-images").getPublicUrl(storagePath);
    uploadedImages.push({
      imageUrl: data.publicUrl,
      storagePath,
    });
  }

  return uploadedImages;
}

async function persistNewsImages({
  supabaseAdmin,
  newsId,
  existingImages,
  retainedImageIds,
  uploadedImages,
  externalFeaturedImageUrl,
}: {
  supabaseAdmin: SupabaseClient;
  newsId: string;
  existingImages: ExistingNewsImage[];
  retainedImageIds: string[];
  uploadedImages: UploadedNewsImage[];
  externalFeaturedImageUrl: string | null;
}) {
  const retainedIdSet = new Set(retainedImageIds);
  const retainedImages = existingImages
    .filter((image) => retainedIdSet.has(image.id))
    .sort((left, right) => left.sort_order - right.sort_order);
  const removedImageIds = existingImages
    .filter((image) => !retainedIdSet.has(image.id))
    .map((image) => image.id);
  const plannedImages = planNewsImagePersistence({
    existingImages,
    retainedImageIds,
    uploadedImageUrls: uploadedImages,
    externalFeaturedImageUrl,
  });

  for (const [index, image] of retainedImages.entries()) {
    const { error } = await supabaseAdmin.from("news_images").update({ sort_order: index }).eq("id", image.id);

    if (error) {
      throw new Error("No se pudo reordenar la galeria existente.");
    }
  }

  if (removedImageIds.length) {
    const { error } = await supabaseAdmin.from("news_images").delete().in("id", removedImageIds);

    if (error) {
      throw new Error("No se pudieron quitar las imagenes eliminadas.");
    }
  }

  if (uploadedImages.length) {
    const rows = uploadedImages.map((image, index) => ({
      news_id: newsId,
      image_url: image.imageUrl,
      storage_path: image.storagePath,
      sort_order: retainedImages.length + index,
    }));
    const { error } = await supabaseAdmin.from("news_images").insert(rows);

    if (error) {
      await removeStoragePaths(
        supabaseAdmin,
        uploadedImages.map((image) => image.storagePath),
      );
      throw new Error("No se pudieron guardar las nuevas imagenes en la noticia.");
    }
  }

  await removeStoragePaths(supabaseAdmin, plannedImages.removedStoragePaths);
  return plannedImages.featuredImageUrl;
}

export async function upsertNews(_: NewsFormState, formData: FormData): Promise<NewsFormState> {
  await requireAdminSession();

  const supabaseAdmin = createSupabaseAdminClient();

  if (!supabaseAdmin) {
    redirect("/admin/login?setup=missing");
  }

  const parsed = newsSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? "") || undefined,
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    featured_image_url: String(formData.get("featured_image_url") ?? ""),
    status: String(formData.get("status") ?? "draft"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "No se pudo guardar la noticia.",
    };
  }

  const { id, title, slug, excerpt, content, featured_image_url, status } = parsed.data;
  const uploadedFiles = getUploadedNewsFiles(formData);
  const payload = {
    title,
    slug: slugify(slug || title),
    excerpt,
    content,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  let uploadedImages: UploadedNewsImage[] = [];

  try {
    const existingImages = id ? await getExistingNewsImages(supabaseAdmin, id) : [];
    const retainedImageIds = getRetainedImageIds(formData).filter((imageId) =>
      existingImages.some((image) => image.id === imageId),
    );
    const validation = validateNewsImageFiles(uploadedFiles, retainedImageIds.length);

    if (!validation.success) {
      return { error: validation.message };
    }

    const { data: savedNews, error: saveError } = id
      ? await supabaseAdmin.from("news").update(payload).eq("id", id).select("id").single()
      : await supabaseAdmin.from("news").insert(payload).select("id").single();

    if (saveError || !savedNews) {
      return { error: "No se pudo guardar la noticia." };
    }

    uploadedImages = await uploadNewsImages(supabaseAdmin, savedNews.id, retainedImageIds.length, uploadedFiles);

    const finalFeaturedImageUrl = await persistNewsImages({
      supabaseAdmin,
      newsId: savedNews.id,
      existingImages,
      retainedImageIds,
      uploadedImages,
      externalFeaturedImageUrl: featured_image_url || null,
    });

    const { error: featuredImageError } = await supabaseAdmin
      .from("news")
      .update({ featured_image_url: finalFeaturedImageUrl })
      .eq("id", savedNews.id);

    if (featuredImageError) {
      return { error: "La noticia se guardo, pero no se pudo actualizar la portada." };
    }
  } catch (error) {
    await removeStoragePaths(
      supabaseAdmin,
      uploadedImages.map((image) => image.storagePath),
    ).catch(() => undefined);

    return {
      error: error instanceof Error ? error.message : "No se pudo guardar la noticia.",
    };
  }

  revalidatePath("/admin/noticias");
  revalidatePath("/noticias");
  revalidatePath("/");
  revalidatePath(`/noticias/${payload.slug}`);
  redirect("/admin/noticias");
}

export async function deleteNews(formData: FormData) {
  await requireAdminSession();

  const supabaseAdmin = createSupabaseAdminClient();

  if (!supabaseAdmin) {
    redirect("/admin/login?setup=missing");
  }

  const id = String(formData.get("id") ?? "");

  if (id) {
    const existingImages = await getExistingNewsImages(supabaseAdmin, id);
    await removeStoragePaths(
      supabaseAdmin,
      existingImages
        .map((image) => image.storage_path)
        .filter((path): path is string => Boolean(path)),
    );
    await supabaseAdmin.from("news").delete().eq("id", id);
  }

  revalidatePath("/admin/noticias");
  revalidatePath("/noticias");
  revalidatePath("/");
}
