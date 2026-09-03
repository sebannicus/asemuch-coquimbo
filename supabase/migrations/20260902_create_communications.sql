create table if not exists public.communications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null default '',
  attachment_url text,
  attachment_name text,
  attachment_storage_path text,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.communications enable row level security;

create policy "Published communications are publicly readable"
on public.communications for select to anon, authenticated
using (status = 'published');

insert into storage.buckets (id, name, public)
values ('communications-files', 'communications-files', true)
on conflict (id) do nothing;
