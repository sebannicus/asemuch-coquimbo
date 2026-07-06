import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Comunicados",
  description: "Comunicados oficiales de la Confederación Nacional ASEMUCH sobre temas laborales, legislativos y gremiales relevantes para los funcionarios municipales.",
};

export const revalidate = 86400;

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

export default async function ComunicadosPage() {
  const comunicados = await getComunicados();

  return (
    <main>
      <PageHeader
        title="Comunicados"
        subtitle="Pronunciamientos y comunicados oficiales de la Confederación Nacional ASEMUCH sobre temas laborales, legislativos y gremiales."
        breadcrumbs={[{ label: "Comunicados" }]}
      />

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
              Mostrando los últimos 20 comunicados del portal nacional{" "}
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

          {comunicados.length === 0 ? (
            <div className="text-center py-16 text-[#5d6675]">
              <p className="mb-2">No se pudieron cargar los comunicados en este momento.</p>
              <a
                href="https://asemuch.cl/comunicados/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0c71c3] hover:underline font-semibold"
              >
                Ver comunicados en asemuch.cl →
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {comunicados.map((c) => (
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
