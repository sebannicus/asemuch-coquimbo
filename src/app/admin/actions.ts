"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export async function upsertNews(formData: FormData) {
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
    throw new Error(parsed.error.issues[0]?.message ?? "No se pudo guardar la noticia.");
  }

  const { id, title, slug, excerpt, content, featured_image_url, status } = parsed.data;
  const payload = {
    title,
    slug: slugify(slug || title),
    excerpt,
    content,
    featured_image_url: featured_image_url || null,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await supabaseAdmin.from("news").update(payload).eq("id", id);
  } else {
    await supabaseAdmin.from("news").insert(payload);
  }

  revalidatePath("/admin/noticias");
  revalidatePath("/noticias");
  revalidatePath("/");
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
    await supabaseAdmin.from("news").delete().eq("id", id);
  }

  revalidatePath("/admin/noticias");
  revalidatePath("/noticias");
  revalidatePath("/");
}
