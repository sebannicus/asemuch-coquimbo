import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description: "Conoce la historia, misión y visión de ASEMUCH Sede Región de Coquimbo.",
};

const VALORES = [
  { titulo: "Solidaridad", descripcion: "Actuamos de manera colectiva, apoyando a cada funcionario en sus necesidades y derechos." },
  { titulo: "Transparencia", descripcion: "Gestionamos los recursos y decisiones con honestidad y rendición de cuentas a nuestros afiliados." },
  { titulo: "Defensa Gremial", descripcion: "Representamos activamente los intereses laborales ante municipios y organismos del Estado." },
  { titulo: "Capacitación", descripcion: "Promovemos la formación permanente para fortalecer el desempeño y los derechos del funcionario." },
];

export default function QuienesSomosPage() {
  return (
    <main>
      <PageHeader
        title="Quiénes Somos"
        subtitle="Conoce nuestra historia, misión y los valores que guían nuestra labor gremial en la Región de Coquimbo."
        breadcrumbs={[{ label: "Quiénes Somos" }]}
      />

      {/* Historia */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest">Historia</span>
            <h2
              className="mt-2 text-3xl font-extrabold text-[#0c2340]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Más de 80 años representando a los funcionarios municipales
            </h2>
            <div className="mt-6 prose prose-sm max-w-none text-[#5d6675] space-y-4">
              <p>
                ASEMUCH — Asociación de Empleados Municipales — fue fundada en 1946 como organización nacional para
                defender los derechos de los trabajadores de las municipalidades de Chile. Desde sus inicios, la
                organización ha luchado por mejores condiciones laborales, estabilidad funcionaria y el reconocimiento
                del trabajo municipal como servicio esencial para la comunidad.
              </p>
              <p>
                La <strong>Sede Regional de Coquimbo</strong> representa a los funcionarios municipales de las
                15 comunas de la IV Región, desde Illapel y Los Vilos en el sur, hasta La Higuera en el norte.
                Nuestra sede trabaja de manera coordinada con la Confederación Nacional, adaptando las políticas
                gremiales a las realidades específicas de los municipios de la región.
              </p>
              <p>
                A lo largo de los años, hemos logrado avances concretos: mejoras salariales, estabilidad en la
                carrera funcionaria, acceso a capacitación y la incorporación de derechos laborales específicos
                para el sector municipal en el marco del Estatuto Administrativo Municipal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16" style={{ backgroundColor: "#e7edf5" }}>
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-2xl p-8"
              style={{ border: "0.8px solid #e3e9f1", boxShadow: "rgba(12,35,64,0.06) 0px 2px 10px 0px" }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#0c71c3] flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0c2340] mb-3" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                Nuestra Misión
              </h3>
              <p className="text-[#5d6675] leading-relaxed">
                Representar, defender y promover los derechos e intereses laborales de los funcionarios
                municipales de la Región de Coquimbo, actuando como interlocutor válido ante los municipios,
                el Estado y los organismos competentes, fomentando la unidad gremial y el desarrollo
                profesional de sus afiliados.
              </p>
            </div>
            <div
              className="bg-white rounded-2xl p-8"
              style={{ border: "0.8px solid #e3e9f1", boxShadow: "rgba(12,35,64,0.06) 0px 2px 10px 0px" }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#0c2340] flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-6 h-6">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0c2340] mb-3" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                Nuestra Visión
              </h3>
              <p className="text-[#5d6675] leading-relaxed">
                Ser una organización gremial referente en la Región de Coquimbo, reconocida por su capacidad
                de diálogo, su gestión transparente y su efectiva defensa de los derechos de los funcionarios
                municipales, contribuyendo al fortalecimiento del servicio público local y al bienestar de
                sus afiliados y sus familias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <h2
            className="text-2xl font-extrabold text-[#0c2340] mb-10"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Nuestros valores
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALORES.map((v) => (
              <div key={v.titulo} className="flex flex-col gap-3">
                <div className="w-1 h-8 bg-[#0c71c3] rounded-full" />
                <h3 className="font-bold text-[#0c2340]" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                  {v.titulo}
                </h3>
                <p className="text-sm text-[#5d6675] leading-relaxed">{v.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
