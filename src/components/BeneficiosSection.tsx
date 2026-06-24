import Link from "next/link";

const BENEFICIOS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    titulo: "Asesoría legal gratuita",
    descripcion:
      "Acceso a orientación jurídica en materia de Estatuto Administrativo Municipal, licencias médicas, calificaciones y derechos laborales.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    titulo: "Representación gremial",
    descripcion:
      "Te representamos ante tu municipio, la Contraloría y organismos del Estado en materias laborales, administrativas y disciplinarias.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    titulo: "Capacitación permanente",
    descripcion:
      "Talleres, seminarios y cursos sobre derechos funcionarios, prevención, liderazgo y desarrollo profesional para todos los afiliados.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    titulo: "Red de convenios",
    descripcion:
      "Descuentos en salud, óptica, farmacia, capacitación y más, a través de convenios negociados colectivamente para afiliados y grupo familiar.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    titulo: "Negociación colectiva",
    descripcion:
      "Participamos activamente en la negociación de remuneraciones, beneficios y condiciones laborales a nivel municipal y regional.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    titulo: "Solidaridad en casos urgentes",
    descripcion:
      "Apoyo y acompañamiento a afiliados que enfrentan sumarios, desvinculaciones injustificadas o vulneraciones de sus derechos.",
  },
];

export default function BeneficiosSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest">¿Por qué afiliarte?</span>
            <h2
              className="mt-2 text-3xl font-extrabold text-[#0c2340]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Beneficios de ser parte de ASEMUCH
            </h2>
          </div>
          <Link
            href="/afiliarse"
            className="inline-flex items-center gap-2 shrink-0 px-6 py-3 rounded-xl bg-[#0c71c3] hover:bg-[#2ea3f2] text-white font-semibold text-sm transition-colors"
          >
            Afiliarme ahora
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFICIOS.map((b) => (
            <div
              key={b.titulo}
              className="flex gap-4 p-6 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-200"
              style={{ border: "0.8px solid #e3e9f1" }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#e7edf5] text-[#0c71c3] flex items-center justify-center shrink-0">
                {b.icon}
              </div>
              <div>
                <h3
                  className="font-bold text-[#0c2340] mb-1.5 leading-snug"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  {b.titulo}
                </h3>
                <p className="text-sm text-[#5d6675] leading-relaxed">{b.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
