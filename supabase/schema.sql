create extension if not exists pgcrypto;

create type content_status as enum ('draft', 'published');

create table if not exists public.news (
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
  status content_status not null default 'draft',
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
  file_url text,
  promo_code text,
  valid_from date,
  valid_until date,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.news enable row level security;
alter table public.news_images enable row level security;
alter table public.documents enable row level security;
alter table public.agreements enable row level security;

create policy "Published news is publicly readable"
on public.news for select to anon, authenticated
using (status = 'published');

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

create policy "Published documents are publicly readable"
on public.documents for select to anon, authenticated
using (status = 'published');

create policy "Published agreements are publicly readable"
on public.agreements for select to anon, authenticated
using (status = 'published');

insert into storage.buckets (id, name, public)
values
  ('news-images', 'news-images', true),
  ('documents-files', 'documents-files', true),
  ('agreement-assets', 'agreement-assets', true)
on conflict (id) do nothing;
