export type HeroSlide = {
  alt: string;
  src: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: "/images/foto-hero-asemuch-coquimbo-reunion-funcionarios.webp",
    alt: "Funcionarios municipales de Coquimbo en una actividad de ASEMUCH Coquimbo",
  },
  {
    src: "/images/reunion-asemuch-funcionarios.webp",
    alt: "Reunión de funcionarios municipales de Coquimbo",
  },
  {
    src: "/images/junto-a-asemuch-nacional-y-hero.webp",
    alt: "Dirigentes de ASEMUCH Coquimbo en una actividad gremial",
  },
];

export function getNextSlideIndex(currentIndex: number, totalSlides: number) {
  return totalSlides === 0 ? 0 : (currentIndex + 1) % totalSlides;
}
