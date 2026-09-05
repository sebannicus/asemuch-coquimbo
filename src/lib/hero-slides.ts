export type HeroSlide = {
  alt: string;
  src: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: "/images/asemuch-junto-a-achs.webp",
    alt: "ASEMUCH Coquimbo junto a ACHS en actividad gremial",
  },
  {
    src: "/images/asemuch-junto-a-la-cut-y-hero.webp",
    alt: "ASEMUCH Coquimbo junto a la CUT en actividad gremial",
  },
  {
    src: "/images/junto-a-asemuch-nacional-y-hero.webp",
    alt: "Dirigentes de ASEMUCH Coquimbo en una actividad gremial",
  },
  {
    src: "/images/logo.png",
    alt: "ASEMUCH Coquimbo",
  },
];

export function getNextSlideIndex(currentIndex: number, totalSlides: number) {
  return totalSlides === 0 ? 0 : (currentIndex + 1) % totalSlides;
}
