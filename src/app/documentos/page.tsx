import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { DICTAMENES } from "@/components/SiteData";

export const metadata: Metadata = {
  title: "Documentos",
  description: "Leyes, guías y dictámenes de Contraloría relevantes para los funcionarios municipales de la Región de Coquimbo.",
};

export const revalidate = 86400;

interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
}

async function fetchPosts(categoryId: number, perPage = 15): Promise<WPPost[]> {
  try {
    const res = await fetch(
      `https://asemuch.cl/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}&orderby=date&order=desc&_fields=id,date,title,excerpt,link`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8230;/g, "…")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .trim();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const RECURSOS_EXTRAS = [
  {
    label: "Guías",
    descripcion: "Documentos de apoyo y orientaciones institucionales para funcionarios municipales en PDF.",
    href: "https://asemuch.cl/biblioteca/guias/",
    color: "#0c71c3",
  },
  {
    label: "Manuales",
    descripcion: "Manuales técnicos y de gestión elaborados por ASEMUCH para funcionarios municipales.",
    href: "https://asemuch.cl/manuales/",
    color: "#10498a",
  },
];

export default async function DocumentosPage() {
  const [leyes, dictamenesNacionales] = await Promise.all([
    fetchPosts(9, 20),
    fetchPosts(10, 10),
  ]);

  return (
    <main>
      <PageHeader
        title="Documentos"
        subtitle="Leyes, guías y dictámenes organizados para los funcionarios municipales de ASEMUCH Coquimbo."
        breadcrumbs={[{ label: "Documentos" }]}
      />

      {/* Quick nav */}
      <div className="bg-white border-b border-[#e3e9f1] sticky top-0 z-30">
        <div className="container-site flex gap-1 py-2 overflow-x-auto">
          {[
            { label: "Leyes y Guías", href: "#leyes-guias" },
            { label: "Dictámenes", href: "#dictamenes" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-[#0c71c3] hover:bg-[#e7edf5] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── LEYES Y GUÍAS ─────────────────────────────────────────── */}
      <section id="leyes-guias" className="py-16" style={{ backgroundColor: "#f5f9fc" }}>
        <div className="container-site">
          <div className="mb-8">
            <span className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest">
              Repositorio nacional ASEMUCH
            </span>
            <h2
              className="mt-2 text-2xl font-extrabold text-[#0c2340]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Leyes y Guías
            </h2>
            <p className="mt-1 text-sm text-[#5d6675]">
              Normativa vigente y documentos de orientación para funcionarios municipales.
            </p>
          </div>

          {/* Leyes fetched from WP */}
          {leyes.length === 0 ? (
            <div className="mb-8 p-6 rounded-2xl bg-white border border-[#e3e9f1] text-center text-sm text-[#5d6675]">
              <p>No se pudieron cargar las leyes en este momento.</p>
              <a
                href="https://asemuch.cl/leyes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0c71c3] hover:underline font-semibold mt-1 inline-block"
              >
                Ver leyes en asemuch.cl →
              </a>
            </div>
          ) : (
            <div className="mb-8 rounded-2xl border border-[#e3e9f1] overflow-hidden">
              <div className="bg-[#0c2340] px-5 py-3 flex items-center justify-between">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                  Leyes — Normativa Municipal
                </span>
                <a
                  href="https://asemuch.cl/leyes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2ea3f2] text-xs font-semibold hover:underline"
                >
                  Ver todas →
                </a>
              </div>
              <div className="divide-y divide-[#e3e9f1] bg-white">
                {leyes.map((ley) => (
                  <a
                    key={ley.id}
                    href={ley.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 px-5 py-3.5 hover:bg-[#f5f9fc] transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0c71c3"
                      strokeWidth={2}
                      className="w-4 h-4 shrink-0 mt-0.5"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold text-[#0c2340] group-hover:text-[#0c71c3] transition-colors leading-snug"
                        style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                      >
                        {stripHtml(ley.title.rendered)}
                      </p>
                      <p className="text-xs text-[#5d6675] mt-0.5">{formatDate(ley.date)}</p>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-3.5 h-3.5 shrink-0 text-[#5d6675] group-hover:text-[#0c71c3] mt-0.5 transition-colors"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Guías y Manuales — link cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {RECURSOS_EXTRAS.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-white rounded-2xl border border-[#e3e9f1] p-5 hover:border-[#0c71c3]/40 hover:shadow-sm transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: r.color }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p
                    className="font-bold text-[#0c2340] mb-1"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {r.label}
                  </p>
                  <p className="text-xs text-[#5d6675] leading-relaxed">{r.descripcion}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0c71c3]">
                    Ver {r.label} en asemuch.cl
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── DICTÁMENES ───────────────────────────────────────────────── */}
      <section id="dictamenes" className="py-16 bg-white">
        <div className="container-site">
          <div className="mb-8">
            <span className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest">
              Jurisprudencia administrativa
            </span>
            <h2
              className="mt-2 text-2xl font-extrabold text-[#0c2340]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Dictámenes
            </h2>
          </div>

          {/* Dictámenes ASEMUCH Nacional (WP) */}
          {dictamenesNacionales.length > 0 && (
            <div className="mb-10">
              <h3
                className="text-base font-bold text-[#0c2340] mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                <span className="w-2 h-2 rounded-full bg-[#0c71c3] inline-block" />
                ASEMUCH Nacional
              </h3>
              <div className="rounded-2xl border border-[#e3e9f1] overflow-hidden">
                <div className="divide-y divide-[#e3e9f1]">
                  {dictamenesNacionales.map((d, i) => (
                    <a
                      key={d.id}
                      href={d.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-start gap-4 px-5 py-4 hover:bg-[#f5f9fc] transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-[#fafbfd]"
                      }`}
                    >
                      <div className="shrink-0 w-1 self-stretch rounded-full bg-[#0c71c3]/20 group-hover:bg-[#0c71c3] transition-colors" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#5d6675] mb-1">{formatDate(d.date)}</p>
                        <p
                          className="text-sm font-semibold text-[#0c2340] group-hover:text-[#0c71c3] transition-colors leading-snug"
                          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          {stripHtml(d.title.rendered)}
                        </p>
                        {d.excerpt?.rendered && (
                          <p className="text-xs text-[#5d6675] mt-0.5 line-clamp-1">
                            {stripHtml(d.excerpt.rendered)}
                          </p>
                        )}
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
              </div>
            </div>
          )}

          {/* Dictámenes CGR (locales) */}
          <div>
            <h3
              className="text-base font-bold text-[#0c2340] mb-4 flex items-center gap-2"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#10498a] inline-block" />
              Contraloría General de la República
            </h3>
            <div className="mb-4 flex items-start gap-3 p-4 rounded-xl bg-[#f5f9fc] border border-[#0c71c3]/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0c71c3" strokeWidth={2} className="w-5 h-5 shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-[#5d6675]">
                Los dictámenes están disponibles en el portal oficial de la{" "}
                <a
                  href="https://www.contraloria.cl/dictamenes/busqueda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0c71c3] hover:underline"
                >
                  Contraloría General de la República
                </a>
                .
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-[#e3e9f1]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f5f9fc] border-b border-[#e3e9f1]">
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#0c2340] uppercase tracking-wider">N° Dictamen</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#0c2340] uppercase tracking-wider">Materia</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#0c2340] uppercase tracking-wider hidden md:table-cell">Categoría</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#0c2340] uppercase tracking-wider hidden lg:table-cell">Año</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e3e9f1]">
                  {DICTAMENES.map((d, i) => (
                    <tr key={d.id} className={`transition-colors hover:bg-[#f5f9fc] ${i % 2 === 0 ? "bg-white" : "bg-[#fafbfd]"}`}>
                      <td className="px-5 py-4 font-mono font-semibold text-[#0c71c3] whitespace-nowrap">{d.numero}</td>
                      <td className="px-5 py-4 text-[#0c2340] max-w-xs">
                        <p className="font-medium leading-snug">{d.materia}</p>
                        <p className="text-xs text-[#5d6675] mt-0.5">{d.organismo}</p>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#e7edf5] text-[#0c2340]">{d.categoria}</span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-[#5d6675] font-medium">{d.año}</td>
                      <td className="px-5 py-4 text-right">
                        <a
                          href={d.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0c71c3] hover:text-[#2ea3f2] transition-colors"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          CGR
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
