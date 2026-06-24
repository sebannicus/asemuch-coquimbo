import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { DICTAMENES } from "@/components/SiteData";

export const metadata: Metadata = {
  title: "Dictámenes",
  description: "Resoluciones y dictámenes de Contraloría General de la República relevantes para funcionarios municipales.",
};

const CATEGORIAS = ["Todos", "Remuneraciones", "Calificaciones", "Carrera Funcionaria", "Derechos"];

export default function DictamenesPage() {
  return (
    <main>
      <PageHeader
        title="Dictámenes de Contraloría"
        subtitle="Resoluciones y pronunciamientos de la Contraloría General de la República relevantes para los funcionarios municipales de la región."
        breadcrumbs={[{ label: "Dictámenes" }]}
      />

      <section className="py-16 bg-white">
        <div className="container-site">
          {/* Aviso demo */}
          <div className="mb-8 flex items-start gap-3 p-4 rounded-xl bg-[#f5f9fc] border border-[#0c71c3]/20">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0c71c3" strokeWidth={2} className="w-5 h-5 shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm text-[#5d6675]">
              <strong className="text-[#0c2340]">Contenido de demostración.</strong>{" "}
              En la versión definitiva, este módulo permitirá buscar y filtrar dictámenes en tiempo real desde una base de datos administrable.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIAS.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-colors ${
                  cat === "Todos"
                    ? "bg-[#0c71c3] text-white"
                    : "bg-[#f5f9fc] text-[#5d6675] border border-[#e3e9f1] hover:border-[#0c71c3] hover:text-[#0c71c3]"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#e3e9f1]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f5f9fc] border-b border-[#e3e9f1]">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-[#0c2340] uppercase tracking-wider">
                    N° Dictamen
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-[#0c2340] uppercase tracking-wider">
                    Materia
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-[#0c2340] uppercase tracking-wider hidden md:table-cell">
                    Categoría
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-[#0c2340] uppercase tracking-wider hidden lg:table-cell">
                    Año
                  </th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e3e9f1]">
                {DICTAMENES.map((d, i) => (
                  <tr
                    key={d.id}
                    className={`transition-colors hover:bg-[#f5f9fc] ${i % 2 === 0 ? "bg-white" : "bg-[#fafbfd]"}`}
                  >
                    <td className="px-5 py-4 font-mono font-semibold text-[#0c71c3] whitespace-nowrap">
                      {d.numero}
                    </td>
                    <td className="px-5 py-4 text-[#0c2340] max-w-xs">
                      <p className="font-medium leading-snug">{d.materia}</p>
                      <p className="text-xs text-[#5d6675] mt-0.5">{d.organismo}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#e7edf5] text-[#0c2340]">
                        {d.categoria}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-[#5d6675] font-medium">
                      {d.año}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <a
                        href={d.href}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0c71c3] hover:text-[#2ea3f2] transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Ver
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
