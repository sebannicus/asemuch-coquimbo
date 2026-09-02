"use client";

import { useState, useEffect, useMemo } from "react";
import PageHeader from "@/components/PageHeader";

interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
}

async function getComunicados(): Promise<WPPost[]> {
  try {
    const res = await fetch(
      "https://asemuch.cl/wp-json/wp/v2/posts?categories=12&per_page=20&orderby=date&order=desc&_fields=id,date,title,excerpt,link",
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

export default function ComunicadosPage() {
  const [comunicados, setComunicados] = useState<WPPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getComunicados();
      setComunicados(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredComunicados = useMemo(() => {
    if (!searchQuery) return comunicados;
    const q = searchQuery.toLowerCase();
    return comunicados.filter((c) =>
      stripHtml(c.title.rendered).toLowerCase().includes(q) ||
      stripHtml(c.excerpt.rendered).toLowerCase().includes(q)
    );
  }, [comunicados, searchQuery]);

  return (
    <main>
      <PageHeader
        title="Comunicados"
        subtitle="Pronunciamientos y comunicados oficiales de la Confederación Nacional ASEMUCH sobre temas laborales, legislativos y gremiales."
        breadcrumbs={[{ label: "Comunicados" }]}
      />

      {/* Buscador sticky */}
      <div className="sticky top-16 z-30 bg-white border-b border-[#e3e9f1] shadow-sm">
        <div className="container-site py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex-1 relative w-full">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0c71c3"
                strokeWidth={2}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Busca comunicado por tema..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition"
              />
            </div>
            {searchQuery && (
              <p className="text-xs text-[#5d6675] whitespace-nowrap">
                <strong className="text-[#0c71c3]">{filteredComunicados.length}</strong> resultado{filteredComunicados.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="py-16" style={{ backgroundColor: "#f5f9fc" }}>
        <div className="container-site">
          <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-white border border-[#e3e9f1]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0c71c3"
              strokeWidth={2}
              className="w-5 h-5 shrink-0 mt-0.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm text-[#5d6675]">
              Mostrando los últimos comunicados del portal nacional{" "}
              <a
                href="https://asemuch.cl/comunicados/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0c71c3] hover:underline"
              >
                asemuch.cl
              </a>
              . Haz clic en cualquier comunicado para leer el texto completo.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 text-[#5d6675]">
              <p>Cargando comunicados...</p>
            </div>
          ) : filteredComunicados.length === 0 ? (
            <div className="text-center py-16 text-[#5d6675]">
              {searchQuery ? (
                <>
                  <p className="mb-2">No se encontraron comunicados que coincidan con &quot;{searchQuery}&quot;.</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[#0c71c3] hover:underline font-semibold"
                  >
                    Limpiar búsqueda
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-2">No se pudieron cargar los comunicados en este momento.</p>
                  <a
                    href="https://asemuch.cl/comunicados/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0c71c3] hover:underline font-semibold"
                  >
                    Ver comunicados en asemuch.cl →
                  </a>
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredComunicados.map((c) => (
                <a
                  key={c.id}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 bg-white rounded-2xl border border-[#e3e9f1] p-5 hover:border-[#0c71c3]/40 hover:shadow-sm transition-all"
                >
                  <div className="shrink-0 w-1 self-stretch rounded-full bg-[#0c71c3]/30 group-hover:bg-[#0c71c3] transition-colors" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#5d6675] mb-1">{formatDate(c.date)}</p>
                    <h2
                      className="text-sm font-bold text-[#0c2340] group-hover:text-[#0c71c3] transition-colors leading-snug mb-1"
                      style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                    >
                      {stripHtml(c.title.rendered)}
                    </h2>
                    <p className="text-xs text-[#5d6675] leading-relaxed line-clamp-2">
                      {stripHtml(c.excerpt.rendered)}
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

              <a
                href="https://asemuch.cl/comunicados/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-center block py-3 rounded-xl border border-[#0c71c3]/30 text-sm font-semibold text-[#0c71c3] hover:bg-[#0c71c3] hover:text-white hover:border-[#0c71c3] transition-all"
              >
                Ver todos los comunicados en asemuch.cl →
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
