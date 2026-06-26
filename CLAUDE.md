@AGENTS.md

# ASEMUCH Coquimbo — Instrucciones del Proyecto

## Contexto
Sitio web institucional para ASEMUCH Coquimbo (Asociación Comunal de Funcionarios Municipales de la Ilustre Municipalidad de Coquimbo), afiliada a la Confederación Nacional ASEMUCH desde 1911.

Proyecto de Gautama Digital (Sebastián Morales). Estado: **demo funcional enviado al cliente — pendiente aprobación y contrato**.

## URLs
- **Producción/Demo:** https://asemuch-coquimbo.vercel.app
- **Repo:** https://github.com/sebannicus/asemuch-coquimbo
- **Local:** D:\dev\clientes\asemuch-coquimbo
- **Scope Vercel:** gautamadigital33-9252s-projects
- **Deploy:** `vercel --prod` desde la raíz del proyecto

## Stack
- Next.js 16.2.1 + TypeScript strict + App Router
- Tailwind v4 (oklch design tokens en globals.css)
- Fuentes: Open Sans + Source Sans 3 (next/font/google)
- 17 rutas estáticas (SSG) — sin DB, sin auth
- Formularios: Formspree (`NEXT_PUBLIC_FORMSPREE_ID` — pendiente ID real)
- shadcn/ui (Radix primitives)

## Datos reales del cliente (integrados 2026-06-25)
- **Razón social:** Asociación Comunal de Funcionarios Municipales de la Ilustre Municipalidad de Coquimbo
- **Teléfono:** +56 9 9189 9920
- **Email:** coquimbo.asemuch@gmail.com
- **Dirección:** Varela 1090, Coquimbo
- **Horario:** Lunes a Viernes, 09:00 – 17:30 hrs.
- **Logo:** `/public/images/logo.png` (aplicado en Header y Footer)

## Directiva real (Certificado N°404/2025/436 Dirección del Trabajo)
Período: 31/03/2025 – 31/03/2027

| Nombre | Cargo |
|---|---|
| Cristian Tapia Zepeda | Presidente |
| Rosa Elena Renney Rodríguez | Tesorera |
| José Montalván López | Secretario |

## Propuesta comercial
- **Cotización:** `D:\dev\agencia\Cotizacion_Gautama_Digital_Asociacion.pdf`
- **Script fuente:** `C:\Users\crman\AppData\Local\Temp\...\scratchpad\cotizacion_v3.py`
- **Valor:** $180.000 neto + IVA 19% = **$214.200 CLP total**
- **Plazo:** 30 días corridos desde aprobación y entrega de contenidos
- **Hosting:** 1er año incluido; renovación $18.000 CLP neto/año desde el 2do año
- **Correo de envío enviado a:** coquimbo.asemuch@gmail.com (Cristian Tapia)

## Fuente de verdad del código
- `src/components/SiteData.ts` — todos los datos del sitio (nav, hero, stats, noticias, directiva, dictámenes, documentos, contacto)
- `src/types/index.ts` — interfaces TypeScript (NavItem con `highlight?: boolean`)
- `src/app/layout.tsx` — metadata global + fonts + Header/Footer

## Páginas disponibles (17 rutas SSG)
| Ruta | Descripción |
|---|---|
| `/` | Home: Hero + StatsBar + QuickAccess + BeneficiosSection + NewsSection |
| `/quienes-somos` | Historia (desde 1911), Misión/Visión, Valores, CTA afiliación |
| `/directiva` | 3 miembros reales con iniciales |
| `/noticias` | 6 noticias demo con imágenes picsum estables |
| `/noticias/[slug]` | Detalle de noticia (6 rutas SSG) |
| `/dictamenes` | Tabla con filtros por categoría (5 dictámenes demo) |
| `/documentos` | Lista con badges tipo (5 documentos demo) |
| `/contacto` | Form Formspree + info contacto + Google Maps (Varela 1090) |
| `/afiliarse` | Pasos + requisitos + form Formspree |
| `/_not-found` | 404 institucional |

## Contenido demo (pendiente reemplazo con datos reales)
- Noticias: 6 artículos ficticios pero temáticamente correctos
- Dictámenes: 5 registros demo (números ficticios, materias reales del Estatuto Municipal)
- Documentos: 5 documentos demo (sin PDF real — href="#")
- Redes sociales: apuntan a cuentas nacionales ASEMUCH (no hay sede regional propia)

## Pendientes para entrega final
1. **Formspree ID real** → crear en formspree.io → `NEXT_PUBLIC_FORMSPREE_ID` en Vercel env vars
2. **Noticias reales** del cliente → reemplazar en `SiteData.ts → NEWS_CARDS`
3. **Documentos con PDF** → subir PDFs a hosting y actualizar href en `DOCUMENTOS`
4. **Redes sociales propias** de la sede (si existen)
5. **Dominio propio** (asemuchcoquimbo.cl o similar) → configurar en Vercel
6. **WA_NUMBER en /afiliarse** actualmente apunta al placeholder de Formspree — revisar si quieren agregar WhatsApp

## Historial de fases completadas
- **Fase A (2026-06-24):** Clone de asemuch.cl → MVP 8 páginas, identidad propia
- **Fase B (2026-06-24):** Formspree, metadata SEO, favicon SVG, og-image, deploy inicial
- **Fase C (2026-06-24):** /afiliarse, BeneficiosSection, Header CTA destacado, Maps embed, CTA dark QuiénesSomos, 404
- **Fase D (2026-06-25):** Datos reales (teléfono, email, dirección, directiva), logo, historia corregida (1911), deploy a prod

## Reglas de desarrollo
- Rama activa: `main` (este proyecto no usa rama dev separada)
- Deploy: `vercel --prod` desde `D:\dev\clientes\asemuch-coquimbo`
- No usar imágenes de asemuch.cl (externas) — usar solo `/public/images/`
- Todos los datos del sitio van en `SiteData.ts`, no hardcodeados en componentes
