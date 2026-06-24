export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NewsCard {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  href: string;
}

export interface HeroSlide {
  type: "fondo" | "caja";
  heading: string;
  subheading: string;
  description: string;
  href?: string;
  cta?: string;
  imageUrl?: string;
}
