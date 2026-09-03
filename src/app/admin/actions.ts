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
import { buildCommunicationFileStoragePath, validateCommunicationFile } from "@/lib/communication-files";
import { buildDocumentStoragePath, validateDocumentFile } from "@/lib/document-files";
import { buildAgreementAssetPath, validateAgreementImage } from "@/lib/agreement-assets";
import { slugify } from "@/lib/slug";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CommunicationFormState, CommunicationRecord, NewsFormState } from "@/types/admin";

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

const communicationSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  slug: z.string().optional(),
  excerpt: z.string().min(10),
  content: z.string().max(20_000),
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

function getUploadedCommunicationFile(formData: FormData) {
  const entry = formData.get("attachment");
  return entry instanceof File && entry.size > 0 ? entry : null;
}

async function removeCommunicationFile(supabaseAdmin: SupabaseClient, storagePath: string | null) {
  if (!storagePath) {
    return;
  }

  const { error } = await supabaseAdmin.storage.from("communications-files").remove([storagePath]);
  if (error) {
    throw new Error("No se pudo eliminar el archivo anterior.");
  }
}

export async function upsertCommunication(
  _: CommunicationFormState,
  formData: FormData,
): Promise<CommunicationFormState> {
  await requireAdminSession();

  const supabaseAdmin = createSupabaseAdminClient();
  if (!supabaseAdmin) {
    redirect("/admin/login?setup=missing");
  }

  const parsed = communicationSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? "") || undefined,
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    status: String(formData.get("status") ?? "draft"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "No se pudo guardar el comunicado." };
  }

  const attachment = getUploadedCommunicationFile(formData);
  const removeAttachment = formData.get("remove_attachment") === "on";
  if (!parsed.data.content.trim() && !attachment && !parsed.data.id) {
    return { error: "Escribe el comunicado o adjunta un archivo para poder guardarlo." };
  }

  if (attachment) {
    const validation = validateCommunicationFile(attachment);
    if (!validation.success) {
      return { error: validation.message };
    }
  }

  const { id, title, slug, excerpt, content, status } = parsed.data;
  const payload = {
    title,
    slug: slugify(slug || title),
    excerpt,
    content,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  let newStoragePath: string | null = null;
  try {
    const existing = id
      ? await supabaseAdmin.from("communications").select("*").eq("id", id).maybeSingle()
      : { data: null, error: null };
    if (existing.error) {
      return { error: "No se pudo cargar el comunicado actual." };
    }

    const oldAttachment = existing.data as CommunicationRecord | null;
    if (!parsed.data.content.trim() && !attachment && (!oldAttachment?.attachment_url || removeAttachment)) {
      return { error: "Escribe el comunicado o conserva un archivo adjunto para poder guardarlo." };
    }

    const { data: savedCommunication, error: saveError } = id
      ? await supabaseAdmin.from("communications").update(payload).eq("id", id).select("id").single()
      : await supabaseAdmin.from("communications").insert(payload).select("id").single();
    if (saveError || !savedCommunication) {
      return { error: "No se pudo guardar el comunicado. Revisa que el enlace no esté repetido." };
    }

    if (attachment) {
      newStoragePath = buildCommunicationFileStoragePath(savedCommunication.id, attachment.name, crypto.randomUUID());
      const { error: uploadError } = await supabaseAdmin.storage
        .from("communications-files")
        .upload(newStoragePath, await attachment.arrayBuffer(), { contentType: attachment.type, upsert: false });
      if (uploadError) {
        throw new Error("No se pudo subir el archivo adjunto.");
      }

      const { data: publicUrl } = supabaseAdmin.storage.from("communications-files").getPublicUrl(newStoragePath);
      const { error: attachmentError } = await supabaseAdmin
        .from("communications")
        .update({
          attachment_url: publicUrl.publicUrl,
          attachment_name: attachment.name,
          attachment_storage_path: newStoragePath,
        })
        .eq("id", savedCommunication.id);
      if (attachmentError) {
        throw new Error("El comunicado se guardo, pero no se pudo asociar el archivo.");
      }

      await removeCommunicationFile(supabaseAdmin, oldAttachment?.attachment_storage_path ?? null).catch(() => undefined);
    } else if (removeAttachment && oldAttachment?.attachment_storage_path) {
      const { error: attachmentError } = await supabaseAdmin
        .from("communications")
        .update({ attachment_url: null, attachment_name: null, attachment_storage_path: null })
        .eq("id", savedCommunication.id);
      if (attachmentError) {
        return { error: "No se pudo quitar el archivo adjunto." };
      }
      await removeCommunicationFile(supabaseAdmin, oldAttachment.attachment_storage_path).catch(() => undefined);
    }
  } catch (error) {
    await removeCommunicationFile(supabaseAdmin, newStoragePath).catch(() => undefined);
    return { error: error instanceof Error ? error.message : "No se pudo guardar el comunicado." };
  }

  revalidatePath("/admin/comunicados");
  revalidatePath("/comunicados");
  revalidatePath(`/comunicados/${payload.slug}`);
  redirect("/admin/comunicados");
}

export async function deleteCommunication(formData: FormData) {
  await requireAdminSession();

  const supabaseAdmin = createSupabaseAdminClient();
  if (!supabaseAdmin) {
    redirect("/admin/login?setup=missing");
  }

  const id = String(formData.get("id") ?? "");
  if (id) {
    const { data } = await supabaseAdmin
      .from("communications")
      .select("attachment_storage_path")
      .eq("id", id)
      .maybeSingle();
    await removeCommunicationFile(supabaseAdmin, data?.attachment_storage_path ?? null);
    await supabaseAdmin.from("communications").delete().eq("id", id);
  }

  revalidatePath("/admin/comunicados");
  revalidatePath("/comunicados");
}

const documentSchema = z.object({ id: z.string().optional(), title: z.string().min(3), slug: z.string().optional(), document_type: z.string().min(2), summary: z.string().min(10), status: z.enum(["draft", "published"]) });
const agreementSchema = z.object({ id: z.string().optional(), title: z.string().min(3), slug: z.string().optional(), summary: z.string().min(10), details: z.string().min(10), promo_code: z.string(), valid_from: z.string(), valid_until: z.string(), status: z.enum(["draft", "published"]) });

export async function upsertDocument(_: { error: string | null }, formData: FormData): Promise<{ error: string | null }> {
  await requireAdminSession(); const supabase = createSupabaseAdminClient(); if (!supabase) redirect("/admin/login?setup=missing");
  const parsed = documentSchema.safeParse(Object.fromEntries(["id", "title", "slug", "document_type", "summary", "status"].map((key) => [key, String(formData.get(key) ?? "")] )));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Revisa los datos del documento." };
  const file = formData.get("file"); const upload = file instanceof File && file.size ? file : null;
  if (!upload && !parsed.data.id) return { error: "Debes adjuntar un archivo PDF." };
  if (upload) { const valid = validateDocumentFile(upload); if (!valid.success) return { error: valid.message }; }
  const payload = { ...parsed.data, id: undefined, slug: slugify(parsed.data.slug || parsed.data.title), published_at: parsed.data.status === "published" ? new Date().toISOString() : null, updated_at: new Date().toISOString() };
  const { data, error } = parsed.data.id ? await supabase.from("documents").update(payload).eq("id", parsed.data.id).select("id").single() : await supabase.from("documents").insert(payload).select("id").single();
  if (error || !data) return { error: "No se pudo guardar el documento." };
  if (upload) { const path = buildDocumentStoragePath(data.id, upload.name, crypto.randomUUID()); const { error: uploadError } = await supabase.storage.from("documents-files").upload(path, await upload.arrayBuffer(), { contentType: upload.type }); if (uploadError) return { error: "No se pudo subir el PDF." }; const { data: url } = supabase.storage.from("documents-files").getPublicUrl(path); await supabase.from("documents").update({ file_url: url.publicUrl }).eq("id", data.id); }
  revalidatePath("/admin/documentos"); revalidatePath("/documentos"); redirect("/admin/documentos");
}

export async function upsertAgreement(_: { error: string | null }, formData: FormData): Promise<{ error: string | null }> {
  await requireAdminSession(); const supabase = createSupabaseAdminClient(); if (!supabase) redirect("/admin/login?setup=missing");
  const parsed = agreementSchema.safeParse(Object.fromEntries(["id", "title", "slug", "summary", "details", "promo_code", "valid_from", "valid_until", "status"].map((key) => [key, String(formData.get(key) ?? "")] )));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Revisa los datos del convenio." };
  const image = formData.get("image"); const upload = image instanceof File && image.size ? image : null; if (upload) { const valid = validateAgreementImage(upload); if (!valid.success) return { error: valid.message }; }
  const payload = { ...parsed.data, id: undefined, slug: slugify(parsed.data.slug || parsed.data.title), promo_code: parsed.data.promo_code || null, valid_from: parsed.data.valid_from || null, valid_until: parsed.data.valid_until || null, published_at: parsed.data.status === "published" ? new Date().toISOString() : null, updated_at: new Date().toISOString() };
  const { data, error } = parsed.data.id ? await supabase.from("agreements").update(payload).eq("id", parsed.data.id).select("id").single() : await supabase.from("agreements").insert(payload).select("id").single();
  if (error || !data) return { error: "No se pudo guardar el convenio." };
  if (upload) { const path = buildAgreementAssetPath(data.id, "image", upload.name, crypto.randomUUID()); const { error: uploadError } = await supabase.storage.from("agreement-assets").upload(path, await upload.arrayBuffer(), { contentType: upload.type }); if (uploadError) return { error: "No se pudo subir la imagen." }; const { data: url } = supabase.storage.from("agreement-assets").getPublicUrl(path); await supabase.from("agreements").update({ image_url: url.publicUrl }).eq("id", data.id); }
  revalidatePath("/admin/convenios"); revalidatePath("/convenios"); redirect("/admin/convenios");
}
