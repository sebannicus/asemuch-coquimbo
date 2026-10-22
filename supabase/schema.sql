-- ============================================================================
-- ASEMUCH Coquimbo — instalacion completa de la base de datos.
-- Pegar entero en Supabase > SQL Editor y ejecutar. Es idempotente:
-- se puede volver a correr sin romper nada ni borrar contenido.
-- Escrituras: solo el servidor (service role). Publico: solo lee lo publicado.
-- ============================================================================

create extension if not exists pgcrypto;

do $$
begin
  if not exists (
    select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'content_status' and n.nspname = 'public'
  ) then
    create type public.content_status as enum ('draft', 'published');
  end if;
end $$;

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  featured_image_url text,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news_images (
  id uuid primary key default gen_random_uuid(),
  news_id uuid not null references public.news (id) on delete cascade,
  image_url text not null,
  storage_path text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  document_type text not null,
  summary text not null,
  file_url text,
  file_name text,
  file_storage_path text,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agreements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  details text not null,
  image_url text,
  image_storage_path text,
  file_url text,
  promo_code text,
  valid_from date,
  valid_until date,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.communications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null default '',
  attachment_url text,
  attachment_name text,
  attachment_storage_path text,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Columnas agregadas despues de la primera version (por si la tabla ya existia).
alter table public.documents add column if not exists file_name text;
alter table public.documents add column if not exists file_storage_path text;
alter table public.agreements add column if not exists image_storage_path text;

create index if not exists news_status_published_at_idx on public.news (status, published_at desc);
create index if not exists communications_status_published_at_idx on public.communications (status, published_at desc);
create index if not exists documents_status_published_at_idx on public.documents (status, published_at desc);
create index if not exists agreements_status_published_at_idx on public.agreements (status, published_at desc);
create index if not exists news_images_news_id_idx on public.news_images (news_id);

alter table public.news enable row level security;
alter table public.news_images enable row level security;
alter table public.documents enable row level security;
alter table public.agreements enable row level security;
alter table public.communications enable row level security;

drop policy if exists "Published news is publicly readable" on public.news;
create policy "Published news is publicly readable"
on public.news for select to anon, authenticated
using (status = 'published');

drop policy if exists "Published news images are publicly readable" on public.news_images;
create policy "Published news images are publicly readable"
on public.news_images for select to anon, authenticated
using (
  exists (
    select 1
    from public.news
    where public.news.id = public.news_images.news_id
      and public.news.status = 'published'
  )
);

drop policy if exists "Published documents are publicly readable" on public.documents;
create policy "Published documents are publicly readable"
on public.documents for select to anon, authenticated
using (status = 'published');

drop policy if exists "Published agreements are publicly readable" on public.agreements;
create policy "Published agreements are publicly readable"
on public.agreements for select to anon, authenticated
using (status = 'published');

drop policy if exists "Published communications are publicly readable" on public.communications;
create policy "Published communications are publicly readable"
on public.communications for select to anon, authenticated
using (status = 'published');

-- Buckets publicos de lectura (sin politicas de escritura: solo sube el service role).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('news-images', 'news-images', true, 4194304, array['image/jpeg', 'image/png', 'image/webp']),
  ('agreement-assets', 'agreement-assets', true, 4194304, array['image/jpeg', 'image/png', 'image/webp']),
  ('documents-files', 'documents-files', true, 4194304, array['application/pdf']),
  ('communications-files', 'communications-files', true, 4194304, array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
