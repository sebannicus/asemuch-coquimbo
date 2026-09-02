# Header and Hero Repair Design

## Objective

Restore a clear, cohesive home page for ASEMUCH Coquimbo: one white header, a legible rotating hero, visible navigation, live news on the index, and slightly more compact visual components.

## Chosen Approach

Use a single global white header containing the logo and association name, desktop navigation, social links, and the affiliation call to action. The current informational strip, separate navigation strip, and the hero's duplicate brand panel will be removed.

The server-rendered home page will compose a focused client-only hero carousel. It will rotate among supplied association photographs, crossfade on a timed interval, expose accessible manual controls, and retain a dark blue gradient overlay so all hero copy remains white and readable.

## Scope

- Refactor the shared header into one responsive white bar.
- Replace the static hero image with a client carousel using local assets.
- Remove the duplicate hero navigation panel.
- Restore the existing `NewsSection` in the home page so published news remain visible.
- Preserve direct links to public sections in the header and key home calls to action.
- Tighten section padding, card radii, and large headings modestly without changing the content hierarchy.
- Reinstate intentional visual effects through image overlays, restrained gradients, hover elevation, and transition motion.

## Architecture

- `Header` stays a shared component and contains the full primary navigation and social links. A minimal client boundary handles the mobile menu only if needed.
- `HeroCarousel` is a client component responsible only for image index, timed rotation, and manual slide controls. Its image list is serializable local data.
- `src/app/page.tsx` remains a server component, rendering the carousel and `NewsSection`. No Supabase fetch moves to the client.

## Accessibility and Failure Handling

- Navigation and carousel controls have explicit accessible labels.
- Hero imagery uses descriptive alternative text and an always-on contrast overlay.
- The first hero image renders immediately; JavaScript failure leaves a complete static first slide and readable content.
- Motion respects `prefers-reduced-motion` by disabling automated transitions.

## Verification

- Add a focused test for hero slide configuration and rotation helpers before their implementation.
- Run unit tests, lint, TypeScript checking, and production build.
- Verify the home page in a real browser at desktop and mobile widths, including visual contrast, navigation links, carousel behavior, news rendering, and console cleanliness.
