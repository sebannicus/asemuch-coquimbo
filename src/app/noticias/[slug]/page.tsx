import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { NEWS_CARDS } from "@/components/SiteData";

export function generateStaticParams() {
  return NEWS_CARDS.map((card) => ({
    slug: card.href.split("/").pop() ?? card.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS_CARDS.find((c) => c.href.split("/").pop() === slug);
  return {
    title: article?.title ?? "Noticia",
    description: article?.excerpt,
  };
}

export default async function NoticiaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = NEWS_CARDS.find((c) => c.href.split("/").pop() === slug);

  if (!article) {
    return (
      <main>
        <PageHeader title="Noticia no encontrada" breadcrumbs={[{ label: "Noticias", href: "/noticias" }, { label: "No encontrada" }]} />
        <section className="py-16 bg-white">
          <div className="container-site text-center">
            <p className="text-[#5d6675]">El artículo solicitado no existe o fue eliminado.</p>
            <Link href="/noticias" className="mt-6 inline-block text-[#0c71c3] font-semibold hover:underline">
              ← Volver a noticias
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        title={article.title}
        breadcrumbs={[{ label: "Noticias", href: "/noticias" }, { label: "Artículo" }]}
      />

      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-6 text-sm text-[#5d6675]">
              <span className="font-semibold text-[#0c71c3]">{article.date}</span>
              <span>·</span>
              <span>ASEMUCH Coquimbo</span>
            </div>

            {/* Image */}
            <div
              className="w-full rounded-2xl bg-cover bg-center mb-8"
              style={{ backgroundImage: `url('${article.imageUrl}')`, aspectRatio: "16/7" }}
              role="img"
              aria-label={article.title}
            />

            {/* Content */}
            <div className="prose prose-sm max-w-none text-[#5d6675] space-y-4">
              <p className="text-base leading-relaxed">{article.excerpt}</p>
              <p>
                La directiva de ASEMUCH Coquimbo reafirma su compromiso con la defensa de los derechos laborales
                de todos los funcionarios municipales de la región, y continuará informando sobre los avances
                y resultados de las gestiones realizadas.
              </p>
              <p>
                Para más información, los afiliados pueden comunicarse con la sede regional a través de los
                canales de contacto disponibles en nuestro sitio web o asistir a las reuniones mensuales de
                la directiva.
              </p>
            </div>

            {/* Back link */}
            <div className="mt-10 pt-6 border-t border-[#e3e9f1]">
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 text-[#0c71c3] font-semibold hover:gap-3 transition-all text-sm"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 rotate-180">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
                </svg>
                Volver a Noticias
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
