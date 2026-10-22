import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Dictámenes",
  description: "Acceso al buscador oficial de dictámenes de la Contraloría General de la República y dictámenes publicados por ASEMUCH Nacional.",
  alternates: { canonical: "/dictamenes" },
};

const CGR_SEARCH_URL = "https://www.contraloria.cl/dictamenes/busqueda";

// Temas frecuentes para orientar la búsqueda en el portal oficial (no son dictámenes).
const SUGERENCIAS = [
  "Asignación municipal",
  "Calificaciones funcionarios municipales",
  "Feriado legal",
  "Carrera funcionaria",
  "Sumario administrativo",
  "Horas extraordinarias",
];

export default function DictamenesPage() {
  return (
    <main>
      <PageHeader
        title="Dictámenes de Contraloría"
        subtitle="Resoluciones y pronunciamientos de la Contraloría General de la República relevantes para los funcionarios municipales."
        breadcrumbs={[{ label: "Dictámenes" }]}
      />

      <section className="py-12 bg-white">
        <div className="container-site grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-[#e3e9f1] bg-[#f5f9fc] p-6 sm:p-8">
            <span className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest">Fuente oficial</span>
            <h2
              className="mt-2 text-2xl font-extrabold text-[#0c2340]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Buscador de dictámenes de la Contraloría
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5d6675]">
              La Contraloría General de la República publica todos sus dictámenes en su portal oficial. Puedes buscarlos por
              número, fecha o palabras clave relacionadas con tu consulta.
            </p>
            <a
              href={CGR_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0c71c3] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2ea3f2]"
            >
              Ir al buscador oficial de la Contraloría
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            <p className="mt-8 text-sm font-semibold text-[#0c2340]">Temas que puedes buscar:</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SUGERENCIAS.map((tema) => (
                <li key={tema} className="rounded-full border border-[#e3e9f1] bg-white px-3 py-1 text-xs font-semibold text-[#5d6675]">
                  {tema}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#e3e9f1] bg-white p-6 sm:p-8">
            <span className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest">ASEMUCH Nacional</span>
            <h2
              className="mt-2 text-xl font-extrabold text-[#0c2340]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Dictámenes publicados por la Confederación
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5d6675]">
              Revisa los dictámenes que ASEMUCH Nacional ha destacado para los funcionarios municipales.
            </p>
            <Link
              href="/documentos#dictamenes"
              className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#0c71c3] hover:text-[#2ea3f2]"
            >
              Ver dictámenes en Documentos →
            </Link>
            <p className="mt-6 text-xs leading-relaxed text-[#5d6675]">
              ¿Tienes dudas sobre un dictamen? Escríbenos desde{" "}
              <Link href="/contacto" className="font-semibold text-[#0c71c3] hover:underline">
                Contacto
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
