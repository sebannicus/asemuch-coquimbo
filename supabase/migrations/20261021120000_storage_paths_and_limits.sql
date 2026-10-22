-- Rutas en Storage para poder borrar/reemplazar archivos de documentos y convenios.
alter table public.documents add column if not exists file_name text;
alter table public.documents add column if not exists file_storage_path text;
alter table public.agreements add column if not exists image_storage_path text;

create index if not exists news_status_published_at_idx on public.news (status, published_at desc);
create index if not exists communications_status_published_at_idx on public.communications (status, published_at desc);
create index if not exists documents_status_published_at_idx on public.documents (status, published_at desc);
create index if not exists agreements_status_published_at_idx on public.agreements (status, published_at desc);
create index if not exists news_images_news_id_idx on public.news_images (news_id);

-- Limites tambien a nivel de bucket (defensa en profundidad; la app valida 4 MB).
update storage.buckets set file_size_limit = 4194304, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id in ('news-images', 'agreement-assets');

update storage.buckets set file_size_limit = 4194304, allowed_mime_types = array['application/pdf']
where id = 'documents-files';

update storage.buckets set file_size_limit = 4194304, allowed_mime_types = array[
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]
where id = 'communications-files';
