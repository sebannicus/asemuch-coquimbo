import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { DIRECTIVA } from "@/components/SiteData";

export const metadata: Metadata = {
  title: "Directiva",
  description: "Conoce a la directiva de ASEMUCH Sede Región de Coquimbo, período 2024–2026.",
};

export default function DirectivaPage() {
  return (
    <main>
      <PageHeader
        title="Directiva Regional 2024–2026"
        subtitle="El equipo que representa y defiende a los funcionarios municipales de la Región de Coquimbo."
        breadcrumbs={[{ label: "Directiva" }]}
      />

      <section className="py-16 bg-white">
        <div className="container-site">
          {/* Aviso demo */}
          <div className="mb-10 flex items-start gap-3 p-4 rounded-xl bg-[#f5f9fc] border border-[#0c71c3]/20">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0c71c3" strokeWidth={2} className="w-5 h-5 shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm text-[#5d6675]">
              <strong className="text-[#0c2340]">Contenido de demostración.</strong> Los nombres y cargos mostrados son ficticios y se reemplazarán con la información real de la directiva antes del lanzamiento.
            </p>
          </div>

          {/* Grid directiva */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DIRECTIVA.map((miembro) => (
              <div
                key={miembro.nombre}
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4 transition-all hover:shadow-lg"
                style={{ border: "0.8px solid #e3e9f1", boxShadow: "rgba(12,35,64,0.06) 0px 2px 10px 0px" }}
              >
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-extrabold flex-shrink-0"
                  style={{ backgroundColor: miembro.color, fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  {miembro.iniciales}
                </div>

                {/* Info */}
                <div>
                  <p
                    className="font-bold text-[#0c2340] text-base leading-snug"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {miembro.nombre}
                  </p>
                  <p
                    className="mt-1 text-sm font-semibold text-[#0c71c3]"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {miembro.cargo}
                  </p>
                  <p className="mt-1 text-xs text-[#5d6675]">{miembro.municipio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Período */}
          <div className="mt-12 pt-8 border-t border-[#e3e9f1] text-center">
            <p className="text-sm text-[#5d6675]">
              Directiva electa para el período <strong className="text-[#0c2340]">2024 – 2026</strong>
              {" "}conforme a lo establecido en los estatutos de ASEMUCH.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
