# Panel Admin MVP ASEMUCH Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un panel admin con una sola cuenta para gestionar noticias, documentos y convenios, conectado al sitio público.

**Architecture:** El panel vivirá dentro del mismo proyecto Next.js bajo `/admin`, con Supabase para auth, base de datos y storage. El contenido público se moverá desde `SiteData.ts` y bloques locales hacia lecturas desde Supabase, manteniendo los convenios nacionales externos como fuente separada.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Supabase, Tailwind CSS v4, Vercel

---

## File Structure

**Create:**

- `src/lib/supabase/server.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/admin.ts`
- `src/lib/auth.ts`
- `src/lib/slug.ts`
- `src/lib/content-status.ts`
- `src/types/admin.ts`
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/login/page.tsx`
- `src/app/admin/actions.ts`
- `src/app/admin/noticias/page.tsx`
- `src/app/admin/noticias/new/page.tsx`
- `src/app/admin/noticias/[id]/page.tsx`
- `src/app/admin/documentos/page.tsx`
- `src/app/admin/documentos/new/page.tsx`
- `src/app/admin/documentos/[id]/page.tsx`
- `src/app/admin/convenios/page.tsx`
- `src/app/admin/convenios/new/page.tsx`
- `src/app/admin/convenios/[id]/page.tsx`
- `src/components/admin/AdminShell.tsx`
- `src/components/admin/AdminSidebar.tsx`
- `src/components/admin/AdminHeader.tsx`
- `src/components/admin/StatusBadge.tsx`
- `src/components/admin/EmptyState.tsx`
- `src/components/admin/SubmitButton.tsx`
- `src/components/admin/NewsForm.tsx`
- `src/components/admin/DocumentForm.tsx`
- `src/components/admin/AgreementForm.tsx`
- `src/components/admin/FileInput.tsx`
- `supabase/schema.sql`
- `supabase/seed.sql`
- `.env.example`

**Modify:**

- `package.json`
- `src/app/noticias/page.tsx`
- `src/app/noticias/[slug]/page.tsx`
- `src/app/documentos/page.tsx`
- `src/app/convenios/page.tsx`
- `src/components/NewsSection.tsx`
- `src/components/BeneficiosSection.tsx`

---

### Task 1: Preparar Supabase y base del proyecto

**Files:**

- Create: `supabase/schema.sql`
- Create: `supabase/seed.sql`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/admin.ts`
- Create: `src/types/admin.ts`
- Create: `src/lib/slug.ts`
- Create: `src/lib/content-status.ts`
- Modify: `package.json`
- Modify: `.env.example`

- [ ] **Step 1: Agregar dependencias faltantes**

```json
{
  "dependencies": {
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.56.0",
    "zod": "^4.1.5"
  }
}
```

- [ ] **Step 2: Instalar dependencias y verificar lockfile**

Run: `npm install`
Expected: `package-lock.json` actualizado sin errores.

- [ ] **Step 3: Definir variables de entorno del proyecto**

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=
```

- [ ] **Step 4: Crear tipos compartidos de contenido**

```ts
export type ContentStatus = "draft" | "published";

export interface NewsRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
```

- [ ] **Step 5: Crear helper de slugs**

```ts
export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
```

- [ ] **Step 6: Crear helper de estados**

```ts
export function isPublished(status: string) {
  return status === "published";
}
```

- [ ] **Step 7: Crear cliente Supabase para server components**

```ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}
```

- [ ] **Step 8: Crear cliente Supabase para client components**

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] **Step 9: Crear cliente admin con service role**

```ts
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

- [ ] **Step 10: Crear esquema SQL de tablas y buckets**

```sql
create type content_status as enum ('draft', 'published');

create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  featured_image_url text,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

```sql
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  document_type text not null,
  summary text not null,
  file_url text,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

```sql
create table public.agreements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  details text not null,
  image_url text,
  file_url text,
  promo_code text,
  valid_from date,
  valid_until date,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

- [ ] **Step 11: Agregar seed mínimo para pruebas**

```sql
insert into public.news (title, slug, excerpt, content, status, published_at)
values (
  'Noticia demo',
  'noticia-demo',
  'Resumen corto de prueba',
  '<p>Contenido demo</p>',
  'published',
  now()
);
```

- [ ] **Step 12: Verificar tipado y lint base**

Run: `npm run typecheck`
Expected: exit code `0`.

### Task 2: Implementar autenticación y shell del panel

**Files:**

- Create: `src/lib/auth.ts`
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/actions.ts`
- Create: `src/components/admin/AdminShell.tsx`
- Create: `src/components/admin/AdminSidebar.tsx`
- Create: `src/components/admin/AdminHeader.tsx`

- [ ] **Step 1: Crear helper de sesión admin**

```ts
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdminSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/admin/login");
  }

  return { supabase, user };
}
```

- [ ] **Step 2: Crear server action de login**

```ts
"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function loginAdmin(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Credenciales inválidas." };
  }

  redirect("/admin");
}
```

- [ ] **Step 3: Crear layout protegido del admin**

```tsx
import { requireAdminSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdminSession();

  return <AdminShell userEmail={user.email ?? ""}>{children}</AdminShell>;
}
```

- [ ] **Step 4: Crear pantalla de login**

```tsx
<form action={loginAdmin} className="mx-auto max-w-md space-y-4 rounded-2xl border border-[#e3e9f1] bg-white p-8">
  <input name="email" type="email" required />
  <input name="password" type="password" required />
  <button type="submit">Entrar al panel</button>
</form>
```

- [ ] **Step 5: Crear shell del panel**

```tsx
export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  return (
    <div className="min-h-screen bg-[#f5f9fc]">
      <AdminHeader userEmail={userEmail} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
        <AdminSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Crear dashboard simple**

```tsx
const cards = [
  { href: "/admin/noticias", title: "Noticias", description: "Crear y publicar noticias regionales." },
  { href: "/admin/documentos", title: "Documentos", description: "Subir PDFs y gestionar documentos." },
  { href: "/admin/convenios", title: "Convenios", description: "Administrar convenios locales." },
];
```

- [ ] **Step 7: Verificar flujo del admin**

Run: `npm run lint`
Expected: exit code `0`.

### Task 3: Construir CRUD de noticias y conectar frontend público

**Files:**

- Create: `src/components/admin/NewsForm.tsx`
- Create: `src/components/admin/SubmitButton.tsx`
- Create: `src/components/admin/StatusBadge.tsx`
- Create: `src/components/admin/EmptyState.tsx`
- Create: `src/app/admin/noticias/page.tsx`
- Create: `src/app/admin/noticias/new/page.tsx`
- Create: `src/app/admin/noticias/[id]/page.tsx`
- Modify: `src/app/admin/actions.ts`
- Modify: `src/app/noticias/page.tsx`
- Modify: `src/app/noticias/[slug]/page.tsx`
- Modify: `src/components/NewsSection.tsx`

- [ ] **Step 1: Crear action para guardar noticias**

```ts
export async function upsertNews(formData: FormData) {
  const { user } = await requireAdminSession();
  void user;

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const excerpt = String(formData.get("excerpt") ?? "");
  const content = String(formData.get("content") ?? "");
  const status = String(formData.get("status") ?? "draft") as "draft" | "published";
  const slug = slugify(String(formData.get("slug") ?? title));

  const payload = {
    title,
    slug,
    excerpt,
    content,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
  };

  if (id) {
    await supabaseAdmin.from("news").update(payload).eq("id", id);
  } else {
    await supabaseAdmin.from("news").insert(payload);
  }
}
```

- [ ] **Step 2: Crear formulario reusable de noticias**

```tsx
export function NewsForm({ record }: { record?: Partial<NewsRecord> }) {
  return (
    <form action={upsertNews} className="space-y-4">
      <input type="hidden" name="id" defaultValue={record?.id ?? ""} />
      <input name="title" defaultValue={record?.title ?? ""} required />
      <input name="slug" defaultValue={record?.slug ?? ""} />
      <textarea name="excerpt" defaultValue={record?.excerpt ?? ""} required />
      <textarea name="content" defaultValue={record?.content ?? ""} required rows={12} />
      <select name="status" defaultValue={record?.status ?? "draft"}>
        <option value="draft">Borrador</option>
        <option value="published">Publicado</option>
      </select>
      <SubmitButton />
    </form>
  );
}
```

- [ ] **Step 3: Crear listado admin de noticias**

```tsx
const { data } = await supabaseAdmin
  .from("news")
  .select("*")
  .order("updated_at", { ascending: false });
```

- [ ] **Step 4: Crear pantalla pública de noticias desde Supabase**

```tsx
const supabase = await createSupabaseServerClient();
const { data: news } = await supabase
  .from("news")
  .select("*")
  .eq("status", "published")
  .order("published_at", { ascending: false });
```

- [ ] **Step 5: Crear detalle de noticia por slug**

```tsx
const { data: article } = await supabase
  .from("news")
  .select("*")
  .eq("slug", params.slug)
  .eq("status", "published")
  .single();
```

- [ ] **Step 6: Actualizar `NewsSection` para leer noticias reales**

```tsx
export default async function NewsSection() {
  const supabase = await createSupabaseServerClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3);
```

- [ ] **Step 7: Verificar noticias end to end**

Run: `npm run check`
Expected: sitio compila y `/noticias` usa Supabase.

### Task 4: Construir CRUD de documentos y conectar frontend público

**Files:**

- Create: `src/components/admin/DocumentForm.tsx`
- Create: `src/components/admin/FileInput.tsx`
- Create: `src/app/admin/documentos/page.tsx`
- Create: `src/app/admin/documentos/new/page.tsx`
- Create: `src/app/admin/documentos/[id]/page.tsx`
- Modify: `src/app/admin/actions.ts`
- Modify: `src/app/documentos/page.tsx`

- [ ] **Step 1: Crear upload helper para PDFs**

```ts
export async function uploadDocumentFile(file: File) {
  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const { error } = await supabaseAdmin.storage
    .from("documents")
    .upload(fileName, file, { upsert: true, contentType: file.type });

  if (error) throw error;

  return supabaseAdmin.storage.from("documents").getPublicUrl(fileName).data.publicUrl;
}
```

- [ ] **Step 2: Crear action de documentos**

```ts
export async function upsertDocument(formData: FormData) {
  await requireAdminSession();

  const file = formData.get("file");
  const title = String(formData.get("title") ?? "");
  const slug = slugify(String(formData.get("slug") ?? title));
  const documentType = String(formData.get("document_type") ?? "");
  const summary = String(formData.get("summary") ?? "");
  const status = String(formData.get("status") ?? "draft") as "draft" | "published";

  let fileUrl = String(formData.get("existing_file_url") ?? "") || null;

  if (file instanceof File && file.size > 0) {
    fileUrl = await uploadDocumentFile(file);
  }
}
```

- [ ] **Step 3: Crear formulario de documentos**

```tsx
<input name="title" required />
<input name="document_type" required />
<textarea name="summary" required />
<input name="file" type="file" accept="application/pdf" />
```

- [ ] **Step 4: Reemplazar datos locales de documentos por consulta a Supabase**

```tsx
const { data: localDocuments } = await supabase
  .from("documents")
  .select("*")
  .eq("status", "published")
  .order("published_at", { ascending: false });
```

- [ ] **Step 5: Mantener contenido externo nacional separado**

```tsx
const hasLocalDocuments = localDocuments && localDocuments.length > 0;
```

Expected: los documentos locales se muestran desde Supabase y los bloques externos siguen intactos.

- [ ] **Step 6: Verificar documentos**

Run: `npm run typecheck`
Expected: exit code `0`.

### Task 5: Construir CRUD de convenios y conectar frontend público

**Files:**

- Create: `src/components/admin/AgreementForm.tsx`
- Create: `src/app/admin/convenios/page.tsx`
- Create: `src/app/admin/convenios/new/page.tsx`
- Create: `src/app/admin/convenios/[id]/page.tsx`
- Modify: `src/app/admin/actions.ts`
- Modify: `src/app/convenios/page.tsx`
- Modify: `src/components/BeneficiosSection.tsx`

- [ ] **Step 1: Crear action de convenios**

```ts
export async function upsertAgreement(formData: FormData) {
  await requireAdminSession();

  const title = String(formData.get("title") ?? "");
  const slug = slugify(String(formData.get("slug") ?? title));
  const summary = String(formData.get("summary") ?? "");
  const details = String(formData.get("details") ?? "");
  const promoCode = String(formData.get("promo_code") ?? "");
  const validFrom = String(formData.get("valid_from") ?? "") || null;
  const validUntil = String(formData.get("valid_until") ?? "") || null;
}
```

- [ ] **Step 2: Soportar imagen o archivo del convenio**

```tsx
<input name="image" type="file" accept="image/*" />
<input name="file" type="file" accept="application/pdf,image/*" />
```

- [ ] **Step 3: Crear listado admin de convenios**

```tsx
const { data: agreements } = await supabaseAdmin
  .from("agreements")
  .select("*")
  .order("updated_at", { ascending: false });
```

- [ ] **Step 4: Reemplazar bloque local manual de `/convenios` por lectura dinámica**

```tsx
const { data: localAgreements } = await supabase
  .from("agreements")
  .select("*")
  .eq("status", "published")
  .order("published_at", { ascending: false });
```

- [ ] **Step 5: Mostrar teaser del convenio más reciente en home**

```tsx
const { data: featuredAgreement } = await supabase
  .from("agreements")
  .select("*")
  .eq("status", "published")
  .order("published_at", { ascending: false })
  .limit(1)
  .maybeSingle();
```

- [ ] **Step 6: Verificar convenios**

Run: `npm run lint`
Expected: exit code `0`.

### Task 6: Cierre, hardening y deploy

**Files:**

- Modify: `src/app/admin/actions.ts`
- Modify: `.env.example`
- Verify: `supabase/schema.sql`

- [ ] **Step 1: Agregar validación mínima con Zod**

```ts
const newsSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  status: z.enum(["draft", "published"]),
});
```

- [ ] **Step 2: Agregar acciones de delete seguras**

```ts
export async function deleteNews(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  await supabaseAdmin.from("news").delete().eq("id", id);
}
```

- [ ] **Step 3: Verificar proyecto completo**

Run: `npm run check`
Expected: lint, typecheck y build en verde.

- [ ] **Step 4: Verificar rutas clave manualmente**

Run: `npm run dev`
Expected:

- `/admin/login` abre
- `/admin/noticias` redirige si no hay sesión
- `/noticias` carga contenido dinámico
- `/documentos` muestra documentos publicados
- `/convenios` muestra convenios publicados

- [ ] **Step 5: Preparar variables para producción**

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_EMAIL=...
```

- [ ] **Step 6: Deploy final**

Run: `vercel --prod`
Expected: deployment listo con panel y frontend conectados.
