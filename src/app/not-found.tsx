import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o fue movida.",
};

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-24 bg-white">
      <div className="container-site text-center max-w-xl">
        {/* Shield icon */}
        <div className="w-20 h-20 rounded-2xl bg-[#e7edf5] flex items-center justify-center mx-auto mb-8">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0c71c3" strokeWidth={1.5} className="w-10 h-10">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <p className="text-[#0c71c3] font-bold text-sm uppercase tracking-widest mb-2">Error 404</p>
        <h1
          className="text-4xl font-extrabold text-[#0c2340] mb-4"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          Página no encontrada
        </h1>
        <p className="text-[#5d6675] leading-relaxed mb-10">
          Lo sentimos, la página que buscas no existe, fue movida o está temporalmente fuera de servicio.
          Puedes volver al inicio o explorar las secciones disponibles.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0c71c3] hover:bg-[#2ea3f2] text-white font-semibold text-sm transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Ir al inicio
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#e3e9f1] hover:border-[#0c71c3] text-[#0c2340] font-semibold text-sm transition-colors"
          >
            Contactarnos
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-[#e3e9f1]">
          <p className="text-xs font-bold text-[#5d6675] uppercase tracking-wider mb-4">Páginas disponibles</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Quiénes Somos", href: "/quienes-somos" },
              { label: "Directiva", href: "/directiva" },
              { label: "Noticias", href: "/noticias" },
              { label: "Dictámenes", href: "/dictamenes" },
              { label: "Documentos", href: "/documentos" },
              { label: "Afiliarse", href: "/afiliarse" },
              { label: "Contacto", href: "/contacto" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-lg bg-[#f5f9fc] hover:bg-[#e7edf5] text-sm text-[#0c2340] font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
