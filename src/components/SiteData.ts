import type { NavItem, NewsCard, HeroSlide } from "@/types";

// ─── Navegación ────────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Quiénes Somos", href: "/quienes-somos" },
  { label: "Directiva", href: "/directiva" },
  { label: "Noticias", href: "/noticias" },
  { label: "Dictámenes", href: "/dictamenes" },
  { label: "Documentos", href: "/documentos" },
  { label: "Contacto", href: "/contacto" },
];

// ─── Hero slides ───────────────────────────────────────────────────────────────
export const HERO_SLIDES: HeroSlide[] = [
  {
    type: "fondo",
    heading: "Representando a los funcionarios municipales de la Región de Coquimbo",
    subheading: "ASEMUCH Coquimbo — Sede Regional",
    description:
      "Defendemos los derechos laborales de más de 1.200 funcionarios municipales en las 15 comunas de la región, con más de 80 años de historia gremial.",
    href: "/quienes-somos",
    cta: "Conócenos",
  },
  {
    type: "fondo",
    heading: "Accede a dictámenes, guías y documentos legales",
    subheading: "Centro de documentación regional",
    description:
      "Resoluciones de Contraloría, circulares, actas y guías prácticas sobre el Estatuto Municipal — organizados y buscables para ti.",
    href: "/dictamenes",
    cta: "Ir a Dictámenes",
  },
  {
    type: "caja",
    heading: "Tu directiva regional trabaja por ti",
    subheading: "Directiva ASEMUCH Coquimbo 2024–2026",
    description:
      "Un equipo comprometido con la representación y defensa de todos los funcionarios municipales de la Región de Coquimbo.",
    href: "/directiva",
    cta: "Conoce a la directiva",
  },
];

// ─── Estadísticas institucionales ─────────────────────────────────────────────
export const STATS = [
  { value: "+1.200", label: "Funcionarios afiliados" },
  { value: "15", label: "Comunas representadas" },
  { value: "80", label: "Años de historia" },
  { value: "IV", label: "Región de Coquimbo" },
];

// ─── Accesos rápidos ───────────────────────────────────────────────────────────
export const QUICK_ACCESS_ITEMS = [
  {
    label: "Dictámenes",
    href: "/dictamenes",
    description: "Resoluciones de Contraloría",
    icon: "⚖️",
  },
  {
    label: "Noticias",
    href: "/noticias",
    description: "Últimas novedades regionales",
    icon: "📰",
  },
  {
    label: "Documentos",
    href: "/documentos",
    description: "Circulares, actas y guías",
    icon: "📄",
  },
  {
    label: "Contacto",
    href: "/contacto",
    description: "Comunícate con nosotros",
    icon: "✉️",
  },
];

// ─── Noticias ─────────────────────────────────────────────────────────────────
export const NEWS_CARDS: NewsCard[] = [
  {
    id: 1,
    date: "20/06/2026",
    title: "ASEMUCH Coquimbo se reúne con alcaldes de la región para presentar agenda laboral 2026",
    excerpt:
      "La directiva regional sostuvo una reunión con los alcaldes de La Serena, Coquimbo y Ovalle para exponer las demandas laborales de los funcionarios municipales y establecer una hoja de ruta para el segundo semestre.",
    imageUrl: "https://picsum.photos/seed/asemuch1/768/432",
    href: "/noticias/reunion-alcaldes-agenda-laboral-2026",
  },
  {
    id: 2,
    date: "15/06/2026",
    title: "Exitoso taller de capacitación sobre Estatuto Administrativo Municipal en La Serena",
    excerpt:
      "Más de 80 funcionarios participaron en el taller sobre derechos y obligaciones según el Estatuto Municipal, dictado por la abogada especialista Claudia Herrera. El próximo módulo se realizará en Ovalle.",
    imageUrl: "https://picsum.photos/seed/asemuch2/768/432",
    href: "/noticias/taller-estatuto-administrativo-la-serena",
  },
  {
    id: 3,
    date: "10/06/2026",
    title: "ASEMUCH Coquimbo informa sobre aplicación del bono zona territorial en municipios de la región",
    excerpt:
      "La presidencia regional emite comunicado aclarando los criterios para la aplicación del bono de zona territorial en los municipios de la IV Región, en respuesta a consultas de afiliados.",
    imageUrl: "https://picsum.photos/seed/asemuch3/768/432",
    href: "/noticias/bono-zona-territorial-municipios-coquimbo",
  },
  {
    id: 4,
    date: "05/06/2026",
    title: "Asamblea ordinaria junio 2026: acuerdos adoptados y próximos pasos",
    excerpt:
      "La asamblea ordinaria del mes de junio contó con la participación de representantes de 11 comunas. Se aprobaron los estados financieros y se establecieron las prioridades para el segundo semestre 2026.",
    imageUrl: "https://picsum.photos/seed/asemuch4/768/432",
    href: "/noticias/asamblea-ordinaria-junio-2026",
  },
  {
    id: 5,
    date: "01/06/2026",
    title: "Comunicado oficial: proceso de calificaciones municipales 2026",
    excerpt:
      "ASEMUCH Coquimbo recuerda a los afiliados los plazos y procedimientos para el proceso de calificaciones 2026, instando a los funcionarios a conocer sus derechos en esta materia.",
    imageUrl: "https://picsum.photos/seed/asemuch5/768/432",
    href: "/noticias/proceso-calificaciones-municipales-2026",
  },
  {
    id: 6,
    date: "25/05/2026",
    title: "Nuevo convenio de salud: beneficios extendidos para afiliados y grupo familiar",
    excerpt:
      "ASEMUCH Coquimbo firma convenio con red de clínicas y laboratorios de la región, ofreciendo descuentos de hasta 40% en prestaciones de salud para afiliados y su grupo familiar directo.",
    imageUrl: "https://picsum.photos/seed/asemuch6/768/432",
    href: "/noticias/convenio-salud-afiliados-region-coquimbo",
  },
];

// ─── Directiva ────────────────────────────────────────────────────────────────
export const DIRECTIVA = [
  {
    nombre: "Carlos Andrés Muñoz Vera",
    cargo: "Presidente Regional",
    municipio: "Municipalidad de La Serena",
    iniciales: "CM",
    color: "#0c71c3",
  },
  {
    nombre: "María Elena Soto Gutiérrez",
    cargo: "Vicepresidenta",
    municipio: "Municipalidad de Coquimbo",
    iniciales: "MS",
    color: "#10498a",
  },
  {
    nombre: "Ana Patricia López Ríos",
    cargo: "Secretaria General",
    municipio: "Municipalidad de Ovalle",
    iniciales: "AL",
    color: "#0c71c3",
  },
  {
    nombre: "Ricardo Eduardo Fuentes Díaz",
    cargo: "Tesorero",
    municipio: "Municipalidad de La Serena",
    iniciales: "RF",
    color: "#10498a",
  },
  {
    nombre: "Pedro José Villalobos Castro",
    cargo: "Director",
    municipio: "Municipalidad de Illapel",
    iniciales: "PV",
    color: "#0c2340",
  },
  {
    nombre: "Carmen Rosa González Palma",
    cargo: "Directora",
    municipio: "Municipalidad de La Serena",
    iniciales: "CG",
    color: "#0c71c3",
  },
  {
    nombre: "Jorge Luis Alfaro Medina",
    cargo: "Director",
    municipio: "Municipalidad de Coquimbo",
    iniciales: "JA",
    color: "#10498a",
  },
];

// ─── Dictámenes ───────────────────────────────────────────────────────────────
export const DICTAMENES = [
  {
    id: 1,
    numero: "E123.456/2026",
    año: "2026",
    materia: "Asignación Municipal — Procedimiento de cálculo ante ausencia temporal del funcionario",
    organismo: "Municipio de La Serena",
    categoria: "Remuneraciones",
    href: "#",
  },
  {
    id: 2,
    numero: "E087.432/2026",
    año: "2026",
    materia: "Horas extraordinarias del personal municipal a contrata — Límites y condiciones de pago",
    organismo: "Consulta general",
    categoria: "Remuneraciones",
    href: "#",
  },
  {
    id: 3,
    numero: "E063.218/2025",
    año: "2025",
    materia: "Proceso de calificaciones: plazos, notificaciones y recursos del funcionario municipal",
    organismo: "Consulta general",
    categoria: "Calificaciones",
    href: "#",
  },
  {
    id: 4,
    numero: "E045.891/2025",
    año: "2025",
    materia: "Inamovilidad funcionaria y causales de cese en cargo municipal — Estatuto art. 89",
    organismo: "Consulta general",
    categoria: "Carrera Funcionaria",
    href: "#",
  },
  {
    id: 5,
    numero: "E029.734/2024",
    año: "2024",
    materia: "Feriado legal en municipalidades — Cómputo de días hábiles y derecho a descanso",
    organismo: "Consulta general",
    categoria: "Derechos",
    href: "#",
  },
];

// ─── Documentos ───────────────────────────────────────────────────────────────
export const DOCUMENTOS = [
  {
    id: 1,
    tipo: "Circular",
    numero: "N°14/2026",
    nombre: "Procedimiento interno para tramitación de licencias médicas",
    fecha: "18/06/2026",
    formato: "PDF",
    href: "#",
  },
  {
    id: 2,
    tipo: "Resolución",
    numero: "N°7/2026",
    nombre: "Aprobación presupuesto anual ASEMUCH Región de Coquimbo 2026",
    fecha: "02/06/2026",
    formato: "PDF",
    href: "#",
  },
  {
    id: 3,
    tipo: "Acta",
    numero: "Mayo 2026",
    nombre: "Acta Asamblea Ordinaria — Mayo 2026",
    fecha: "30/05/2026",
    formato: "PDF",
    href: "#",
  },
  {
    id: 4,
    tipo: "Guía",
    numero: "Ed. 2026",
    nombre: "Derechos y obligaciones del funcionario municipal — Guía práctica 2026",
    fecha: "15/05/2026",
    formato: "PDF",
    href: "#",
  },
  {
    id: 5,
    tipo: "Convenio",
    numero: "CENABAST 2026",
    nombre: "Convenio de acceso a medicamentos con descuento para afiliados y grupo familiar",
    fecha: "10/04/2026",
    formato: "PDF",
    href: "#",
  },
];

// ─── Contacto ─────────────────────────────────────────────────────────────────
export const CONTACT_INFO = {
  nombre: "ASEMUCH — Sede Región de Coquimbo",
  direccion: "Los Carrera 199, Piso 2, La Serena",
  region: "IV Región de Coquimbo, Chile",
  telefono: "+56 51 2 213 456",
  email: "coquimbo@asemuch.cl",
  horario: "Lunes a Viernes, 09:00 – 17:30 hrs.",
  facebook: "https://www.facebook.com/asemuch.cl",
  instagram: "https://www.instagram.com/asemuchchileoficial/",
  mapsUrl: "https://maps.google.com/?q=Los+Carrera+199,+La+Serena,+Chile",
};
