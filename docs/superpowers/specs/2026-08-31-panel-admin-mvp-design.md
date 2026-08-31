# Diseño: Panel Admin MVP ASEMUCH Coquimbo

Fecha: 2026-08-31
Estado: aprobado para revisión del usuario

## Objetivo

Construir un panel de administración mínimo viable para que ASEMUCH Coquimbo pueda gestionar solo tres tipos de contenido:

- Noticias
- Documentos
- Convenios

El panel será usado por una sola cuenta administradora.

## Alcance

El MVP considera:

1. Login de una sola cuenta administradora.
2. Zona privada `/admin`.
3. CRUD de noticias, documentos y convenios.
4. Estados `borrador` y `publicado`.
5. Subida de imágenes y PDFs.
6. Sitio público conectado a contenido dinámico real.

El MVP no considera:

- Multiusuario
- Roles y permisos
- Historial de cambios
- Workflow editorial complejo
- Comentarios internos
- Versionado de contenido
- SEO avanzado por entrada

## Decisión técnica

La implementación recomendada es un panel propio dentro del mismo proyecto Next.js, usando Supabase como backend. Esta decisión se toma porque:

- Permite una sola base técnica para panel y sitio público.
- Es suficiente para una cuenta administradora.
- Evita agregar un CMS externo innecesario.
- Facilita crecer más adelante sin reescribir el proyecto.

## Arquitectura propuesta

### Frontend

El sitio seguirá en Next.js App Router y sumará:

- `/admin/login`
- `/admin`
- `/admin/noticias`
- `/admin/documentos`
- `/admin/convenios`
- formularios crear/editar por tipo

La experiencia del panel debe ser simple, clara y orientada a tareas:

- ver listado
- crear contenido
- editar contenido
- borrar contenido
- publicar o dejar en borrador

### Backend

Supabase cubrirá:

- autenticación por email/password
- base de datos relacional
- storage para imágenes y PDFs

No se requiere backend separado mientras el panel se mantenga dentro del mismo proyecto.

### Sitio público

El frontend público dejará de depender de contenido hardcodeado para estas tres áreas:

- Noticias: hoy se apoya en `src/components/SiteData.ts`
- Documentos: parte local está en `src/components/SiteData.ts`
- Convenios: mezcla contenido local y contenido externo

Después del MVP:

- Noticias regionales se leerán desde Supabase.
- Documentos locales se leerán desde Supabase.
- Convenios locales se leerán desde Supabase.
- El contenido externo nacional puede mantenerse separado como fuente complementaria, no administrada por el cliente.

## Modelo de datos

### Noticias

Campos mínimos:

- `id`
- `title`
- `slug`
- `excerpt`
- `content`
- `featured_image_url`
- `published_at`
- `status`
- `created_at`
- `updated_at`

### Documentos

Campos mínimos:

- `id`
- `title`
- `slug`
- `document_type`
- `summary`
- `file_url`
- `published_at`
- `status`
- `created_at`
- `updated_at`

### Convenios

Campos mínimos:

- `id`
- `title`
- `slug`
- `summary`
- `details`
- `image_url`
- `file_url`
- `promo_code`
- `valid_from`
- `valid_until`
- `status`
- `created_at`
- `updated_at`

## Experiencia del panel

### Login

El acceso será por una sola cuenta administradora con:

- email
- password

Si no hay sesión válida, cualquier ruta `/admin` redirige a `/admin/login`.

### Dashboard

La portada `/admin` mostrará accesos rápidos a:

- Noticias
- Documentos
- Convenios

No necesita métricas complejas. El objetivo es entrar y trabajar rápido.

### Listados

Cada módulo tendrá una tabla o listado simple con:

- título
- estado
- fecha
- acciones de editar y borrar

### Formularios

Cada formulario debe permitir:

- guardar borrador
- publicar
- actualizar contenido existente
- eliminar contenido

El flujo debe ser directo y sin opciones innecesarias.

## Uploads

Storage requerido:

- bucket de imágenes para noticias y convenios
- bucket de documentos PDF

El panel debe permitir subir archivos desde formulario y guardar la URL final en Supabase.

## Reglas de publicación

- Solo el contenido `publicado` aparece en el sitio público.
- El contenido `borrador` solo se ve en el panel.
- Si un ítem se despublica, desaparece del sitio público sin borrarse.

## Cambios esperados en el sitio público

### Noticias

La página de noticias y la ruta individual deben leer desde Supabase en vez de `NEWS_CARDS` locales.

### Documentos

La sección de documentos locales debe leer desde Supabase.

### Convenios

Los convenios locales administrados por ASEMUCH Coquimbo deben salir desde Supabase.

Los convenios nacionales externos pueden seguir como fuente aparte si se quiere conservar esa capa.

## Seguridad

Para este MVP, la seguridad mínima requerida es:

- rutas admin protegidas por sesión
- operaciones de escritura restringidas al usuario autenticado
- variables de entorno seguras para Supabase
- validación básica de formularios y archivos

No se implementará control granular por rol porque no aplica al caso.

## Orden recomendado de construcción

1. Configurar Supabase
2. Crear esquema de datos
3. Configurar autenticación
4. Crear layout y guard de `/admin`
5. Construir CRUD de noticias
6. Conectar noticias públicas
7. Construir CRUD de documentos
8. Conectar documentos públicos
9. Construir CRUD de convenios
10. Conectar convenios públicos
11. Integrar storage de imágenes y PDFs
12. Verificación final y deploy

## Riesgos y decisiones explícitas

- El proyecto actual no tiene backend, auth ni storage, así que esto no es un ajuste menor: es una nueva capacidad completa.
- Si mañana no se alcanza el panel entero, el mejor punto intermedio útil es dejar listo login, estructura `/admin`, esquema Supabase y CRUD completo de noticias primero.
- Convenios y documentos pueden montarse después sobre la misma base sin rediseñar la arquitectura.

## Criterio de éxito

El panel estará listo cuando:

- el cliente pueda iniciar sesión con una sola cuenta
- pueda crear, editar, borrar y publicar noticias
- pueda subir documentos PDF
- pueda crear convenios con texto, fechas y archivo o imagen
- el contenido publicado aparezca automáticamente en el sitio público
