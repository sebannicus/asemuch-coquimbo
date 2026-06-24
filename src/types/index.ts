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

export interface DirectivaMember {
  nombre: string;
  cargo: string;
  municipio: string;
  iniciales: string;
  color: string;
}

export interface Dictamen {
  id: number;
  numero: string;
  año: string;
  materia: string;
  organismo: string;
  categoria: string;
  href: string;
}

export interface Documento {
  id: number;
  tipo: string;
  numero: string;
  nombre: string;
  fecha: string;
  formato: string;
  href: string;
}
