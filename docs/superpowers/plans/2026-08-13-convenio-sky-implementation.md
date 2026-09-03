# Convenio SKY Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrar el convenio SKY como destacado principal en `/convenios`, agregar un teaser breve en la portada y desplegar el cambio a producción.

**Architecture:** El convenio local seguirá siendo contenido estático dentro de la app, separado del listado dinámico de convenios nacionales que viene desde la API de ASEMUCH. La portada mostrará un teaser compacto reutilizando el lenguaje visual actual de beneficios y derivando a `/convenios`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, Vercel CLI

---

### Task 1: Preparar workspace aislado y validar baseline

**Files:**
- Create: `C:/Users/crman/.config/superpowers/worktrees/asemuch-coquimbo/codex/convenio-sky/`
- Verify: `D:/dev/clientes/asemuch-coquimbo/package.json`

- [ ] **Step 1: Crear worktree global con rama de trabajo**

```bash
git worktree add C:/Users/crman/.config/superpowers/worktrees/asemuch-coquimbo/codex/convenio-sky -b codex/convenio-sky
```

- [ ] **Step 2: Instalar dependencias en el worktree**

```bash
cd C:/Users/crman/.config/superpowers/worktrees/asemuch-coquimbo/codex/convenio-sky
npm install
```

- [ ] **Step 3: Ejecutar baseline completo antes de cambiar código**

```bash
npm run check
```

Expected: lint, typecheck y build terminan con exit code 0.

### Task 2: Cubrir el teaser de portada con TDD

**Files:**
- Create: `C:/Users/crman/.config/superpowers/worktrees/asemuch-coquimbo/codex/convenio-sky/src/components/__tests__/BeneficiosSection.test.tsx`
- Modify: `C:/Users/crman/.config/superpowers/worktrees/asemuch-coquimbo/codex/convenio-sky/src/components/BeneficiosSection.tsx`

- [ ] **Step 1: Escribir test rojo para teaser SKY en portada**

```tsx
import { render, screen } from "@testing-library/react";
import BeneficiosSection from "../BeneficiosSection";

test("renders SKY teaser linking to convenios page", () => {
  render(<BeneficiosSection />);

  expect(
    screen.getByRole("heading", { name: /nuevo convenio sky/i })
  ).toBeInTheDocument();

  const link = screen.getByRole("link", { name: /ver convenio sky/i });
  expect(link).toHaveAttribute("href", "/convenios");
});
```

- [ ] **Step 2: Ejecutar el test y verificar fallo correcto**

```bash
npx jest src/components/__tests__/BeneficiosSection.test.tsx
```

Expected: FAIL porque el teaser aún no existe o no hay configuración de test lista.

- [ ] **Step 3: Implementar teaser mínimo en la sección de beneficios**

```tsx
<Link
  href="/convenios"
  className="group rounded-2xl border border-[#0c71c3]/20 bg-[#f5f9fc] p-6 flex flex-col gap-3 hover:border-[#0c71c3]/40 hover:shadow-lg transition-all"
>
  <span className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">
    Beneficio destacado
  </span>
  <h3
    className="text-xl font-bold text-[#0c2340]"
    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
  >
    Nuevo convenio SKY
  </h3>
  <p className="text-sm leading-relaxed text-[#5d6675]">
    10% de descuento en pasajes para afiliadas y afiliados. Revisa el código y la vigencia del beneficio.
  </p>
  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0c71c3] group-hover:text-[#2ea3f2] transition-colors">
    Ver convenio SKY
  </span>
</Link>
```

- [ ] **Step 4: Verificar el cambio**

```bash
npm run lint
npm run typecheck
```

Expected: exit code 0 en ambos comandos.

### Task 3: Reemplazar el bloque local de Skype por SKY en `/convenios`

**Files:**
- Modify: `C:/Users/crman/.config/superpowers/worktrees/asemuch-coquimbo/codex/convenio-sky/src/app/convenios/page.tsx`
- Verify: `C:/Users/crman/.config/superpowers/worktrees/asemuch-coquimbo/codex/convenio-sky/public/images/conveniosky.jpeg`

- [ ] **Step 1: Escribir chequeo rojo del contenido esperado**

```bash
rg -n "Convenio SKY|SKYASEMUCH135|01 de julio al 31 de julio de 2026" src/app/convenios/page.tsx
```

Expected: sin coincidencias antes de implementar.

- [ ] **Step 2: Implementar el bloque destacado de SKY**

```tsx
<div className="mb-10">
  <p className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest mb-3">
    Convenio ASEMUCH Coquimbo
  </p>
  <div className="rounded-[28px] border border-[#0c71c3]/20 bg-white shadow-sm overflow-hidden">
    <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
      <div className="bg-[#f5f9fc] p-4 md:p-6">
        <img
          src="/images/conveniosky.jpeg"
          alt="Convenio SKY ASEMUCH Coquimbo"
          className="w-full rounded-2xl border border-[#d9e6f5]"
        />
      </div>
      <div className="p-6 md:p-8 flex flex-col">
        <h2
          className="text-2xl font-extrabold text-[#0c2340] mb-3"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          Convenio SKY - ASEMUCH Coquimbo
        </h2>
        <p className="text-sm text-[#5d6675] leading-relaxed mb-5">
          Accede a un 10% de descuento en la compra de pasajes SKY usando el código promocional informado para afiliadas y afiliados de ASEMUCH.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="rounded-2xl bg-[#f5f9fc] border border-[#e3e9f1] p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3] mb-1">Código</p>
            <p className="text-lg font-extrabold text-[#0c2340]">SKYASEMUCH135</p>
          </div>
          <div className="rounded-2xl bg-[#f5f9fc] border border-[#e3e9f1] p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3] mb-1">Vigencia</p>
            <p className="text-sm font-semibold text-[#0c2340]">01 de julio al 31 de julio de 2026</p>
          </div>
        </div>
        <a
          href="/images/conveniosky.jpeg"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c71c3] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2ea3f2] transition-colors w-full sm:w-fit"
        >
          Ver pieza completa
        </a>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Verificar que Skype ya no siga como convenio local**

```bash
rg -n "Skype|Próximamente" src/app/convenios/page.tsx
```

Expected: sin coincidencias en el bloque local reemplazado.

- [ ] **Step 4: Ejecutar verificación de página**

```bash
npm run lint
npm run typecheck
```

Expected: exit code 0.

### Task 4: Verificación final y despliegue

**Files:**
- Verify: `C:/Users/crman/.config/superpowers/worktrees/asemuch-coquimbo/codex/convenio-sky/src/app/convenios/page.tsx`
- Verify: `C:/Users/crman/.config/superpowers/worktrees/asemuch-coquimbo/codex/convenio-sky/src/components/BeneficiosSection.tsx`

- [ ] **Step 1: Ejecutar chequeo completo del proyecto**

```bash
npm run check
```

Expected: lint, typecheck y build exitosos.

- [ ] **Step 2: Revisar diff antes de desplegar**

```bash
git status --short
git diff -- src/app/convenios/page.tsx src/components/BeneficiosSection.tsx
```

Expected: solo cambios intencionados del convenio SKY.

- [ ] **Step 3: Desplegar a producción**

```bash
vercel --prod
```

Expected: deploy exitoso y URL de producción confirmada por la CLI.
