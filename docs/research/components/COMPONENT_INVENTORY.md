# Inventario de Componentes — ASEMUCH
## Extraído de https://asemuch.cl — 2026-06-24

## 1. Header (.ashd)
- **Estructura:** Logo (196×72) + Nav bar con hamburger mobile
- **Nav items:** La Asemuch (dropdown 4), Noticias, Comunicados, Convenios, Biblioteca (dropdown 5), Tesorería, Comisiones (dropdown 9)
- **Social icons:** Facebook, Instagram en nav
- **Mobile:** burger button + menú colapsable
- **Height:** 158px desktop
- **Interaction:** dropdown en hover, burger toggle en mobile

## 2. Hero (#asHero .asemuch-hero.has-bg)
- **Fondo:** gradiente oscuro azul navy 120deg
- **Tipo slides:**
  - `ash__slide--fondo`: texto centrado/izq con heading + subtítulo + descripción
  - `ash__slide--caja`: texto + card visual a la derecha
- **Slides (3):**
  1. "80 años de historia / Unidad y compromiso" — solo texto
  2. "Centro de documentación / La Biblioteca documental" — solo texto
  3. "Seminario Nacional en Frutillar..." — card-style
- **Interacción:** auto-cycling + dots de navegación
- **Height:** 603px

## 3. NewsSection (.asm.asm-news)
- **Bg:** #E7EDF5, padding 60px 0 40px
- **Header:** "Noticias y Comunicados" h2 + "Ver todos →" link
- **Grid:** 3 columnas desktop, 1 mobile
- **NewsCard (.asm-card.asm-ncard):**
  - Imagen: background-image div (link a noticia), aspect-ratio ~16:9
  - Date span: #0C71C3 color
  - h3 con link
  - p excerpt
  - border-radius 16px, shadow, border 0.8px

## 4. QuickAccess (.asm.asm-acc)
- **Título:** "Encuentra más rápido lo que buscas"
- **Items:** Biblioteca, Convenios, Comunicados, Comisiones (4 botones/cards)
- **Estilo:** iconos + label, fondo claro

## 5. SocialWall (.asm.asm-muro)
- **Título:** "ASEMUCH en la web"
- **Subtítulo:** "Convenios, publicaciones y videos — dale ❤ a nuestras redes"
- **Contenido:** grid de posts Instagram/social media (masonry)
- **NOTA para ASEMUCH Coquimbo:** omitir por ahora, reemplazar por sección CTA

## 6. Footer (.asft)
- **Bg:** #0C2340 (navy dark)
- **Text:** #CDD8E6
- **3 columnas:**
  - Logo + descripción institucional
  - Links nav (¿Quiénes Somos?, Directorio, Biblioteca, Convenios, Comunicados, Tesorería)
  - Contacto (dirección, teléfono, email, redes sociales)
- **Copyright bar:** "© 2026 ASEMUCH | Curicó 176 | ..."
