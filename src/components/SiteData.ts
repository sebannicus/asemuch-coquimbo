import type { NavItem, NewsCard, HeroSlide, ConvenioDestacado } from "@/types";

// ─── Navegación ────────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Quiénes Somos", href: "/quienes-somos" },
  { label: "Directiva", href: "/directiva" },
  { label: "Noticias", href: "/noticias" },
  { label: "Convenios", href: "/convenios" },
  { label: "Comunicados", href: "/comunicados" },
  { label: "Documentos", href: "/documentos" },
  { label: "Contacto", href: "/contacto" },
  { label: "Afiliarse", href: "/afiliarse", highlight: true },
];

// ─── Hero slides ───────────────────────────────────────────────────────────────
export const HERO_SLIDES: HeroSlide[] = [
  {
    type: "fondo",
    heading: "Representando a los funcionarios municipales de la Municipalidad de Coquimbo",
    subheading: "ASEMUCH Coquimbo",
    description:
      "Defendemos los derechos laborales de los funcionarios municipales de Coquimbo, con más de 80 años de historia gremial afiliada a la Confederación Nacional ASEMUCH.",
    href: "/quienes-somos",
    cta: "Conócenos",
  },
  {
    type: "fondo",
    heading: "Accede a dictámenes, guías y documentos legales",
    subheading: "Centro de documentación regional",
    description:
      "Resoluciones de Contraloría, circulares, actas y guías prácticas sobre el Estatuto Municipal — organizados y buscables para ti.",
    href: "/documentos",
    cta: "Ir a Documentos",
  },
];

// ─── Estadísticas institucionales ─────────────────────────────────────────────
export const STATS = [
  { value: "+1.200", label: "Funcionarios afiliados" },
  { value: "15", label: "Comunas representadas" },
  { value: "+100", label: "Años de historia" },
  { value: "IV", label: "Región de Coquimbo" },
];

// ─── Accesos rápidos ───────────────────────────────────────────────────────────
export const QUICK_ACCESS_ITEMS = [
  {
    label: "Afiliarse",
    href: "/afiliarse",
    description: "Únete al gremio — es gratis",
    icon: "🤝",
  },
  {
    label: "Dictámenes",
    href: "/dictamenes",
    description: "Resoluciones de Contraloría",
    icon: "⚖️",
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

// ─── Convenios destacados ──────────────────────────────────────────────────────
// Nombres reales entregados por el cliente (2026-09-03). Detalle completo
// (direcciones, tarifas, contactos) extraído de documentos de convenio y
// capturas provistas por el cliente (2026-09-08). Solo Petrobras sigue
// infoPendiente:true — ASEMUCH Coquimbo debe confirmar % y puntos de venta.
export const CONVENIOS_DESTACADOS: ConvenioDestacado[] = [
  {
    id: "clinica-dental-jade",
    nombre: "Clínica Dental Jade",
    categoria: "Salud dental",
    icono: "🦷",
    beneficio: "Tarifas preferenciales en prestaciones dentales",
    descripcion:
      "Convenio de salud dental con Clínica Dental Jade para afiliadas, afiliados y su grupo familiar directo. Tarifas preferenciales en restauraciones, prótesis, coronas, limpiezas, endodoncias y exodoncias. Agenda tu hora directamente por WhatsApp.",
    colorAcento: "#0c71c3",
    direccion: "Av. El Libertador 1401, local 1614, La Serena",
    contacto: "Instagram @clinica_dental_jade — agenda de hora por WhatsApp",
  },
  {
    id: "rosa-agustina",
    nombre: "Resort Rosa Agustina",
    categoria: "Alojamiento All Inclusive",
    icono: "🏖️",
    beneficio: "10% de descuento en estadías All Inclusive",
    descripcion:
      "Convenio con Resort Rosa Agustina (Guanaqueros) para afiliadas y afiliados de ASEMUCH Coquimbo: 10% de descuento en la tarifa por persona en modalidad All Inclusive, en cualquiera de las categorías de habitación disponibles al momento de la reserva. No aplica en fines de semana largos, feriados nacionales ni fechas de temporada alta.",
    colorAcento: "#10498a",
    contacto:
      "Reservas con al menos 10 días hábiles de anticipación — Vicente Correa Juliet, vicente.correa@rosaagutina.cl, +56 9 9019 2132",
    tarifas: [
      { label: "Superior", valor: "$129.900 pp" },
      { label: "Superior Plus", valor: "$134.900 pp" },
      { label: "Suite", valor: "$139.900 pp" },
      { label: "Grand Superior", valor: "$149.900 pp" },
      { label: "Master Suite", valor: "$149.900 pp" },
      { label: "Niños 4–11 años", valor: "$39.900 pp" },
    ],
  },
  {
    id: "petrobras",
    nombre: "Petrobras",
    categoria: "Combustible",
    icono: "⛽",
    beneficio: "Descuento en estaciones de servicio",
    descripcion:
      "Convenio para descuento en combustible en estaciones de servicio Petrobras de la región. El porcentaje exacto y los puntos de venta adheridos serán confirmados por ASEMUCH Coquimbo próximamente.",
    colorAcento: "#0c2340",
    infoPendiente: true,
  },
  {
    id: "centro-oftalmologico-integral-del-norte",
    nombre: "Centro Oftalmológico Integral del Norte",
    categoria: "Salud visual",
    icono: "👁️",
    beneficio: "Programas de salud visual con tarifas preferenciales",
    descripcion:
      "Convenio de colaboración en salud visual con Centro Oftalmológico Integral del Norte para afiliadas, afiliados y sus cargas familiares directas: acceso preferencial a programas de detección de glaucoma y patologías retinianas, control visual infantil y descuento en lentes. Posibilidad de operativos en dependencias de ASEMUCH según planificación conjunta.",
    colorAcento: "#2ea3f2",
    direccion: "Dr. Marín 60, Clínica Imagen Salud, Coquimbo",
    contacto: "+56 9 2985 8495 — nidelcoin@gmail.com",
    tarifas: [
      { label: "Detección glaucoma y patologías retinianas (Fonasa)", valor: "$20.230" },
      { label: "Detección glaucoma y patologías retinianas (Particular)", valor: "$50.000" },
      { label: "Programa \"Ojos Jóvenes, Futuro Claro\" (4–18 años)", valor: "$25.000" },
      { label: "Descuento en lentes ópticos y de sol", valor: "15%" },
    ],
  },
  {
    id: "apart-hotel-plaza-centro",
    nombre: "Apart Hotel Plaza Centro",
    categoria: "Alojamiento en Santiago",
    icono: "🏨",
    beneficio: "Tarifa especial para socios en Santiago Centro",
    descripcion:
      "Convenio con Apart Hotel Plaza Centro S.A. para alojamiento en Santiago Centro, a pasos del Metro Bellas Artes y el Barrio Lastarrias, y cercano a clínicas y hospitales. Departamentos de uno y dos dormitorios, completamente equipados, con TV cable, wifi, lavandería y servicio de mucama.",
    colorAcento: "#3d7ab8",
    direccion:
      "Miraflores 455 (entre Merced y Monjitas) y Mosqueto 552 (entre Monjitas y Santo Domingo), Santiago Centro",
    contacto:
      "Nancy Pizarro H., Gerenta General — +56 9 9824 8609 / +56 9 7958 4672 / +56 9 7659 5683 — nancyp@apartplazacentro.cl — Oficina: Monjitas 527, of. 815, Santiago Centro (Lun a Vie, 9:30–16:00 hrs)",
    tarifas: [
      { label: "1 dormitorio, 1 baño (1–2 personas)", valor: "$50.000/día IVA incl." },
      { label: "2 dormitorios, 2 baños (hasta 4 personas)", valor: "$60.000/día IVA incl." },
    ],
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
// Fuente: Certificado N°404/2025/436 Dirección del Trabajo — período 31/03/2025–31/03/2027
export const DIRECTIVA = [
  {
    nombre: "Cristian Tapia Zepeda",
    cargo: "Presidente",
    municipio: "Municipalidad de Coquimbo",
    iniciales: "CT",
    color: "#0c71c3",
  },
  {
    nombre: "Rosa Elena Renney Rodríguez",
    cargo: "Tesorera",
    municipio: "Municipalidad de Coquimbo",
    iniciales: "RR",
    color: "#10498a",
  },
  {
    nombre: "José Montalván López",
    cargo: "Secretario",
    municipio: "Municipalidad de Coquimbo",
    iniciales: "JM",
    color: "#0c2340",
  },
];

// ─── Dictámenes ───────────────────────────────────────────────────────────────
// Los números son referenciales; cada href apunta a búsqueda en Contraloría CGR
const CGR = "https://www.contraloria.cl/dictamenes/busqueda";
export const DICTAMENES = [
  {
    id: 1,
    numero: "E123.456/2026",
    año: "2026",
    materia: "Asignación Municipal — Procedimiento de cálculo ante ausencia temporal del funcionario",
    organismo: "Municipio de Coquimbo",
    categoria: "Remuneraciones",
    href: CGR,
  },
  {
    id: 2,
    numero: "E087.432/2026",
    año: "2026",
    materia: "Horas extraordinarias del personal municipal a contrata — Límites y condiciones de pago",
    organismo: "Consulta general",
    categoria: "Remuneraciones",
    href: CGR,
  },
  {
    id: 3,
    numero: "E063.218/2025",
    año: "2025",
    materia: "Proceso de calificaciones: plazos, notificaciones y recursos del funcionario municipal",
    organismo: "Consulta general",
    categoria: "Calificaciones",
    href: CGR,
  },
  {
    id: 4,
    numero: "E045.891/2025",
    año: "2025",
    materia: "Inamovilidad funcionaria y causales de cese en cargo municipal — Estatuto art. 89",
    organismo: "Consulta general",
    categoria: "Carrera Funcionaria",
    href: CGR,
  },
  {
    id: 5,
    numero: "E029.734/2024",
    año: "2024",
    materia: "Feriado legal en municipalidades — Cómputo de días hábiles y derecho a descanso",
    organismo: "Consulta general",
    categoria: "Derechos",
    href: CGR,
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
  nombre: "ASEMUCH — Asociación Comunal de Funcionarios Municipales de Coquimbo",
  direccion: "Varela 1090, Coquimbo",
  region: "IV Región de Coquimbo, Chile",
  telefono: "+56 9 9189 9920",
  email: "coquimbo.asemuch@gmail.com",
  horario: "Lunes a Viernes, 09:00 – 17:30 hrs.",
  facebook: "https://www.facebook.com/asemuch.cl",
  instagram: "https://www.instagram.com/asemuchchileoficial/",
  mapsUrl: "https://maps.google.com/?q=Varela+1090,+Coquimbo,+Chile",
};
