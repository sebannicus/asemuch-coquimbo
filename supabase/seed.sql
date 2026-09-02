insert into public.news (title, slug, excerpt, content, status, published_at)
values (
  'Noticia demo',
  'noticia-demo',
  'Resumen corto de prueba para validar el flujo del panel.',
  '<p>Contenido demo de noticia para validar lectura pública desde Supabase.</p>',
  'published',
  now()
)
on conflict (slug) do nothing;
