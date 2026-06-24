import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { DOCUMENTOS } from "@/components/SiteData";

export const metadata: Metadata = {
  title: "Documentos",
  description: "Circulares, resoluciones, actas y guías de ASEMUCH Región de Coquimbo.",
};

const TIPO_COLORS: Record<string, string> = {
  Circular: "bg-blue-50 text-blue-700",
  Resolución: "bg-purple-50 text-purple-700",
  Acta: "bg-green-50 text-green-700",
  Guía: "bg-amber-50 text-amber-700",
  Convenio: "bg-teal-50 text-teal-700",
};

export default function DocumentosPage() {
  return (
    <main>
      <PageHeader
        title="Documentos"
        subtitle="Circulares, resoluciones, actas y guías emitidas por ASEMUCH Sede Región de Coquimbo."
        breadcrumbs={[{ label: "Documentos" }]}
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
              En la versión definitiva, este módulo permitirá subir, categorizar y descargar documentos desde un panel administrativo.
            </p>
          </div>

          {/* Document list */}
          <div className="flex flex-col gap-3">
            {DOCUMENTOS.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl transition-all hover:shadow-md hover:border-[#0c71c3]/30"
                style={{ border: "0.8px solid #e3e9f1" }}
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-[#e7edf5] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0c71c3" strokeWidth={2} className="w-5 h-5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${TIPO_COLORS[doc.tipo] ?? "bg-gray-100 text-gray-600"}`}>
                      {doc.tipo} {doc.numero}
                    </span>
                    <span className="text-xs text-[#5d6675]">{doc.fecha}</span>
                  </div>
                  <p
                    className="font-semibold text-[#0c2340] text-sm leading-snug truncate"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {doc.nombre}
                  </p>
                </div>

                {/* Download button */}
                <a
                  href={doc.href}
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e7edf5] hover:bg-[#0c71c3] hover:text-white text-[#0c2340] text-xs font-semibold transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {doc.formato}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
