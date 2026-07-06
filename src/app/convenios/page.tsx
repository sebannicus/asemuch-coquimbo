import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Convenios",
  description: "Convenios y beneficios negociados por ASEMUCH para sus afiliadas y afiliados — descuentos en salud, educación, óptica, comercio y más.",
};

export const revalidate = 86400;

interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
}

async function getConvenios(): Promise<WPPost[]> {
  try {
    const res = await fetch(
      "https://asemuch.cl/wp-json/wp/v2/posts?categories=19&per_page=20&orderby=date&order=desc&_fields=id,date,title,excerpt,link",
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

export default async function ConveniosPage() {
  const convenios = await getConvenios();

  return (
    <main>
      <PageHeader
        title="Convenios"
        subtitle="Beneficios y convenios negociados por la Confederación Nacional ASEMUCH para sus afiliadas y afiliados a lo largo de Chile."
        breadcrumbs={[{ label: "Convenios" }]}
      />

      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="mb-8 flex items-start gap-3 p-4 rounded-xl bg-[#f5f9fc] border border-[#0c71c3]/20">
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
              Información publicada en el portal nacional de{" "}
              <a
                href="https://asemuch.cl/convenios-asemuch/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0c71c3] hover:underline"
              >
                ASEMUCH Chile
              </a>
              . Haz clic en <strong className="text-[#0c2340]">Ver convenio</strong> para conocer los detalles.
            </p>
          </div>

          {/* Convenio Skype — local */}
          <div className="mb-8">
            <p className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest mb-3">
              Convenio ASEMUCH Coquimbo
            </p>
            <div className="rounded-2xl border-2 border-[#0c71c3]/30 bg-[#f5f9fc] p-6 flex items-start gap-5">
              {/* Skype logo */}
              <div
                className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#00AFF0" }}
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                  <path d="M12.07 2C6.48 2 2 6.48 2 12.07c0 1.95.56 3.78 1.53 5.33A6.89 6.89 0 0 0 3 19.07C3 21.24 4.76 23 6.93 23a6.9 6.9 0 0 0 1.67-.21A10.05 10.05 0 0 0 12.07 24C17.66 24 22 19.52 22 13.93c0-1.7-.43-3.3-1.19-4.7.13-.39.19-.8.19-1.23C21 5.67 18.33 3 15 3c-.43 0-.86.06-1.27.19A10.06 10.06 0 0 0 12.07 2zm.21 4.66c3.07 0 4.82 1.43 4.82 3.34 0 1.08-.73 1.76-1.69 1.76-.96 0-1.52-.55-1.7-1.37-.21-.96-.72-1.37-1.55-1.37-.84 0-1.29.45-1.29 1.04 0 .57.37.89 1.35 1.17l1.64.45c2.14.59 3.21 1.63 3.21 3.37 0 2.31-1.97 3.77-4.86 3.77-3.2 0-5.04-1.39-5.04-3.52 0-1.09.76-1.8 1.74-1.8 1.04 0 1.59.63 1.78 1.59.21 1.1.76 1.61 1.72 1.61.91 0 1.45-.43 1.45-1.08 0-.57-.38-.9-1.37-1.18L11 13.71c-2.05-.57-3.06-1.57-3.06-3.27 0-2.2 1.82-3.78 4.34-3.78z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2
                    className="text-base font-bold text-[#0c2340]"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    Convenio Skype — ASEMUCH Coquimbo
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                    Próximamente
                  </span>
                </div>
                <p className="text-sm text-[#5d6675] leading-relaxed">
                  Descuento exclusivo para afiliadas y afiliados de ASEMUCH Coquimbo en planes Skype. El porcentaje exacto de descuento (entre un 15% y 20%) será informado una vez confirmados los detalles del convenio.
                </p>
              </div>
            </div>
          </div>

          <h2
            className="text-sm font-bold text-[#0c2340] uppercase tracking-widest mb-5"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Convenios ASEMUCH Nacional
          </h2>

          {convenios.length === 0 ? (
            <div className="text-center py-16 text-[#5d6675]">
              <p className="mb-2">No se pudieron cargar los convenios en este momento.</p>
              <a
                href="https://asemuch.cl/convenios-asemuch/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0c71c3] hover:underline font-semibold"
              >
                Ver convenios en asemuch.cl →
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {convenios.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-[#e3e9f1] bg-white p-6 flex flex-col hover:border-[#0c71c3]/40 hover:shadow-sm transition-all"
                >
                  <p className="text-xs text-[#5d6675] mb-2">{formatDate(c.date)}</p>
                  <h2
                    className="text-base font-bold text-[#0c2340] mb-3 leading-snug flex-1"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {stripHtml(c.title.rendered)}
                  </h2>
                  <p className="text-sm text-[#5d6675] leading-relaxed mb-4 line-clamp-3">
                    {stripHtml(c.excerpt.rendered)}
                  </p>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0c71c3] hover:text-[#2ea3f2] transition-colors mt-auto"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-3.5 h-3.5"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Ver convenio
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
