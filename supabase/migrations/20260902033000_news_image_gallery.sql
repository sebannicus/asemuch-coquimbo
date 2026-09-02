create table if not exists public.news_images (
  id uuid primary key default gen_random_uuid(),
  news_id uuid not null references public.news (id) on delete cascade,
  image_url text not null,
  storage_path text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.news_images enable row level security;

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
