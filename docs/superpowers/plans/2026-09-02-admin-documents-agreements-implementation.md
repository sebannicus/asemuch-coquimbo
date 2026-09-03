# Documentos y Convenios del Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completar el panel para administrar documentos y convenios locales, conservando el contenido nacional existente en las páginas públicas.

**Architecture:** Se usarán las tablas `documents` y `agreements` ya definidas en Supabase, con Storage público separado para PDFs e imágenes. Los formularios del panel validarán datos y archivos en Server Actions; las páginas públicas consultarán los registros publicados y los mostrarán antes de los contenidos nacionales.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Supabase, Zod, Tailwind CSS.

---

### Task 1: Contratos y archivos de documentos

**Files:**
- Create: `src/lib/document-files.ts`
- Create: `tests/document-files.test.ts`
- Modify: `src/app/admin/actions.ts`
- Modify: `src/lib/content/documents.ts`

- [ ] **Step 1: Definir pruebas de validación para PDF y ruta de Storage.**
- [ ] **Step 2: Implementar límite de 10 MB, MIME `application/pdf` y rutas sanitizadas.**
- [ ] **Step 3: Crear consultas administrativas y públicas de documentos.**
- [ ] **Step 4: Implementar acciones autenticadas para crear, actualizar y eliminar documentos y sus PDFs.**
- [ ] **Step 5: Ejecutar `npm test` y confirmar que pasa.**

### Task 2: Panel y publicación de documentos

**Files:**
- Create: `src/components/admin/DocumentForm.tsx`
- Create: `src/app/admin/documentos/[id]/page.tsx`
- Modify: `src/app/admin/documentos/page.tsx`
- Modify: `src/app/admin/documentos/new/page.tsx`
- Modify: `src/app/documentos/page.tsx`

- [ ] **Step 1: Reemplazar las pantallas de preparación por listado CRUD y formulario.**
- [ ] **Step 2: Mantener las leyes y dictámenes nacionales e insertar antes los documentos locales publicados.**
- [ ] **Step 3: Ejecutar `npm run typecheck`.**

### Task 3: Contratos y archivos de convenios

**Files:**
- Create: `src/lib/agreement-assets.ts`
- Create: `tests/agreement-assets.test.ts`
- Create: `src/lib/content/agreements.ts`
- Modify: `src/app/admin/actions.ts`

- [ ] **Step 1: Definir pruebas de imagen JPG/PNG/WebP y PDF opcional.**
- [ ] **Step 2: Validar 5 MB para imagen y 10 MB para PDF; generar rutas sanitizadas.**
- [ ] **Step 3: Implementar consultas y Server Actions CRUD con eliminación segura de recursos reemplazados.**
- [ ] **Step 4: Ejecutar `npm test`.**

### Task 4: Panel y publicación de convenios

**Files:**
- Create: `src/components/admin/AgreementForm.tsx`
- Create: `src/app/admin/convenios/[id]/page.tsx`
- Modify: `src/app/admin/convenios/page.tsx`
- Modify: `src/app/admin/convenios/new/page.tsx`
- Modify: `src/app/convenios/page.tsx`

- [ ] **Step 1: Reemplazar las pantallas de preparación por listado CRUD y formulario completo.**
- [ ] **Step 2: Mostrar convenios locales publicados antes de la tarjeta y feed nacional actuales.**
- [ ] **Step 3: Ejecutar `npm run typecheck`.**

### Task 5: Migración y despliegue

**Files:**
- Create: `supabase/migrations/20260902_admin_documents_agreements.sql`

- [ ] **Step 1: Asegurar buckets y políticas requeridos por los módulos.**
- [ ] **Step 2: Ejecutar `npm run check`.**
- [ ] **Step 3: Aplicar migraciones en Supabase.**
- [ ] **Step 4: Ejecutar `vercel --prod` y verificar la URL de producción.**
