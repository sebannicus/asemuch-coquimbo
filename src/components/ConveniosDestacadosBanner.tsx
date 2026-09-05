"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CONVENIOS_DESTACADOS } from "./SiteData";

export default function ConveniosDestacadosBanner() {
  const [current, setCurrent] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const total = CONVENIOS_DESTACADOS.length;
  const convenio = CONVENIOS_DESTACADOS[current];

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    if (detailOpen) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, detailOpen]);

  useEffect(() => {
    if (!detailOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDetailOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [detailOpen]);

  return (
    <section className="bg-white py-10" aria-label="Convenios destacados para socios ASEMUCH Coquimbo">
      <div className="container-site">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c71c3]/10 border border-[#0c71c3]/20 text-[#0c71c3] text-xs font-bold uppercase tracking-widest">
            ★ Beneficios exclusivos
          </span>
        </div>
        <h2
          className="text-xl lg:text-2xl font-extrabold text-[#0c2340] mb-1.5"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          Convenios destacados para socios
        </h2>
        <p className="text-[#5d6675] text-sm max-w-2xl mb-8">
          Descuentos y beneficios negociados por ASEMUCH Coquimbo. Haz clic para ver el detalle.
        </p>

        {/* Spotlight — un convenio a la vez */}
        <div className="relative flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrent((c) => (c - 1 + total) % total)}
            aria-label="Convenio anterior"
            className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-[#f5f9fc] border border-[#e3e9f1] hover:bg-[#0c71c3]/10 items-center justify-center text-[#0c71c3] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setDetailOpen(true)}
            aria-label={`Ver detalle del convenio ${convenio.nombre}`}
            className="group flex-1 text-left rounded-2xl border-2 border-[#0c71c3]/20 bg-[#f5f9fc] p-6 flex items-center gap-5 hover:border-[#0c71c3]/50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0c71c3]"
          >
            <div
              className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300"
              style={{ backgroundColor: `${convenio.colorAcento}1a` }}
              aria-hidden="true"
              key={`icon-${convenio.id}`}
            >
              {convenio.icono}
            </div>
            <div className="min-w-0 flex-1" key={`text-${convenio.id}`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0c71c3] mb-1">
                {convenio.categoria}
              </p>
              <h3 className="text-base lg:text-lg font-bold text-[#0c2340] leading-snug mb-1">{convenio.nombre}</h3>
              <p className="text-sm text-[#5d6675] leading-relaxed">{convenio.beneficio}</p>
            </div>
            <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#0c71c3] group-hover:text-[#2ea3f2] transition-colors">
              Ver detalle
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Siguiente convenio"
            className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-[#f5f9fc] border border-[#e3e9f1] hover:bg-[#0c71c3]/10 items-center justify-center text-[#0c71c3] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {CONVENIOS_DESTACADOS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setCurrent(i)}
              aria-label={`Ir al convenio ${c.nombre}`}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-8 h-2.5 bg-[#0c71c3]" : "w-2.5 h-2.5 bg-[#e3e9f1] hover:bg-[#0c71c3]/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal de detalle */}
      {detailOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="convenio-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#0c2340]/70 backdrop-blur-sm"
            aria-label="Cerrar"
            onClick={() => setDetailOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 motion-enter">
            <button
              type="button"
              onClick={() => setDetailOpen(false)}
              aria-label="Cerrar detalle del convenio"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#5d6675] hover:bg-[#f5f9fc] hover:text-[#0c2340] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4"
              style={{ backgroundColor: `${convenio.colorAcento}1a` }}
              aria-hidden="true"
            >
              {convenio.icono}
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3] mb-1">
              {convenio.categoria}
            </p>
            <h3
              id="convenio-modal-title"
              className="text-lg font-bold text-[#0c2340] mb-3"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              {convenio.nombre}
            </h3>
            <p className="text-sm text-[#5d6675] leading-relaxed mb-4">{convenio.descripcion}</p>

            {convenio.infoPendiente && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={2} className="w-4 h-4 shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Convenio confirmado, condiciones en proceso de actualización. Consulta con ASEMUCH Coquimbo para conocer el detalle vigente.
                </p>
              </div>
            )}

            <Link
              href="/contacto"
              onClick={() => setDetailOpen(false)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0c71c3] hover:text-[#2ea3f2] transition-colors"
            >
              Consultar por este convenio
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
