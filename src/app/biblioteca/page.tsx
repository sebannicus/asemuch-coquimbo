import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { stripHtml } from "@/lib/strip-html";

export const metadata: Metadata = {
  title: "Biblioteca",
  description: "Centro de documentación ASEMUCH — dictámenes de Contraloría, guías, leyes, manuales y recursos legales para funcionarios municipales.",
};

export const revalidate = 86400;

interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
}

const SUB_SECCIONES = [
  {
    label: "Dictámenes",
    descripcion: "Jurisprudencia administrativa de la Contraloría General de la República organizada por materia.",
    href: "https://asemuch.cl/biblioteca/dictamenes/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Guías",
    descripcion: "Documentos de apoyo y orientaciones institucionales para funcionarios municipales en formato PDF.",
    href: "https://asemuch.cl/biblioteca/guias/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    label: "Leyes",
    descripcion: "Normativa legal vigente de interés para el mundo municipal: Estatuto Administrativo, DFL N°1, y más.",
    href: "https://asemuch.cl/leyes/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Manuales",
    descripcion: "Manuales técnicos y de gestión para funcionarios municipales elaborados por ASEMUCH.",
    href: "https://asemuch.cl/manuales/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
];

async function getBibliotecaPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(
      "https://asemuch.cl/wp-json/wp/v2/posts?categories=8&per_page=12&orderby=date&order=desc&_fields=id,date,title,excerpt,link",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BibliotecaPage() {
  const posts = await getBibliotecaPosts();

  return (
    <main>
      <PageHeader
        title="Biblioteca"
        subtitle="Centro de documentación ASEMUCH — dictámenes, guías, leyes y manuales para la defensa de los derechos de los funcionarios municipales."
        breadcrumbs={[{ label: "Biblioteca" }]}
      />

      {/* Sub-secciones */}
      <section className="py-16" style={{ backgroundColor: "#e7edf5" }}>
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest">Recursos disponibles</span>
            <h2
              className="mt-2 text-2xl font-extrabold text-[#0c2340]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Accede al repositorio nacional
            </h2>
            <p className="mt-2 text-sm text-[#5d6675] max-w-lg mx-auto">
              Todo el material está alojado en el portal de la Confederación Nacional ASEMUCH.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUB_SECCIONES.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-start gap-3 bg-white rounded-2xl p-6 border border-[#e3e9f1] hover:border-[#0c71c3]/50 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0c71c3]/10 flex items-center justify-center text-[#0c71c3] group-hover:bg-[#0c71c3] group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <div>
                  <h3
                    className="font-bold text-[#0c2340] mb-1"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {s.label}
                  </h3>
                  <p className="text-xs text-[#5d6675] leading-relaxed">{s.descripcion}</p>
                </div>
                <span className="mt-auto text-xs font-semibold text-[#0c71c3] group-hover:gap-2 flex items-center gap-1">
                  Ir a {s.label}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Buscador */}
      <section className="py-10 bg-[#0c2340]">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
              Buscador de la Biblioteca ASEMUCH
            </p>
            <p className="text-white/60 text-sm">Busca dictámenes, guías y documentos por palabra clave.</p>
          </div>
          <a
            href="https://asemuch.cl/biblioteca/buscador/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0c71c3] hover:bg-[#2ea3f2] text-white text-sm font-semibold transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Abrir buscador
          </a>
        </div>
      </section>

      {/* Últimas publicaciones */}
      {posts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-site">
            <div className="mb-8">
              <span className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest">Biblioteca ASEMUCH</span>
              <h2
                className="mt-2 text-2xl font-extrabold text-[#0c2340]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Últimas publicaciones
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {posts.map((p) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-2xl border border-[#e3e9f1] p-5 hover:border-[#0c71c3]/40 hover:bg-[#f5f9fc] transition-all"
                >
                  <div className="shrink-0 w-1 self-stretch rounded-full bg-[#0c71c3]/20 group-hover:bg-[#0c71c3] transition-colors" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#5d6675] mb-1">{formatDate(p.date)}</p>
                    <h3
                      className="text-sm font-bold text-[#0c2340] group-hover:text-[#0c71c3] transition-colors leading-snug mb-1"
                      style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                    >
                      {stripHtml(p.title.rendered)}
                    </h3>
                    <p className="text-xs text-[#5d6675] leading-relaxed line-clamp-2">
                      {stripHtml(p.excerpt.rendered)}
                    </p>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-4 h-4 shrink-0 text-[#5d6675] group-hover:text-[#0c71c3] mt-1 transition-colors"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://asemuch.cl/biblioteca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#0c71c3]/30 text-sm font-semibold text-[#0c71c3] hover:bg-[#0c71c3] hover:text-white hover:border-[#0c71c3] transition-all"
              >
                Ver toda la Biblioteca en asemuch.cl →
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
