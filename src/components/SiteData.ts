import type { NavItem, NewsCard, HeroSlide } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "La Asemuch",
    href: "/inicio",
    children: [
      { label: "¿Quiénes Somos?", href: "/quienes-somos" },
      { label: "Directorio Nacional", href: "/directorio-nacional" },
      { label: "Historia", href: "/breve-historia" },
      { label: "Estatutos", href: "/estatutos" },
    ],
  },
  { label: "Noticias", href: "/noticias" },
  { label: "Comunicados", href: "/comunicados" },
  { label: "Convenios", href: "/convenios" },
  {
    label: "Biblioteca",
    href: "/biblioteca",
    children: [
      { label: "Buscador", href: "/biblioteca/buscador" },
      { label: "Dictámenes", href: "/biblioteca/dictamenes" },
      { label: "Guías", href: "/biblioteca/guias" },
      { label: "Leyes", href: "/leyes" },
      { label: "Manuales", href: "/manuales" },
    ],
  },
  { label: "Tesorería", href: "/tesoreria" },
  {
    label: "Comisiones",
    href: "#",
    children: [
      { label: "Difusión y Comunicaciones", href: "/comision-difusion-y-comunicaciones" },
      { label: "Capacitación y Formación Gremial", href: "/comision-de-capacitacion-y-formacion-gremial" },
      { label: "Negociación y Asuntos Laborales", href: "/comision-de-negociacion-y-asuntos-laborales" },
      { label: "Cultura, Deporte y Recreación", href: "/comision-cultura-deporte-y-recreacion" },
      { label: "Estudios Técnicos", href: "/comision-de-estudios-tecnicos" },
      { label: "Asuntos de la Mujer", href: "/comision-asuntos-de-la-mujer" },
      { label: "Higiene y Seguridad", href: "/comision-higiene-y-seguridad" },
      { label: "Bienestar Social y Salud", href: "/comision-bienestar-social-y-salud" },
      { label: "Previsión Social", href: "/comision-prevision-social" },
    ],
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    type: "fondo",
    heading: "80 años de historia",
    subheading: "Unidad y compromiso con los municipales de Chile",
    description:
      "Confederación Nacional de Funcionarios Municipales de Chile. Defendemos tus derechos desde 1946.",
    href: "/quienes-somos",
    cta: "Conoce nuestra historia",
  },
  {
    type: "fondo",
    heading: "Centro de documentación",
    subheading: "La Biblioteca documental, ahora buscable",
    description:
      "Dictámenes de Contraloría, leyes, guías y manuales — filtrables por materia y año, en un solo lugar.",
    href: "/biblioteca/buscador",
    cta: "Ir a la Biblioteca",
  },
  {
    type: "caja",
    heading: "Convenios, capacitación y asesoría para ti",
    subheading: "Seminario Nacional en Frutillar sobre Modernización y Probidad Municipal",
    description:
      "Participación, formación y defensa funcionaria en todo Chile.",
    href: "/convenios",
    cta: "Ver convenios",
  },
];

export const NEWS_CARDS: NewsCard[] = [
  {
    id: 1,
    date: "16/06/2026",
    title: "ASEMUCH Chile se reúne con Seremi del Trabajo de la Región Metropolitana",
    excerpt:
      "Reunión clave con la Seremi del Trabajo para abordar las condiciones laborales de los funcionarios municipales.",
    imageUrl: "https://asemuch.cl/wp-content/uploads/2026/06/asemuch15-768x576.jpg",
    href: "/noticias/asemuch-chile-se-reune-con-seremi-del-trabajo",
  },
  {
    id: 2,
    date: "16/06/2026",
    title: "Invitación Taller ASEMUCH «PLANTAS MUNICIPALES» 18-06-2026",
    excerpt:
      "La Confederación Nacional de Funcionarios Municipales de Chile invita a participar en este taller.",
    imageUrl: "https://asemuch.cl/wp-content/uploads/2026/06/Taller1-768x464.jpg",
    href: "/noticias/invitacion-taller-asemuch-plantas-municipales",
  },
  {
    id: 3,
    date: "11/06/2026",
    title: "Comunicado Público ASEMUCH N°17 del 10-06-2026 — Bases Campeonato de Cueca 2026",
    excerpt:
      "ASEMUCH comunica las bases oficiales del Campeonato de Cueca 2026 para todos sus asociados.",
    imageUrl: "https://asemuch.cl/wp-content/uploads/2026/06/com17-768x268.png",
    href: "/comunicados/comunicado-publico-asemuch-n17",
  },
  {
    id: 4,
    date: "08/06/2026",
    title: "ASEMUCH anuncia el 3er módulo presencial del Seminario Nacional",
    excerpt:
      "Tercer módulo del Seminario Nacional de Gestión Estratégica, Probidad y Defensa Funcionaria.",
    imageUrl: "https://asemuch.cl/wp-content/uploads/2026/06/asemuch15-768x576.jpg",
    href: "/noticias/asemuch-anuncia-tercer-modulo-seminario-nacional",
  },
  {
    id: 5,
    date: "05/06/2026",
    title: "Fortaleciendo la Defensa Funcionaria en las Municipalidades de Chile",
    excerpt:
      "ASEMUCH continúa su trabajo de representación y defensa de los derechos laborales municipales.",
    imageUrl: "https://asemuch.cl/wp-content/uploads/2026/06/Taller1-768x464.jpg",
    href: "/noticias/fortaleciendo-defensa-funcionaria",
  },
  {
    id: 6,
    date: "04/06/2026",
    title: "Comunicado Público ASEMUCH N°16 de 2026",
    excerpt:
      "Comunicado oficial de la Confederación Nacional sobre materias de interés gremial.",
    imageUrl: "https://asemuch.cl/wp-content/uploads/2026/06/com17-768x268.png",
    href: "/comunicados/comunicado-publico-asemuch-n16",
  },
];

export const QUICK_ACCESS_ITEMS = [
  {
    label: "Biblioteca",
    href: "/biblioteca/buscador",
    description: "Dictámenes, guías y leyes",
    icon: "📚",
  },
  {
    label: "Convenios",
    href: "/convenios",
    description: "Beneficios para afiliados",
    icon: "🤝",
  },
  {
    label: "Comunicados",
    href: "/comunicados",
    description: "Posiciones oficiales",
    icon: "📢",
  },
  {
    label: "Comisiones",
    href: "/comision-difusion-y-comunicaciones",
    description: "Áreas de trabajo gremial",
    icon: "👥",
  },
];
