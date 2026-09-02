# Hero Content Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the home hero readable and rotating, remove unintended editorial cards, and restore the requested access and benefits sections.

**Architecture:** Keep the page server-rendered and add a small client `HeroCarousel` for timed image rotation. Keep the remaining content in `page.tsx`, including the server-rendered `NewsSection` so published news stay visible.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Node test runner.

---

### Task 1: Define and test carousel data helpers

**Files:**
- Create: `src/lib/hero-slides.ts`
- Create: `tests/hero-slides.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { getNextSlideIndex, heroSlides } from "../src/lib/hero-slides.ts";

test("hero slides include supplied images and wrap after the last slide", () => {
  assert.ok(heroSlides.length >= 3);
  assert.equal(getNextSlideIndex(heroSlides.length - 1, heroSlides.length), 0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types tests/hero-slides.test.ts`

Expected: FAIL because `hero-slides.ts` does not exist.

- [ ] **Step 3: Write minimal implementation**

```ts
export const heroSlides = [
  { src: "/images/foto-hero-asemuch-coquimbo-reunion-funcionarios.webp", alt: "Funcionarios municipales de Coquimbo en una actividad de ASEMUCH Coquimbo" },
  { src: "/images/reunion-asemuch-funcionarios.webp", alt: "Reunión de funcionarios municipales de Coquimbo" },
  { src: "/images/junto-a-asemuch-nacional-y-hero.webp", alt: "Dirigentes de ASEMUCH Coquimbo en actividad gremial" },
];

export function getNextSlideIndex(currentIndex: number, totalSlides: number) {
  return totalSlides === 0 ? 0 : (currentIndex + 1) % totalSlides;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types tests/hero-slides.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/hero-slides.ts tests/hero-slides.test.ts package.json
git commit -m "feat: add hero slide configuration"
```

### Task 2: Build the readable rotating hero

**Files:**
- Create: `src/components/HeroCarousel.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create the client carousel**

Use `useEffect` to advance every six seconds, clean up the timer, and render all images absolutely with an opacity transition. Add labelled previous, next, and slide selector buttons. Keep a navy gradient overlay above every image.

- [ ] **Step 2: Replace only the current hero internals**

Remove the hero-local brand/navigation header and the `Presencia gremial` and `Enfoque exclusivo Coquimbo` cards. Render the carousel with white `h1`, white supporting copy, the two existing calls to action, and the `+100` / `+300` cards.

- [ ] **Step 3: Preserve page data boundaries**

Keep the home page as a server component and do not import `NewsSection` into the carousel.

- [ ] **Step 4: Run focused test and type check**

Run: `npm test && npm run typecheck`

Expected: both commands exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroCarousel.tsx src/app/page.tsx
git commit -m "feat: rotate readable home hero"
```

### Task 3: Restore index sections and live news

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add requested quick access cards**

Render four linked cards for Afiliarse, Dictámenes, Documentos, and Contacto with the provided labels and destination paths.

- [ ] **Step 2: Add the requested benefits section**

Render the six benefits using the supplied headings and descriptions, with the `Afiliarme ahora` link pointing to `/afiliarse`.

- [ ] **Step 3: Restore live index news**

Import and render `<NewsSection />` after the home news introduction; do not replace it with static cards.

- [ ] **Step 4: Run quality checks**

Run: `npm test && npm run lint && npm run typecheck && npm run build`

Expected: all commands exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: restore home links benefits and news"
```

### Task 4: Browser verification

**Files:**
- Modify: none unless verification exposes a defect

- [ ] **Step 1: Start the production-like local server**

Run: `npm run dev`

- [ ] **Step 2: Verify desktop and mobile**

Confirm hero text remains white and readable over every rotating image, selector controls work, the two unwanted editorial cards are absent, quick links navigate to their paths, the benefits render, and live news is present.

- [ ] **Step 3: Check browser hygiene**

Confirm no console errors or warnings, logical heading order, and accessible names on carousel controls.

- [ ] **Step 4: Commit any correction found during verification**

```bash
git add <corrected-files>
git commit -m "fix: polish home hero presentation"
```
