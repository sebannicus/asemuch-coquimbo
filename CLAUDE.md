@AGENTS.md

# ASEMUCH Coquimbo — Instrucciones del Proyecto

## Contexto
Sitio web institucional para ASEMUCH Coquimbo (Asociación Comunal de Funcionarios Municipales de la Ilustre Municipalidad de Coquimbo), afiliada a la Confederación Nacional ASEMUCH desde 1911.

Proyecto de Gautama Digital (Sebastián Morales). Estado: **en producción, cliente activo, ajustes en curso.**

## URLs
- **Producción:** https://asemuch-coquimbo.vercel.app
- **Repo:** https://github.com/sebannicus/asemuch-coquimbo
- **Local:** D:\dev\clientes\asemuch-coquimbo
- **Scope Vercel:** gautamadigital33-9252s-projects
- **Deploy:** `vercel --prod` desde la raíz del proyecto

## Stack
- Next.js 16.2.1 + TypeScript strict + App Router
- Tailwind v4 (oklch design tokens en globals.css)
- Fuentes: Open Sans + Source Sans 3 (next/font/google)
- 20 rutas estáticas (SSG) — sin DB, sin auth
- Formularios: Formspree (`NEXT_PUBLIC_FORMSPREE_ID` — **PENDIENTE ID REAL**)
- shadcn/ui (Radix primitives)

## Datos reales del cliente
- **Razón social:** Asociación Comunal de Funcionarios Municipales de la Ilustre Municipalidad de Coquimbo
- **Teléfono:** +56 9 9189 9920
- **Email:** coquimbo.asemuch@gmail.com
- **Dirección:** Varela 1090, Coquimbo
- **Horario:** Lunes a Viernes, 09:00 – 17:30 hrs.
- **Logo:** `/public/images/logo.png` (Cruz del Tercer Milenio circular badge, aplicado en Header y Footer)

## Directiva real (Certificado N°404/2025/436 Dirección del Trabajo)
Período: 31/03/2025 – 31/03/2027

| Nombre | Cargo |
|---|---|
| Cristian Tapia Zepeda | Presidente |
| Rosa Elena Renney Rodríguez | Tesorera |
| José Montalván López | Secretario |

## Propuesta comercial
- **Cotización:** `D:\dev\agencia\Cotizacion_Gautama_Digital_Asociacion.pdf`
- **Valor:** $180.000 neto + IVA 19% = **$214.200 CLP total**
- **Plazo:** 30 días corridos desde aprobación y entrega de contenidos
- **Hosting:** 1er año incluido; renovación $18.000 CLP neto/año desde el 2do año
- **Estado (2026-07-02):** cliente activo, entregando ajustes por correo

## Fuente de verdad del código
- `src/components/SiteData.ts` — todos los datos del sitio (nav, hero, stats, noticias, directiva, dictámenes, documentos, contacto)
- `src/app/layout.tsx` — metadata global + JSON-LD Organization schema + fonts + Header/Footer
- `src/types/index.ts` — interfaces TypeScript

## Navegación actual (SiteData.ts NAV_ITEMS)
Inicio | Quiénes Somos | Directiva | Noticias | Convenios | Comunicados | Documentos | Contacto | Afiliarse

## Páginas disponibles (20 rutas SSG)
| Ruta | Estado |
|---|---|
| `/` | ✅ Home con Hero (Cruz fondo grande + badge 80 años) |
| `/quienes-somos` | ✅ Historia 1911, Misión/Visión, Valores, CTA |
| `/directiva` | ✅ 3 miembros reales |
| `/noticias` | ✅ 6 noticias genéricas (reemplazar con reales) |
| `/noticias/[slug]` | ✅ 6 páginas de detalle |
| `/convenios` | ✅ WP API cat=19 (revalidate 1d) + tarjeta Skype (% pendiente) |
| `/comunicados` | ✅ WP API cat=12, últimos 20 (revalidate 1d) |
| `/documentos` | ✅ Hub: Leyes y Guías (WP cat=9) + Dictámenes (WP cat=10 + CGR) |
| `/biblioteca` | ✅ URL preservada — hub con links a sub-secciones asemuch.cl |
| `/dictamenes` | ✅ Tabla CGR (números referenciales, reemplazar con reales) |
| `/contacto` | ✅ Form Formspree + mapa Varela 1090 |
| `/afiliarse` | ✅ Pasos + requisitos + form |
| `/_not-found` | ✅ 404 institucional |

## WP REST API — IDs de categorías asemuch.cl
| Categoría | ID | Count | Parent |
|---|---|---|---|
| Convenios | 19 | 15 | 0 |
| Comunicados | 12 | 363 | 0 |
| Biblioteca | 8 | 49 | 0 |
| Leyes | 9 | 51 | 8 |
| Dictamenes | 10 | 5 | 8 |
| Noticias | 18 | 23 | 0 |
| Estudios | 22 | 4 | 8 |
- API base: `https://asemuch.cl/wp-json/wp/v2/posts?categories=X&per_page=N&_fields=id,date,title,excerpt,link`
- API pública, sin autenticación. revalidate: 86400 en todas las páginas que la usan.

## Hero (Hero.tsx)
- Fondo: gradiente navy + dot pattern
- Cruz del Tercer Milenio: `/images/logo.png` a 480px, opacity 0.18, posición absoluta derecha
- Badge "80 AÑOS · ASEMUCH CHILE": absoluto bottom-right, temporal — reemplazar con años de ASEMUCH Coquimbo cuando el cliente confirme fecha de fundación
- 3 slides con auto-rotate 5s
- ⚠️ Slide 3 dice "2024–2026" → corregir a "2025–2027" (período real directiva)

## SEO implementado
- ✅ JSON-LD Organization schema (Google Knowledge Panel)
- ✅ Metadata: title, description, keywords, og:image (logo local)
- ✅ Twitter card
- ✅ robots: index/follow
- ✅ Sitemap automático (Next.js)
- ✅ Favicon SVG + PNG

## ⚠️ PENDIENTES PARA ENTREGA FINAL

### 1. Formspree — BLOQUEANTE (formularios no envían)
- Crear form en formspree.io con email destino `coquimbo.asemuch@gmail.com`
- Obtener el ID (formato `xabcdefg`)
- Configurar: `vercel env add NEXT_PUBLIC_FORMSPREE_ID production`
- Aplica a: `/contacto` y `/afiliarse` (ambos usan el mismo ID en `FORMSPREE_ID`)

### 2. Dominio propio
- Registrar `asemuchcoquimbo.cl` en nic.cl (~$8.000 CLP/año, requiere RUT organización)
- Agregar en Vercel → Project → Settings → Domains
- Actualizar `NEXT_PUBLIC_SITE_URL` en Vercel env vars

## Pendientes de información del cliente
| Elemento | Dónde va | Qué esperar |
|---|---|---|
| % exacto descuento Skype | `/convenios` tarjeta Skype | Entre 15–20%, cliente lo confirmará |
| Fecha fundación ASEMUCH Coquimbo | Badge Hero + Hero slide | Para reemplazar "80 AÑOS ASEMUCH CHILE" |
| Noticias reales | `/noticias` y SiteData.ts | 6 artículos ficticios actuales |
| PDFs reales | `/documentos` sección DOCUMENTOS (href="#") | Circulares, actas, resoluciones reales |
| Números reales dictámenes CGR | SiteData.ts DICTAMENES | Números E123.456 son ficticios |
| Redes sociales propias | SiteData.ts CONTACT_INFO | Instagram/Facebook de ASEMUCH Coquimbo si existe |
| Período directiva en Hero | SiteData.ts HERO_SLIDES[2] | Corregir "2024–2026" → "2025–2027" |
| Detalle convenios destacados | SiteData.ts CONVENIOS_DESTACADOS | Clínica Dental Jade, Rosa Agustina, Petrobras, Centro Oftalmológico Integral del Norte: falta % descuento, condiciones y rubro de Rosa Agustina |

## Contenido genérico activo (reemplazar cuando el cliente provea)
- Noticias: 6 artículos temáticamente correctos pero ficticios
- Dictámenes CGR: números referenciales (E123.456/2026) todos van al buscador CGR
- Documentos institucionales: 5 registros demo sin PDF (href="#")
- Redes sociales: apuntan a cuentas nacionales ASEMUCH
- Stats: "+1.200 funcionarios, 15 comunas" — confirmar si son los números reales de Coquimbo

## Historial de fases completadas
- **Fase A (2026-06-24):** Clone asemuch.cl → MVP 8 páginas, identidad propia
- **Fase B (2026-06-24):** Formspree, metadata SEO, favicon, og-image, deploy inicial
- **Fase C (2026-06-24):** /afiliarse, BeneficiosSection, Header CTA, Maps, 404
- **Fase D (2026-06-25):** Datos reales (teléfono, email, dirección, directiva), logo, historia 1911, deploy
- **Fase E (2026-06-29):** JSON-LD schema, keywords SEO, dictámenes → CGR real, metadata og:image → logo, teléfono en /afiliarse, deploy
- **Fase F (2026-06-30):** Integración WP REST API — /convenios (cat=19), /comunicados (cat=12), /biblioteca (hub), nav actualizado
- **Fase G (2026-07-01):** Ajustes cliente — /documentos hub unificado (Leyes y Guías + Dictámenes), tarjeta Skype en convenios, Hero con Cruz fondo + badge 80 años, deploy ✅
- **Fase H (2026-07-02):** QA funcional + lista de pedido contenido real — periodo directiva corregido (2024–2026 → 2025–2027), deploy fix ✅, lista formal de pedido al cliente generada para las 7 categorías pendientes (noticias, PDFs, dictámenes CGR, redes sociales, % Skype, año fundación, stats)
- **Fase I (2026-07-02):** Rediseño Hero — logo como protagonista visual principal, visible en desktop y mobile sin recortes, eliminada tarjeta "Seminario Nacional", header simplificado a "ASEMUCH / Coquimbo", commit f0f6553 pusheado a GitHub ✅
- **Fase J (2026-07-02):** Buscadores en tiempo real — /documentos (Leyes + Dictámenes), /convenios, /comunicados con filtrado sticky y contador de resultados, commit b157386 pusheado a GitHub ✅
- **Fase K (2026-09-03):** Banner de convenios destacados en /convenios — marquee infinito clickeable (ConveniosDestacadosBanner.tsx) con 4 convenios reales (Clínica Dental Jade, Rosa Agustina, Petrobras, Centro Oftalmológico Integral del Norte), modal de detalle por convenio, datos en CONVENIOS_DESTACADOS (SiteData.ts) marcados infoPendiente:true hasta que el cliente confirme % y condiciones

## Reglas de desarrollo
- Rama activa: `main`
- Deploy: `vercel --prod` desde `D:\dev\clientes\asemuch-coquimbo`
- No usar imágenes externas de asemuch.cl — solo `/public/images/`
- Todos los datos del sitio van en `SiteData.ts`, no hardcodeados en componentes
- Dev lento: agregar `D:\dev\` a exclusiones de Windows Defender para acelerar `.next/`
