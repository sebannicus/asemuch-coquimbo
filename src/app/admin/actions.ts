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
import type {
  AgreementRecord,
  AuthFormState,
  CommunicationFormState,
  CommunicationRecord,
  ContentFormState,
  DocumentRecord,
  NewsFormState,
} from "@/types/admin";

type ContentTable = "news" | "communications" | "documents" | "agreements";

// Conserva la fecha original al editar algo ya publicado; solo se fecha "hoy" la primera publicacion.
async function resolvePublishedAt(
  supabaseAdmin: SupabaseClient,
  table: ContentTable,
  id: string | undefined,
  status: "draft" | "published",
) {
  if (status !== "published") {
    return null;
  }

  if (id) {
    const { data } = await supabaseAdmin.from(table).select("published_at").eq("id", id).maybeSingle();
    if (data?.published_at) {
      return data.published_at as string;
    }
  }

  return new Date().toISOString();
}

// Si el enlace ya existe (por ejemplo, dos noticias con el mismo titulo) agrega -2, -3...
async function resolveUniqueSlug(
  supabaseAdmin: SupabaseClient,
  table: ContentTable,
  requested: string,
  id: string | undefined,
) {
  const base = slugify(requested) || "publicacion";
  const { data } = await supabaseAdmin.from(table).select("id, slug").like("slug", `${base}%`);
  const taken = new Set((data ?? []).filter((row) => row.id !== id).map((row) => row.slug as string));

  if (!taken.has(base)) {
    return base;
  }

  let suffix = 2;
  while (taken.has(`${base}-${suffix}`)) {
    suffix += 1;
  }

  return `${base}-${suffix}`;
}

// Resumen automatico cuando la persona deja el campo vacio.
function buildExcerpt(excerpt: string, text: string, fallback: string) {
  if (excerpt) {
    return excerpt;
  }

  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) {
    return fallback;
  }

  return clean.length > 180 ? `${clean.slice(0, 177).trimEnd()}...` : clean;
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://asemuch-coquimbo.vercel.app";
}

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

export async function requestPasswordReset(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email) {
    return { error: "Ingresa tu email." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { error: "Supabase no está configurado." };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getSiteUrl()}/auth/callback?next=/admin/perfil`,
  });

  if (error) {
    return { error: "No se pudo enviar el correo de recuperación. Intenta nuevamente." };
  }

  return { error: null, success: true };
}

export async function changePassword(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const session = await requireAdminSession();

  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden." };
  }

  if (!session.supabase) {
    redirect("/admin/login?setup=missing");
  }

  const { error } = await session.supabase.auth.updateUser({ password });

  if (error) {
    return { error: "No se pudo actualizar la contraseña." };
  }

  return { error: null, success: true };
}

const newsSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "El título debe tener al menos 3 caracteres."),
  slug: z.string().optional(),
  excerpt: z.string().trim(),
  content: z.string().trim().min(20, "El texto de la noticia es muy corto: escribe al menos una frase completa."),
  featured_image_url: z.string().url("El enlace de portada no es una URL válida.").optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
});

const communicationSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "El título debe tener al menos 3 caracteres."),
  slug: z.string().optional(),
  excerpt: z.string().trim(),
  content: z.string().max(20_000, "El texto del comunicado es demasiado largo."),
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
    slug: await resolveUniqueSlug(supabaseAdmin, "news", slug || title, id),
    excerpt: buildExcerpt(excerpt, content, title),
    content,
    status,
    published_at: await resolvePublishedAt(supabaseAdmin, "news", id, status),
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
  redirect("/admin/noticias?ok=guardado");
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
  redirect("/admin/noticias?ok=eliminado");
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
    slug: await resolveUniqueSlug(supabaseAdmin, "communications", slug || title, id),
    excerpt: buildExcerpt(excerpt, content, ""),
    content,
    status,
    published_at: await resolvePublishedAt(supabaseAdmin, "communications", id, status),
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
      return { error: "No se pudo guardar el comunicado. Intenta nuevamente en unos minutos." };
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
  redirect("/admin/comunicados?ok=guardado");
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
  redirect("/admin/comunicados?ok=eliminado");
}

const documentSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "El título debe tener al menos 3 caracteres."),
  slug: z.string().optional(),
  document_type: z.string().trim().min(2, "Indica el tipo de documento (acta, circular, reglamento...)."),
  summary: z.string().trim(),
  status: z.enum(["draft", "published"]),
});

const agreementSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "El nombre del convenio debe tener al menos 3 caracteres."),
  slug: z.string().optional(),
  summary: z.string().trim().min(10, "El beneficio resumido debe tener al menos 10 caracteres."),
  details: z.string().trim(),
  promo_code: z.string().trim(),
  valid_from: z.string(),
  valid_until: z.string(),
  status: z.enum(["draft", "published"]),
});

function readFormFields(formData: FormData, keys: string[]) {
  return Object.fromEntries(keys.map((key) => [key, String(formData.get(key) ?? "")]));
}

function getUploadedFile(formData: FormData, field: string) {
  const entry = formData.get(field);
  return entry instanceof File && entry.size > 0 ? entry : null;
}

async function removeStorageFile(supabaseAdmin: SupabaseClient, bucket: string, storagePath: string | null) {
  if (!storagePath) {
    return;
  }

  await supabaseAdmin.storage.from(bucket).remove([storagePath]);
}

export async function upsertDocument(_: ContentFormState, formData: FormData): Promise<ContentFormState> {
  await requireAdminSession();

  const supabaseAdmin = createSupabaseAdminClient();
  if (!supabaseAdmin) {
    redirect("/admin/login?setup=missing");
  }

  const parsed = documentSchema.safeParse(
    readFormFields(formData, ["id", "title", "slug", "document_type", "summary", "status"]),
  );
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Revisa los datos del documento." };
  }

  const { id, title, slug, document_type, summary, status } = parsed.data;
  const upload = getUploadedFile(formData, "file");

  if (upload) {
    const validation = validateDocumentFile(upload);
    if (!validation.success) {
      return { error: validation.message };
    }
  }

  const existing = id
    ? await supabaseAdmin.from("documents").select("*").eq("id", id).maybeSingle()
    : { data: null, error: null };
  if (existing.error) {
    return { error: "No se pudo cargar el documento actual." };
  }

  const previous = existing.data as DocumentRecord | null;
  if (!upload && !previous?.file_url) {
    return { error: "Debes adjuntar el archivo PDF del documento." };
  }

  const payload = {
    title,
    slug: await resolveUniqueSlug(supabaseAdmin, "documents", slug || title, id),
    document_type,
    summary,
    status,
    published_at: await resolvePublishedAt(supabaseAdmin, "documents", id, status),
    updated_at: new Date().toISOString(),
  };

  const { data: saved, error: saveError } = id
    ? await supabaseAdmin.from("documents").update(payload).eq("id", id).select("id").single()
    : await supabaseAdmin.from("documents").insert(payload).select("id").single();
  if (saveError || !saved) {
    return { error: "No se pudo guardar el documento. Intenta nuevamente en unos minutos." };
  }

  if (upload) {
    const storagePath = buildDocumentStoragePath(saved.id, upload.name, crypto.randomUUID());
    const { error: uploadError } = await supabaseAdmin.storage
      .from("documents-files")
      .upload(storagePath, await upload.arrayBuffer(), { contentType: upload.type, upsert: false });

    if (uploadError) {
      if (!id) {
        await supabaseAdmin.from("documents").delete().eq("id", saved.id);
      }
      return { error: "No se pudo subir el PDF. Intenta nuevamente." };
    }

    const { data: publicUrl } = supabaseAdmin.storage.from("documents-files").getPublicUrl(storagePath);
    const { error: fileError } = await supabaseAdmin
      .from("documents")
      .update({ file_url: publicUrl.publicUrl, file_name: upload.name, file_storage_path: storagePath })
      .eq("id", saved.id);

    if (fileError) {
      await removeStorageFile(supabaseAdmin, "documents-files", storagePath);
      return { error: "El documento se guardó, pero no se pudo asociar el PDF." };
    }

    await removeStorageFile(supabaseAdmin, "documents-files", previous?.file_storage_path ?? null);
  }

  revalidatePath("/admin/documentos");
  revalidatePath("/documentos");
  redirect("/admin/documentos?ok=guardado");
}

export async function deleteDocument(formData: FormData) {
  await requireAdminSession();

  const supabaseAdmin = createSupabaseAdminClient();
  if (!supabaseAdmin) {
    redirect("/admin/login?setup=missing");
  }

  const id = String(formData.get("id") ?? "");
  if (id) {
    const { data } = await supabaseAdmin.from("documents").select("file_storage_path").eq("id", id).maybeSingle();
    await supabaseAdmin.from("documents").delete().eq("id", id);
    await removeStorageFile(supabaseAdmin, "documents-files", data?.file_storage_path ?? null);
  }

  revalidatePath("/admin/documentos");
  revalidatePath("/documentos");
  redirect("/admin/documentos?ok=eliminado");
}

export async function upsertAgreement(_: ContentFormState, formData: FormData): Promise<ContentFormState> {
  await requireAdminSession();

  const supabaseAdmin = createSupabaseAdminClient();
  if (!supabaseAdmin) {
    redirect("/admin/login?setup=missing");
  }

  const parsed = agreementSchema.safeParse(
    readFormFields(formData, ["id", "title", "slug", "summary", "details", "promo_code", "valid_from", "valid_until", "status"]),
  );
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Revisa los datos del convenio." };
  }

  const { id, title, slug, summary, details, promo_code, valid_from, valid_until, status } = parsed.data;
  if (valid_from && valid_until && valid_until < valid_from) {
    return { error: "La fecha de término no puede ser anterior a la fecha de inicio." };
  }

  const upload = getUploadedFile(formData, "image");
  const removeImage = formData.get("remove_image") === "on";

  if (upload) {
    const validation = validateAgreementImage(upload);
    if (!validation.success) {
      return { error: validation.message };
    }
  }

  const existing = id
    ? await supabaseAdmin.from("agreements").select("*").eq("id", id).maybeSingle()
    : { data: null, error: null };
  if (existing.error) {
    return { error: "No se pudo cargar el convenio actual." };
  }

  const previous = existing.data as AgreementRecord | null;
  const payload = {
    title,
    slug: await resolveUniqueSlug(supabaseAdmin, "agreements", slug || title, id),
    summary,
    details,
    promo_code: promo_code || null,
    valid_from: valid_from || null,
    valid_until: valid_until || null,
    status,
    published_at: await resolvePublishedAt(supabaseAdmin, "agreements", id, status),
    updated_at: new Date().toISOString(),
  };

  const { data: saved, error: saveError } = id
    ? await supabaseAdmin.from("agreements").update(payload).eq("id", id).select("id").single()
    : await supabaseAdmin.from("agreements").insert(payload).select("id").single();
  if (saveError || !saved) {
    return { error: "No se pudo guardar el convenio. Intenta nuevamente en unos minutos." };
  }

  if (upload) {
    const storagePath = buildAgreementAssetPath(saved.id, "image", upload.name, crypto.randomUUID());
    const { error: uploadError } = await supabaseAdmin.storage
      .from("agreement-assets")
      .upload(storagePath, await upload.arrayBuffer(), { contentType: upload.type, upsert: false });

    if (uploadError) {
      return { error: "El convenio se guardó, pero no se pudo subir la imagen. Edítalo para intentar de nuevo." };
    }

    const { data: publicUrl } = supabaseAdmin.storage.from("agreement-assets").getPublicUrl(storagePath);
    const { error: imageError } = await supabaseAdmin
      .from("agreements")
      .update({ image_url: publicUrl.publicUrl, image_storage_path: storagePath })
      .eq("id", saved.id);

    if (imageError) {
      await removeStorageFile(supabaseAdmin, "agreement-assets", storagePath);
      return { error: "El convenio se guardó, pero no se pudo asociar la imagen." };
    }

    await removeStorageFile(supabaseAdmin, "agreement-assets", previous?.image_storage_path ?? null);
  } else if (removeImage && previous?.image_url) {
    await supabaseAdmin
      .from("agreements")
      .update({ image_url: null, image_storage_path: null })
      .eq("id", saved.id);
    await removeStorageFile(supabaseAdmin, "agreement-assets", previous.image_storage_path);
  }

  revalidatePath("/admin/convenios");
  revalidatePath("/convenios");
  redirect("/admin/convenios?ok=guardado");
}

export async function deleteAgreement(formData: FormData) {
  await requireAdminSession();

  const supabaseAdmin = createSupabaseAdminClient();
  if (!supabaseAdmin) {
    redirect("/admin/login?setup=missing");
  }

  const id = String(formData.get("id") ?? "");
  if (id) {
    const { data } = await supabaseAdmin.from("agreements").select("image_storage_path").eq("id", id).maybeSingle();
    await supabaseAdmin.from("agreements").delete().eq("id", id);
    await removeStorageFile(supabaseAdmin, "agreement-assets", data?.image_storage_path ?? null);
  }

  revalidatePath("/admin/convenios");
  revalidatePath("/convenios");
  redirect("/admin/convenios?ok=eliminado");
}
